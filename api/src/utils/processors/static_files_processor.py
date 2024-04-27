import shutil
import unicodedata
import re
import logging

from fastapi import UploadFile

from .dataclasses import StaticFileProcessResponse
from ..exceptions.processors.static import StaticFilesProcessException
from ...core.config import settings


log = logging.getLogger(__name__)


class StaticFilesProcessor:
    def __init__(self, base_url: str, uploaded_file: UploadFile) -> None:
        self.base_url = base_url
        self.file = uploaded_file

    @property
    def file_format(self) -> str:
        return self.file.filename.split(".")[-1]

    @property
    def filename(self) -> str:
        return self.file.filename.replace(f".{self.file_format}", "")

    @property
    def full_filename(self) -> str:
        return f"{self._normalize_filename(self.filename)}.{self.file_format}"

    def _normalize_filename(self, filename: str) -> str:
        value = (
            unicodedata.normalize("NFKD", filename)
            .encode("ascii", "ignore")
            .decode("ascii")
        )
        value = re.sub(r"[^\w\s-]", "", value.lower())
        return re.sub(r"[-\s]+", "-", value).strip("-_")

    async def _process_file(self) -> str:
        try:
            with open(
                f"{settings.static.directory}/{self.full_filename}", "wb"
            ) as buffer:
                shutil.copyfileobj(self.file.file, buffer)
        except Exception as e:
            log.exception(e)
            raise StaticFilesProcessException("Error processing file")

    async def _get_file_link(self) -> str:
        return (
            f"{self.base_url}{settings.static.directory}/{self.full_filename}"
        )

    async def process(self) -> StaticFileProcessResponse:
        await self._process_file()
        return StaticFileProcessResponse(
            link=await self._get_file_link(),
        )
