import datetime

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column


class IdColMixin:
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)


class TimeStampMixin:
    created_at: Mapped[datetime.datetime] = mapped_column(
        server_default=func.now(),
        doc="Created At",
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        server_default=func.now(),
        onupdate=func.now(),
        doc="Updated At",
    )


class BaseModelMixin(IdColMixin, TimeStampMixin):
    pass
