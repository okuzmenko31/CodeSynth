class ServiceMethodsException(Exception):

    def __init__(self, func):
        self.add_note(f'Something went wrong in calling function/method {func}')
