from typing import Optional

from src.core.schemas import MainSchema


class ProjectTagSchema(MainSchema):
    name: str
    img: str


class ProjectTagReturnSchema(ProjectTagSchema):
    id: int


class ProjectSchemaUpdate(MainSchema):
    name: Optional[str] = None
    img: Optional[str] = None


class ProjectSchema(MainSchema):
    name: str
    filter_type_id: int
    preview_image: Optional[str] = None
    source_link: str
    tags: list[int]
    text: str


class ProjectUpdateSchema(MainSchema):
    name: Optional[str] = None
    filter_type_id: Optional[int] = None
    preview_image: Optional[str] = None
    source_link: Optional[str] = None
    text: Optional[str] = None


class ProjectTagsUpdateSchema(MainSchema):
    tags: list[int]


class ProjectReturnSchema(ProjectSchema):
    id: int
    tags: list[ProjectTagReturnSchema]
    filter_type: Optional[str] = None


class ProjectFilterTypeSchema(MainSchema):
    name: str


class ProjectFilterTypeReturnSchema(ProjectFilterTypeSchema):
    id: int


class ProjectFilterTypesSchema(MainSchema):
    filter_types: list[int]
