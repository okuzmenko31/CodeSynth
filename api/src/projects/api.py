import shutil

from fastapi import APIRouter, UploadFile, File

router = APIRouter(
    prefix='/projects'
)


@router.post('/upload/')
async def upload_file(file: UploadFile = File(...)):
    with open(f'media/{file.filename}', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {'1': 1}
