import datetime
import json

from datetime import timedelta
from typing import NamedTuple, Optional

from jose import jwt

from src.core.config import settings
from src.core.utils.service import BaseService


class AdminAuthData(NamedTuple):
    data: Optional[dict] = None
    error: Optional[str] = None


class JWTBlackListTokensService(BaseService):

    async def add_token_to_blacklist(
            self,
            access_token: str
    ):
        async with self.uow:
            token_id = await self.uow.jwt_black_list.insert_by_data({
                'jwt_token': access_token
            })
            await self.uow.commit()
            return token_id


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

    async def authenticate_admin(self, secret_key: str):
        if not await self.validate_secret_key(secret_key):
            return AdminAuthData(error='The secret key is wrong! Please, write correct secret key.')
        encoded_jwt_access = await self.generate_access_token()
        encoded_jwt_refresh = await self.generate_refresh_token()
        return AdminAuthData(data={
            'access_token': encoded_jwt_access,
            'refresh_token': encoded_jwt_refresh
        })
