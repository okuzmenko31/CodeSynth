import asyncio

from pydantic import ValidationError

from getpass import getpass

from .services import UserService
from .schemas import CreateAdminSchema

from ..core.utils.unitofwork import UnitOfWork
from ..core.utils.hashing import Hashing


async def create_admin(
    data: dict,
):
    try:
        CreateAdminSchema.model_validate(data)
        create_data = {
            "username": data["username"],
            "email": data["email"],
            "hashed_password": Hashing.get_hashed_password(data["password"]),
        }
        admin_data = await UserService(UnitOfWork()).create_admin(create_data)
        if admin_data.error is not None:
            return admin_data.error
        return admin_data.result
    except ValidationError as e:
        errors_msg = ""
        for error in e.errors():
            field = error.get("loc")[0]
            user_value = error.get("input")

            ctx = error.get("ctx")
            msg = ctx.get("reason") if ctx.get("reason") else ctx.get("error")

            errors_msg += (
                f"\n\nField: {field}\n" f"Your value: {user_value}\n" f"Details: {msg}"
            )

        return errors_msg


if __name__ == "__main__":
    username = input("\nUsername: ")
    email = input("Email: ")
    password = getpass("Password: ")
    password_confirm = getpass("Confirm Password: ")

    loop = asyncio.get_event_loop()
    res = loop.run_until_complete(
        create_admin(
            {
                "username": username,
                "email": email,
                "password": password,
                "password_confirmation": password_confirm,
            }
        )
    )
    print(f"\n\n\n{res}\n\n\n")
