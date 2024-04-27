from typing import Optional

from pydantic import BaseModel, EmailStr, AnyHttpUrl


class CustomerCreate(BaseModel):
    full_name: str
    email: EmailStr
    company: str
    company_website: Optional[AnyHttpUrl] = None


class CustomerCreateOrUpdate(CustomerCreate):
    pass


class CustomerUpdate(BaseModel):
    pass
