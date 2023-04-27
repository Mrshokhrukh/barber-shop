import httpx

from datetime import datetime

from fastapi import UploadFile
from fastapi.responses import UJSONResponse
from sqlalchemy.orm import Session

from app import schemas, models


async def register_worker(schema: schemas.Register, db: Session):
    data: dict = schema.dict(exclude_none=True)
    if data.get('image'):
        image = data.get('image')
        image_url = uploading_image(image.read())
        data.update({'image': image_url})
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


def save_image_worker(schema: schemas.Photo, db: Session):
    image = schema
    image_url = uploading_image(image.read())
    photo = models.Photos(image=image_url)  # noqa
    db.add(photo)
    db.commit()
    db.close()
    return UJSONResponse("Successfully added image", 200)
