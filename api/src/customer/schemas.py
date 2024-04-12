from pydantic import BaseModel, EmailStr, AnyHttpUrl


class CustomerCreate(BaseModel):
    full_name: str
    email: EmailStr
    company: str
    company_website: AnyHttpUrl
