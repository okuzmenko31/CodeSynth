import datetime
import json

from typing import Annotated, Optional

from fastapi import Depends, Form, UploadFile, File

from .schemas import ProjectOrderCreate
from ..customer.schemas import CustomerCreateOrUpdate


def project_order_create_data(
    full_name: str = Form(...),
    email: str = Form(...),
    company: str = Form(...),
    company_website: Optional[str] = Form(default=None),
    services: str = Form(...),
    budget: int = Form(...),
    start_date: Optional[datetime.date] = Form(default=None),
    deadline_date: Optional[datetime.date] = Form(default=None),
    hard_deadline: bool = Form(default=False),
    details: Optional[str] = Form(default=None),
    referral_source: Optional[int] = Form(default=None),
    technical_assignment: UploadFile = File(default=None),
) -> ProjectOrderCreate:
    return ProjectOrderCreate(
        services=json.loads(services),
        budget=budget,
        start_date=start_date,
        deadline_date=deadline_date,
        hard_deadline=hard_deadline,
        details=details,
        referral_source=referral_source,
        technical_assignment=technical_assignment,
        customer=CustomerCreateOrUpdate(
            full_name=full_name,
            email=email,
            company=company,
            company_website=company_website,
        ),
    )


project_order_create_dep = Annotated[
    ProjectOrderCreate,
    Depends(project_order_create_data),
]
