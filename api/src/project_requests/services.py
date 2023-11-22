from src.core.utils.service import BaseService
from src.core.utils.decorators import handle_errors
from src.core.repositories.repos import (ProjectBudgetRepository,
                                         ProjectServiceRepository,
                                         ProjectRequestRepository)

# from src.core.utils.decorators import handle_errors
#
from .schemas import *
from .utils import get_budget_value


class ProjectAppService(BaseService):
    repository = ProjectServiceRepository


class ProjectBudgetService(BaseService):
    repository = ProjectBudgetRepository

    @handle_errors
    async def create_budget(self, data: ProjectBudgetSchema):
        start_amount = data.start_amount
        sec_amount = data.secondary_amount
        budget = get_budget_value(start_amount, sec_amount)

        data = dict(data)
        data['budget'] = budget

        if sec_amount is None:
            data = data.copy()
            del data['secondary_amount']

        async with self.uow:
            budget_id = await self.uow_repo.insert_by_data(data)
            await self.uow.commit()
            budget = await self.uow_repo.get_one_by_id(budget_id)
            return await self.uow_repo.get_return_schema(budget)
