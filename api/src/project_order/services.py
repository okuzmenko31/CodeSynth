from .schemas import (
    ProjectOrderCreate,
    ProjectOrderCreateShow,
    ProjectOrderServiceShow,
    ProjectOrderBudgetShow,
    ProjectOrderReferralSourceShow,
)
from ..service.base import BaseService
from ..utils.exceptions.http.base import IdNotFoundException

import logging

log = logging.getLogger(__name__)


class ProjectOrderService(BaseService):
    async def _check_services_ids_list(self, services_ids: list[int]):
        services_exists_ids = (
            await self.uow.project_order_service.exists_of_ids_list(
                ids=services_ids,
                is_active=True,
            ),
        )
        services_exists_ids = [
            service[0].id for service in services_exists_ids if service
        ]
        for service_id in services_ids:
            if service_id not in services_exists_ids:
                raise IdNotFoundException(
                    self.uow.project_order_service.model, service_id
                )

    async def create_project_order(
        self, data: ProjectOrderCreate
    ) -> ProjectOrderCreateShow:
        async with self.uow:
            await self._check_services_ids_list(data.services)

            await self._check_exists_repo_obj_by_id(
                self.uow.project_order_budget, data.budget
            )
            if data.referral_source is not None:
                await self._check_exists_repo_obj_by_id(
                    self.uow.project_order_referral_source,
                    data.referral_source,
                )

            customer_id = await self.uow.customer.create_or_update(
                data.customer
            )
            project_order = await self.uow.project_order.create(
                data, customer_id
            )
            await self.uow.commit()
            return ProjectOrderCreateShow(project_order_id=project_order.id)

    async def upload_technical_assignment(
        self,
        project_order_id: int,
        technical_assignment_link: str,
    ):
        async with self.uow:
            await self._check_exists_repo_obj_by_id(
                self.uow.project_order, project_order_id
            )
            await self.uow.project_order.upload_technical_assignment(
                project_order_id, technical_assignment_link
            )
            await self.uow.commit()


class ProjectRelatedBaseService(BaseService):
    schema = None
    entity = None

    def _get_entity(self):
        if hasattr(self.uow, self.entity):
            return getattr(self.uow, self.entity)
        raise ValueError(
            f"UnitOfWork class does not have an attribute named {self.entity}"
        )

    async def get_all_related(self) -> list:
        async with self.uow:
            self.entity = self._get_entity()
            model = self.entity.model

            values = await self.entity.get_all_with_ordering(
                order_by_fields=[model.position, model.name],
                filters=[model.active],
            )
            values_show = []

            for value in values:
                values_show.append(
                    self.schema(
                        name=value.name,
                        position=value.position,
                        active=value.active,
                        id=value.id,
                    )
                )
            return values_show


class ProjectOrderServicesService(ProjectRelatedBaseService):
    schema = ProjectOrderServiceShow
    entity = "project_order_service"


class ProjectOrderReferralSourceService(ProjectRelatedBaseService):
    schema = ProjectOrderReferralSourceShow
    entity = "project_order_referral_source"


class ProjectOrderBudgetService(BaseService):
    async def get_all_budgets(self) -> list[ProjectOrderBudgetShow]:
        async with self.uow:
            model = self.uow.project_order_budget.model

            budgets = (
                await self.uow.project_order_budget.get_all_with_ordering(
                    order_by_fields=[
                        model.value_from,
                        model.value_to,
                    ],
                    filters=[model.active],
                )
            )
            budgets_show = []
            for budget in budgets:
                budgets_show.append(
                    ProjectOrderBudgetShow(
                        value_from=budget.value_from,
                        value_to=budget.value_to,
                        active=budget.active,
                        amount=budget.amount,
                        id=budget.id,
                    )
                )
            return budgets_show
