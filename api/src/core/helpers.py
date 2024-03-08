import os

from dotenv import load_dotenv


DEV_DOTENV = ".env.dev"
PROD_DOTENV = ".env.prod"


class DotenvException(Exception):
    def __init__(self, message: str) -> None:
        self.message = message


class DotenvListException(DotenvException):
    pass


class DotenvStrokeException(DotenvException):
    pass


class DotenvListHelper:
    """Class for getting a list from a string value in a .env file"""

    @staticmethod
    def _assemble_list(value: str) -> list[str]:
        try:
            return [v.strip() for v in value.strip("[]").split(",") if v]
        except ValueError:
            raise DotenvListException("Could not parse list")

    @staticmethod
    def _assemble_stroke(value: str) -> list[str]:
        try:
            return [v.strip() for v in value.split(",") if v]
        except ValueError:
            raise DotenvListException("Could not parse stroke")

    @classmethod
    def get_list_from_value(cls, value: str) -> list[str]:
        if value.startswith("[") and value.endswith("]"):
            return cls._assemble_list(value)
        return cls._assemble_stroke(value)


def load_environment():
    # Load the main .env file
    load_dotenv(dotenv_path=".env")

    # Determine the environment based on the DEBUG flag
    debug_mode: bool = os.getenv("DEBUG", "True") == "True"
    env_file: str = DEV_DOTENV if debug_mode else PROD_DOTENV

    try:
        load_dotenv(dotenv_path=env_file)
    except IOError:
        raise ValueError(f"Could not load environment file {env_file}")
