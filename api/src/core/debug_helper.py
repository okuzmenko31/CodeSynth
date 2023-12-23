import os

from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")


class DebugHelper:
    debug = os.getenv("DEBUG") == "True"
    dotenv_main_path = ".env"

    def get_dotenv_path_by_debug(self):
        if self.debug:
            return self.dotenv_main_path + ".local"
        return self.dotenv_main_path + ".production"
