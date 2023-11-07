from pydantic import BaseModel


class AdminSecretKeySchema(BaseModel):
    secret_key: str
