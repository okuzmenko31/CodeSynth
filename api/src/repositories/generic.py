from uuid import UUID

from typing import TypeVar, Generic

from pydantic import BaseModel

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from ..core.db.base import Base


Model = TypeVar("Model", bound=Base)
SchemaType = TypeVar("SchemaType", bound=BaseModel)
CreateSchema = TypeVar("CreateSchema", bound=BaseModel)
UpdateSchema = TypeVar("UpdateSchema", bound=BaseModel)


class GenericRepository(Generic[Model, CreateSchema, UpdateSchema]):
    def __init__(self, model: type[Model], session: AsyncSession) -> None:
        self.model = model
        self.session = session

    async def get_by_id(self, *, id: UUID | int) -> Model | None:
        query = select(self.model).where(self.model.id == id)
        res = await self.session.execute(query)
        return res.scalar_one_or_none()

    async def get_by_ids(self, *, ids: list[UUID | int]) -> list[Model]:
        query = select(self.model).where(self.model.id.in_(ids))
        res = await self.session.execute(query)
        return res.scalars().all()

    async def get_count(self) -> int:
        query = select(func.count()).select_from(select(self.model).subquery())
        res = await self.session.execute(query)
        return res.scalar_one()
