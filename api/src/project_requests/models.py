import datetime

from typing import Optional

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey, UniqueConstraint, Text

from ..core.database import Base
from ..project_requests.utils import get_budget_value


# Association table for M2M relationship between ProjectRequest and ProjectService
class ProjectRequestServiceAssociation(Base):
    __tablename__ = "project_request_service_association"  # noqa
    __table_args__ = (
        UniqueConstraint(
            "project_request_id",
            "project_service_id",
            name="idx_unique_request_service",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    project_request_id: Mapped[int] = mapped_column(
        ForeignKey("project_request.id", ondelete="CASCADE")
    )
    project_service_id: Mapped[int] = mapped_column(
        ForeignKey("project_service.id", ondelete="CASCADE")
    )


class ProjectService(Base):
    __tablename__ = "project_service"  # noqa

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(45), nullable=False)

    def __repr__(self):
        return f"Service: {self.name}"

    def __str__(self):
        return self.__repr__()


class ProjectBudget(Base):
    __tablename__ = "project_budget"  # noqa

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    start_amount: Mapped[int] = mapped_column(nullable=False)
    secondary_amount: Mapped[int] = mapped_column(nullable=True)
    project_requests: Mapped["ProjectRequest"] = relationship(back_populates="budget")

    def __repr__(self):
        return f"Budget: {self.budget}"

    def __str__(self):
        return self.__repr__()

    @property
    def budget(self):
        return get_budget_value(self.start_amount, self.secondary_amount)


class RefSource(Base):
    """Model of sources, where user can hear about us"""

    __tablename__ = "ref_source"  # noqa

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(40), nullable=False)

    def __repr__(self):
        return f"Source: {self.name}"

    def __str__(self):
        return self.__repr__()


class ProjectRequest(Base):
    __tablename__ = "project_request"  # noqa

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    full_name: Mapped[str] = mapped_column(String(60), nullable=False)
    email: Mapped[str] = mapped_column(String(120), nullable=False)
    project_info: Mapped[str] = mapped_column(Text, nullable=True)
    technical_task: Mapped[str] = mapped_column(String(100), nullable=True)
    company: Mapped[str] = mapped_column(String(150), nullable=True)
    company_website: Mapped[str] = mapped_column(String(100), nullable=True)
    budget_id: Mapped[int] = mapped_column(
        ForeignKey("project_budget.id"), nullable=False, index=True
    )
    budget: Mapped[ProjectBudget] = relationship(
        lazy="selectin", back_populates="project_requests"
    )
    start_date: Mapped[Optional[datetime.date]]
    deadline_date: Mapped[Optional[datetime.date]]
    hard_deadline: Mapped[bool] = mapped_column(default=False, index=True)
    ref_source_id: Mapped[int] = mapped_column(
        ForeignKey("ref_source.id"), nullable=True
    )
    ref_source: Mapped[RefSource] = relationship(lazy="selectin")
    project_services: Mapped[list[ProjectService]] = relationship(
        secondary="project_request_service_association", lazy="selectin"
    )

    def __repr__(self):
        return f"Request: {self.id}. Email: {self.email}"

    def __str__(self):
        return self.__repr__()
