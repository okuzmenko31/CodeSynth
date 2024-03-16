from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    AsyncEngine,
    create_async_engine,
    async_sessionmaker,
)

from ..config import settings


def get_async_engine() -> AsyncEngine:
    return create_async_engine(
        settings.db.url,
        future=True,
        echo=True,
        pool_pre_ping=True,
        pool_size=15,
        max_overflow=15,
    )


def create_async_session_maker() -> async_sessionmaker:
    engine: AsyncEngine = get_async_engine()
    return async_sessionmaker(engine, autoflush=False, expire_on_commit=False)


async def get_async_session(
    session_maker: async_sessionmaker,
) -> AsyncGenerator[AsyncSession, None]:
    async with session_maker() as async_session:
        yield async_session
