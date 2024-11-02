from enum import Enum as PyEnum

from sqlalchemy import BigInteger
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import ENUM

from ..core.db.base import Base
from ..core.db.mixins import BaseModelMixin

from .enums import BotUserLanguage


class BotUser(BaseModelMixin, Base):
    __tablename__ = "bot_user"

    user_id: Mapped[int] = mapped_column(
        BigInteger,
        nullable=False,
        index=True,
        doc="User ID",
    )
    language: Mapped[PyEnum] = mapped_column(
        ENUM(
            BotUserLanguage,
            name="bot_user_language",
            create_type=True,
        ),
        nullable=False,
        doc="Language",
    )

    def __str__(self):
        return f"BotUser {self.user_id}. Language: {self.language}"
