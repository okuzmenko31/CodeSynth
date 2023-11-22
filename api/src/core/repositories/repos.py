from src.auth.models import JWTTokensBlackList
from src.projects.models import Project, ProjectTag, ProjectFilterType
from src.core.utils.repository import SQLAlchemyRepository, AbstractSchemaRepository
from src.projects.schemas import (ProjectReturnSchema,
                                  ProjectTagReturnSchema,
                                  ProjectFilterTypeReturnSchema)
from src.project_requests.models import ProjectService, ProjectBudget, ProjectRequest
from src.project_requests.schemas import ProjectServiceReturnSchema, ProjectBudgetReturnSchema


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
            budget=budget_instance.budget
        )


class ProjectRequestRepository(SQLAlchemyRepository):
    model = ProjectRequest
