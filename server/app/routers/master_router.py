from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy.orm import Session

from app import schemas
from app.services import add_master_worker, get_users_worker, login_user_worker, get_time_worker, save_image_worker, \
    get_master_worker
from config.db import get_db

master = APIRouter(tags=['master'])


@master.post('/add-master', summary='Add master with phone')
async def add_master(schema: schemas.Register, db: Session = Depends(get_db)):
    user = await add_master_worker(schema, db)
    return user


@master.get('/get-masters', summary='get all masters')
async def get_users(db: Session = Depends(get_db)):
    users = await get_users_worker(db)
    return users


@master.get('/get-master/{pk}', summary='update master')
async def get_master(pk: int, db: Session = Depends(get_db)):
    response = await get_master_worker(pk, db)
    return response


@master.post('/login', summary='login')
async def login(form: schemas.Login, db: Session = Depends(get_db)):
    user = await login_user_worker(db, form)
    return user

#
# @master.get('/time/{pk}', summary='get free time for master')
# async def get_time(pk: int, db: Session = Depends(get_db)):
#     response = await get_time_worker(db, pk)
#     return response


# @master.post('/image', summary='upload image')
# async def upload_image(file: UploadFile, db: Session = Depends(get_db)):
#     print(file.filename)
#     response = await save_image_worker(file, db)
#     return response
