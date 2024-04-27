from .schemas import ProjectOrderCreate, ProjectOrderCreateShow, ProjectOrderServiceShow
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


class ProjectOrderServicesService(BaseService):
    async def get_all_services(self) -> list[ProjectOrderServiceShow]:
        async with self.uow:
            model = self.uow.project_order_service.model

            services = await self.uow.project_order_service.get_all_with_ordering(
                order_by_fields=[
                    model.position,
                    model.name,
                ]
            )
            services_show = []

            for service in services:
                services_show.append(ProjectOrderServiceShow(
                    name=service.name,
                    position=service.position,
                    active=service.active,
                    id=service.id,
                ))
            return services_show
