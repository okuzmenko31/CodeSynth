from src.core.utils.service import BaseService
from src.core.utils.decorators import handle_errors
from src.core.repositories.repos import (ProjectBudgetRepository,
                                         ProjectServiceRepository,
                                         ProjectRequestRepository,
                                         RefSourceRepository)
from src.core.utils.dataclasses import ReturnData
from src.core.utils.service_utils import return_data_err_object_does_not_exist


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
