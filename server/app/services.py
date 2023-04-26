from datetime import datetime

from sqlalchemy.orm import Session

from app import schemas, models


async def register_worker(schema: schemas.Register, db: Session):
    # save database
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