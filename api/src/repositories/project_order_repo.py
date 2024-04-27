from sqlalchemy.ext.asyncio import AsyncSession

from .generic import GenericRepository
from ..project_order.models import (
    ProjectOrder,
    ProjectOrderService,
    ProjectOrderBudget,
    ProjectOrderReferralSource,
)
from ..project_order.schemas import (
    ProjectOrderCreate,
    ProjectOrderUpdate,
    ProjectOrderServiceCreate,
    ProjectOrderServiceUpdate,
    ProjectOrderBudgetCreate,
    ProjectOrderBudgetUpdate,
    ProjectOrderReferralSourceCreate,
    ProjectOrderReferralSourceUpdate,
)


class ProjectOrderRepository(
    GenericRepository[ProjectOrder, ProjectOrderCreate, ProjectOrderUpdate]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, ProjectOrder)

    async def create(self, data: ProjectOrderCreate, customer_id: int = None):
        project_order = ProjectOrder(
            budget_id=data.budget,
            start_date=data.start_date,
            deadline_date=data.deadline_date,
            hard_deadline=data.hard_deadline,
            details=data.details,
        )

        if data.referral_source:
            project_order.referral_source_id = data.referral_source

        if customer_id:
            project_order.customer_id = customer_id

        if data.technical_assignment:
            project_order.technical_assignment = data.technical_assignment

        self.session.add(project_order)
        return project_order

    async def upload_technical_assignment(
        self,
        project_order_id: int,
        technical_assignment_link: str,
    ):
        project_order = await self.get_by_id(id=project_order_id)
        project_order.technical_assignment = technical_assignment_link
        self.session.add(project_order)
        return project_order


class ProjectOrderServiceRepository(
    GenericRepository[
        ProjectOrderService,
        ProjectOrderServiceCreate,
        ProjectOrderServiceUpdate,
    ]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, ProjectOrderService)


class ProjectOrderBudgetRepository(
    GenericRepository[
        ProjectOrderBudget, ProjectOrderBudgetCreate, ProjectOrderBudgetUpdate
    ]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, ProjectOrderBudget)


class ProjectOrderReferralSourceRepository(
    GenericRepository[
        ProjectOrderReferralSource,
        ProjectOrderReferralSourceCreate,
        ProjectOrderReferralSourceUpdate,
    ]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, ProjectOrderReferralSource)
