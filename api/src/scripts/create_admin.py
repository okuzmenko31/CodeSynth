import asyncio
import argparse
import sys
import logging

from pydantic import ValidationError
from sqlalchemy.exc import SQLAlchemyError

from ..core.db.unitofwork import UnitOfWork
from ..user.schemas import AdminCreate
from ..user.services import UserService
from ..utils.exceptions.user.exceptions import UserAlreadyExistsException


log = logging.getLogger(__name__)


async def main(argv=sys.argv):
    global log

    description = "Script to create an admin user"

    parser = argparse.ArgumentParser(description=description)
    parser.add_argument(
        "--username",
        "-u",
        required=True,
        help="Username of the admin user",
    )
    parser.add_argument(
        "--email",
        "-e",
        required=True,
        help="Password of the admin user",
    )
    parser.add_argument(
        "--password",
        "-p",
        required=True,
        help="Password of the admin user",
    )

    args = parser.parse_args(argv[1:])

    try:
        data = AdminCreate(
            username=args.username,
            email=args.email,
            password=args.password,
        )
    except ValidationError as e:
        log.error(e)
        return

    try:
        user_data = await UserService(UnitOfWork()).create_user(data)
        if not user_data:
            parser.error("Failed to create user")
    except UserAlreadyExistsException as e:
        parser.error(e)
    except SQLAlchemyError as e:
        log.error(e)
        return

    print(f"Admin user created: {user_data.model_dump()}")


if __name__ == "__main__":
    asyncio.run(main())
