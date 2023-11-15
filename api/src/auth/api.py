from fastapi import APIRouter, status
from starlette.responses import JSONResponse

from .schemas import AdminSecretKeySchema, AccessOrRefreshTokenSchema
from .services import (AdminAuthService,
                       JWTBlackListTokensService,
                       TokensVerifyService, JwtTokensMixin)

from src.core.utils.dependencies import uowDEP

router = APIRouter(
    prefix='/auth',
    tags=['Auth']
)


@router.post('/admin/')
async def admin_auth(data: AdminSecretKeySchema):
    service = AdminAuthService()
    tokens_data, error = await service.authenticate_admin(data.secret_key)
    if error is not None:
        return JSONResponse(content={
            'error': error
        }, status_code=status.HTTP_400_BAD_REQUEST)
    return JSONResponse(content=tokens_data, status_code=status.HTTP_200_OK)


@router.post('/admin/access_token_verify/')
async def verify_access_token(
        data: AccessOrRefreshTokenSchema,
        uow: uowDEP
):
    blacklist_service = JWTBlackListTokensService(uow)
    verify_service = TokensVerifyService()

    token = data.access_or_refresh_token
    if await blacklist_service.token_in_blacklist(token):
        return JSONResponse(content={
            'error': 'This token is not valid. It was deleted after logging out.'
        }, status_code=status.HTTP_400_BAD_REQUEST)

    if await verify_service.check_token_expired(token):
        return JSONResponse(content={
            'error': 'This token is invalid or expired!'
        }, status_code=status.HTTP_400_BAD_REQUEST)
    return JSONResponse(content=True, status_code=status.HTTP_200_OK)


@router.post('/admin/access_token_from_refresh/')
async def get_access_token_from_refresh(
        data: AccessOrRefreshTokenSchema,
        uow: uowDEP
):
    blacklist_service = JWTBlackListTokensService(uow)
    verify_service = TokensVerifyService()
    tokens_mixin = JwtTokensMixin()

    token = data.access_or_refresh_token
    if await blacklist_service.token_in_blacklist(token):
        return JSONResponse(content={
            'error': 'This token is already used!'
        }, status_code=status.HTTP_400_BAD_REQUEST)

    if await verify_service.check_token_expired(token):
        return JSONResponse(content={
            'error': 'This token is invalid or expired!'
        }, status_code=status.HTTP_400_BAD_REQUEST)

    data = {
        'access_token': await tokens_mixin.generate_access_token()
    }
    await blacklist_service.add_token_to_blacklist(token)
    return JSONResponse(content=data, status_code=status.HTTP_200_OK)


@router.post('/admin/logout/')
async def admin_logout(
        data: AccessOrRefreshTokenSchema,
        uow: uowDEP
):
    service = JWTBlackListTokensService(uow)
    token_id = await service.add_token_to_blacklist(data.access_or_refresh_token)
    return JSONResponse(content={
        'success': 'You successfully logged out!',
        'token_id': token_id
    }, status_code=status.HTTP_200_OK)
