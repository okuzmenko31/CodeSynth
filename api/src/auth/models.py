import uuid

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID

from src.core.database import Base


class JWTTokensBlackList(Base):
    __tablename__ = 'jwt_tokens_blacklist'

    id: Mapped[uuid.uuid4] = mapped_column(UUID(as_uuid=True),
                                           primary_key=True,
                                           default=uuid.uuid4)
    jwt_token: Mapped[str] = mapped_column(nullable=False)

    def __repr__(self):
        return f'Id: {self.id}. Token: {self.jwt_token}'
