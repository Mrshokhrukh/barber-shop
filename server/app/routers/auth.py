from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import schemas
from app.schemas import LoginSchema
from app.services.service_auth import register_worker, activate_email_worker, get_all_users_worker, login_create_token, \
    get_current_user
from config.db import get_db

auth = APIRouter(tags=['auth'])


@auth.post('/register', summary='register user')
async def register(
        schema: schemas.RegisterSchema = Depends(schemas.RegisterSchema.as_form),
        db: Session = Depends(get_db)
):
    response = await register_worker(schema, db)
    return response


@auth.post('/activate-email', summary='activate email')
async def activate_email(
        schema: schemas.ActivateSchema = Depends(schemas.ActivateSchema.as_form),
        db: Session = Depends(get_db)
):
    response = await activate_email_worker(schema, db)
    return response


@auth.get('/all-users', summary='get all users')
async def get_all_users(
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user)
):
    users = await get_all_users_worker(db)
    return users


@auth.post('/login', summary='login')
async def login(form: schemas.LoginSchema = Depends(LoginSchema.as_form), db: Session = Depends(get_db)):
    user = login_create_token(form, db)
    return user
