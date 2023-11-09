from typing import Optional

from src.core.schemas import MainSchema


class ProjectTagSchema(MainSchema):
    name: str
    img: str


class ProjectSchema(MainSchema):
    name: str
    preview_image: Optional[str] = None
    source_link: str
    tags: list[int]
    text: str


class ProjectReturnSchema(ProjectSchema):
    tags: list[ProjectTagSchema]
