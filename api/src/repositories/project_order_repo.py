from .generic import GenericRepository

from ..project_order.models import ProjectOrder
from ..project_order.schemas import (
    ProjectOrderCreate,
    ProjectOrderUpdate,
)


class ProjectOrderRepository(
    GenericRepository[ProjectOrder, ProjectOrderCreate, ProjectOrderUpdate]
):
    pass
