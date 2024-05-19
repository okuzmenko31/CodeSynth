from sqladmin import ModelView

from ...user.models import User


class UserModelView(ModelView, model=User):
    name_plural = 'Users'
    page_size = 50
    column_list = [
        User.username,
        User.email,
        User.is_active,
        User.created_at,
        User.updated_at,
    ]
    form_excluded_columns = [
        User.hashed_password,
        User.created_at,
        User.updated_at,
    ]
    can_create = False
    can_edit = True
