from typing import NamedTuple, Optional


class ResultData(NamedTuple):
    data: Optional[dict] = None
    error: Optional[str] = None


def handle_errors(func):
    async def wrapper(*args, **kwargs):
        try:
            return ResultData(
                data={
                    'result': await func(*args, **kwargs)
                }
            )
        except (Exception,):
            return ResultData(error='Something went wrong... Please, try again.')

    return wrapper
