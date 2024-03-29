from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings


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

# Include routers
ROUTERS: list[APIRouter] = []
for router in ROUTERS:
    app.include_router(router, prefix=f"/api/v{settings.app_version}")
