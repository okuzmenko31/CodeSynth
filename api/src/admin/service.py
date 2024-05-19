from ..service.base import BaseService
from ..user.models import User
from .schemas import AdminAuthSchema


class AdminAuthService(BaseService):
    async def validate_user_credentials(self, data: AdminAuthSchema) -> bool:
        async with self.uow:
            if not await self.uow.user.exists_by_attr(
                attr=User.username,
                value=data.username,
            ):
                return False
            user: User = await self.uow.user.get_by_username(
                username=data.username,
            )
            if not user or not user.check_password(data.password):
                return False
            return True
