from pydantic import BaseModel

from ..core.schemas import MainSchema

from .enums import BotUserLanguage


class BotUserCreate(BaseModel):
    user_id: int
    language: BotUserLanguage


class BotUserUpdate(BotUserCreate):
    pass


class BotUserShow(MainSchema):
    id: int
    user_id: int
    language: BotUserLanguage
