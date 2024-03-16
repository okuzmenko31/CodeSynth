from .dependencies import uowDEP


class BaseService:
    def __init__(self, uow: uowDEP) -> None:
        self.uow = uow
