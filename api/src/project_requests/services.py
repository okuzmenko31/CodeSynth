from src.core.utils.service import BaseService
from src.core.utils.decorators import handle_errors
from src.core.repositories.repos import (ProjectBudgetRepository,
                                         ProjectServiceRepository,
                                         ProjectRequestRepository)
from src.core.utils.dataclasses import ReturnData
from src.core.utils.service_utils import return_data_err_object_does_not_exist


class ProjectAppService(BaseService):
    repository = ProjectServiceRepository


class ProjectBudgetService(BaseService):
    repository = ProjectBudgetRepository
