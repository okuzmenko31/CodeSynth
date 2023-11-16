from .dataclasses import ReturnData
from .exceptions import ServiceMethodsException


def handle_errors(func):
    async def wrapper(*args, **kwargs) -> ReturnData:
        try:
            return ReturnData(
                result=await func(*args, **kwargs)
            )
        except Exception as e:
            raise ServiceMethodsException(func=func, error=e)

    return wrapper
