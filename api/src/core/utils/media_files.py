import shutil

from src.core.config import settings


async def get_media_file_link(filename: str):
    link_start = f'{settings.domains.backend_domain_with_protocol}/{settings.media.media_directory}'
    return link_start + f'/{filename}'


async def save_media_file(file):
    with open(f'media/{file.filename}', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
