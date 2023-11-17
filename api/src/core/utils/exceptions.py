class ServiceMethodsException(Exception):

    def __init__(self, func, error):
        self.add_note(
            f'\nSomething went wrong in calling function/method {func}\nError: {error}'
        )
