from enum import Enum


class STMTOperations(str, Enum):
    select = 'select'
    exists = 'exists'
    update = 'update'
    delete = 'delete'
    insert = 'insert'


class InstanceTypes(str, Enum):
    project = 'project'
    filter_type = 'filter type'
    project_tag = 'tag'


class ProjectTagsListOperations(str, Enum):
    append = 'append'
    remove = 'remove'
