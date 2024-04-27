import datetime

from typing import Optional, Union

from sqlalchemy import ForeignKey, sql
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from ..core.db.base import Base
from ..core.db.mixins import BaseModelMixin

from ..customer.models import Customer

from .utils import BudgetConverter


class ProjectOrderServiceAssociation(Base):
    __tablename__ = "project_order_service_association"

    project_order_id: Mapped[int] = mapped_column(
        ForeignKey("project_order.id"), primary_key=True
    )
    service_id: Mapped[int] = mapped_column(
        ForeignKey("project_order_service.id"), primary_key=True
    )


class ProjectOrder(BaseModelMixin, Base):
    __tablename__ = "project_order"
    __label__ = "Project Order"

    customer_id: Mapped[int] = mapped_column(
        ForeignKey(
            "customer.id",
            onupdate="CASCADE",
            ondelete="SET NULL",
        ),
        nullable=True,
        index=True,
        doc="Customer ID",
    )
    customer: Mapped[Customer | None] = relationship(doc="Customer")
    services: Mapped[list["ProjectOrderService"]] = relationship(
        secondary="project_order_service_association",
        doc="Services",
    )
    budget_id: Mapped[int] = mapped_column(
        ForeignKey(
            "project_order_budget.id",
            onupdate="CASCADE",
            ondelete="SET NULL",
        ),
        nullable=True,
        index=True,
        doc="Budget ID",
    )
    budget: Mapped[Union["ProjectOrderBudget", None]] = relationship(
        doc="Budget"
    )
    referral_source_id: Mapped[int] = mapped_column(
        ForeignKey(
            "project_order_referral_source.id",
            onupdate="CASCADE",
            ondelete="SET NULL",
        ),
        nullable=True,
        index=True,
        doc="Referral Source ID",
    )
    referral_source: Mapped[Union["ProjectOrderReferralSource", None]] = (
        relationship(doc="Referral Source")
    )

    start_date: Mapped[Optional[datetime.date]] = mapped_column(
        nullable=True, index=True, doc="Start Date"
    )
    deadline_date: Mapped[Optional[datetime.date]] = mapped_column(
        nullable=True, index=True, doc="End Date"
    )

    hard_deadline: Mapped[bool] = mapped_column(
        nullable=False,
        default=False,
        server_default=sql.expression.false(),
        index=True,
        doc="Hard Deadline",
    )
    details: Mapped[Optional[str]] = mapped_column(
        nullable=True, doc="Details"
    )
    technical_assignment: Mapped[Optional[str]] = mapped_column(
        nullable=True, doc="Technical Assignment"
    )

    def __str__(self) -> str:
        return f"Project Order - {self.customer} - {self.budget} - {self.referral_source}"


class ProjectOrderRelatedBase:
    __label__ = None

    name: Mapped[str] = mapped_column(
        nullable=False, unique=True, index=True, doc="Name"
    )
    position: Mapped[int] = mapped_column(
        nullable=False,
        default=0,
        server_default="0",
        index=True,
        doc="Position",
    )
    active: Mapped[bool] = mapped_column(
        nullable=False,
        default=True,
        server_default=sql.expression.true(),
        index=True,
        doc="Active",
    )

    def __str__(self) -> str:
        return f"{self.__label__} - {self.name}"


class ProjectOrderService(ProjectOrderRelatedBase, BaseModelMixin, Base):
    __tablename__ = "project_order_service"
    __label__ = "Project Order Service"


class ProjectOrderReferralSource(
    ProjectOrderRelatedBase,
    BaseModelMixin,
    Base,
):
    __tablename__ = "project_order_referral_source"
    __label__ = "Project Order Referral Source"


class ProjectOrderBudget(BaseModelMixin, Base):
    __tablename__ = "project_order_budget"
    __label__ = "Project Order Budget"

    value_from: Mapped[int] = mapped_column(
        nullable=False,
        index=True,
        doc="Budget Value From",
    )
    value_to: Mapped[Optional[int]] = mapped_column(
        nullable=True, index=True, doc="Budget Value To"
    )
    active: Mapped[bool] = mapped_column(
        nullable=False,
        default=True,
        server_default=sql.expression.true(),
        index=True,
        doc="Active",
    )

    @property
    def amount(self):
        return BudgetConverter.convert_budget(self.value_from, self.value_to)

    def __str__(self) -> str:
        return f"Project Order Budget - {self.amount}"
