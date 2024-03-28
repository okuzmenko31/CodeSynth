import logging

from passlib.context import CryptContext

# Set logging level for passlib to silence the warnings
# related with bcrypt versions from `4.0.1` to `4.1.1`
# https://foss.heptapod.net/python-libs/passlib/-/issues/190
# from https://github.com/pyca/bcrypt/issues/684#issuecomment-1858400267
logging.getLogger("passlib").setLevel(logging.ERROR)


hash_content = CryptContext(schemes=["bcrypt"])


class Hashing:
    """A utility class for hashing and verifying passwords securely."""

    @staticmethod
    def verify_password(password: str, hashed_password: str) -> bool:
        """Verify a password against a given hash."""
        return hash_content.verify(password, hashed_password)

    @staticmethod
    def get_hashed_password(password: str) -> str:
        """Generate a hash for a given password."""
        return hash_content.hash(password)
