from sqladmin import ModelView

from .customer.model_view import CustomerModelView
from .project_order.model_view import (
    ProjectOrderModelView,
    ProjectOrderServiceModelView,
    ProjectOrderBudgetModelView,
    ProjectOrderReferralSourceModelView,
)


def get_model_views() -> list[ModelView]:
    return [
        CustomerModelView,
        ProjectOrderModelView,
        ProjectOrderServiceModelView,
        ProjectOrderBudgetModelView,
        ProjectOrderReferralSourceModelView,
    ]
