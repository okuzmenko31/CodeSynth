from src.core.schemas import MainSchema


class ProjectServiceSchema(MainSchema):
    name: str


class ProjectServiceReturnSchema(ProjectServiceSchema):
    id: int


class ProjectBudgetSchema(MainSchema):
    start_amount: int
    secondary_amount: int


class ProjectBudgetReturnSchema(MainSchema):
    id: int
    budget: str
