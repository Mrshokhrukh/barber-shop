from fastapi.responses import UJSONResponse
from sqlalchemy.orm import Session

from server.app import schemas, models


async def register_worker(form: schemas.Register, db: Session):
    # save database
    form = form.dict(exclude_none=True)
    user = models.Users(**form)
    db.add(user)
    db.commit()

    return UJSONResponse("Successful added user", status_code=200)


async def get_users_worker(db: Session):
    users = db.query(models.Users).all()
    return users
