from typing import Optional, Any

from dataclasses import dataclass


@dataclass
class ReturnData:
    result: Optional[Any] = None
    error: Optional[str] = None
