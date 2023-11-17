from typing import Optional, Any

from dataclasses import dataclass


@dataclass
class ReturnData:
    result: Optional[Any] = None
    error: Optional[str] = None


@dataclass
class ProjectUpdateData:
    name: Optional[str] = None,
    filter_type_id: Optional[int] = None,
    source_link: Optional[str] = None,
    text: Optional[str] = None,
    preview_image: Optional[Any] = None
