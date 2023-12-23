import datetime
import json

from datetime import timedelta

from jose import jwt

from ..core.config import settings
from ..core.utils.decorators import handle_errors
from ..core.utils.service import BaseService

from ..core.utils.dataclasses import ReturnData

from .schemas import AccessAndRefreshTokensSchema, AccessTokenReturnSchema


class JWTBlackListTokensService(BaseService):

    @handle_errors
    async def add_token_to_blacklist(
            self,
            token: str
    ):
        async with self.uow:
            token_id = await self.uow.jwt_black_list.insert_by_data({
                'jwt_token': token
            })
            await self.uow.commit()
            return token_id

    async def token_in_blacklist(
            self,
            token: str
    ):
        async with self.uow:
            exists = await self.uow.jwt_black_list.check_exists_by_data({
                'jwt_token': token
            })
            return exists


class JwtTokensMixin:

    @staticmethod
    async def get_token_expire_time(access_token=True):
        expire_time = settings.jwt.access_token_expire_minutes
        if not access_token:
            expire_time = settings.jwt.refresh_token_expire_minutes
        return timedelta(minutes=expire_time)

    @staticmethod
    async def generate_token(token_expire_min):
        expire = datetime.datetime.utcnow() + token_expire_min
        encoded_jwt = jwt.encode(
            claims={'exp': expire},
            key=settings.secret_key,
            algorithm=settings.jwt.jwt_algorithm
        )
        return encoded_jwt

    async def generate_access_token(self):
        return await self.generate_token(await self.get_token_expire_time())

    async def generate_refresh_token(self):
        return await self.generate_token(await self.get_token_expire_time(access_token=False))


class AdminAuthService(JwtTokensMixin):

    @staticmethod
    async def validate_secret_key(key: str):
        admin_json = open('admin.json')
        data = json.load(admin_json)
        if key in data:
            return True
        return False

    @handle_errors
    async def authenticate_admin(self, secret_key: str):
        if not await self.validate_secret_key(secret_key):
            return ReturnData(
                error='The secret key is wrong! Please, write correct secret key.'
            )
        return ReturnData(result=AccessAndRefreshTokensSchema(
            access_token=await self.generate_access_token(),
            refresh_token=await self.generate_refresh_token()
        ))


class TokensVerifyService(JWTBlackListTokensService):

    @staticmethod
    async def get_decoded_token(token: str):
        return jwt.decode(token, settings.secret_key, algorithms=[settings.jwt.jwt_algorithm])

    async def check_token_expired(self, token: str):
        try:
            decoded_token = await self.get_decoded_token(token)
            exp = decoded_token.get('exp')

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

    @property
    def token_invalid_data(self):
        return ReturnData(
            error='This token is invalid or expired.'
        )

    async def jwt_token_valid(self, token: str) -> bool:
        if not await self.token_in_blacklist(token) and not await self.check_token_expired(token):
            return True
        return False

    @handle_errors
    async def verify_token(self, token: str) -> ReturnData:
        if not await self.jwt_token_valid(token):
            return ReturnData(result=True)
        return self.token_invalid_data


class JWTTokensService(TokensVerifyService,
                       JwtTokensMixin):

    @handle_errors
    async def get_access_from_refresh(self, refresh_token: str):
        if not await self.jwt_token_valid(refresh_token):
            return self.token_invalid_data
        return ReturnData(
            result=AccessTokenReturnSchema(
                access_token=await self.generate_access_token()
            )
        )
