from functools import lru_cache

from pydantic import Field, field_validator
from pydantic import PostgresDsn
from pydantic_settings import BaseSettings
from pydantic_core.core_schema import ValidationInfo

from .helpers import DotenvListHelper, load_environment


class CorsSettings(BaseSettings):
    origins: str = Field(alias="cors_origins")

    @field_validator("origins")
    def assemble_cors_origins(cls, v: str) -> list[str]:
        return DotenvListHelper.get_list_from_value(v)


class DBSettings(BaseSettings):
    name: str = Field(alias="db_name")
    user: str = Field(alias="db_user")
    password: str = Field(alias="db_password")
    host: str = Field(alias="db_host")
    port: int = Field(alias="db_port")
    scheme: str = Field(alias="db_scheme")
    async_connect: bool = Field(alias="db_async_connect", default=True)
    url: str | None = Field(alias="db_url", default=None)

    @field_validator("url", mode="plain")
    @classmethod
    def assemble_db_url(
        cls, v: PostgresDsn | None, validation_info: ValidationInfo
    ) -> str:
        if v is not None:
            return v

        values = validation_info.data
        path = f"/{values['name']}"
        if values["async_connect"]:
            path += "?async_fallback=true"

        return PostgresDsn.build(
            scheme=values["scheme"],
            username=values["user"],
            password=values["password"],
            host=values["host"],
            port=values["port"],
            path=path,
        )


class Settings(BaseSettings):
    app_name: str = "CodeSynth API"
    app_version: int | float = 1
    debug: bool = True
    secret_key: str

    # DOMAIN AND PROTOCOL
    domain: str = "localhost:8000"
    protocol: str = "http"

    # CORS
    cors: CorsSettings = Field(default_factory=CorsSettings)

    # DATABASE SETTINGS
    db: DBSettings = Field(default_factory=DBSettings)


@lru_cache
def get_settings() -> Settings:
    load_environment()
    return Settings()


settings = get_settings()
