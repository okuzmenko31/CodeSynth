from src.auth.models import JWTTokensBlackList
from src.projects.models import Project, ProjectTag, ProjectFilterType
from src.core.utils.repository import SQLAlchemyRepository, AbstractSchemaRepository
from src.projects.schemas import (ProjectReturnSchema,
                                  ProjectTagReturnSchema,
                                  ProjectFilterTypeReturnSchema)
from src.project_requests.models import ProjectService, ProjectBudget, ProjectRequest, RefSource
from src.project_requests.schemas import (ProjectServiceReturnSchema,
                                          ProjectBudgetReturnSchema,
                                          ProjectRefSourceReturnSchema,
                                          ProjectRequestReturnSchema)


class JWTTokensBlackListRepository(SQLAlchemyRepository):
    model = JWTTokensBlackList


class ProjectRepository(AbstractSchemaRepository,
                        SQLAlchemyRepository):
    model = Project

    @classmethod
    async def get_return_schema(cls, project):
        return ProjectReturnSchema(
            id=project.id,
            name=project.name,
            filter_type_id=project.filter_type_id,
            filter_type=project.filter_type.name,
            preview_image=project.preview_image,
            source_link=project.source_link,
            tags=[
                ProjectTagReturnSchema(name=tag.name, img=tag.img, id=tag.id) for tag in project.tags
            ],
            text=project.text
        )


class ProjectTagRepository(AbstractSchemaRepository,
                           SQLAlchemyRepository):
    model = ProjectTag

    @classmethod
    async def get_return_schema(cls, tag):
        return ProjectTagReturnSchema(
            id=tag.id, name=tag.name, img=tag.img
        )


class ProjectFilterTypeRepository(AbstractSchemaRepository,
                                  SQLAlchemyRepository):
    model = ProjectFilterType

    @classmethod
    async def get_return_schema(cls, filter_type):
        return ProjectFilterTypeReturnSchema(
            id=filter_type.id,
            name=filter_type.name
        )


class ProjectServiceRepository(AbstractSchemaRepository,
                               SQLAlchemyRepository):
    model = ProjectService

    @classmethod
    async def get_return_schema(cls, service):
        return ProjectServiceReturnSchema(
            id=service.id,
            name=service.name
        )


class ProjectBudgetRepository(AbstractSchemaRepository,
                              SQLAlchemyRepository):
    model = ProjectBudget

    @classmethod
    async def get_return_schema(cls, budget_instance):
        return ProjectBudgetReturnSchema(
            id=budget_instance.id,
            budget=budget_instance.budget,
            start_amount=budget_instance.start_amount,
            secondary_amount=budget_instance.secondary_amount
        )


class ProjectRequestRepository(AbstractSchemaRepository,
                               SQLAlchemyRepository):
    model = ProjectRequest

    @classmethod
    async def get_return_schema(cls, project_request):
        return ProjectRequestReturnSchema(
            id=project_request.id,
            full_name=project_request.full_name,
            email=project_request.email,
            project_info=project_request.project_info,
            company=project_request.company,
            company_website=project_request.company_website,
            start_date=project_request.start_date,
            deadline_date=project_request.deadline_date,
            hard_deadline=project_request.hard_deadline,
            technical_task=project_request.technical_task,
            budget_id=project_request.budget_id,
            ref_source_id=project_request.ref_source_id,
            budget=project_request.budget.budget,
            ref_source=project_request.ref_source.name if project_request.ref_source is not None else None,
            project_services=[
                ProjectServiceReturnSchema(
                    id=service.id, name=service.name
                ) for service in project_request.project_services
            ]
        )


class RefSourceRepository(AbstractSchemaRepository,
                          SQLAlchemyRepository):
    model = RefSource

    @classmethod
    async def get_return_schema(cls, source_instance):
        return ProjectRefSourceReturnSchema(
            id=source_instance.id,
            name=source_instance.name
        )
