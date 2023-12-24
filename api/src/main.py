from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from fastapi_pagination import add_pagination

from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.backends.inmemory import InMemoryBackend

from redis import asyncio as aioredis

from .core.utils.api_key import get_api_key
from .core.config import settings

from .auth.api import router as auth_router
from .projects.api import router as projects_router
from .project_requests.api import router as project_requests_router

origins = ["http://localhost:3000"]

routers = [auth_router, projects_router, project_requests_router]


@asynccontextmanager
async def lifespan(app: FastAPI):  # noqa
    caching_backend = InMemoryBackend()
    if settings.caching.use_redis:
        redis = aioredis.from_url(settings.caching.redis_url)
        caching_backend = RedisBackend(redis)
    FastAPICache.init(caching_backend, prefix="fastapi-cache")
    yield


app = FastAPI(
    title="CodeSynth",
    lifespan=lifespan,
    dependencies=[Depends(get_api_key)],
)
app.mount(
    f"/{settings.media.media_file_path_start}",
    StaticFiles(directory=f"{settings.media.media_directory}"),
    name=f"{settings.media.media_name}",
)

for router in routers:
    app.include_router(router, prefix="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Adding pagination to the app
add_pagination(app)
