from ..base import BaseCustomException


class PasswordValidationException(BaseCustomException):
    error = None

    def __init__(self, message: str | None = None):
        if not message:
            message = self.error
        super().__init__(message)


class PasswordLowercaseException(PasswordValidationException):
    error = "Password must contain letters a-z!"


class PasswordUppercaseException(PasswordValidationException):
    error = "Password must contain letters A-Z!"


class PasswordNumbersException(PasswordValidationException):
    error = "Password must contain numbers 0-9!"


class PasswordLengthException(PasswordValidationException):
    error = "Password length must be more than 9 symbols!"
