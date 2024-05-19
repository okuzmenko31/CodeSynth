from ..base import BaseCustomException


class PasswordValidationException(BaseCustomException):
    pass


class PasswordLowercaseException(PasswordValidationException):
    error = "Password must contain letters a-z!"


class PasswordUppercaseException(PasswordValidationException):
    error = "Password must contain letters A-Z!"


class PasswordNumbersException(PasswordValidationException):
    error = "Password must contain numbers 0-9!"


class PasswordLengthException(PasswordValidationException):
    error = "Password length must be more than 9 symbols!"
