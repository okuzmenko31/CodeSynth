from .config import settings

from sqlalchemy.orm import declarative_base
from sqlalchemy.ext.asyncio import (create_async_engine,
                                    async_sessionmaker,
                                    AsyncEngine)

engine: AsyncEngine = create_async_engine(settings.db.database_url,
                                          future=True,
                                          echo=True)

async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

Base = declarative_base()
