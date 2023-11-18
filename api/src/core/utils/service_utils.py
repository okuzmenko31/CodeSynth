from fastapi.responses import JSONResponse
from fastapi import status

from .dataclasses import ReturnData


async def json_response_with_400_error(error: str):
    return JSONResponse(content={
        'error': error
    }, status_code=status.HTTP_400_BAD_REQUEST)


async def return_data_err_object_does_not_exist(obj: str) -> ReturnData:
    return ReturnData(error=f'This {obj} doesn\'t exist!')  # noqa
