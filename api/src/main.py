from contextlib import asynccontextmanager

from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from sqladmin import Admin

from .core.config import settings
from .core.db.session import (
    get_async_engine,
    create_async_session_maker,
)

from .admin.model_views import get_model_views
from .admin.auth import authentication_backend

from .project_order.router import router as project_order_router
from .bot_user.router import router as bot_user_router


# Lifespan events
@asynccontextmanager
async def lifespan(app: FastAPI):  # noqa
    yield


# App configuration
app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
    version=str(settings.app_version),
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static directory
app.mount(
    f"/{settings.static.directory}",
    StaticFiles(directory=settings.static.directory),
)

# Include routers
ROUTERS: list[APIRouter] = [
    project_order_router,
    bot_user_router,
]
for router in ROUTERS:
    app.include_router(router, prefix=f"/api/v{settings.app_version}")

# Admin panel
admin = Admin(
    app,
    engine=get_async_engine(),
    session_maker=create_async_session_maker(),
    authentication_backend=authentication_backend,
    title=settings.app_name,
)
for model_view in get_model_views():
    admin.add_view(model_view)
