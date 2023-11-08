from src.auth.models import JWTTokensBlackList
from src.projects.models import Project, ProjectTag
from src.core.utils.repository import SQLAlchemyRepository


class JWTTokensBlackListRepository(SQLAlchemyRepository):
    model = JWTTokensBlackList


class ProjectRepository(SQLAlchemyRepository):
    model = Project


class ProjectTagRepository(SQLAlchemyRepository):
    model = ProjectTag
