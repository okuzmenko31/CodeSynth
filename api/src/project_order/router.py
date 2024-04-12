from fastapi import APIRouter, UploadFile, File

from .schemas import ProjectOrderCreate
from ..core.config import settings


router = APIRouter(
    prefix="/project_order",
    tags=["Project Order"],
)


@router.post("/create")
async def create_project_order(
    data: ProjectOrderCreate,
):
    print(data)
    return {"message": "Project order created successfully"}


@router.post("/{project_order_id}/upload_technical_assignment")
async def upload_technical_assignment(
    project_order_id: int,
    technical_assignment: UploadFile = File(...),
):
    pass
