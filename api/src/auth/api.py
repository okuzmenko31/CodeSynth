from fastapi import APIRouter, status, Depends
from starlette.responses import JSONResponse

from .schemas import AdminSecretKeySchema, AccessTokenSchema
from .services import AdminAuthService, JWTBlackListTokensService

from src.core.utils.dependencies import uowDEP

router = APIRouter(
    prefix='/auth',
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


@router.post('/admin/logout/')
async def admin_logout(
        data: AccessTokenSchema,
        uow: uowDEP
):
    service = JWTBlackListTokensService(uow)
    token_id = await service.add_token_to_blacklist(data.access_token)
    return JSONResponse(content={
        'success': 'You successfully logged out!',
        'token_id': token_id
    }, status_code=status.HTTP_200_OK)
