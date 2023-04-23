from fastapi import FastAPI

from app import models, auth
from config.db import engine
from config.settings import settings

app = FastAPI(
    name=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION
)

print('hello')

print('hello')


@app.on_event('startup')
async def startup_event():
    # models.Base.metadata.drop_all(engine)
    # models.Base.metadata.create_all(engine)
    app.include_router(auth)
