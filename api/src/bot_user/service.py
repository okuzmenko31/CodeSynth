import logging

from ..service.base import BaseService

from .schemas import (
    BotUserCreate,
    BotUserUpdate,
    BotUserShow,
)


log = logging.getLogger(__name__)


class BotUserService(BaseService):
    async def create_or_update_bot_user(
        self, data: BotUserCreate | BotUserUpdate
    ) -> BotUserShow:
        async with self.uow:
            bot_user_id = await self.uow.bot_user.create_or_update(data)
            await self.uow.commit()
            bot_user = await self.uow.bot_user.get_by_id(id=bot_user_id)
            return BotUserShow(
                id=bot_user.id,
                user_id=bot_user.user_id,
                language=bot_user.language,
            )

    async def get_bot_user_by_user_id(self, user_id: int) -> BotUserShow:
        async with self.uow:
            bot_user = await self.uow.bot_user.get_by_user_id(user_id=user_id)
            return BotUserShow(
                id=bot_user.id,
                user_id=bot_user.user_id,
                language=bot_user.language,
            )
