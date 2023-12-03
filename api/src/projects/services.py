from src.core.utils.service import BaseService
from src.core.utils.media_files import (get_media_file_link,
                                        save_media_file)
from src.core.utils.enums import ModelRelatedListOperations, InstanceTypes

from .schemas import *
from .models import ProjectAssociation

from src.core.utils.decorators import handle_errors
from src.core.utils.dataclasses import ReturnData
from src.core.utils.service_utils import return_data_err_object_does_not_exist
from src.core.repositories.repos import *


class ProjectFilterTypeService(BaseService):
    repository = ProjectFilterTypeRepository

    @handle_errors
    async def create_type(
            self,
            data: ProjectFilterTypeSchema
    ) -> ProjectFilterTypeReturnSchema:
        async with self.uow:
            type_id = await self.uow_repo.insert_by_data(dict(data))
            type_instance = await self.uow_repo.get_one_by_id(type_id)
            await self.uow.commit()
            return await self.repository.get_return_schema(type_instance)

    @handle_errors
    async def update_filter_type(
            self,
            instance_id: int,
            data: ProjectFilterTypeSchema
    ) -> ReturnData:
        async with self.uow:
            filter_type = await self.uow_repo.get_one_by_id(instance_id)
            if filter_type is None:
                return await return_data_err_object_does_not_exist('filter type')
            await self.uow.project_types.update_by_data(
                instance_id,
                dict(data)
            )
            await self.uow.commit()
            return ReturnData(result=await self.repository.get_return_schema(filter_type))


class ProjectTagService(BaseService):
    repository = ProjectTagRepository

    @handle_errors
    async def create_tag(
            self,
            tag_name,
            image_file
    ) -> ProjectTagReturnSchema:
        hashed_filename = await save_media_file(image_file)
        async with self.uow:
            tag_id = await self.uow_repo.insert_by_data({
                'name': tag_name,
                'img': await get_media_file_link(hashed_filename)
            })
            tag = await self.uow_repo.get_one_by_id(tag_id)
            await self.uow.commit()
            return await self.repository.get_return_schema(tag)

    async def get_tags_lst_by_ids(self, ids: list) -> list:
        return await self.get_instances_list_by_ids(ids)

    @handle_errors
    async def update_tag(
            self,
            instance_id,
            tag_name: str = None,
            image_file=None
    ) -> ReturnData:
        update_data = {
            'name': tag_name
        }
        if image_file is not None:
            # if image file is provided, it will be saved
            # and added to 'update_data' dict
            hashed_filename = await save_media_file(image_file)
            update_data['img'] = await get_media_file_link(hashed_filename)

        async with self.uow:
            tag = await self.uow_repo.get_one_by_id(instance_id)
            if tag is None:
                return await return_data_err_object_does_not_exist('tag')
            await self.uow.project_tags.update_by_data(
                instance_id,
                update_data
            )
            await self.uow.commit()
            return ReturnData(result=await self.repository.get_return_schema(tag))

    @handle_errors
    async def get_available_project_tags(
            self,
            project_id
    ):
        async with self.uow:
            tags = await self.uow_repo.filter_by_field_not_in_subquery(
                subquery_select_entity=ProjectAssociation.project_tag_id,
                subquery_where_clause=[
                    ProjectAssociation.project_id == project_id],
                not_in_model_field='id'
            )
            return await self.get_schemas_lst_by_sequence(tags)


class ProjectService(ProjectTagService):
    repository = ProjectRepository

    async def create_project(
            self,
            data: ProjectSchema,
            image_file
    ):
        hashed_filename = await save_media_file(image_file)
        async with self.uow:
            tags_lst = await self.get_tags_lst_by_ids(data.tags)
            filter_type = await self.uow.project_types.get_one_by_id(data.filter_type_id)
            if filter_type is None:
                return ReturnData(error='Provided filter type does not exists!')

            project = await self.uow_repo.create_instance_by_data(dict(data))
            project.tags = tags_lst
            project.preview_image = await get_media_file_link(hashed_filename)
            await self.uow.add(project)
            await self.uow.commit()
            await self.uow.refresh(project, attribute_names=['filter_type'])
            return ReturnData(
                result=await self.repository.get_return_schema(project)
            )

    @handle_errors
    async def get_projects_by_filter_types(
            self,
            filter_types_ids: list,
            pagination_data: dict
    ):
        async with self.uow:
            projects = await self.uow_repo.filter_by_ids_list(
                ids_list=filter_types_ids,
                model_id_field=Project.filter_type_id,
                with_pagination=True,
                pagination_data=await self.get_pagination_data_dict(pagination_data)
            )
            return await self.get_schemas_lst_by_sequence(projects)

    @handle_errors
    async def update_project(
            self,
            instance_id,
            data: ProjectUpdateSchema,
            image_file=None
    ):
        if image_file is not None:
            hashed_filename = await save_media_file(image_file)
            data.preview_image = await get_media_file_link(hashed_filename)

        async with self.uow:
            project = await self.uow_repo.get_one_by_id(instance_id)
            if data.filter_type_id is not None:
                filter_type_exists = await self.uow.project_types.check_exists_by_data(
                    {'id': data.filter_type_id}
                )
                if not filter_type_exists:
                    return ReturnData(error='Provided filter type does not exists!')

            if project is None:
                return await return_data_err_object_does_not_exist('project')
            await self.uow_repo.update_by_data(project.id, dict(data))
            await self.uow.commit()
            return ReturnData(result=await self.repository.get_return_schema(project))

    async def edit_project_tags(
            self,
            instance_id,
            data: ProjectTagsUpdateSchema,
            project_tags_operation: ModelRelatedListOperations
    ):
        async with self.uow:
            tags_lst = await ProjectTagService(self.uow).get_tags_lst_by_ids(data.tags)
            return await self.process_edit_related_objects(
                instance_id,
                InstanceTypes.project,
                instance_related_attr_name='tags',
                related_instance_type=InstanceTypes.project_tag,
                operation=project_tags_operation,
                objects_list=tags_lst
            )

    @handle_errors
    async def add_project_tags(
            self,
            instance_id,
            data: ProjectTagsUpdateSchema
    ):
        return await self.edit_project_tags(instance_id, data, ModelRelatedListOperations.append)

    @handle_errors
    async def remove_project_tags(
            self,
            instance_id,
            data: ProjectTagsUpdateSchema
    ):
        return await self.edit_project_tags(instance_id, data, ModelRelatedListOperations.remove)
