from abc import ABC
from abc import abstractmethod

from sqlalchemy.ext.asyncio import AsyncSession

from ..db.session import create_async_session_maker
from ...repositories.user_repo import UserRepository
from ...repositories.project_order_repo import (
    ProjectOrderRepository,
    ProjectOrderServiceRepository,
    ProjectOrderBudgetRepository,
    ProjectOrderReferralSourceRepository,
)
from ...repositories.customer_repo import CustomerRepository
from ...repositories.bot_user import BotUserRepository


class AbstractUnitOfWork(ABC):
    user: UserRepository
    customer: CustomerRepository
    project_order: ProjectOrderRepository
    project_order_service: ProjectOrderServiceRepository
    project_order_budget: ProjectOrderBudgetRepository
    project_order_referral_source: ProjectOrderReferralSourceRepository
    bot_user: BotUserRepository

    @abstractmethod
    async def __aenter__(self):
        raise NotImplementedError()

    @abstractmethod
    async def __aexit__(self, *args):
        raise NotImplementedError()

    @abstractmethod
    async def commit(self):
        raise NotImplementedError()

    @abstractmethod
    async def rollback(self):
        raise NotImplementedError()

    @abstractmethod
    async def add(self, instance):
        raise NotImplementedError()

    @abstractmethod
    async def expunge(self, instance):
        raise NotImplementedError()


class UnitOfWork(AbstractUnitOfWork):
    def __init__(self) -> None:
        self.session_factory = create_async_session_maker()

    async def __aenter__(self):
        self.session: AsyncSession = self.session_factory()

        self.user = UserRepository(self.session)

        self.customer = CustomerRepository(self.session)

        self.project_order = ProjectOrderRepository(self.session)
        self.project_order_service = ProjectOrderServiceRepository(
            self.session
        )
        self.project_order_budget = ProjectOrderBudgetRepository(self.session)
        self.project_order_referral_source = (
            ProjectOrderReferralSourceRepository(self.session)
        )

        self.bot_user = BotUserRepository(self.session)

    async def __aexit__(self, *args):
        await self.rollback()
        await self.session.close()

    async def commit(self):
        await self.session.commit()

    async def rollback(self):
        await self.session.rollback()

    async def add(self, instance):
        self.session.add(instance)

    async def expunge(self, instance):
        self.session.expunge(instance)
