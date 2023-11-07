from src.core.utils.service import BaseService

from .schemas import CreateSuperUserModel


class UserService(BaseService):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.repo = self.uow.users

    async def create_super_user(self, email, password):
        user_data = CreateSuperUserModel(email=email, password=password)
        async with self.uow:
            self.uow.users
