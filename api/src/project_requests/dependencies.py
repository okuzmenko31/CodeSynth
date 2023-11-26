import datetime
from typing import Annotated, Any, Optional

from fastapi import Depends, Form, UploadFile, File

from src.core.utils.dataclasses import ProjectRequestCreateData


def project_request_create_data(
        full_name: str = Form(...),
        email: str = Form(...),
        budget_id: int = Form(...),
        start_date: datetime.date = Form(...),
        deadline_date: datetime.date = Form(...),
        project_services: str = Form(...),
        hard_deadline: bool = Form(default=False),
        project_info: Optional[str] = Form(None),
        technical_task: UploadFile = File(None),
        company: Optional[str] = Form(None),
        company_website: Optional[str] = Form(None),
        ref_source_id: Optional[int] = Form(None)
) -> ProjectRequestCreateData:
    return ProjectRequestCreateData(
        full_name=full_name,
        email=email,
        budget_id=budget_id,
        start_date=start_date,
        deadline_date=deadline_date,
        project_services=project_services,
        hard_deadline=hard_deadline,
        project_info=project_info,
        technical_task=technical_task,
        company=company,
        company_website=company_website,
        ref_source_id=ref_source_id
    )


project_req_create_data = Annotated[ProjectRequestCreateData, Depends(project_request_create_data)]
