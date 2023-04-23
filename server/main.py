from fastapi import FastAPI

from server.app import models, auth
from server.config.db import engine
from server.config.settings import settings

app = FastAPI(
    name=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION
)


@app.on_event('startup')
async def startup_event():
    # models.Base.metadata.drop_all(engine)
    # models.Base.metadata.create_all(engine)
    app.include_router(auth)


print("salom")
