from datetime import datetime
from random import randint

import httpx
from fastapi.responses import UJSONResponse
from sqlalchemy import update, desc, text
from sqlalchemy.orm import Session

from app import schemas, models
from app.models import Masters
from app.schemas import ServiceSchema
from config.db import get_db


def uploading_image(path_image):
    result = httpx.post('https://telegra.ph/upload', files={'file': path_image}).json()
    return result


async def add_master_worker(schema: schemas.MasterSchema, db: Session):
    # save database

    data: dict = schema.dict(exclude_none=True)
    services: str = data.pop('master_services')
    if image := data.get('image'):
        result = uploading_image(image.file.read())
        imager_url = 'https://telegra.ph' + result[0]['src']
        data.update({'image': imager_url})
    user = models.Masters(**data)
    db.add(user)
    db.commit()
    master_services = []
    services_data = services.split(',')
    for num in services_data:
        if num:
            master_services.append(
                models.MasterServices(
                    services_id=int(num),
                    master_id=user.id,
                )
            )
    db.add_all(master_services)
    db.commit()

    return UJSONResponse("Muvaffaqiyatli qo'shildi !", 200)


async def get_master_worker(pk: int, db: Session):
    user = db.query(models.Masters).filter_by(id=pk).first()
    master = {
        "id": user.id,
        "first_name": user.first_name,
        "is_admin": user.is_admin,
        "email": user.email,
        "last_name": user.last_name,
        "image": user.image,
    }
    services = [s.services for s in user.master_services]
    master["services"] = services
    return master


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


async def get_masters_worker(db: Session):
    masters = db.query(Masters).order_by(desc(Masters.created_at or Masters.updated_at))
    users = []
    for user in masters:
        users.append(
            {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'is_admin': user.is_admin,
                'image': user.image
            }
        )
    return users


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


async def get_all_services_worker(db: Session):
    services = db.query(models.Services).all()
    return services


async def add_services_worker():
    services_name = ["To'liq soch - soqol", "Soch olish",
                     "Soqol olish",
                     "Soch - Soqol bo'yash",
                     "Kuyov soch soqol stil",
                     "Bolalar soch turmagi (11 yoshgacha)",
                     "Yuz tozalash",
                     "Qora maska"]

    services_model = []
    for name in services_name:
        services_model.append(
            models.Services(
                name=name,
                price=randint(50000, 200000),
                busy_time='18:19:36',
            )
        )
    db = next(get_db())
    db.add_all(services_model)
    db.commit()
    db.close()
    print("Service qo'shildi")


async def add_service_worker(db: Session, schema: ServiceSchema):
    data = schema.dict(exclude_none=True)
    service = models.Services(**data)
    db.add(service), db.commit()
    return data


async def delete_service_worker(pk: int, db: Session):
    service = db.query(models.Services).filter_by(id=pk).first()
    db.delete(service)
    db.commit()
    return UJSONResponse("Muvaffaqiyatli o'chirildi !", 200)


async def update_service_worker(pk: int, db: Session, schema: ServiceSchema):
    data = schema.dict(exclude_none=True)
    query = update(models.Services).values(**data).where(models.Services.id == pk)
    db.execute(query)
    db.commit()
    return UJSONResponse("Muvaffaqiyatli yangilandi !", 200)


async def get_service_worker(pk: int, db: Session):
    service = db.query(models.MasterServices).filter_by(services_id=pk).first()
