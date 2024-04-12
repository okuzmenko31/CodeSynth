import datetime

from typing import Optional

from pydantic import BaseModel

from ..customer.schemas import CustomerCreate


class ProjectOrderCreate(BaseModel):
    services: list[int]
    budget: int
    start_date: Optional[datetime.date] = None
    deadline_date: Optional[datetime.date] = None
    hard_deadline: bool = False
    description: Optional[str] = None
    referral_source: Optional[int] = None
    customer: CustomerCreate


class ProjectOrderUpdate(BaseModel):
    pass
