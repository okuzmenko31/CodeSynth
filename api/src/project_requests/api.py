from fastapi import APIRouter

from src.core.utils.dependencies import uowDEP
from src.core.utils.enums import InstanceTypes
from src.core.utils.service_utils import json_response_with_400_error
from src.core.schemas import InstancesIDSListSchema

from .schemas import ProjectServiceReturnSchema, ProjectServiceSchema
from .services import ProjectAppService

router = APIRouter(
    prefix='/project_requests',
    tags=['Project Requests']
)


@router.post(
    '/create_service/',
    response_model=ProjectServiceReturnSchema
)
async def create_service(
        uow: uowDEP,
        data: ProjectServiceSchema
):
    return_data = await ProjectAppService(uow).create_by_data_dict(dict(data))
    return return_data.result


@router.patch('/update_service/{service_id}/', response_model=ProjectServiceReturnSchema)
async def update_service(
        uow: uowDEP,
        service_id: int,
        data: ProjectServiceSchema
):
    return_data = await ProjectAppService(uow).update_by_data_dict(
        service_id,
        InstanceTypes.project_service,
        dict(data)
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.delete('/delete_services/', response_model=bool)
async def delete_services_by_ids(
        uow: uowDEP,
        data: InstancesIDSListSchema
):
    return_data = await ProjectAppService(uow).delete_by_ids_list(data.ids)
    return return_data.result


@router.delete('/delete_service/{service_id}/', response_model=bool)
async def delete_service(uow: uowDEP, service_id: int):
    return_data = await ProjectAppService(uow).delete_by_id(service_id)
    return return_data.result


@router.get('/service/{service_id}/', response_model=ProjectServiceReturnSchema)
async def get_service_by_id(uow: uowDEP, service_id: int):
    return_data = await ProjectAppService(uow).get_by_id(
        service_id, InstanceTypes.project_service
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.get('/all_services/', response_model=list[ProjectServiceReturnSchema])
async def get_all_services(
        uow: uowDEP
):
    return_data = await ProjectAppService(uow).get_all_instances()
    return return_data.result
