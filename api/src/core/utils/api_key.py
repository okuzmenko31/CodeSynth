from fastapi.security.api_key import APIKeyQuery
from fastapi import HTTPException, Security

from ..config import settings

api_key_header = APIKeyQuery(name="api_key", auto_error=False)


async def get_api_key(api_key_header_value: str = Security(api_key_header)):
    if api_key_header_value != settings.api_key:
        raise HTTPException(
            status_code=401,
            detail="Invalid or missing API Key",
        )
    return api_key_header_value
