from .dataclasses import ReturnData
from .exceptions import ServiceMethodsException


def handle_errors(func):
    async def wrapper(*args, **kwargs) -> ReturnData:
        try:
            func_result = await func(*args, **kwargs)
            if isinstance(func_result, ReturnData):
                return func_result
            return ReturnData(
                result=func_result
            )
        except Exception as e:
            raise ServiceMethodsException(func=func, error=e)

    return wrapper


def handle_caching():
    pass
