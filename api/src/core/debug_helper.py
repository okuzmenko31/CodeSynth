import os

from dotenv import load_dotenv

load_dotenv(dotenv_path='../../.env.main')


class DebugHelper:
    debug = os.getenv('DEBUG') == 'True'
    dotenv_main_path = '../../.env.level'

    def get_dotenv_path_by_debug(self):
        if self.debug:
            return self.dotenv_main_path.replace('level', 'local')
        return self.dotenv_main_path.replace('level', 'production')
