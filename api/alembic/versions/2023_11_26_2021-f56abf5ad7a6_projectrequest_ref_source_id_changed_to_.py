"""ProjectRequest - ref source id changed to nullable=True

Revision ID: f56abf5ad7a6
Revises: b9cbac8cf84e
Create Date: 2023-11-26 20:21:30.856187

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f56abf5ad7a6'
down_revision: Union[str, None] = 'b9cbac8cf84e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('project_request', 'ref_source_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('project_request', 'ref_source_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
