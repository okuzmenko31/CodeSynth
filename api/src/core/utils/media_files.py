import shutil
import hashlib

from ...core.config import settings


async def get_media_file_link(filename: str):
    link_start = f'{settings.domains.backend_domain_with_protocol}/{settings.media.media_file_path_start}'
    return link_start + f'/{filename}'


async def save_media_file(file):
    file_format = '.' + file.filename.split('.')[-1]
    hashed_filename = hashlib.sha256(file.filename.encode()).hexdigest() + file_format
    with open(f'media/{hashed_filename}', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
    return hashed_filename
