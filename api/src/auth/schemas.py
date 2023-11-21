from pydantic import BaseModel

from src.core.schemas import MainSchema


class AdminSecretKeySchema(BaseModel):
    secret_key: str


class AccessOrRefreshTokenSchema(BaseModel):
    access_or_refresh_token: str


class AccessTokenReturnSchema(MainSchema):
    access_token: str


class AccessAndRefreshTokensSchema(MainSchema):
    access_token: str
    refresh_token: str
