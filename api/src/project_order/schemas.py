import datetime

from typing import Optional, Any

from pydantic import BaseModel

from ..customer.schemas import CustomerCreateOrUpdate
from ..core.schemas import MainSchema


class ProjectOrderBase(MainSchema):
    services: list[int]
    budget: int
    start_date: Optional[datetime.date] = None
    deadline_date: Optional[datetime.date] = None
    hard_deadline: bool = False
    details: Optional[str] = None
    referral_source: Optional[int] = None
    technical_assignment: Optional[Any] = None
    customer: CustomerCreateOrUpdate


class ProjectOrderCreate(ProjectOrderBase):
    pass


class ProjectOrderUpdate(BaseModel):
    pass


class ProjectOrderShow(ProjectOrderBase):
    id: int


class ProjectOrderCreateShow(BaseModel):
    project_order_id: int


class ProjectOrderRelatedBase(MainSchema):
    name: str
    position: int
    active: bool


class ProjectOrderServiceCreate(ProjectOrderRelatedBase):
    pass


class ProjectOrderServiceUpdate(BaseModel):
    pass


class ProjectOrderServiceShow(ProjectOrderRelatedBase):
    id: int


class ProjectOrderReferralSourceCreate(ProjectOrderRelatedBase):
    pass


class ProjectOrderReferralSourceUpdate(BaseModel):
    pass


class ProjectOrderReferralSourceShow(ProjectOrderRelatedBase):
    id: int


class ProjectOrderBudgetBase(MainSchema):
    value_from: int
    value_to: Optional[int] = None
    active: bool


class ProjectOrderBudgetCreate(ProjectOrderBudgetBase):
    pass


class ProjectOrderBudgetUpdate(BaseModel):
    pass


class ProjectOrderBudgetShow(ProjectOrderBudgetBase):
    amount: str
    id: int
