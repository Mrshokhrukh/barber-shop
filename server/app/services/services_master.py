from datetime import datetime

import httpx
from fastapi.responses import UJSONResponse
from sqlalchemy import update
from sqlalchemy.orm import Session

from app import schemas, models


def uploading_image(path_image):
    result = httpx.post('https://telegra.ph/upload', files={'file': path_image}).json()
    return result


async def add_master_worker(schema: schemas.MasterSchema, db: Session):
    # save database
    data: dict = schema.dict(exclude_none=True)
    services: dict = data.pop('services')
    if image := data.get('image'):
        result = uploading_image(image.file.read())
        imager_url = 'https://telegra.ph' + result[0]['src']
        data.update({'image': imager_url})
    user = models.Masters(**data)
    db.add(user)
    db.commit()
    master_services = []
    for name in services:
        master_services.append(
            models.MasterServices(
                name=name,
                master_id=user.id
            )
        )
    db.add_all(master_services)
    db.commit()

    return UJSONResponse("Muvaffaqiyatli qo'shildi !", 200)


async def get_master_worker(pk: int, db: Session):
    user = db.query(models.Masters).filter_by(id=pk).first()
    return user


async def update_master_worker(pk: int, schema: schemas.MasterSchema, db: Session):
    # update master
    data: dict = schema.dict(exclude_unset=True)
    if image := data.get('image'):
        result = uploading_image(image.file.read())
        imager_url = 'https://telegra.ph' + result[0]['src']
        data.update({'image': imager_url})
    query = update(models.Masters).values(**data).where(models.Masters.id == pk)
    db.execute(query)
    db.commit()
    return UJSONResponse("Muvaffaqiyatli yangilandi !", 200)


async def get_users_worker(db: Session):
    users = db.query(models.Masters).order_by(models.Masters.updated_at or models.Masters.created_at).all()
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


async def delete_master_worker(pk: int, db: Session):
    db.query(models.Masters).filter_by(id=pk).delete()
    db.commit()
    return UJSONResponse("Muvaffaqiyatli o'chirilidi !", status_code=200)
