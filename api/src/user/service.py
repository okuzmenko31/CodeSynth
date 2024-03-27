import logging

from sqlalchemy.exc import SQLAlchemyError

from ..service.base import BaseService
from .schemas import UserCreate, UserShow

log = logging.getLogger(__name__)


class UserService(BaseService):
    async def create_user(self, data: UserCreate) -> UserShow | None:
        try:
            async with self.uow:
                user = await self.uow.user.create_user(data=data)
                await self.uow.commit()
                return UserShow(
                    username=user.username,
                    email=user.email,
                    active=user.is_active,
                )
        except SQLAlchemyError as e:
            log.exception(e)
