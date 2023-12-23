from fastapi import APIRouter, status
from starlette.responses import JSONResponse

from .schemas import *
from .services import (
    AdminAuthService,
    JWTBlackListTokensService,
    TokensVerifyService,
    JWTTokensService,
)

from ..core.utils.service_utils import json_response_with_400_error

from ..core.utils.dependencies import uowDEP

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/admin/", response_model=AccessAndRefreshTokensSchema)
async def admin_auth(data: AdminSecretKeySchema):
    return_data = await AdminAuthService().authenticate_admin(data.secret_key)
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.post("/admin/token_verify/", response_model=bool)
async def verify_token(data: AccessOrRefreshTokenSchema, uow: uowDEP):
    return_data = await TokensVerifyService(uow).verify_token(
        data.access_or_refresh_token
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.post(
    "/admin/access_token_from_refresh/", response_model=AccessTokenReturnSchema
)
async def get_access_token_from_refresh(data: AccessOrRefreshTokenSchema, uow: uowDEP):
    return_data = await JWTTokensService(uow).get_access_from_refresh(
        data.access_or_refresh_token
    )
    if return_data.error is not None:
        return await json_response_with_400_error(return_data.error)
    return return_data.result


@router.post("/admin/logout/", response_model=bool)
async def admin_logout(data: AccessOrRefreshTokenSchema, uow: uowDEP):
    await JWTBlackListTokensService(uow).add_token_to_blacklist(
        data.access_or_refresh_token
    )
    return JSONResponse(content=True, status_code=status.HTTP_200_OK)
