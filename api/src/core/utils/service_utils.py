from fastapi.responses import JSONResponse
from fastapi import status


async def json_response_with_400_error(error: str):
    return JSONResponse(content={
        'error': error
    }, status_code=status.HTTP_400_BAD_REQUEST)
