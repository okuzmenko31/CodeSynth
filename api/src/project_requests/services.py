from src.core.utils.service import BaseService

from src.core.repositories.repos import (ProjectBudgetRepository,
                                         ProjectServiceRepository,
                                         ProjectRequestRepository)
# from src.core.utils.decorators import handle_errors
#
# from .schemas import *


class ProjectAppService(BaseService):
    repository = ProjectServiceRepository
