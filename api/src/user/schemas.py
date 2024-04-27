from fastapi import HTTPException

from pydantic import EmailStr, field_validator

from ..core.schemas import MainSchema

from ..utils.validators.user.password_validation import validate_password
from ..utils.exceptions.user.password_exceptions import (
    PasswordValidationException,
)


class UserShow(MainSchema):
    username: str
    email: EmailStr
    active: bool


class PasswordValidator:
    @field_validator("password")
    def validate_password(cls, value):
        try:
            validate_password(value)
        except PasswordValidationException as e:
            raise HTTPException(detail=e, status_code=400)

    @field_validator("password_confirm")
    def validate_password_confirm(cls, value, values):
        if value != values.data.get("password"):
            raise HTTPException(status_code=400, detail="Password mismatch!")
        return value


class UserCreate(MainSchema, PasswordValidator):
    username: str
    email: EmailStr
    password: str
    password_confirm: str


class UserUpdate(MainSchema):
    pass
