import uuid

from sqlalchemy.orm import as_declarative
from sqlalchemy.orm import declared_attr


@as_declarative()
class Base:
    id: uuid.UUID | int

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
