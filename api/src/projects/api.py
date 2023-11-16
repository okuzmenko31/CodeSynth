from typing import Annotated, Optional

from fastapi import APIRouter, UploadFile, File, Form, status
from fastapi.responses import JSONResponse

from .schemas import (ProjectSchema,
                      ProjectTagSchema,
                      ProjectReturnSchema,
                      ProjectFilterTypeSchema,
                      ProjectFilterTypesSchema,
                      ProjectTagReturnSchema,
                      ProjectUpdateSchema)
from .services import ProjectService, ProjectTagService, ProjectFilterTypeService
from .dependencies import pagination_params, project_update_data

from src.core.utils.dependencies import uowDEP

router = APIRouter(
    prefix='/projects',
    tags=['Projects']
)


@router.post('/create_filter_type/', response_model=ProjectFilterTypeSchema)
async def create_filter_type(
        uow: uowDEP,
        data: ProjectFilterTypeSchema
):
    return_data = await ProjectFilterTypeService(uow).create_type(data)
    return return_data.result


@router.patch('/update_filter_type/{instance_id}', response_model=ProjectFilterTypeSchema)
async def update_filter_type(
        uow: uowDEP,
        data: ProjectFilterTypeSchema,
        instance_id: int
):
    return_data = await ProjectFilterTypeService(uow).update_filter_type(
        instance_id,
        data
    )
    return return_data.result


@router.delete('/delete_filter_type/{instance_id}', response_model=bool)
async def delete_filter_type(
        uow: uowDEP,
        instance_id: int
):
    return_data = await ProjectFilterTypeService(uow).delete_filter_type(instance_id)
    return return_data.result


@router.get('/filter_types/', response_model=list[ProjectFilterTypeSchema])
async def get_filter_types(uow: uowDEP):
    return await ProjectFilterTypeService(uow).get_filter_types()


@router.post('/create_tag/', response_model=ProjectTagSchema)
async def create_tag(
        uow: uowDEP,
        name: Annotated[str, Form(...)],
        image_file: UploadFile = File(...)
):
    return_data = await ProjectTagService(uow).create_tag(name, image_file)
    return return_data.result


@router.patch('/update_tag/{tag_id}/', response_model=ProjectTagSchema)
async def update_tag(
        uow: uowDEP,
        tag_id: int,
        name: Optional[str] = Form(None),
        image_file: UploadFile = File(None)
):
    if name is None and image_file is None:
        return JSONResponse(content={
            'error': (
                'To update this tag, you have to provide'
                ' new value at least for one of fields.'
            )
        }, status_code=status.HTTP_400_BAD_REQUEST)

    return_data = await ProjectTagService(uow).update_tag(
        tag_id,
        name,
        image_file
    )
    return return_data.result


@router.delete('/delete_tag/{tag_id}/', response_model=bool)
async def delete_tag(
        uow: uowDEP,
        tag_id: int
):
    return_data = await ProjectTagService(uow).delete_tag(tag_id)
    return return_data.result


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
        preview_image: UploadFile = File(...)
):
    data = ProjectSchema(
        name=name,
        filter_type_id=filter_type_id,
        source_link=source_link,
        tags=tags,
        text=text
    )
    project_data = await ProjectService(uow).create_project(data, preview_image)

    if project_data.error is not None:
        return JSONResponse(content={
            'error': project_data.error
        })
    return project_data.result


@router.patch('/update/{project_id}/')
async def update_project(
        uow: uowDEP,
        instance_id: int,
        project_data: project_update_data
):
    data = ProjectUpdateSchema(
        name=project_data.name,
        filter_type_id=project_data.filter_type_id,
        source_link=project_data.source_link,
        text=project_data.text
    )
    return_data = await ProjectService(uow).update_project(
        instance_id,
        data,
        project_data.preview_image
    )
    return return_data.result


@router.get('/all/', response_model=list[ProjectReturnSchema])
async def get_all_projects(
        uow: uowDEP,
        pag_params: pagination_params
):
    return_data = await ProjectService(uow).get_projects(pagination_data=pag_params.params_dict)
    return return_data.result


@router.post('/filter_by_filter_types/', response_model=list[ProjectReturnSchema])
async def filter_projects_by_filter_type(
        uow: uowDEP,
        data: ProjectFilterTypesSchema,
        pag_params: pagination_params
):
    return_data = await ProjectService(uow).get_projects_by_filter_types(
        data.filter_types,
        pagination_data=pag_params.params_dict
    )
    return return_data.result
