from fastapi import APIRouter

from ..core.utils.dependencies import uowDEP
from ..core.utils.enums import InstanceTypes
from ..core.utils.service_utils import json_response_with_400_error
from ..core.schemas import InstancesIDSListSchema

from .dependencies import project_req_create_data, project_req_update_data
from .schemas import *
from .services import (
    ProjectServicesService,
    ProjectBudgetService,
    ProjectRefSourceService,
    ProjectRequestService,
)

router = APIRouter(prefix="/project_requests", tags=["Project Requests"])


@router.post("/create_service/", response_model=ProjectServiceReturnSchema)
async def create_service(uow: uowDEP, data: ProjectServiceSchema):
    return_data = await ProjectServicesService(uow).create_by_data_dict(dict(data))
    return return_data.result


@router.patch(
    "/update_service/{service_id}/", response_model=ProjectServiceReturnSchema
)
async def update_service(uow: uowDEP, service_id: int, data: ProjectServiceSchema):
    return_data = await ProjectServicesService(uow).update_by_data_dict(
        service_id, InstanceTypes.project_service, dict(data)
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.delete("/delete_services/", response_model=bool)
async def delete_services_by_ids(uow: uowDEP, data: InstancesIDSListSchema):
    return_data = await ProjectServicesService(uow).delete_by_ids_list(data.ids)
    return return_data.result


@router.delete("/delete_service/{service_id}/", response_model=bool)
async def delete_service(uow: uowDEP, service_id: int):
    return_data = await ProjectServicesService(uow).delete_by_id(service_id)
    return return_data.result


@router.get("/service/{service_id}/", response_model=ProjectServiceReturnSchema)
async def get_service_by_id(uow: uowDEP, service_id: int):
    return_data = await ProjectServicesService(uow).get_by_id(
        service_id, InstanceTypes.project_service
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.get("/all_services/", response_model=list[ProjectServiceReturnSchema])
async def get_all_services(uow: uowDEP):
    return_data = await ProjectServicesService(uow).get_all_instances()
    return return_data.result


@router.get("/services_for_user/", response_model=list[ProjectServiceReturnSchema])
async def services_for_user(uow: uowDEP):
    return_data = await ProjectServicesService(uow).get_filtered_services()
    return return_data.result


@router.post("/create_budget/", response_model=ProjectBudgetReturnSchema)
async def create_budget(uow: uowDEP, data: ProjectBudgetSchema):
    return_data = await ProjectBudgetService(uow).create_by_data_dict(dict(data))
    return return_data.result


@router.patch("/update_budget/{budget_id}/", response_model=ProjectBudgetReturnSchema)
async def update_budget(uow: uowDEP, budget_id: int, data: ProjectBudgetSchema):
    return_data = await ProjectBudgetService(uow).update_by_data_dict(
        budget_id, InstanceTypes.project_budget, dict(data)
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.delete("/delete_budgets/", response_model=bool)
async def delete_budgets(uow: uowDEP, data: InstancesIDSListSchema):
    return_data = await ProjectBudgetService(uow).delete_by_ids_list(data.ids)
    return return_data.result


@router.delete("/delet_budget/{budget_id}/", response_model=bool)
async def delete_budget(uow: uowDEP, budget_id: int):
    return_data = await ProjectBudgetService(uow).delete_by_id(budget_id)
    return return_data.result


@router.get("/budget/{budget_id}/", response_model=ProjectBudgetReturnSchema)
async def get_budget_by_id(uow: uowDEP, budget_id: int):
    return_data = await ProjectBudgetService(uow).get_by_id(
        budget_id, InstanceTypes.project_budget
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.get("/all_budgets/", response_model=list[ProjectBudgetReturnSchema])
async def get_all_budgets(uow: uowDEP):
    return_data = await ProjectBudgetService(uow).get_all_instances()
    return return_data.result


@router.get("/budgets_for_users/", response_model=list[ProjectBudgetReturnSchema])
async def get_filtered_budgets(uow: uowDEP):
    return_data = await ProjectBudgetService(uow).get_filtered_budgets()
    return return_data.result


@router.post("/create_ref_source/", response_model=ProjectRefSourceReturnSchema)
async def create_ref_source(uow: uowDEP, data: ProjectRefSourceSchema):
    return_data = await ProjectRefSourceService(uow).create_by_data_dict(dict(data))
    return return_data.result


@router.patch(
    "/update_ref_source/{source_id}/", response_model=ProjectRefSourceReturnSchema
)
async def update_ref_source(uow: uowDEP, source_id: int, data: ProjectRefSourceSchema):
    return_data = await ProjectRefSourceService(uow).update_by_data_dict(
        source_id, InstanceTypes.project_ref_source, dict(data)
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.delete("/delete_ref_source/{source_id}/", response_model=bool)
async def delete_ref_source(uow: uowDEP, source_id: int):
    return_data = await ProjectRefSourceService(uow).delete_by_id(source_id)
    return return_data.result


@router.delete("/delete_ref_sources/", response_model=bool)
async def delete_ref_sources(uow: uowDEP, data: InstancesIDSListSchema):
    return_data = await ProjectRefSourceService(uow).delete_by_ids_list(data.ids)
    return return_data.result


@router.get("/ref_source/{source_id}/", response_model=ProjectRefSourceReturnSchema)
async def get_ref_source(uow: uowDEP, source_id: int):
    return_data = await ProjectRefSourceService(uow).get_by_id(
        source_id, InstanceTypes.project_ref_source
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.get("/ref_sources/", response_model=list[ProjectRefSourceReturnSchema])
async def get_all_ref_sources(uow: uowDEP):
    return_data = await ProjectRefSourceService(uow).get_all_instances()
    return return_data.result


@router.get(
    "/ref_sources_for_users/", response_model=list[ProjectRefSourceReturnSchema]
)
async def ref_sources_for_users(uow: uowDEP):
    return_data = await ProjectRefSourceService(uow).get_filtered_ref_sources()
    return return_data.result


@router.post("/create/", response_model=ProjectRequestReturnSchema)
async def create_project_request(uow: uowDEP, create_data: project_req_create_data):
    return_data = await ProjectRequestService(uow).create_project_request(create_data)
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.patch("/update/{request_id}/", response_model=ProjectRequestReturnSchema)
async def update_project_request(
    uow: uowDEP, update_data: project_req_update_data, request_id: int
):
    return_data = await ProjectRequestService(uow).update_project_request(
        request_id, update_data
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.patch(
    "/add_project_request_services/{request_id}/",
    response_model=ProjectRequestReturnSchema,
)
async def add_project_request_services(
    uow: uowDEP, data: ProjectRequestServicesUpdateSchema, request_id: int
):
    return_data = await ProjectRequestService(uow).add_project_request_services(
        request_id, data
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.patch(
    "/remove_project_request_services/{request_id}/",
    response_model=ProjectRequestReturnSchema,
)
async def remove_project_request_services(
    uow: uowDEP, data: ProjectRequestServicesUpdateSchema, request_id: int
):
    return_data = await ProjectRequestService(uow).remove_project_request_services(
        request_id, data
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.get("/", response_model=list[ProjectRequestReturnSchema])
async def get_all_project_requests(uow: uowDEP):
    return_data = await ProjectRequestService(uow).get_all_instances()
    return return_data.result


@router.get("/{request_id}/", response_model=ProjectRequestReturnSchema)
async def get_project_request(uow: uowDEP, request_id: int):
    return_data = await ProjectRequestService(uow).get_by_id(
        request_id, InstanceTypes.project_request
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.delete("/delete_by_ids/", response_model=bool)
async def delete_project_requests(uow: uowDEP, data: InstancesIDSListSchema):
    return_data = await ProjectRequestService(uow).delete_by_ids_list(data.ids)
    return return_data.result


@router.delete("/{request_id}/", response_model=bool)
async def delete_project_request(uow: uowDEP, request_id: int):
    return_data = await ProjectRequestService(uow).delete_by_id(request_id)
    return return_data.result
