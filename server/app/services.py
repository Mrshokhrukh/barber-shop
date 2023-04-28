import os
import shutil
from datetime import datetime

import httpx
from fastapi.responses import UJSONResponse
from sqlalchemy.orm import Session

from app import schemas, models


async def add_master_worker(image, schema: schemas.Register, db: Session):
    data: dict = schema.dict(exclude_none=True)
    folder = 'media/users/'
    if not os.path.exists(folder):
        os.mkdir(folder)
    file_url = folder + image.filename
    with open(file_url, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    data.update({'image': file_url})
    user = models.Masters(**data)
    db.add(user)
    db.commit()
    db.close()
    return UJSONResponse("Successful added user", status_code=200)

    pass


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


async def save_image_worker(image, db: Session):
    folder = 'media/users/'
    if not os.path.exists(folder):
        os.mkdir(folder)
    file_url = folder + image.filename

    with open(file_url, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    image_url = file_url
    photo = models.Photos(image=image_url)
    db.add(photo)
    db.commit()
    db.close()
    return UJSONResponse("Successfully uploaded image", 200)
