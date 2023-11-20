from typing import Union

from src.core.repositories.repos import *
from .dataclasses import ReturnData
from .enums import InstanceTypes
from .repository import SQLAlchemyRepository, AbstractSchemaRepository

from .decorators import handle_errors
from .dependencies import uowDEP
from .service_utils import return_data_err_object_does_not_exist


class BaseService:
    repository: Union[SQLAlchemyRepository, AbstractSchemaRepository] = None

    def __init__(self, uow: uowDEP):
        self.uow = uow

    def repos_uow_dict(self) -> dict:
        return {
            ProjectRepository: self.uow.projects,
            ProjectTagRepository: self.uow.project_tags,
            ProjectFilterTypeRepository: self.uow.project_types
        }

    @property
    def uow_repo(
            self
    ) -> (
            ProjectRepository |
            ProjectTagRepository |
            ProjectFilterTypeRepository
    ):
        uow_repos_dict = self.repos_uow_dict()
        return uow_repos_dict.get(self.repository)

    @staticmethod
    async def get_pagination_data_dict(pagination_data):
        page = pagination_data.get('page')
        limit = pagination_data.get('limit')

        if page is not None and limit is not None:
            offset = page * limit
            return {
                'offset': offset,
                'limit': limit
            }
        raise ValueError('For pagination you must provide "page" and "limit"')

    async def get_schemas_lst_by_sequence(self, sequence):
        schemas_lst = []

        for instance in sequence:
            instance = instance[0]
            schemas_lst.append(
                await self.repository.get_return_schema(instance)
            )
        return schemas_lst

    @handle_errors
    async def delete_by_id(self, instance_id):
        async with self.uow:
            await self.uow_repo.delete_by_id(instance_id)
            await self.uow.commit()
            return True

    @handle_errors
    async def get_by_id(
            self,
            instance_id,
            instance_type: InstanceTypes
    ):
        async with self.uow:
            instance = await self.uow_repo.get_one_by_id(instance_id)
            if instance is None:
                return await return_data_err_object_does_not_exist(instance_type.value)
            return ReturnData(
                result=await self.repository.get_return_schema(instance)
            )

    @handle_errors
    async def get_all_instances(
            self,
            with_pagination=False,
            pagination_data: dict = None
    ):
        if pagination_data is not None:
            pagination_data = await self.get_pagination_data_dict(pagination_data)
        async with self.uow:
            instances = await self.uow_repo.get_all(with_pagination, pagination_data)
            return await self.get_schemas_lst_by_sequence(instances)
