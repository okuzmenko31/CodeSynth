from abc import ABC, abstractmethod

from src.core.database import async_session_maker

# from src.core.repositories.repos import UserRepository


class AbstractUnitOfWork(ABC):
    # users: UserRepository

    @abstractmethod
    async def __aenter__(self):
        raise NotImplementedError()

    @abstractmethod
    async def __aexit__(self, *args):
        raise NotImplementedError()

    @abstractmethod
    async def commit(self):
        raise NotImplementedError()

    @abstractmethod
    async def rollback(self):
        raise NotImplementedError()


class UnitOfWork(AbstractUnitOfWork):

    async def __aenter__(self):
        self.session = async_session_maker()

        # self.users = UserRepository(self.session)

    async def __aexit__(self, *args):
        await self.rollback()
        await self.session.close()

    async def commit(self):
        await self.session.commit()

    async def rollback(self):
        await self.session.rollback()
