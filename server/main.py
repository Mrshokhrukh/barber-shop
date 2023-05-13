from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models
from app.routers import master, auth
from app.services.services_master import add_services_worker
from config.db import engine
from config.settings import settings

app = FastAPI(
    docs_url='/',
    name=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION,
    debug=True
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.on_event('startup')
async def startup_event():
    # models.Base.metadata.drop_all(engine)
    # models.Base.metadata.create_all(engine)
    # await add_services_worker()
    app.include_router(auth)
    app.include_router(master)
