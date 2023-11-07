from dotenv import load_dotenv

from pydantic import Field
from pydantic_settings import BaseSettings

from .debug_helper import DebugHelper

dbg = DebugHelper()

load_dotenv(dotenv_path=dbg.get_dotenv_path_by_debug())


class DBSettings(BaseSettings):
    database_url: str = Field(
        'postgresql+asyncpg://postgres:password@localhost:5432/db_name?async_fallback=true',
        json_schema_extra={'env': 'DATABASE_URL'}
    )
    db_name: str = Field('db_name', json_schema_extra={'env': 'DB_NAME'})
    db_user: str = Field('user', json_schema_extra={'env': 'DB_USER'})
    db_password: str = Field('password', json_schema_extra={'env': 'DB_PASSWORD'})
    db_host: str = Field('localhost', json_schema_extra={'env': 'DB_HOST'})
    db_port: str = Field('5432', json_schema_extra={'env': 'DB_PORT'})


class MainSettings(BaseSettings):
    debug: bool = dbg.debug
    secret_key: str = Field(
        'secret_key', json_schema_extra={'env': 'SECRET_KEY'}
    )
    secure_protocol: bool = Field(
        'secure_protocol', json_schema_extra={'env': 'SECURE_PROTOCOL'}
    )

    # DATABASE
    db: DBSettings = Field(default_factory=DBSettings)


settings = MainSettings()
print(settings.secure_protocol)
