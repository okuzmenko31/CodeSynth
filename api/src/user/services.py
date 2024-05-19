import logging

from sqlalchemy.exc import SQLAlchemyError

from ..service.base import BaseService
from ..utils.exceptions.user.exceptions import UserAlreadyExistsException
from .schemas import UserCreate, UserShow

log = logging.getLogger(__name__)


class UserService(BaseService):
    async def create_user(self, data: UserCreate) -> UserShow | None:
        try:
            async with self.uow:
                if await self.uow.user.check_user_exists(
                    username=data.username,
                    email=data.email,
                ):
                    raise UserAlreadyExistsException
                user = await self.uow.user.create_user(data=data)
                await self.uow.commit()
                return UserShow(
                    username=user.username,
                    email=user.email,
                    active=user.is_active,
                )
        except SQLAlchemyError as e:
            log.exception(e)
