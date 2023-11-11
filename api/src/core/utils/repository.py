from abc import ABC, abstractmethod
from enum import Enum

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert, exists, delete
from sqlalchemy.orm import joinedload


class STMTOperations(str, Enum):
    select = 'select'
    exists = 'exists'
    delete = 'delete'
    insert = 'insert'


class AbstractRepository(ABC):
    model = None

    @abstractmethod
    async def get_all(self):
        raise NotImplementedError()

    @abstractmethod
    async def get_one_by_id(self, *args):
        raise NotImplementedError()

    @abstractmethod
    async def get_one_by_data(self, *args):
        raise NotImplementedError()


class SQLAlchemyRepository(AbstractRepository):

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_operation(self, operation: STMTOperations):
        operations = {
            STMTOperations.select: select,
            STMTOperations.exists: exists,
            STMTOperations.delete: delete,
            STMTOperations.insert: insert
        }
        for op in operations.keys():
            if op == operation:
                return operations[operation](self.model)
        raise ValueError('This type of operation does not supported!')

    async def get_operation_stmt_by_data(
            self,
            data: dict,
            operation_type: STMTOperations
    ):
        operation = await self.get_operation(operation_type)

        if operation_type != STMTOperations.insert:
            stmt = operation.where(
                *[getattr(self.model, k) == v for k, v in data.items()]  # noqa
            )
            if operation_type == STMTOperations.exists:
                stmt = stmt.select()
            return stmt
        stmt = operation.values(data).returning(self.model.id)
        return stmt

    async def select_by_data(self, data: dict):
        stmt = await self.get_operation_stmt_by_data(
            data,
            STMTOperations.select
        )
        res = await self.session.execute(stmt)
        return res.fetchall()

    async def filter_by_ids_list(
            self,
            ids_list: list,
            model_id_field=None
    ):
        filter_field = self.model.id
        if model_id_field is not None:
            filter_field = model_id_field
        stmt = select(self.model).where(filter_field.in_(ids_list))
        res = await self.session.execute(stmt)
        return res.fetchall()

    async def get_one_by_data(self, data: dict):
        result = await self.select_by_data(data)
        if len(result) > 0:
            return result[0][0]
        return None

    async def insert_by_data(self, data: dict) -> int:
        stmt = await self.get_operation_stmt_by_data(
            data,
            STMTOperations.insert
        )
        res = await self.session.execute(stmt)
        result = res.scalar()
        return result

    async def create_instance_by_data(self, data: dict):
        return self.model(**data)

    async def check_exists_by_data(self, data: dict) -> bool:
        stmt = await self.get_operation_stmt_by_data(
            data,
            STMTOperations.exists
        )
        res = await self.session.execute(stmt)
        return res.scalar()

    async def get_all(self, with_join=False, join_clause: list = None):
        stmt = select(self.model)
        if with_join:
            stmt = stmt.join(*join_clause, isouter=True)
        res = await self.session.execute(stmt)
        return res.fetchall()

    async def get_one_by_id(self, obj_id: int):
        return await self.get_one_by_data({'id': obj_id})
