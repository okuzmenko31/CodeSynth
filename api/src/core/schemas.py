from pydantic import BaseModel


class MainSchema(BaseModel):
    class Config:
        from_attributes = True
