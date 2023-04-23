from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from server.app import schemas
from server.app.services import register_worker, get_users_worker
from server.config.db import get_db

auth = APIRouter(tags=['auth'])


@auth.post('/register', summary='Register with email')
async def register(form: schemas.Register, db: Session = Depends(get_db)):
    user = await register_worker(form, db)
    return user


@auth.get('/get-users', summary='get all users')
async def get_users(db: Session = Depends(get_db)):
    users = await get_users_worker(db)
    return users
