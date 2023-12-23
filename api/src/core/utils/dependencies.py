from typing import Annotated
from fastapi import Depends

from ...core.utils.unitofwork import AbstractUnitOfWork, UnitOfWork

uowDEP = Annotated[AbstractUnitOfWork, Depends(UnitOfWork)]
