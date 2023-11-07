from src.auth.models import JWTTokensBlackList
from src.core.utils.repository import SQLAlchemyRepository


class JWTTokensBlackListRepository(SQLAlchemyRepository):
    model = JWTTokensBlackList
