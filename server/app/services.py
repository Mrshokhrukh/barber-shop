import os
import shutil

from fastapi.responses import UJSONResponse
from sqlalchemy.orm import Session

from server.app import schemas, models


async def register_worker(schema: schemas.Register, db: Session):
    # save database
    data: dict = schema.dict(exclude_none=True)
    if len(schema.image.filename):
        folder = 'server/media/users/'
        if not os.path.exists(folder):
            os.mkdir(folder)
        file_url = folder + schema.image.filename
        with open(file_url, "wb") as buffer:
            shutil.copyfileobj(schema.image.file, buffer)
        data.update({'image': file_url})
    user = models.Users(**data)
    db.add(user)
    db.commit()
    db.close()
    return UJSONResponse("Successful added user", status_code=200)


async def get_users_worker(db: Session):
    users = db.query(models.Users).all()
    return users


async def login_user_worker(db: Session, form: schemas.Login):
    phone = form.phone
    user = db.query(models.Users).filter_by(phone=phone).first()
    return user
