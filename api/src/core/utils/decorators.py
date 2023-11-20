from .dataclasses import ReturnData
from .exceptions import ServiceMethodsException


def handle_errors(func):
    """
    This decorator handles errors while calling
    function and raises 'ServiceMethodsException'
    with beautified exception note. Also, exception
    notes in which function this exception was raised.

    If exception won't be raised, decorator will return
    function calling result wrapped in 'ReturnData'.
    If function calling result is 'ReturnData', decorator
    will return this result without wrapping in another one.

    :param func: function
    :return: 'ReturnData'
    """
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
