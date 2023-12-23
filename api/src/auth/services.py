import datetime

from jose import jwt

from ..core.config import settings
from ..core.repositories.repos import UserRepository
from ..core.utils.decorators import handle_errors
from ..core.utils.hashing import Hashing
from ..core.utils.service import BaseService

from ..core.utils.dataclasses import ReturnData

from .schemas import (
    AccessAndRefreshTokensSchema,
    AccessTokenReturnSchema,
    LoginAdminSchema,
)


class JWTBlackListTokensService(BaseService):
    @handle_errors
    async def add_token_to_blacklist(self, token: str):
        async with self.uow:
            token_id = await self.uow.jwt_black_list.insert_by_data({"jwt_token": token})
            await self.uow.commit()
            return token_id

    async def token_in_blacklist(self, token: str):
        async with self.uow:
            exists = await self.uow.jwt_black_list.check_exists_by_data({"jwt_token": token})
            return exists


class JwtTokensMixin:
    @staticmethod
    async def get_token_expire_time(access_token=True):
        expire_time = settings.jwt.access_token_expire_minutes
        if not access_token:
            expire_time = settings.jwt.refresh_token_expire_minutes
        return datetime.timedelta(minutes=expire_time)

    @staticmethod
    async def generate_token(token_expire_min, user_id):
        expire = datetime.datetime.utcnow() + token_expire_min
        encoded_jwt = jwt.encode(
            claims={"exp": expire, "user_id": user_id},
            key=settings.secret_key,
            algorithm=settings.jwt.jwt_algorithm,
        )
        return encoded_jwt

    async def generate_access_token(self, user_id):
        return await self.generate_token(
            await self.get_token_expire_time(),
            user_id,
        )

    async def generate_refresh_token(self, user_id):
        return await self.generate_token(
            await self.get_token_expire_time(access_token=False),
            user_id,
        )


class UserService(BaseService, JwtTokensMixin):
    repository = UserRepository

    @handle_errors
    async def create_admin(self, data: dict) -> ReturnData:
        async with self.uow:
            if await self.uow_repo.check_exists_by_data(
                {
                    "username": data["username"],
                    "email": data["email"],
                }
            ):
                return ReturnData(error="Admin with this username or email is already exists!")
            admin_id = await self.uow_repo.insert_by_data(data)
            admin = await self.uow_repo.get_one_by_id(admin_id)
            await self.uow.commit()
            return ReturnData(result=str(admin))

    async def authenticate_admin(self, data: LoginAdminSchema) -> ReturnData:
        async with self.uow:
            admin = await self.uow_repo.get_one_by_data({"username": data.username})
            if not admin:
                return ReturnData(error="This account does not exist!")

            if not Hashing().verify_password(data.password, admin.hashed_password):
                return ReturnData(error="The password is wrong!")
            return ReturnData(
                result=AccessAndRefreshTokensSchema(
                    access_token=await self.generate_access_token(admin.id),
                    refresh_token=await self.generate_refresh_token(admin.id),
                )
            )


class TokensVerifyService(JWTBlackListTokensService):
    @staticmethod
    async def get_decoded_token(token: str):
        return jwt.decode(token, settings.secret_key, algorithms=[settings.jwt.jwt_algorithm])

    async def check_token_expired(self, token: str):
        try:
            decoded_token = await self.get_decoded_token(token)
            exp = decoded_token.get("exp")

            if exp is None:
                return True
            current_time = datetime.datetime.utcnow()
            if current_time < datetime.datetime.utcfromtimestamp(exp):
                return False
            else:
                return True
        except jwt.ExpiredSignatureError:
            return True
        except (Exception,):
            return True

    async def user_id_from_token(self, token: str):
        try:
            decoded_token = await self.get_decoded_token(token)
            user_id = decoded_token.get("user_id")
            return user_id
        except jwt.ExpiredSignatureError:
            return None
        except (Exception,):
            return None

    async def check_token_user_invalid(self, token: str):
        user_id = await self.user_id_from_token(token)
        if user_id is None:
            return True
        async with self.uow:
            admin = await UserService(self.uow).uow_repo.get_one_by_id(int(user_id))
            if admin is None:
                return True
        return False

    @property
    def token_invalid_data(self):
        return ReturnData(error="This token is invalid or expired.")

    async def jwt_token_valid(self, token: str) -> bool:
        checks = [
            self.token_in_blacklist,
            self.check_token_expired,
            self.check_token_user_invalid,
        ]

        for check in checks:
            if await check(token):  # noqa
                return False
        return True

    @handle_errors
    async def verify_token(self, token: str) -> ReturnData:
        if not await self.jwt_token_valid(token):
            return self.token_invalid_data
        return ReturnData(result=True)


class JWTTokensService(TokensVerifyService, JwtTokensMixin):
    @handle_errors
    async def get_access_from_refresh(self, refresh_token: str):
        if not await self.jwt_token_valid(refresh_token):
            return self.token_invalid_data
        return ReturnData(
            result=AccessTokenReturnSchema(
                access_token=await self.generate_access_token(
                    await self.user_id_from_token(refresh_token)
                )
            )
        )
