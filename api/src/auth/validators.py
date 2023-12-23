import re

from ..core.utils.dataclasses import PasswordValidationData


class PasswordValidator:
    def __init__(self, value: str):
        self.password = value

    def check_lowercase(self):
        if not re.search("[a-z]", self.password):
            return PasswordValidationData(error="Password must contain letters a-z!")

    def check_uppercase(self):
        if not re.search("[A-Z]", self.password):
            return PasswordValidationData(error="Password must contain letters A-Z!")

    def check_numbers(self):
        if not re.search("[0-9]", self.password):
            return PasswordValidationData(error="Password must contain numbers 0-9!")

    def check_length(self):
        if len(self.password) < 9:
            return PasswordValidationData(
                error="Password length must be more than 9 symbols!"
            )

    def check_all(self):
        check_funcs = [
            self.check_lowercase,
            self.check_uppercase,
            self.check_numbers,
            self.check_length,
        ]

        for func in check_funcs:
            func_res = func()
            if func_res is not None:
                return func_res

        return None

    def validate_password(self):
        result = self.check_all()
        if result is None:
            return PasswordValidationData(success=True)
        return result


def validate_password(password: str) -> PasswordValidationData:
    validator = PasswordValidator(value=password)
    return validator.validate_password()
