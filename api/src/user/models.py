import uuid

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from ..core.db.base import Base
from ..core.db.mixins import BaseModelMixin

from ..utils.hashing import Hashing


class User(BaseModelMixin, Base):
    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    username: Mapped[str] = mapped_column(
        unique=True, index=True, nullable=False
    )
    email: Mapped[str] = mapped_column(unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, index=True)

    def __str__(self) -> str:
        return f"User: {self.username}"

    def check_password(self, password: str) -> bool:
        return Hashing.verify_password(password, self.hashed_password)


class BlacklistedJWT(BaseModelMixin, Base):
    __tablename__ = "blacklisted_jwt"

    token: Mapped[str] = mapped_column(unique=True, nullable=False, index=True)

    def __str__(self) -> str:
        return f"BlacklistedJWT: {self.token}"
