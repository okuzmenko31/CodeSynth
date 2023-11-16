from src.core.utils.service import BaseService
from src.core.utils.media_files import (get_media_file_link,
                                        save_media_file)

from .schemas import (ProjectSchema,
                      ProjectTagSchema,
                      ProjectReturnSchema,
                      ProjectFilterTypeSchema,
                      ProjectTagReturnSchema,
                      ProjectUpdateSchema, ProjectTagsUpdateSchema)
from .models import Project, ProjectTag

from src.core.utils.decorators import handle_errors
from src.core.utils.dataclasses import ReturnData


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
            return ProjectFilterTypeSchema(
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

                types_lst.append(ProjectFilterTypeSchema(
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
            filter_type_id = await self.uow.project_types.update_by_id(
                instance_id,
                dict(data)
            )
            await self.uow.commit()
            filter_type = await self.uow.project_types.get_one_by_id(filter_type_id)
            return ProjectFilterTypeSchema(
                name=filter_type.name
            )

    @handle_errors
    async def delete_filter_type(
            self,
            instance_id: int
    ):
        async with self.uow:
            await self.uow.project_types.delete_by_id(instance_id)
            await self.uow.commit()
            return True


class ProjectTagService(BaseService):

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
            return ProjectTagSchema(name=tag.name, img=tag.img)

    async def get_tag_by_id(self, tag_id: int):
        async with self.uow:
            tag = await self.uow.project_tags.get_one_by_id(tag_id)
            if tag is None:
                return None
            await self.uow.expunge(instance=tag)
            return tag

    async def get_tags_lst_by_ids(self, ids: list):
        tags_lst = []
        for tag_id in ids:
            tag = await self.get_tag_by_id(tag_id)
            if tag is None:
                return ReturnData(error='Provided ids are wrong!')
            tags_lst.append(tag)
        return ReturnData(result=tags_lst)

    async def get_all_tags(self) -> list[ProjectTagReturnSchema]:
        tags_lst = []

        async with self.uow:
            tags = await self.uow.project_tags.get_all()
            for tag in tags:
                tag = tag[0]
                tags_lst.append(ProjectTagReturnSchema(
                    id=tag.id,
                    name=tag.name,
                    img=tag.img
                ))
            return tags_lst

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
            tag_id = await self.uow.project_tags.update_by_id(
                instance_id,
                update_data
            )
            await self.uow.commit()
            tag = await self.uow.project_tags.get_one_by_id(tag_id)
            return ProjectTagSchema(name=tag.name, img=tag.img)

    @handle_errors
    async def delete_tag(
            self,
            instance_id
    ):
        async with self.uow:
            await self.uow.project_tags.delete_by_id(instance_id)
            await self.uow.commit()
            return True


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
                ProjectTagSchema(name=tag.name, img=tag.img) for tag in project.tags
            ],
            text=project.text
        )

    async def get_project_by_id(
            self,
            project_id
    ):
        async with self.uow:
            project = await self.uow.projects.get_one_by_id(project_id)
            await self.uow.expunge(instance=project)
            return project

    async def create_project(
            self,
            data: ProjectSchema,
            image_file
    ):
        tags_return_data = await self.get_tags_lst_by_ids(data.tags)
        if tags_return_data.error is not None:
            return ReturnData(error=tags_return_data.error)

        await save_media_file(image_file)
        async with self.uow:
            project = await self.uow.projects.create_instance_by_data(dict(data))
            project.tags = tags_return_data.result
            project.preview_image = await get_media_file_link(image_file.filename)
            await self.uow.add(project)
            await self.uow.commit()
            print(project.filter_type)
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
            project_id = await self.uow.projects.update_by_id(instance_id, dict(data))
            await self.uow.commit()
            project = await self.uow.projects.get_one_by_id(project_id)
            return await self.get_project_return_schema(project)

    @handle_errors
    async def add_project_tags(
            self,
            instance_id,
            data: ProjectTagsUpdateSchema
    ):
        tags_return_data = await self.get_tags_lst_by_ids(data.tags)
        if tags_return_data.error is not None:
            return ReturnData(error=tags_return_data.error)

        async with self.uow:
            project: Project = await self.uow.projects.get_one_by_id(instance_id)
            for tag in tags_return_data.result:
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
        tags_return_data = await self.get_tags_lst_by_ids(data.tags)
        if tags_return_data.error is not None:
            return ReturnData(error=tags_return_data.error)

        async with self.uow:
            project: Project = await self.uow.projects.get_one_by_id(instance_id)

            for tag in tags_return_data.result:
                if tag not in project.tags:
                    return ReturnData(
                        error=f'This tag doesn\'t exists in project tags list!'  # noqa
                    )
                project.tags.remove(tag)
            await self.uow.commit()
            return ReturnData(
                result=True
            )
