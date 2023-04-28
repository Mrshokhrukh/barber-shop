from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy.orm import Session

from app import schemas
from app.services import add_master_worker, get_users_worker, login_user_worker, get_time_worker, save_image_worker
from config.db import get_db

auth = APIRouter(tags=['auth'])


@auth.post('/add-master', summary='Register with phone')
async def add_master(file: UploadFile, schema: schemas.Register, db: Session = Depends(get_db)):
    user = await add_master_worker(file, schema, db)
    return user


@auth.get('/get-users', summary='get all users')
async def get_users(db: Session = Depends(get_db)):
    users = await get_users_worker(db)
    return users


@auth.post('/login', summary='login')
async def login(form: schemas.Login, db: Session = Depends(get_db)):
    user = await login_user_worker(db, form)
    return user

#
# @auth.get('/time/{pk}', summary='get free time for master')
# async def get_time(pk: int, db: Session = Depends(get_db)):
#     response = await get_time_worker(db, pk)
#     return response


# @auth.post('/image', summary='upload image')
# async def upload_image(file: UploadFile, db: Session = Depends(get_db)):
#     print(file.filename)
#     response = await save_image_worker(file, db)
#     return response
