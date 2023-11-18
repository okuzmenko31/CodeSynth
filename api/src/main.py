from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from fastapi_pagination import add_pagination

from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend

from redis import asyncio as aioredis

# from src.api_key import get_api_key
from src.core.config import settings

from src.auth.api import router as auth_router
from src.projects.api import router as projects_router

origins = ['http://localhost:3000']

routers = [auth_router, projects_router]

app = FastAPI(
    title='Portfolio'
)
app.mount(
    f'/{settings.media.media_file_path_start}',
    StaticFiles(directory=f'{settings.media.media_directory}'),
    name=f'{settings.media.media_name}'
)

for router in routers:
    app.include_router(router, prefix='/api/v1')

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

# Adding pagination to the app
add_pagination(app)


# @app.on_event('startup')
# async def startup():
#     redis = aioredis.from_url("redis://localhost")
#     FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
