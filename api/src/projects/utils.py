from starlette import status, responses


def json_response_with_error(error: str):
    return responses.JSONResponse(
        content={'error': error},
        status_code=status.HTTP_400_BAD_REQUEST
    )
