import uuid

from sqlalchemy.orm import as_declarative, declared_attr


@as_declarative()
class Base:
    id: uuid.UUID | int
    __label__ = None

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
