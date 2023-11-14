from typing import Annotated

from fastapi import APIRouter, UploadFile, File, Form

from .schemas import (ProjectSchema,
                      ProjectTagSchema,
                      ProjectReturnSchema,
                      ProjectFilterTypeSchema,
                      ProjectFilterTypesSchema,
                      ProjectTagReturnSchema)
from .services import ProjectService, ProjectTagService, ProjectFilterTypeService
from .dependencies import pagination_params
from .utils import json_response_with_error

from src.core.utils.dependencies import uowDEP

router = APIRouter(
    prefix='/projects'
)


@router.post('/create_filter_type/', response_model=ProjectFilterTypeSchema)
async def create_filter_type(
        uow: uowDEP,
        data: ProjectFilterTypeSchema
):
    return_data, error = await ProjectFilterTypeService(uow).create_type(data)
    if error is not None:
        return json_response_with_error(error)
    return return_data['result']


@router.get('/filter_types/', response_model=list[ProjectFilterTypeSchema])
async def get_filter_types(uow: uowDEP):
    return await ProjectFilterTypeService(uow).get_filter_types()


@router.post('/create_tag/', response_model=ProjectTagSchema)
async def create_tag(
        uow: uowDEP,
        name: Annotated[str, Form(...)],
        image_file: UploadFile = File(...)
):
    return_data, error = await ProjectTagService(uow).create_tag(name, image_file)
    if error is not None:
        return json_response_with_error(error)
    return return_data['result']


@router.get('/tags/', response_model=list[ProjectTagReturnSchema])
async def get_all_tags(uow: uowDEP):
    return await ProjectTagService(uow).get_all_tags()


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
    result_data, error = await ProjectService(uow).create_project(data, preview_image)
    if error is not None:
        return json_response_with_error(error)
    return result_data['result']


@router.get('/all/', response_model=list[ProjectReturnSchema])
async def get_all_projects(
        uow: uowDEP,
        pag_params: pagination_params
):
    result_data, error = await ProjectService(uow).get_projects(
        pagination_data=pag_params.params_dict
    )
    if error is not None:
        return json_response_with_error(error)
    return result_data['result']


@router.post('/filter_by_filter_types/', response_model=list[ProjectReturnSchema])
async def filter_projects_by_filter_type(
        uow: uowDEP,
        data: ProjectFilterTypesSchema,
        pag_params: pagination_params
):
    return_data, error = await ProjectService(uow).get_projects_by_filter_types(
        data.filter_types,
        pagination_data=pag_params.params_dict
    )
    if error is not None:
        return json_response_with_error(error)
    return return_data['result']
