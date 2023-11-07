from abc import ABC, abstractmethod
from enum import Enum

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert, exists, delete


class STMTOperations(str, Enum):
    select = 'select'
    exists = 'exists'
    delete = 'delete'
    insert = 'insert'


class AbstractRepository(ABC):
    model = None

    async def get_all(self):
        raise NotImplementedError()

    async def get_one_by_id(self, *args):
        raise NotImplementedError()

    async def get_one_by_data(self, *args):
        raise NotImplementedError()

    async def add_one_by_data(self, data: dict):
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
                getattr(self.model, k) for k, v in data.items()  # noqa
            )
            if operation_type == STMTOperations.exists:
                stmt = stmt.select()
            return stmt
        stmt = operation.values(
            getattr(self.model, k) for k, v in data.items()  # noqa
        ).returning(self.model.id)
        return stmt

    async def select_by_data(self, data: dict):
        stmt = await self.get_operation_stmt_by_data(
            data,
            STMTOperations.select
        )
        res = await self.session.execute(stmt)
        return res.all()

    async def get_one_by_data(self, data: dict):
        result = await self.select_by_data(data)
        if len(result) > 0:
            return result[0]
        return None

    async def create_by_data(self, data: dict) -> int:
        stmt = await self.get_operation_stmt_by_data(
            data,
            STMTOperations.insert
        )
        res = await self.session.execute(stmt)
        result = res.scalar()
        return result
