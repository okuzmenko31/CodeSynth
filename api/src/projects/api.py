from typing import Annotated

from fastapi import APIRouter, UploadFile, File, Form

from .schemas import (ProjectSchema,
                      ProjectTagSchema,
                      ProjectReturnSchema,
                      ProjectFilterTypeSchema)
from .services import ProjectService, ProjectTagService, ProjectFilterTypeService
from src.core.utils.dependencies import uowDEP

router = APIRouter(
    prefix='/projects'
)


@router.post('/create_filter_type/', response_model=ProjectFilterTypeSchema)
async def create_filter_type(
    uow: uowDEP,
    data: ProjectFilterTypeSchema
):
    return_data = await ProjectFilterTypeService(uow).create_type(data)
    return return_data


@router.post('/create_tag/', response_model=ProjectTagSchema)
async def create_tag(
        uow: uowDEP,
        name: Annotated[str, Form(...)],
        image_file: UploadFile = File(...)
):
    tag_id = await ProjectTagService(uow).create_tag(name, image_file)
    tag = await ProjectTagService(uow).get_tag_by_id(tag_id)
    return ProjectTagSchema(name=tag.name, img=tag.img)


@router.post('/create/', response_model=ProjectReturnSchema)
async def create_project(
        uow: uowDEP,
        name: Annotated[str, Form(...)],
        filter_type_id: Annotated[int, Form(...)],
        source_link: Annotated[str, Form(...)],
        tags: Annotated[list[int], Form(...)],
        text: Annotated[str, Form(...)],
        preview_image: UploadFile = File(...),

):
    data = ProjectSchema(
        name=name,
        filter_type_id=filter_type_id,
        source_link=source_link,
        tags=tags,
        text=text
    )
    return await ProjectService(uow).create_project(data, preview_image)


@router.get('/all/', response_model=list[ProjectReturnSchema])
async def get_all_projects(
        uow: uowDEP
):
    projects = await ProjectService(uow).get_projects()
    return projects
