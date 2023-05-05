from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session

from app import schemas
from app.services.service_auth import register_worker, activate_email_worker
from config.db import get_db

auth = APIRouter(tags=['auth'])


@auth.post('/register', summary='register user')
async def register(
        background_tasks: BackgroundTasks,
        schema: schemas.RegisterSchema = Depends(schemas.RegisterSchema.as_form),
        db: Session = Depends(get_db)
):
    response = await register_worker(schema, db, background_tasks)
    return response


@auth.post('/activate-email', summary='activate email')
async def activate_email(
        schema: schemas.ActivateSchema = Depends(schemas.ActivateSchema.as_form),
        db: Session = Depends(get_db)
):
    response = await activate_email_worker(schema, db)
    return response
