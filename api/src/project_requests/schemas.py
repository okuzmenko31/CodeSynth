from src.core.schemas import MainSchema


class ProjectServiceSchema(MainSchema):
    name: str


class ProjectServiceReturnSchema(ProjectServiceSchema):
    id: int
