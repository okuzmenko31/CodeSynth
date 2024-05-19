from ..base import BaseCustomException


class UserAlreadyExistsException(BaseCustomException):
    error = "User with this username or email already exists!"
