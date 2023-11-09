from typing import NamedTuple, Optional

from src.core.utils.service import BaseService
from src.core.utils.media_files import get_media_file_link, save_media_file

from .schemas import ProjectSchema


class ProjectData(NamedTuple):
    data: Optional[dict] = None
    error: Optional[str] = None


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
            return project
