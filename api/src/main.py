from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# from src.api_key import get_api_key
from src.auth.api import router as auth_router
from src.projects.api import router as projects_router

origins = ['http://localhost:3000']

routers = [auth_router, projects_router]

app = FastAPI(
    title='Portfolio'
)
app.mount('/media', StaticFiles(directory='media'), name='media')

for router in routers:
    app.include_router(router, prefix='/api/v1')

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
