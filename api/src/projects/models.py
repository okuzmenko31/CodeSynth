from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Table, Column, ForeignKey, Text

from src.core.database import Base

# Association table for M2M relationship between Projects and Project Tags
project_tags_association_table = Table(
    'project_tags_association_table',
    Base.metadata,
    Column('project_id', ForeignKey('projects.id')),
    Column('project_tag_id', ForeignKey('project_tags.id'))
)


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


class Project(Base):
    __tablename__ = 'projects'  # noqa

    id: Mapped[int] = mapped_column(primary_key=True,
                                    autoincrement=True)
    name: Mapped[str] = mapped_column(String(250),
                                      nullable=False)
    preview_image: Mapped[str] = mapped_column(nullable=False)
    source_link: Mapped[str] = mapped_column(nullable=True)
    tags: Mapped[list[ProjectTag]] = relationship(
        secondary=project_tags_association_table,
        cascade=''
    )
    text: Mapped[str] = mapped_column(Text, nullable=False)

    def __repr__(self):
        return f'Project: {self.name}'

    def __str__(self):
        return self.__repr__()
