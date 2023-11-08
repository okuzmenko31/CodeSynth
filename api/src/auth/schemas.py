from pydantic import BaseModel


class AdminSecretKeySchema(BaseModel):
    secret_key: str


class AccessOrRefreshTokenSchema(BaseModel):
    access_or_refresh_token: str
