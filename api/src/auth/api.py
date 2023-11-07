from fastapi import APIRouter, status
from starlette.responses import JSONResponse

from .schemas import AdminSecretKeySchema
from .services import AdminAuthService

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
