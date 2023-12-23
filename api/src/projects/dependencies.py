from typing import Annotated, Optional

from fastapi import Depends, Query, Form, UploadFile, File

from ..core.config import settings
from ..core.utils.dataclasses import ProjectUpdateData


class PaginationParams:
    def __init__(
            self,
            page: int = Query(ge=0, default=0),
            size: int = Query(ge=1, le=100, default=settings.pagination.limit_per_page)
    ):
        self.page = page
        self.size = size

    @property
    def params_dict(self):
        return {
            'page': self.page,
            'limit': self.size
        }


def get_pagination_params(params: PaginationParams = Depends()):
    return params


def project_update_data_depends(
        name: Optional[str] = Form(None),
        filter_type_id: Optional[int] = Form(None),
        source_link: Optional[str] = Form(None),
        text: Optional[str] = Form(None),
        preview_image: UploadFile = File(None)
) -> ProjectUpdateData:
    return ProjectUpdateData(
        name=name,
        filter_type_id=filter_type_id,
        source_link=source_link,
        text=text,
        preview_image=preview_image
    )


pagination_params = Annotated[PaginationParams, Depends(get_pagination_params)]
project_update_data = Annotated[ProjectUpdateData, Depends(project_update_data_depends)]
