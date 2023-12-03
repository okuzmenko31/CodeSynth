import json

from src.core.utils.service import BaseService
from src.core.utils.decorators import handle_errors
from src.core.repositories.repos import (ProjectBudgetRepository,
                                         ProjectServiceRepository,
                                         ProjectRequestRepository,
                                         RefSourceRepository)
from src.core.utils.dataclasses import ReturnData, ProjectRequestCreateData, ProjectRequestUpdateData
from src.core.utils.service_utils import return_data_err_object_does_not_exist
from .models import ProjectRequest

from src.core.utils.media_files import save_media_file, get_media_file_link

from dataclasses import asdict

from .schemas import ProjectRequestServicesUpdateSchema
from ..core.utils.enums import ModelRelatedListOperations, InstanceTypes


async def order_by_name_others_case_whens(
        model
):
    return (
        (model.name == 'Others', 1),
        (model.name == 'others', 1)
    )


class ProjectServicesService(BaseService):
    repository = ProjectServiceRepository

    @handle_errors
    async def get_filtered_services(self):
        async with self.uow:
            services = await self.uow_repo.order_by_case(
                when_cases=await order_by_name_others_case_whens(self.repository.model)
            )
            return await self.get_schemas_lst_by_sequence(services)


class ProjectBudgetService(BaseService):
    repository = ProjectBudgetRepository

    @handle_errors
    async def get_filtered_budgets(self):
        async with self.uow:
            budgets = await self.uow_repo.order_by_field(
                self.repository.model.start_amount
            )
            return await self.get_schemas_lst_by_sequence(budgets)


class ProjectRefSourceService(BaseService):
    repository = RefSourceRepository

    @handle_errors
    async def get_filtered_ref_sources(self):
        async with self.uow:
            sources = await self.uow_repo.order_by_case(
                when_cases=await order_by_name_others_case_whens(self.repository.model)
            )
            return await self.get_schemas_lst_by_sequence(sources)

    async def get_services_by_ids(self, ids: list):
        return await self.get_instances_list_by_ids(ids)


class ProjectRequestService(BaseService):
    repository = ProjectRequestRepository

    @handle_errors
    async def create_project_request(
            self,
            data: ProjectRequestCreateData
    ):
        project_services_json = json.loads(data.project_services)
        if not isinstance(project_services_json, list):
            return ReturnData(error='Project services must be a list!')
        data.project_services = project_services_json

        async with self.uow:
            budget = await self.uow.project_budgets.get_one_by_id(data.budget_id)
            if budget is None:
                return await return_data_err_object_does_not_exist('budget')

            if data.ref_source_id is not None:
                ref_source = await self.uow.project_ref_sources.get_one_by_id(data.ref_source_id)
                if ref_source is None:
                    return await return_data_err_object_does_not_exist('project ref source')

            services_list = await ProjectServicesService(self.uow).get_instances_list_by_ids(
                project_services_json
            )
            project_request: ProjectRequest = await self.uow_repo.create_instance_by_data(asdict(data))
            project_request.project_services = services_list

            if data.technical_task is not None:
                hashed_filename = await save_media_file(data.technical_task)
                project_request.technical_task = await get_media_file_link(hashed_filename)

            await self.uow.add(project_request)
            await self.uow.commit()
            return ReturnData(result=await self.repository.get_return_schema(project_request))

    @handle_errors
    async def update_project_request(
            self,
            request_id: int,
            data: ProjectRequestUpdateData
    ):
        if data.technical_task is not None:
            hashed_filename = await save_media_file(data.technical_task)
            data.technical_task = await get_media_file_link(hashed_filename)

        async with self.uow:
            request = await self.uow_repo.get_one_by_id(request_id)
            if request is None:
                return await return_data_err_object_does_not_exist('project request')

            if data.budget_id is not None:
                budget = await self.uow.project_budgets.get_one_by_id(data.budget_id)
                if budget is None:
                    return await return_data_err_object_does_not_exist('budget')
            if data.ref_source_id is not None:
                source = await self.uow.project_ref_sources.get_one_by_id(data.ref_source_id)
                if source is None:
                    return await return_data_err_object_does_not_exist('ref source')

            await self.uow_repo.update_by_data(request_id, asdict(data))
            await self.uow.commit()
            return ReturnData(result=await self.repository.get_return_schema(request))

    async def edit_project_request_services(
            self,
            request_id: int,
            data: ProjectRequestServicesUpdateSchema,
            services_operation: ModelRelatedListOperations
    ):
        async with self.uow:
            services_lst = await ProjectServicesService(self.uow).get_instances_list_by_ids(
                data.services
            )
            return await self.process_edit_related_objects(
                request_id,
                InstanceTypes.project_request,
                instance_related_attr_name='project_services',
                related_instance_type=InstanceTypes.project_service,
                operation=services_operation,
                objects_list=services_lst
            )

    @handle_errors
    async def add_project_request_services(
            self,
            request_id: int,
            data: ProjectRequestServicesUpdateSchema
    ):
        return await self.edit_project_request_services(
            request_id,
            data,
            ModelRelatedListOperations.append
        )

    @handle_errors
    async def remove_project_request_services(
            self,
            request_id: int,
            data: ProjectRequestServicesUpdateSchema
    ):
        return await self.edit_project_request_services(
            request_id,
            data,
            ModelRelatedListOperations.remove
        )
