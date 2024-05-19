import secrets

from sqladmin.authentication import AuthenticationBackend

from fastapi.requests import Request

from ..core.config import settings
from ..core.db.unitofwork import UnitOfWork
from .schemas import AdminAuthSchema
from .service import AdminAuthService


class AdminAuthBackend(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username, password = form["username"], form["password"]

        data = AdminAuthSchema(username=username, password=password)
        if not await AdminAuthService(UnitOfWork()).validate_user_credentials(
            data,
        ):
            return False
        token = secrets.token_urlsafe(48)
        request.session.update({"token": token})
        return True

    async def logout(self, request: Request) -> bool:
        # Usually you'd want to just clear the session
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        token = request.session.get("token")

        if not token:
            return False

        # Check the token in depth
        return True


authentication_backend = AdminAuthBackend(secret_key=settings.secret_key)
