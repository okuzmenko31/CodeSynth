import datetime
from typing import Optional, Any

from dataclasses import dataclass


@dataclass
class ReturnData:
    result: Optional[Any] = None
    error: Optional[str] = None


@dataclass
class ProjectUpdateData:
    name: Optional[str] = None,
    filter_type_id: Optional[int] = None,
    source_link: Optional[str] = None,
    text: Optional[str] = None,
    preview_image: Optional[Any] = None


@dataclass
class ProjectRequestCreateData:
    full_name: str
    email: str
    budget_id: int
    start_date: datetime.date
    deadline_date: datetime.date
    project_services: str
    hard_deadline: bool = False
    project_info: Optional[str] = None
    technical_task: Optional[Any] = None
    company: Optional[str] = None
    company_website: Optional[str] = None
    ref_source_id: Optional[int] = None


@dataclass
class ProjectRequestUpdateData:
    full_name: Optional[str] = None
    email: Optional[str] = None
    budget_id: Optional[int] = None
    start_date: Optional[datetime.date] = None
    deadline_date: Optional[datetime.date] = None
    hard_deadline: bool = False
    project_info: Optional[str] = None
    technical_task: Optional[Any] = None
    company: Optional[str] = None
    company_website: Optional[str] = None
    ref_source_id: Optional[int] = None
