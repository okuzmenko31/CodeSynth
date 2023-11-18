from src.core.utils.service import BaseService
from src.core.utils.media_files import (get_media_file_link,
                                        save_media_file)

from .schemas import *
from .models import Project, ProjectAssociation

from src.core.utils.decorators import handle_errors
from src.core.utils.dataclasses import ReturnData
from src.core.utils.service_utils import return_data_err_object_does_not_exist


class ProjectFilterTypeService(BaseService):

    @handle_errors
    async def create_type(
            self,
            data: ProjectFilterTypeSchema
    ):
        async with self.uow:
            type_id = await self.uow.project_types.insert_by_data(dict(data))
            type_instance = await self.uow.project_types.get_one_by_id(type_id)
            await self.uow.commit()
            return ProjectFilterTypeReturnSchema(
                id=type_instance.id,
                name=type_instance.name
            )

    async def get_filter_types(
            self
    ) -> list[ProjectFilterTypeSchema]:
        types_lst = []
        async with self.uow:
            types = await self.uow.project_types.get_all()

            for filter_type in types:
                filter_type = filter_type[0]

                types_lst.append(ProjectFilterTypeReturnSchema(
                    id=filter_type.id,
                    name=filter_type.name
                ))
            return types_lst

    @handle_errors
    async def update_filter_type(
            self,
            instance_id: int,
            data: ProjectFilterTypeSchema
    ):
        async with self.uow:
            filter_type = await self.uow.project_types.get_one_by_id(instance_id)
            if filter_type is None:
                return await return_data_err_object_does_not_exist('filter type')
            await self.uow.project_types.update_by_id(
                instance_id,
                dict(data)
            )
            await self.uow.commit()
            return ReturnData(result=ProjectFilterTypeReturnSchema(
                id=filter_type.id,
                name=filter_type.name
            ))

    @handle_errors
    async def delete_filter_type(
            self,
            instance_id: int
    ):
        async with self.uow:
            await self.uow.project_types.delete_by_id(instance_id)
            await self.uow.commit()
            return True

    @handle_errors
    async def get_filter_type_by_id(
            self,
            instance_id
    ):
        async with self.uow:
            filter_type = await self.uow.project_types.get_one_by_id(instance_id)
            if filter_type is None:
                return await return_data_err_object_does_not_exist('filter type')
            return ReturnData(result=ProjectFilterTypeReturnSchema(
                id=filter_type.id,
                name=filter_type.name
            ))


class ProjectTagService(BaseService):

    @staticmethod
    async def tags_schemas_lst_by_sequence(
            tags_seq
    ) -> list[ProjectTagReturnSchema]:
        tags_lst = []
        for tag in tags_seq:
            tag = tag[0]
            tags_lst.append(ProjectTagReturnSchema(
                id=tag.id,
                name=tag.name,
                img=tag.img
            ))
        return tags_lst

    @handle_errors
    async def create_tag(
            self,
            tag_name,
            image_file
    ):
        await save_media_file(image_file)
        async with self.uow:
            tag_id = await self.uow.project_tags.insert_by_data({
                'name': tag_name,
                'img': await get_media_file_link(image_file.filename)
            })
            tag = await self.uow.project_tags.get_one_by_id(tag_id)
            await self.uow.commit()
            return ProjectTagReturnSchema(id=tag.id, name=tag.name, img=tag.img)

    @handle_errors
    async def get_tag_by_id(self, instance_id):
        async with self.uow:
            tag = await self.uow.project_tags.get_one_by_id(instance_id)

            if tag is None:
                return await return_data_err_object_does_not_exist('tag')
            return ReturnData(result=ProjectTagReturnSchema(
                id=tag.id,
                name=tag.name,
                img=tag.img
            ))

    async def get_tags_lst_by_ids(self, ids: list):
        tags_lst = [
            tag[0] for tag in await self.uow.project_tags.filter_by_ids_list(ids)
        ]
        return tags_lst

    async def get_all_tags(self) -> list[ProjectTagReturnSchema]:
        async with self.uow:
            tags = await self.uow.project_tags.get_all()
            return await self.tags_schemas_lst_by_sequence(tags)

    @handle_errors
    async def update_tag(
            self,
            instance_id,
            tag_name: str = None,
            image_file=None
    ):
        update_data = {
            'name': tag_name
        }
        if image_file is not None:
            await save_media_file(image_file)
            update_data['img'] = await get_media_file_link(image_file.filename)

        async with self.uow:
            tag = await self.uow.project_tags.get_one_by_id(instance_id)
            if tag is None:
                return await return_data_err_object_does_not_exist('tag')
            await self.uow.project_tags.update_by_id(
                instance_id,
                update_data
            )
            await self.uow.commit()
            return ReturnData(result=ProjectTagReturnSchema(
                id=tag.id, name=tag.name, img=tag.img
            ))

    @handle_errors
    async def delete_tag(
            self,
            instance_id
    ):
        async with self.uow:
            await self.uow.project_tags.delete_by_id(instance_id)
            await self.uow.commit()
            return True

    @handle_errors
    async def get_available_project_tags(
            self,
            project_id
    ):
        async with self.uow:
            tags = await self.uow.project_tags.filter_by_field_not_in_subquery(
                subquery_select_entity=ProjectAssociation.project_tag_id,
                subquery_where_clause=[ProjectAssociation.project_id == project_id],
                not_in_model_field='id'
            )
            return await self.tags_schemas_lst_by_sequence(tags)


class ProjectService(ProjectTagService):

    @staticmethod
    async def get_project_return_schema(project: Project):
        return ProjectReturnSchema(
            id=project.id,
            name=project.name,
            filter_type_id=project.filter_type_id,
            filter_type=project.filter_type.name,
            preview_image=project.preview_image,
            source_link=project.source_link,
            tags=[
                ProjectTagReturnSchema(name=tag.name, img=tag.img, id=tag.id) for tag in project.tags
            ],
            text=project.text
        )

    async def create_project(
            self,
            data: ProjectSchema,
            image_file
    ):
        await save_media_file(image_file)
        async with self.uow:
            tags_lst = await self.get_tags_lst_by_ids(data.tags)
            project = await self.uow.projects.create_instance_by_data(dict(data))
            project.tags = tags_lst
            project.preview_image = await get_media_file_link(image_file.filename)
            await self.uow.add(project)
            await self.uow.commit()
            await self.uow.refresh(project, attribute_names=['filter_type'])
            return ReturnData(
                result=await self.get_project_return_schema(project)
            )

    async def data_by_fetched_projects(
            self,
            projects
    ):
        data_lst = []

        for project in projects:
            project = project[0]
            data_lst.append(
                await self.get_project_return_schema(project)
            )
        return data_lst

    @staticmethod
    async def get_pagination_data_for_stmt(pagination_data: dict):
        page = pagination_data.get('page')
        limit = pagination_data.get('limit')

        offset = page * limit
        return {
            'offset': offset,
            'limit': limit
        }

    @handle_errors
    async def get_projects(
            self,
            pagination_data: dict
    ):
        async with self.uow:
            projects = await self.uow.projects.get_all(
                with_pagination=True,
                pagination_data=await self.get_pagination_data_for_stmt(pagination_data)
            )
            return await self.data_by_fetched_projects(projects)

    @handle_errors
    async def get_projects_by_filter_types(
            self,
            filter_types_ids: list,
            pagination_data: dict
    ):
        async with self.uow:
            projects = await self.uow.projects.filter_by_ids_list(
                ids_list=filter_types_ids,
                model_id_field=Project.filter_type_id,
                with_pagination=True,
                pagination_data=await self.get_pagination_data_for_stmt(pagination_data)
            )
            return await self.data_by_fetched_projects(projects)

    @handle_errors
    async def update_project(
            self,
            instance_id,
            data: ProjectUpdateSchema,
            image_file=None
    ):
        if image_file is not None:
            await save_media_file(image_file)
            data.preview_image = await get_media_file_link(image_file.filename)

        async with self.uow:
            project = await self.uow.projects.get_one_by_id(instance_id)
            if project is None:
                return await return_data_err_object_does_not_exist('project')
            await self.uow.projects.update_by_id(project.id, dict(data))
            await self.uow.commit()
            return await self.get_project_return_schema(project)

    @staticmethod
    async def project_tags__not_found_update_error():
        return ReturnData(error='No such tags was found to update project tags list!')

    @handle_errors
    async def add_project_tags(
            self,
            instance_id,
            data: ProjectTagsUpdateSchema
    ):
        async with self.uow:
            tags_lst = await self.get_tags_lst_by_ids(data.tags)
            if len(tags_lst) < 1:
                return await self.project_tags__not_found_update_error()
            project: Project = await self.uow.projects.get_one_by_id(instance_id)
            if project is None:
                return await return_data_err_object_does_not_exist('project')

            for tag in tags_lst:
                if tag in project.tags:
                    return ReturnData(
                        error='This tag is already added to this project!'
                    )
                project.tags.append(tag)
            await self.uow.commit()
            return ReturnData(result=await self.get_project_return_schema(project))

    @handle_errors
    async def remove_project_tags(
            self,
            instance_id,
            data: ProjectTagsUpdateSchema
    ):
        async with self.uow:
            tags_lst = await self.get_tags_lst_by_ids(data.tags)
            if len(tags_lst) < 1:
                return await self.project_tags__not_found_update_error()
            project: Project = await self.uow.projects.get_one_by_id(instance_id)
            if project is None:
                return await return_data_err_object_does_not_exist('project')

            for tag in tags_lst:
                if tag not in project.tags:
                    return ReturnData(
                        error=f'One of the tags doesn\'t exists in project tags list!'  # noqa
                    )
                project.tags.remove(tag)
            await self.uow.commit()
            return ReturnData(
                result=True
            )

    @handle_errors
    async def delete_project(
            self,
            instance_id
    ):
        async with self.uow:
            await self.uow.projects.delete_by_id(instance_id)
            await self.uow.commit()
            return True

    @handle_errors
    async def get_project_by_id(
            self,
            instance_id
    ):
        async with self.uow:
            project = await self.uow.projects.get_one_by_id(instance_id)
            if project is None:
                return await return_data_err_object_does_not_exist('project')

            return ReturnData(
                result=await self.get_project_return_schema(project)
            )
