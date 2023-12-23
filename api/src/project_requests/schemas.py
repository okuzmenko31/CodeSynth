import datetime

from ..core.schemas import MainSchema
from pydantic import EmailStr

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


class ProjectRefSourceSchema(MainSchema):
    name: str


class ProjectRefSourceReturnSchema(ProjectRefSourceSchema):
    id: int


class ProjectRequestSchema(MainSchema):
    full_name: str
    email: EmailStr
    project_info: Optional[str] = None
    company: Optional[str] = None
    company_website: Optional[str] = None
    start_date: Optional[datetime.date]
    deadline_date: Optional[datetime.date]
    hard_deadline: bool = False
    technical_task: Optional[str] = None
    budget_id: int
    ref_source_id: Optional[int] = None
    project_services: list[int]


class ProjectRequestReturnSchema(ProjectRequestSchema):
    id: int
    budget: str
    ref_source: Optional[str] = None
    project_services: list[ProjectServiceReturnSchema]


class ProjectRequestServicesUpdateSchema(MainSchema):
    services: list[int]
