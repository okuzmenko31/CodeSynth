from sqladmin import ModelView

from ...project_order.models import (
    ProjectOrder,
    ProjectOrderBudget,
    ProjectOrderReferralSource,
    ProjectOrderService,
)


class ProjectOrderModelView(ModelView, model=ProjectOrder):
    name_plural = "Project Orders"
    page_size = 50
    column_list = [
        ProjectOrder.id,
        ProjectOrder.customer,
        ProjectOrder.services,
        ProjectOrder.budget,
        ProjectOrder.referral_source,
        ProjectOrder.start_date,
        ProjectOrder.deadline_date,
        ProjectOrder.hard_deadline,
        ProjectOrder.details,
        ProjectOrder.technical_assignment,
        ProjectOrder.created_at,
        ProjectOrder.updated_at,
    ]
    can_create = True
    can_edit = True


class ProjectOrderServiceModelView(ModelView, model=ProjectOrderService):
    name_plural = "Project Order Services"
    page_size = 50
    column_list = [
        ProjectOrderService.id,
        ProjectOrderService.name,
        ProjectOrderService.position,
        ProjectOrderService.active,
        ProjectOrderService.created_at,
        ProjectOrderService.updated_at,
    ]
    form_excluded_columns = [
        ProjectOrderService.created_at,
        ProjectOrderService.updated_at,
    ]
    column_searchable_list = [
        ProjectOrderService.id,
        ProjectOrderService.name,
        ProjectOrderService.position,
        ProjectOrderService.active,
    ]
    column_sortable_list = [
        ProjectOrderService.id,
        ProjectOrderService.name,
        ProjectOrderService.position,
        ProjectOrderService.active,
        ProjectOrderService.created_at,
        ProjectOrderService.updated_at,
    ]
    can_create = True
    can_edit = True


class ProjectOrderBudgetModelView(ModelView, model=ProjectOrderBudget):
    name_plural = "Project Order Budgets"
    page_size = 50
    column_list = [
        ProjectOrderBudget.id,
        ProjectOrderBudget.active,
        ProjectOrderBudget.created_at,
        ProjectOrderBudget.updated_at,
    ]
    form_excluded_columns = [
        ProjectOrderBudget.created_at,
        ProjectOrderBudget.updated_at,
    ]
    column_searchable_list = [
        ProjectOrderBudget.id,
        ProjectOrderBudget.active,
    ]
    column_sortable_list = [
        ProjectOrderBudget.id,
        ProjectOrderBudget.active,
        ProjectOrderBudget.created_at,
        ProjectOrderBudget.updated_at,
    ]
    can_create = True
    can_edit = True


class ProjectOrderReferralSourceModelView(
    ModelView, model=ProjectOrderReferralSource
):
    name_plural = "Project Order Referral Sources"
    page_size = 50
    column_list = [
        ProjectOrderReferralSource.id,
        ProjectOrderReferralSource.name,
        ProjectOrderReferralSource.position,
        ProjectOrderReferralSource.active,
        ProjectOrderReferralSource.created_at,
        ProjectOrderReferralSource.updated_at,
    ]
    form_excluded_columns = [
        ProjectOrderReferralSource.created_at,
        ProjectOrderReferralSource.updated_at,
    ]
    column_searchable_list = [
        ProjectOrderReferralSource.id,
        ProjectOrderReferralSource.name,
        ProjectOrderReferralSource.position,
        ProjectOrderReferralSource.active,
    ]
    column_sortable_list = [
        ProjectOrderReferralSource.id,
        ProjectOrderReferralSource.name,
        ProjectOrderReferralSource.position,
        ProjectOrderReferralSource.active,
        ProjectOrderReferralSource.created_at,
        ProjectOrderReferralSource.updated_at,
    ]
    can_create = True
    can_edit = True
