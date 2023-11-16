from abc import ABC, abstractmethod

from src.core.database import async_session_maker

from src.core.repositories.repos import (JWTTokensBlackListRepository,
                                         ProjectRepository,
                                         ProjectTagRepository,
                                         ProjectFilterTypeRepository)


class AbstractUnitOfWork(ABC):
    jwt_black_list: JWTTokensBlackListRepository
    projects: ProjectRepository
    project_tags: ProjectTagRepository
    project_types: ProjectFilterTypeRepository

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

    @abstractmethod
    async def expunge(self, instance):
        raise NotImplementedError()

    async def add(self, instance):
        raise NotImplementedError()

    async def refresh(self, instance, attribute_names: list):
        raise NotImplementedError()


class UnitOfWork(AbstractUnitOfWork):

    async def __aenter__(self):
        self.session = async_session_maker()

        self.jwt_black_list = JWTTokensBlackListRepository(self.session)
        self.projects = ProjectRepository(self.session)
        self.project_tags = ProjectTagRepository(self.session)
        self.project_types = ProjectFilterTypeRepository(self.session)

    async def __aexit__(self, *args):
        await self.rollback()
        await self.session.close()

    async def add(self, instance):
        self.session.add(instance)

    async def commit(self):
        await self.session.commit()

    async def rollback(self):
        await self.session.rollback()

    async def expunge(self, instance):
        self.session.expunge(instance)

    async def refresh(self, instance, attribute_names: list):
        await self.session.refresh(instance, attribute_names)
