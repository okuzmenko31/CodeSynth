"""project_requests

Revision ID: cee24e693e70
Revises: 1e28716a240f
Create Date: 2023-11-22 17:24:02.189858

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'cee24e693e70'
down_revision: Union[str, None] = '1e28716a240f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('project_budget',
                    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
                    sa.Column('start_amount', sa.SmallInteger(), nullable=False),
                    sa.Column('secondary_amount', sa.SmallInteger(), nullable=False),
                    sa.Column('budget', sa.Integer(), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('project_service',
                    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
                    sa.Column('name', sa.String(length=45), nullable=False),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('ref_source',
                    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
                    sa.Column('name', sa.String(length=40), nullable=False),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('project_request',
                    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
                    sa.Column('full_name', sa.String(length=60), nullable=False),
                    sa.Column('email', sa.String(length=120), nullable=False),
                    sa.Column('project_info', sa.Text(), nullable=True),
                    sa.Column('technical_task', sa.String(length=100), nullable=True),
                    sa.Column('company', sa.String(length=150), nullable=True),
                    sa.Column('company_website', sa.String(length=100), nullable=True),
                    sa.Column('budget_id', sa.Integer(), nullable=False),
                    sa.Column('start_date', sa.Date(), nullable=True),
                    sa.Column('deadline_date', sa.Date(), nullable=True),
                    sa.Column('hard_deadline', sa.Boolean(), nullable=False),
                    sa.Column('ref_source_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['budget_id'], ['project_budget.id'], ),
                    sa.ForeignKeyConstraint(['ref_source_id'], ['ref_source.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_index(op.f('ix_project_request_budget_id'), 'project_request', ['budget_id'], unique=False)
    op.create_index(op.f('ix_project_request_hard_deadline'), 'project_request', ['hard_deadline'], unique=False)
    op.create_table('project_request_service_association',
                    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
                    sa.Column('project_request_id', sa.Integer(), nullable=False),
                    sa.Column('project_service_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['project_request_id'], ['project_request.id'], ondelete='CASCADE'),
                    sa.ForeignKeyConstraint(['project_service_id'], ['project_service.id'], ondelete='CASCADE'),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('project_request_id', 'project_service_id', name='idx_unique_request_service')
                    )
    op.drop_table('project_tags_association_table')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('project_tags_association_table',
                    sa.Column('project_id', sa.INTEGER(), autoincrement=False, nullable=True),
                    sa.Column('project_tag_id', sa.INTEGER(), autoincrement=False, nullable=True),
                    sa.ForeignKeyConstraint(['project_id'], ['projects.id'],
                                            name='project_tags_association_table_project_id_fkey'),
                    sa.ForeignKeyConstraint(['project_tag_id'], ['project_tags.id'],
                                            name='project_tags_association_table_project_tag_id_fkey')
                    )
    op.drop_table('project_request_service_association')
    op.drop_index(op.f('ix_project_request_hard_deadline'), table_name='project_request')
    op.drop_index(op.f('ix_project_request_budget_id'), table_name='project_request')
    op.drop_table('project_request')
    op.drop_table('ref_source')
    op.drop_table('project_service')
    op.drop_table('project_budget')
    # ### end Alembic commands ###