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
    project_service = 'service'
    project_budget = 'budget'
    project_request = 'request'
    project_ref_source = 'ref source'


class ModelRelatedListOperations(str, Enum):
    append = 'append'
    remove = 'remove'
