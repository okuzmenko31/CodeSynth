from sqlalchemy.orm import Mapped, mapped_column

from src.core.database import Base


class JWTTokensBlackList(Base):
    __tablename__ = 'jwt_tokens_blacklist'

    id: Mapped[int] = mapped_column(primary_key=True,
                                    autoincrement=True)
    jwt_token: Mapped[str] = mapped_column(nullable=False)

    def __repr__(self):
        return f'Id: {self.id}. Token: {self.jwt_token}'
