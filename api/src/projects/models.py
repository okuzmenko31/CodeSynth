from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Table, Column, ForeignKey, Text, UniqueConstraint

from src.core.database import Base


# Association table for M2M relationship between Projects and Project Tags
class ProjectAssociation(Base):
    __tablename__ = 'project_tags_association'  # noqa
    __table_args__ = (
        UniqueConstraint(
            'project_id',
            'project_tag_id',
            name='idx_unique_project_tag'
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    project_id: Mapped[int] = mapped_column(
        ForeignKey('projects.id', ondelete='CASCADE')
    )
    project_tag_id: Mapped[int] = mapped_column(ForeignKey('project_tags.id'))


class ProjectTag(Base):
    __tablename__ = 'project_tags'  # noqa

    id: Mapped[int] = mapped_column(primary_key=True,
                                    autoincrement=True)
    name: Mapped[str] = mapped_column(String(45),
                                      nullable=False)
    img: Mapped[str] = mapped_column(nullable=False)

    def __repr__(self):
        return f'Tag: {self.name}. Image: {self.img}'

    def __str__(self):
        return self.__repr__()


class ProjectFilterType(Base):
    __tablename__ = 'project_filter_types'  # noqa

    id: Mapped[int] = mapped_column(primary_key=True,
                                    autoincrement=True)
    name: Mapped[str] = mapped_column(String(150),
                                      unique=True,
                                      nullable=False)

    def __repr__(self):
        return f'Type: {self.name}'

    def __str__(self):
        return self.__repr__()


class Project(Base):
    __tablename__ = 'projects'  # noqa

    id: Mapped[int] = mapped_column(primary_key=True,
                                    autoincrement=True)
    name: Mapped[str] = mapped_column(String(250),
                                      nullable=False)
    preview_image: Mapped[str] = mapped_column(nullable=False)
    source_link: Mapped[str] = mapped_column(nullable=True)
    tags: Mapped[list[ProjectTag]] = relationship(
        secondary='project_tags_association',
        lazy='selectin'
    )
    filter_type_id: Mapped[int] = mapped_column(ForeignKey('project_filter_types.id'))
    filter_type: Mapped[ProjectFilterType] = relationship(lazy='joined')
    text: Mapped[str] = mapped_column(Text, nullable=False)

    def __repr__(self):
        return f'Project: {self.name}'

    def __str__(self):
        return self.__repr__()
