from pydantic import BaseModel


class MainSchema(BaseModel):
    class Config:
        from_attributes = True


class InstancesIDSListSchema(MainSchema):
    ids: list[int]
