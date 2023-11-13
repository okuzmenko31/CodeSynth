from typing import Annotated

from fastapi import Depends, Query

from src.core.config import settings


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


pagination_params = Annotated[PaginationParams, Depends(get_pagination_params)]
