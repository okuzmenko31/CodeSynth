from pydantic import BaseModel


class AdminSecretKeySchema(BaseModel):
    secret_key: str


class AccessTokenSchema(BaseModel):
    access_token: str
