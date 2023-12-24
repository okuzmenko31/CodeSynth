from dotenv import load_dotenv

from pydantic import Field
from pydantic_settings import BaseSettings

from .debug_helper import DebugHelper

dbg = DebugHelper()

load_dotenv(dotenv_path=dbg.get_dotenv_path_by_debug())


class DBSettings(BaseSettings):
    database_url: str = Field(
        "postgresql+asyncpg://postgres:password@localhost:5432/db_name?async_fallback=true",
        json_schema_extra={"env": "DATABASE_URL"},
    )
    db_name: str = Field(
        "db_name",
        json_schema_extra={"env": "DB_NAME"},
    )
    db_user: str = Field(
        "user",
        json_schema_extra={"env": "DB_USER"},
    )
    db_password: str = Field(
        "password",
        json_schema_extra={"env": "DB_PASSWORD"},
    )
    db_host: str = Field(
        "localhost",
        json_schema_extra={
            "env": "DB_HOST",
        },
    )
    db_port: str = Field(
        "5432",
        json_schema_extra={
            "env": "DB_PORT",
        },
    )


class JWTTokensSettings(BaseSettings):
    access_token_expire_minutes: int = Field(
        "access_token_expire_minutes",
        json_schema_extra={
            "env": "ACCESS_TOKEN_EXPIRE_MINUTES",
        },
    )
    refresh_token_expire_minutes: int = Field(
        "refresh_token_expire_minutes",
        json_schema_extra={
            "env": "REFRESH_TOKEN_EXPIRE_MINUTES",
        },
    )
    jwt_algorithm: str = Field(
        "jwt_algorithm",
        json_schema_extra={
            "env": "JWT_ALGORITHM",
        },
    )


class DomainSettings(BaseSettings):
    backend_domain: str = Field(
        "backend_domain",
        json_schema_extra={"env": "BACKEND_DOMAIN"},
    )
    backend_domain_with_protocol: str = Field(
        "backend_domain_with_protocol",
        json_schema_extra={
            "env": "BACKEND_DOMAIN_WITH_PROTOCOL",
        },
    )
    frontend_domain: str = Field(
        "frontend_domain",
        json_schema_extra={
            "env": "FRONTEND_DOMAIN",
        },
    )
    frontend_domain_with_protocol: str = Field(
        "frontend_domain_with_protocol",
        json_schema_extra={
            "env": "FRONTEND_DOMAIN_WITH_PROTOCOL",
        },
    )


class MediaFilesSettings(BaseSettings):
    media_file_path_start: str = Field(
        "media_file_path_start",
        json_schema_extra={
            "env": "MEDIA_FILE_PATH_START",
        },
    )
    media_directory: str = Field(
        "media_directory",
        json_schema_extra={"env": "MEDIA_DIRECTORY"},
    )
    media_name: str = Field(
        "media_name",
        json_schema_extra={"env": "MEDIA_NAME"},
    )


class PaginationSettings(BaseSettings):
    limit_per_page: int = Field(
        "limit_per_page",
        json_schema_extra={"env": "LIMIT_PER_PAGE"},
    )


class CachingSettings(BaseSettings):
    use_redis: bool = Field(
        "use_redis",
        json_schema_extra={"env": "USE_REDIS"},
    )
    redis_url: str = Field("redis_url")


class MainSettings(BaseSettings):
    debug: bool = dbg.debug
    secret_key: str = Field(
        "secret_key",
        json_schema_extra={"env": "SECRET_KEY"},
    )
    secure_protocol: bool = Field(
        "secure_protocol",
        json_schema_extra={"env": "SECURE_PROTOCOL"},
    )
    api_key: str = Field(
        "api_key"
    )

    # DATABASE
    db: DBSettings = Field(default_factory=DBSettings)

    # JWT TOKENS
    jwt: JWTTokensSettings = Field(default_factory=JWTTokensSettings)

    # DOMAINS
    domains: DomainSettings = Field(default_factory=DomainSettings)

    # MEDIA FILES
    media: MediaFilesSettings = Field(default_factory=MediaFilesSettings)

    # PAGINATION
    pagination: PaginationSettings = Field(default_factory=PaginationSettings)

    # CACHING
    caching: CachingSettings = Field(default_factory=CachingSettings)


settings = MainSettings()
