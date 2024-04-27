from sqlalchemy import (
    exists,
    or_,
    select,
    update,
    insert,
)
from sqlalchemy.ext.asyncio import AsyncSession

from .generic import GenericRepository

from ..customer.models import Customer
from ..customer.schemas import (
    CustomerCreate,
    CustomerUpdate,
    CustomerCreateOrUpdate,
)


class CustomerRepository(
    GenericRepository[Customer, CustomerCreate, CustomerUpdate]
):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, Customer)

    async def create_or_update(self, data: CustomerCreateOrUpdate) -> Customer:
        query = select(self.model).where(self.model.email == data.email)
        res = await self.session.execute(query)
        customer = res.scalar_one_or_none()

        data = data.model_dump(exclude_unset=True)
        company_website = data.get("company_website")
        if company_website:
            data["company_website"] = str(company_website)

        if customer:
            stmt = (
                update(self.model)
                .where(self.model.id == customer.id)
                .values(**data)
                .returning(self.model.id)
            )
        else:
            stmt = insert(self.model).values(**data).returning(self.model.id)

        res = await self.session.execute(stmt)
        return res.scalar_one()
