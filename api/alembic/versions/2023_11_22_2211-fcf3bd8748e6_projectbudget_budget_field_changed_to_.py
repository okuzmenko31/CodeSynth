"""ProjectBudget - budget field changed to str

Revision ID: fcf3bd8748e6
Revises: cee24e693e70
Create Date: 2023-11-22 22:11:49.023706

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'fcf3bd8748e6'
down_revision: Union[str, None] = 'cee24e693e70'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('project_budget', 'budget',
                    existing_type=sa.INTEGER(),
                    type_=sa.String(length=20),
                    existing_nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('project_budget', 'budget',
                    existing_type=sa.String(length=20),
                    type_=sa.INTEGER(),
                    existing_nullable=True)
    # ### end Alembic commands ###
