import os

from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")


class DebugHelper:
    @property
    def debug(self):
        return os.getenv("DEBUG") == "True"

    def get_dotenv_path_by_debug(self):
        env_file = ".env.local" if self.debug else ".env.production"
        try:
            # trying to open file by path
            # to check if file exists, if not - raise error
            open(env_file)
        except FileNotFoundError:
            raise ValueError(f"No such file or directory: {env_file}")
        return env_file
