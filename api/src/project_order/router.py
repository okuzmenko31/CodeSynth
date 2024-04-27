import logging

from fastapi import APIRouter, UploadFile, File, Request, status

from sqlalchemy.exc import SQLAlchemyError

from .dependecies import project_order_create_dep
from .schemas import ProjectOrderCreateShow
from .services import ProjectOrderService
from ..core.db.dependencies import uowDEP
from ..utils.processors.static_files_processor import StaticFilesProcessor
from ..utils.exceptions.http.base import ContentNoChangeException
from ..utils.exceptions.processors.static import StaticFilesProcessException


log = logging.getLogger(__name__)


router = APIRouter(
    prefix="/project_order",
    tags=["Project Order"],
)


@router.post(
    "/create",
    status_code=status.HTTP_200_OK,
    response_model=ProjectOrderCreateShow,
)
async def create_project_order(
    request: Request,
    data: project_order_create_dep,
    uow: uowDEP,
) -> ProjectOrderCreateShow:
    try:
        file_processor = StaticFilesProcessor(
            request.base_url,
            data.technical_assignment,
        )
        file_data = await file_processor.process()
        data.technical_assignment = file_data.link
        return await ProjectOrderService(uow).create_project_order(data)
    except SQLAlchemyError as e:
        log.error(e)
        raise ContentNoChangeException(
            "Something went wrong when creating an order... Please, try again."
        )
    except StaticFilesProcessException as e:
        log.error(e)
        raise ContentNoChangeException(
            "Something went wrong when processing the file... Please, try again."
        )


@router.post("/{project_order_id}/upload_technical_assignment")
async def upload_technical_assignment(
    request: Request,
    uow: uowDEP,
    project_order_id: int,
    technical_assignment: UploadFile = File(...),
):
    try:
        file_processor = StaticFilesProcessor(
            request.base_url, technical_assignment
        )
        file_data = await file_processor.process()
        await ProjectOrderService(uow).upload_technical_assignment(
            project_order_id, file_data.link
        )
    except StaticFilesProcessException as e:
        log.error(e)
        raise ContentNoChangeException(
            (
                "Error processing the file with the technical assignment. Please,"
                " check that the file is in the correct format and try again."
            )
        )
