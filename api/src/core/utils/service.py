from typing import Union

from ...core.repositories.repos import *

from .dataclasses import ReturnData
from .enums import InstanceTypes, ModelRelatedListOperations
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
            ProjectFilterTypeRepository: self.uow.project_types,
            ProjectServiceRepository: self.uow.project_services,
            ProjectBudgetRepository: self.uow.project_budgets,
            ProjectRequestRepository: self.uow.project_requests,
            RefSourceRepository: self.uow.project_ref_sources
        }

    @property
    def uow_repo(
            self
    ) -> (
            ProjectRepository |
            ProjectTagRepository |
            ProjectFilterTypeRepository |
            ProjectServiceRepository |
            ProjectBudgetRepository |
            ProjectRequestRepository |
            RefSourceRepository
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

    @handle_errors
    async def create_by_data_dict(
            self,
            data: dict
    ):
        async with self.uow:
            instance_id = await self.uow_repo.insert_by_data(data)
            await self.uow.commit()
            instance = await self.uow_repo.get_one_by_id(instance_id)
            return await self.uow_repo.get_return_schema(instance)

    @handle_errors
    async def update_by_data_dict(
            self,
            instance_id,
            instance_type: InstanceTypes,
            data: dict
    ):
        async with self.uow:
            instance = await self.uow_repo.get_one_by_id(instance_id)
            if instance is None:
                return await return_data_err_object_does_not_exist(instance_type.value)
            await self.uow_repo.update_by_data(instance_id, dict(data))
            await self.uow.commit()
            return await self.uow_repo.get_return_schema(instance)

    @handle_errors
    async def delete_by_ids_list(
            self,
            ids_list: list
    ):
        async with self.uow:
            await self.uow_repo.delete_by_ids(ids_list)
            await self.uow.commit()
            return True

    async def get_instances_list_by_ids(self, ids: list):
        return [
            instance[0] for instance in await self.uow_repo.filter_by_ids_list(ids)
        ]

    async def process_edit_related_objects(
            self,
            instance_id: int,
            instance_type: InstanceTypes,
            instance_related_attr_name: str,
            related_instance_type: InstanceTypes,
            operation: ModelRelatedListOperations,
            objects_list
    ):
        """
        This method make process of editing of related
        objects of instance, which will be found by
        'instance_id' and 'InstanceType'.

        'instance_related_attr_name' - this is the
        name of objects list related with our instance,
        and list of which we want to update.
        E.g. we have 'Project' instance and this instance
        have related with M2M relationship 'tags' list.
        We  can call them like that: 'project.tags'.
        So you will need to provide str name of
        this attribute - 'tags'.

        'related_instance_type' - needed for
        correct errors messages returning with
        correct names of the objects.

        'operation' - with related instances list
        in SQLAlchemy we can do 'append' or 'remove',
        so you need to provide one of the
        'ModelRelatedListOperations' operation type.
        E.g. 'ModelRelatedListOperations.append'.

        'objects_list' - list with related objects.
        E.g. for 'Project' instance you should provide
        here list with 'ProjectTag' instances.

        :param instance_id: instance id
        :param instance_type: type of instance
        :param instance_related_attr_name: related objects list attribute name
        :param related_instance_type: type of instances on related objects list
        :param operation: operation type - 'append' or 'remove'
        :param objects_list: list of instances for adding to related objects list
        :return:
        """
        rel_inst_type = related_instance_type.value
        inst_type = instance_type.value

        if len(objects_list) < 1:
            return ReturnData(
                error=f'No such {rel_inst_type}s was found to update {inst_type} {rel_inst_type}s list!'
            )

        instance = await self.uow_repo.get_one_by_id(instance_id)
        if instance is None:
            return await return_data_err_object_does_not_exist(inst_type)
        instance_rel_objects_lst = getattr(instance, instance_related_attr_name)
        for obj in objects_list:
            if operation == ModelRelatedListOperations.append:
                if obj in instance_rel_objects_lst:
                    return ReturnData(
                        error=f'This {rel_inst_type} is already'
                              f' added to this {inst_type}'
                    )
                instance_rel_objects_lst.append(obj)
                setattr(instance, instance_related_attr_name, instance_rel_objects_lst)
            else:
                if obj not in getattr(instance, instance_related_attr_name):
                    return ReturnData(
                        error=f'One of the {rel_inst_type}s '
                              f'doesn\'t exists in {inst_type} {rel_inst_type}s list!'  # noqa
                    )
                getattr(instance, instance_related_attr_name).remove(obj)
        await self.uow.commit()
        return ReturnData(result=await self.repository.get_return_schema(instance))
