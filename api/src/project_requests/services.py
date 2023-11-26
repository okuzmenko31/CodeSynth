from src.core.utils.service import BaseService
from src.core.utils.decorators import handle_errors
from src.core.repositories.repos import (ProjectBudgetRepository,
                                         ProjectServiceRepository,
                                         ProjectRequestRepository)
from src.core.utils.dataclasses import ReturnData
from src.core.utils.service_utils import return_data_err_object_does_not_exist


class ProjectServicesService(BaseService):
    repository = ProjectServiceRepository

    @handle_errors
    async def get_filtered_services(self):
        async with self.uow:
            services = await self.uow_repo.order_by_case(
                when_cases=(
                    (self.repository.model.name == 'Others', 1),
                    (self.repository.model.name == 'others', 1)
                )
            )
            return await self.get_schemas_lst_by_sequence(services)


class ProjectBudgetService(BaseService):
    repository = ProjectBudgetRepository
