import os
import shutil
from datetime import datetime

import httpx
from fastapi.responses import UJSONResponse
from sqlalchemy import desc, update
from sqlalchemy.orm import Session

from app import schemas, models


async def add_master_worker(schema: schemas.MasterSchema, db: Session):
    # save database
    data = schema.dict(exclude_none=True)
    if image := data.get('image'):
        folder = 'media/users/'
        file_url = folder + image.filename
        with open(file_url, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
            data.update({'image': file_url})
    user = models.Masters(**data)
    db.add(user)
    db.commit()
    user = db.query(models.Masters).filter_by(id=user.id).first()
    return user


async def get_master_worker(pk: int, db: Session):
    user = db.query(models.Masters).filter_by(id=pk).first()
    return user


async def update_master_worker(pk: int, schema: schemas.MasterSchema, db: Session):
    # update master
    data: dict = schema.dict(exclude_unset=True)
    if image := data.get('image'):
        folder = 'media/users/'
        file_url = folder + image.filename
        with open(file_url, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
            data.update({'image': file_url})
    query = update(models.Masters).values(**data).where(models.Masters.id == pk)
    db.execute(query)
    db.commit()
    return UJSONResponse("Successfully updated master", 200)


async def get_users_worker(db: Session):
    users = db.query(models.Masters).all()
    return users


async def login_user_worker(db: Session, form: schemas.Login):
    phone = form.phone
    user = db.query(models.Masters).filter_by(phone=phone).first()
    return user


async def get_time_worker(db: Session, pk: int):
    master = db.query(models.Masters).filter_by(id=pk).first().master_time
    time_now = datetime.now().time()
    # for _ in range(10):
    #     for user in master:
    #         if user.ordered_start ==


def uploading_image(path_image):
    result = httpx.post('https://telegra.ph/upload', files={'file': path_image}).json()
    return result


async def delete_master_worker(pk: int, db: Session):
    db.query(models.Masters).filter_by(id=pk).delete()
    db.commit()
    return UJSONResponse('Successfully deleted master', status_code=200)
