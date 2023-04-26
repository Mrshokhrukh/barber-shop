from pyclbr import Class

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models, auth
from config.db import engine
from config.settings import settings

app = FastAPI(
    name=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION
)

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.on_event('startup')
async def startup_event():
    # models.Base.metadata.drop_all(engine)
    # models.Base.metadata.create_all(engine)
    app.include_router(auth)
