from sqlalchemy.orm import Mapped, mapped_column

from ..core.database import Base


class Faq(Base):
    __tablename__ = "faqs"  # noqa

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(nullable=False)
    answer: Mapped[str] = mapped_column(nullable=False)

    def __rep__(self):
        return f"Faq: {self.title}"
