from sqlalchemy import (
    exists,
    or_,
)

from .generic import GenericRepository

from ..user.models import User
from ..user.schemas import UserCreate, UserUpdate
from ..utils.hashing import Hashing


class UserRepository(GenericRepository[User, UserCreate, UserUpdate]):
    async def get_by_id_active(self, *, id: int) -> User | None:
        return await self.get_by_attr_active(attr=self.model.id, value=id)

    async def get_by_email(self, *, email: str) -> User | None:
        return await self.get_by_attr(attr=self.model.email, value=email)

    async def get_by_email_active(self, *, email: str) -> User | None:
        return await self.get_by_attr_active(
            attr=self.model.email,
            value=email,
        )

    async def check_user_exists(self, *, username: str, email: str):
        query = (
            exists()
            .where(
                or_(
                    self.model.username == username,
                    self.model.email == email,
                )
            )
            .select()
        )
        res = await self.session.execute(query)
        return res.scalar_one()

    async def create_user(self, *, data: UserCreate) -> User:
        user = User(
            username=data.username,
            email=data.email,
            hashed_password=Hashing.get_hashed_password(data.password),
        )
        self.session.add(user)
        return user
