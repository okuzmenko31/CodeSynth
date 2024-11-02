from sqlalchemy import select, update, insert
from sqlalchemy.ext.asyncio import AsyncSession

from .generic import GenericRepository

from ..bot_user.models import BotUser
from ..bot_user.schemas import (
    BotUserCreate,
    BotUserUpdate,
)


class BotUserRepository(
    GenericRepository[BotUser, BotUserCreate, BotUserUpdate]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, BotUser)

    async def create_or_update(
        self, data: BotUserCreate | BotUserUpdate
    ) -> int:
        query = select(self.model).where(self.model.user_id == data.user_id)
        res = await self.session.execute(query)
        bot_user = res.scalar_one_or_none()

        data = data.model_dump(exclude_unset=True)

        if bot_user:
            stmt = (
                update(self.model)
                .where(self.model.id == bot_user.id)
                .values(**data)
                .returning(self.model.id)
            )
        else:
            stmt = insert(self.model).values(**data).returning(self.model.id)

        res = await self.session.execute(stmt)
        return res.scalar_one()

    async def get_by_user_id(self, user_id: int) -> BotUser:
        query = select(self.model).where(self.model.user_id == user_id)
        res = await self.session.execute(query)
        return res.scalar_one_or_none()
