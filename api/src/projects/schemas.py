from src.core.schemas import MainSchema


class ProjectTagSchema(MainSchema):
    name: str
    img: str


class ProjectSchema(MainSchema):
    name: str
    source_link: str
    tags: list[int]
    text: str
