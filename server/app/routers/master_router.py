from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import schemas
from app.services.services_master import add_master_worker, get_masters_worker, get_master_worker, \
    update_master_worker, delete_master_worker, get_all_services_worker
from config.db import get_db

master = APIRouter(tags=['master'])


@master.post('/add-master', summary='Add master with phone')
async def add_master(
        schema: schemas.MasterSchema = Depends(),
        db: Session = Depends(get_db)
):
    user = await add_master_worker(schema, db)
    return user


@master.get('/get-masters', summary='get all masters')
async def get_users(db: Session = Depends(get_db)):
    masters = await get_masters_worker(db)
    return masters


@master.get('/get-master/{pk}', summary='get master with id')
async def get_master(pk: int, db: Session = Depends(get_db)):
    response = await get_master_worker(pk, db)
    return response


@master.put('/update-master/{pk}', summary='update master')
async def update_master(pk: int, schema: schemas.MasterSchema = Depends(schemas.MasterSchema.as_form),
                        db: Session = Depends(get_db)):
    response = await update_master_worker(pk, schema, db)
    return response


@master.delete('/delete-master/{pk}', summary='delete master')
async def delete_master(pk: int, db: Session = Depends(get_db)):
    response = await delete_master_worker(pk, db)
    return response


@master.get('/services', summary='get all services')
async def get_all_services(db: Session = Depends(get_db)):
    response = await get_all_services_worker(db)
    return response



#
# @master.get('/time/{pk}', summary='get free time for master')
# async def get_time(pk: int, db: Session = Depends(get_db)):
#     response = await get_time_worker(db, pk)
#     return response
