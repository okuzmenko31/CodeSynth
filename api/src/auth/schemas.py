from pydantic import BaseModel, field_validator, ValidationError, EmailStr

from .validators import validate_password
from ..core.schemas import MainSchema


class AdminSecretKeySchema(BaseModel):
    secret_key: str


class AccessOrRefreshTokenSchema(BaseModel):
    access_or_refresh_token: str


class AccessTokenReturnSchema(MainSchema):
    access_token: str


class AccessAndRefreshTokensSchema(MainSchema):
    access_token: str
    refresh_token: str


class CreateAdminSchema(MainSchema):
    username: str
    email: EmailStr
    password: str
    password_confirmation: str

    @field_validator("password")
    def validate_password(cls, value):
        validation_data = validate_password(value)
        if validation_data.error is not None:
            raise ValueError(validation_data.error)
        return value

    @field_validator("password_confirmation")
    def validate_password_confirm(cls, value, values):
        if not value == values.data.get("password"):
            raise ValueError("Passwords do not match")
        return value


class LoginAdminSchema(MainSchema):
    username: str
    password: str
