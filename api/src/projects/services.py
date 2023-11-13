from typing import NamedTuple, Optional

from src.core.utils.service import BaseService
from src.core.utils.media_files import (get_media_file_link,
                                        save_media_file)

from .schemas import (ProjectSchema,
                      ProjectTagSchema,
                      ProjectReturnSchema,
                      ProjectFilterTypeSchema)
from .models import Project


class ProjectData(NamedTuple):
    data: Optional[dict] = None
    error: Optional[str] = None


class ProjectFilterTypeService(BaseService):

    async def create_type(
            self,
            data: ProjectFilterTypeSchema
    ):
        async with self.uow:
            type_id = await self.uow.project_types.insert_by_data(dict(data))
            await self.uow.commit()
            type_instance = await self.uow.project_types.get_one_by_id(type_id)
            return ProjectFilterTypeSchema(
                name=type_instance.name
            )


class ProjectTagService(BaseService):

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
            await self.uow.commit()
            return tag_id

    async def get_tag_by_id(self, tag_id: int):
        async with self.uow:
            tag = await self.uow.project_tags.get_one_by_id(tag_id)
            await self.uow.expunge(instance=tag)
            return tag

    async def get_tags_lst_by_ids(self, ids: list):
        tags_lst = []
        for tag_id in ids:
            tag = await self.get_tag_by_id(tag_id)
            if tag is None:
                return ProjectData(error='Provided ids are wrong!')
            tags_lst.append(tag)
        return ProjectData(data={
            'tags': tags_lst
        })


class ProjectService(ProjectTagService):

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
        tags, error = await self.get_tags_lst_by_ids(data.tags)
        if error is not None:
            return ProjectData(error=error)
        tags = tags['tags']

        await save_media_file(image_file)
        async with self.uow:
            project = await self.uow.projects.create_instance_by_data(dict(data))
            project.tags = tags
            project.preview_image = await get_media_file_link(image_file.filename)
            await self.uow.add(project)
            await self.uow.commit()
            return ProjectReturnSchema(
                name=project.name,
                filter_type_id=project.filter_type_id,
                source_link=project.source_link,
                tags=project.tags,
                text=project.text
            )

    @staticmethod
    async def data_by_fetched_projects(
            projects
    ):
        data_lst = []

        for project in projects:
            project = project[0]
            data_lst.append(
                ProjectReturnSchema(
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
            )
        return data_lst

    @staticmethod
    async def get_pagination_data_for_stmt(pagination_data: dict):
        page = pagination_data.get('page')
        size = pagination_data.get('size')

        offset = page * size
        return {
            'offset': offset,
            'limit': size
        }

    async def get_projects(
            self,
            pagination_data: dict
    ) -> list[ProjectSchema]:
        async with self.uow:
            projects = await self.uow.projects.get_all(
                with_pagination=True,
                pagination_data=await self.get_pagination_data_for_stmt(pagination_data)
            )

            return await self.data_by_fetched_projects(projects)

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
                pagination_data=pagination_data
            )
            return await self.data_by_fetched_projects(projects)
