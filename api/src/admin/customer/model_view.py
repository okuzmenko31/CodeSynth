from sqladmin import ModelView

from ...customer.models import Customer


class CustomerModelView(ModelView, model=Customer):
    name_plural = 'Customers'
    page_size = 50
    column_list = [
        Customer.full_name,
        Customer.email,
        Customer.company,
        Customer.company_website,
        Customer.ip_address,
        Customer.created_at,
        Customer.updated_at,
    ]
    can_create = True
    can_edit = True
