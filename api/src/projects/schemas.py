from typing import Optional

from src.core.schemas import MainSchema


class ProjectTagSchema(MainSchema):
    name: str
    img: str


class ProjectTagReturnSchema(ProjectTagSchema):
    id: int


class ProjectSchema(MainSchema):
    name: str
    filter_type_id: int
    preview_image: Optional[str] = None
    source_link: str
    tags: list[int]
    text: str


class ProjectReturnSchema(ProjectSchema):
    id: int
    tags: list[ProjectTagSchema]
    filter_type: Optional[str] = None


class ProjectFilterTypeSchema(MainSchema):
    name: str


class ProjectFilterTypesSchema(MainSchema):
    filter_types: list[int]
