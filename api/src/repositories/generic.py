from uuid import UUID

from typing import TypeVar, Generic, Any

from pydantic import BaseModel

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, true, exists

from ..core.db.base import Base


Model = TypeVar("Model", bound=Base)
CreateSchema = TypeVar("CreateSchema", bound=BaseModel)
UpdateSchema = TypeVar("UpdateSchema", bound=BaseModel)


class GenericRepository(Generic[Model, CreateSchema, UpdateSchema]):
    def __init__(self, session: AsyncSession, model: type[Model]) -> None:
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

    async def get_by_attr(self, *, attr: Any, value: Any) -> Model | None:
        query = select(self.model).where(attr == value)
        res = await self.session.execute(query)
        return res.scalar_one_or_none()

    async def exists_by_id(
        self, *, id: UUID | int, is_active: bool = False
    ) -> bool:
        query = exists(self.model).where(self.model.id == id)
        if is_active and hasattr(self.model, "active"):
            query = query.where(self.model.active)
        res = await self.session.execute(query.select())
        return res.scalar_one()

    async def get_by_attr_active(
        self, *, attr: Any, value: Any
    ) -> Model | None:
        query = select(self.model).where(
            and_(
                attr == value,
                self.model.is_active == true(),
            )
        )
        res = await self.session.execute(query)
        return res.scalar_one_or_none()

    async def exists_of_ids_list(
        self, *, ids: list[UUID | int], is_active: bool = False
    ) -> bool:
        exists_ids_query = select(self.model.id).where(self.model.id.in_(ids))
        if is_active and hasattr(self.model, "active"):
            exists_ids_query = exists_ids_query.where(self.model.active)
        res = await self.session.execute(exists_ids_query)
        return res.scalars().all()

    async def get_all_with_ordering(
        self,
        *,
        order_by_fields: list,
        filters: list = None,
    ):
        query = select(self.model).order_by(*order_by_fields)
        if filters:
            query = query.filter(*filters)
        res = await self.session.execute(query)
        return res.scalars().all()
