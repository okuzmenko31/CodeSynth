from sqlalchemy.orm import Mapped, mapped_column

from ..core.database import Base


class User(Base):
    __tablename__ = "users"  # noqa

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(nullable=False, unique=True)
    email: Mapped[str] = mapped_column(nullable=False, unique=True)
    hashed_password: Mapped[str] = mapped_column(nullable=False)

    def __repr__(self):
        return f"Admin: {self.username} - {self.email}"


class JWTTokensBlackList(Base):
    __tablename__ = "jwt_tokens_blacklist"  # noqa

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    jwt_token: Mapped[str] = mapped_column(nullable=False)

    def __repr__(self):
        return f"Id: {self.id}. Token: {self.jwt_token}"
