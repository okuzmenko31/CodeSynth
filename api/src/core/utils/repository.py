from abc import ABC, abstractmethod
from enum import Enum

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert, exists, delete, update


class STMTOperations(str, Enum):
    select = 'select'
    exists = 'exists'
    update = 'update'
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
            STMTOperations.insert: insert,
            STMTOperations.update: update
        }
        for op in operations.keys():
            if op == operation:
                return operations[operation](self.model)
        raise ValueError('This type of operation does not supported!')

    async def get_insert_or_update_stmt(
            self,
            operation,
            data: dict,
            operation_type: STMTOperations,
            **kwargs
    ):
        if operation_type == STMTOperations.insert:
            return operation.values(data).returning(self.model.id)
        if kwargs.get('update_instance_id') is None:
            raise ValueError(
                'If you are trying to update an object, you must provide instance id!'
            )
        return update(self.model).where(
            self.model.id == kwargs.get('update_instance_id')  # noqa
        ).values(data).returning(self.model.id)

    async def get_operation_stmt_by_data(
            self,
            data: dict,
            operation_type: STMTOperations,
            **kwargs
    ):
        operation = await self.get_operation(operation_type)
        insert_update_lst = [STMTOperations.insert, STMTOperations.update]

        if operation_type not in insert_update_lst:
            stmt = operation.where(
                *[getattr(self.model, k) == v for k, v in data.items()]  # noqa
            )
            if operation_type == STMTOperations.exists:
                stmt = stmt.select()
            return stmt
        stmt = await self.get_insert_or_update_stmt(
            operation=operation,
            data=data,
            operation_type=operation_type,
            **kwargs
        )
        return stmt

    @staticmethod
    async def paginate_statement(
            stmt,
            pagination_data: dict
    ):
        offset = pagination_data.get('offset')
        limit = pagination_data.get('limit')
        if offset is not None and limit is not None:
            return stmt.offset(offset).limit(limit)
        raise ValueError('Offset and limit must be provided!')

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
            model_id_field=None,
            with_pagination=False,
            pagination_data: dict = None
    ):
        filter_field = self.model.id
        if model_id_field is not None:
            filter_field = model_id_field
        stmt = select(self.model).where(filter_field.in_(ids_list))
        if with_pagination and pagination_data is not None:
            stmt = await self.paginate_statement(stmt, pagination_data)
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

    async def get_all(
            self,
            with_pagination=False,
            pagination_data: dict = None
    ):
        stmt = select(self.model)
        if with_pagination and pagination_data is not None:
            stmt = await self.paginate_statement(stmt, pagination_data)
        res = await self.session.execute(stmt)
        return res.fetchall()

    async def get_one_by_id(self, obj_id: int):
        return await self.get_one_by_data({'id': obj_id})

    @staticmethod
    async def get_cleaned_data(
            data: dict
    ):
        """
        This method returns data dict without
        keys with empty values.

        :param data: data dict
        :return: cleaned data dict
        """
        for key in data.keys():
            data = data.copy()
            if data[key] is None:
                del data[key]
        if len(data.items()) < 1:
            return None
        return data

    async def update_by_id(self, instance_id, data: dict):
        cleaned_data = await self.get_cleaned_data(data)
        if cleaned_data is None:
            return cleaned_data
        stmt = await self.get_operation_stmt_by_data(
            cleaned_data,
            STMTOperations.update,
            update_instance_id=instance_id
        )
        res = await self.session.execute(stmt)
        return res.scalar()

    async def delete_by_id(self, instance_id):
        stmt = await self.get_operation_stmt_by_data(
            data={'id': instance_id},
            operation_type=STMTOperations.delete
        )
        await self.session.execute(stmt)

    async def filter_by_field_not_in_subquery(
            self,
            subquery_select_entity,
            subquery_where_clause: list | tuple | set,
            not_in_model_field: str
    ):
        """
        Returns filtered by subquery sequence with
        instances of 'model'. Filters by 'not_in_model_field'.
        'not_in_model_field' can be self.model.id or
        else column field of model. Subquery can look
        like this:

        ProjectAssociation.project_tag_id - 'subquery_select_entity';
        [ProjectAssociation.project_id == project_id] - 'subquery_where_clause'

        subquery = select(ProjectAssociation.project_tag_id).where(
            *[ProjectAssociation.project_id == project_id]
        )

        :param subquery_select_entity: Model or model column field
        :param subquery_where_clause: list, tuple, or set with expression for where
        method of subquery
        :param not_in_model_field: string name of column field for filtering with 'notin_'
        :return: sequence with instances of 'model'
        """
        subquery = select(subquery_select_entity).where(
            *subquery_where_clause
        )
        stmt = select(self.model).where(
            getattr(self.model, not_in_model_field).notin_(subquery)
        )
        res = await self.session.execute(stmt)
        return res.fetchall()
