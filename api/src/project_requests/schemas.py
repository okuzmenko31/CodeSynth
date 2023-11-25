from src.core.schemas import MainSchema

from typing import Optional


class ProjectServiceSchema(MainSchema):
    name: str


class ProjectServiceReturnSchema(ProjectServiceSchema):
    id: int


class ProjectBudgetSchema(MainSchema):
    start_amount: int
    secondary_amount: int


class ProjectBudgetUpdateSchema(MainSchema):
    start_amount: Optional[int]
    secondary_amount: Optional[int]


class ProjectBudgetReturnSchema(ProjectBudgetSchema):
    id: int
    budget: str
