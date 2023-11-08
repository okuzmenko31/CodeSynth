import shutil

from typing import Annotated

from fastapi import APIRouter, UploadFile, File, Form

from .schemas import ProjectSchema, ProjectTagSchema
from .services import ProjectService, ProjectTagService
from src.core.utils.dependencies import uowDEP

router = APIRouter(
    prefix='/projects'
)


@router.post('/create_tag/', response_model=ProjectTagSchema)
async def create_tag(
        uow: uowDEP,
        name: Annotated[str, Form(...)],
        image_file: UploadFile = File(...)
):
    service = ProjectTagService(uow)
    tag_id = await service.create_tag(name, image_file)
    tag = await service.get_tag_by_id(tag_id)
    return ProjectTagSchema(name=tag.name, img=tag.img)
