from typing import Annotated
from fastapi import Depends

from .unitofwork import AbstractUnitOfWork, UnitOfWork


uowDEP = Annotated[AbstractUnitOfWork, Depends(UnitOfWork)]
