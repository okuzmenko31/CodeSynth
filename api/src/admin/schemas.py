from pydantic import BaseModel


class AdminAuthSchema(BaseModel):
    username: str
    password: str
