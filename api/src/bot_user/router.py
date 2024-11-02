from fastapi import APIRouter, status

from ..core.db.dependencies import uowDEP

from .schemas import BotUserCreate, BotUserShow
from .service import BotUserService


router = APIRouter(
    prefix="/bot_user",
    tags=["Bot User"],
)


@router.post(
    "/create_or_update/",
    status_code=status.HTTP_200_OK,
    response_model=BotUserShow,
)
async def create_or_update_bot_user(
    data: BotUserCreate,
    uow: uowDEP,
) -> BotUserShow:
    return await BotUserService(uow).create_or_update_bot_user(data)


@router.get(
    "/get/{user_id}",
    status_code=status.HTTP_200_OK,
    response_model=BotUserShow,
)
async def get_bot_user_by_user_id(
    user_id: int,
    uow: uowDEP,
) -> BotUserShow:
    return await BotUserService(uow).get_bot_user_by_user_id(user_id)
