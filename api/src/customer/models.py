from typing import Optional

from sqlalchemy.orm import Mapped, mapped_column

from ..core.db.base import Base
from ..core.db.mixins import BaseModelMixin


class Customer(BaseModelMixin, Base):
    full_name: Mapped[str] = mapped_column(
        nullable=False, index=True, doc="Full Name"
    )
    email: Mapped[str] = mapped_column(
        nullable=False, unique=True, index=True, doc="Email"
    )
    company: Mapped[str] = mapped_column(
        nullable=False, index=True, doc="Company"
    )
    company_website: Mapped[Optional[str]] = mapped_column(
        nullable=True, doc="Company Website"
    )
    ip_address: Mapped[Optional[str]] = mapped_column(
        nullable=True, index=True, doc="IP Address"
    )

    def __str__(self) -> str:
        return self.full_name
