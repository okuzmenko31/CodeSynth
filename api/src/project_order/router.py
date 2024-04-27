import logging

from fastapi import APIRouter, UploadFile, File, Request, status

from sqlalchemy.exc import SQLAlchemyError

from .dependecies import project_order_create_dep
from .schemas import ProjectOrderCreateShow, ProjectOrderServiceShow
from .services import ProjectOrderService, ProjectOrderServicesService
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


@router.get(
    "/services",
    status_code=status.HTTP_200_OK,
    response_model=list[ProjectOrderServiceShow],
)
async def project_order_services(uow: uowDEP) -> list[ProjectOrderServiceShow]:
    return await ProjectOrderServicesService(uow).get_all_services()
