import logging

from uuid import UUID

from ..core.db.dependencies import uowDEP
from ..utils.exceptions.http.base import IdNotFoundException


log = logging.getLogger(__name__)


class BaseService:
    def __init__(self, uow: uowDEP) -> None:
        self.uow = uow

    async def _check_exists_repo_obj_by_id(self, repo, obj_id: int | UUID):
        if not await repo.exists_by_id(id=obj_id, is_active=True):
            raise IdNotFoundException(repo.model, obj_id)
