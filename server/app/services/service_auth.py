from fastapi import HTTPException
from fastapi.responses import UJSONResponse
from sqlalchemy.orm import Session

from app import models
from app.caching_redis import generate_verification_code, cache_redis, get_from_cache
from app.schemas import ActivateSchema, RegisterSchema, LoginSchema
from app.send_email import send_verification_email
from config.settings import settings


async def register_worker(schema: RegisterSchema, db: Session):
    # save database
    data: dict = schema.dict(exclude_none=True)
    user = models.Users(**data)
    db.add(user)
    db.commit()
    # redis
    code: int = generate_verification_code()
    time = settings.REDIS_VERIFY_TIME
    cache_redis(user.email, code, time)
    print(code)
    await send_verification_email(user, code)
    message = f"{user.name} tasdiqlash kodi yuborildi !"
    return UJSONResponse(message, 200)


async def activate_email_worker(schema: ActivateSchema, db: Session):
    data: dict = schema.dict(exclude_unset=True)
    verify_code = data['code']
    email = data['email']
    code = get_from_cache(email)
    if code:
        # check code equal
        if code == verify_code:
            user = db.query(models.Users).filter_by(email=email).first()
            user.is_active = True
            db.commit()
            return HTTPException(200, "Muvaffaqiyatli tasdiqlandi")
        return HTTPException(400, "Tasdiqlash kodi xato !")
    raise HTTPException(404, "Tasdiqlash kodi eskirgan !")


async def get_all_users_worker(db: Session):
    users = db.query(models.Users).all()
    return users


async def login_user_worker(db: Session, form: LoginSchema):
    phone = form.phone
    user = db.query(models.Masters).filter_by(phone=phone).first()
    return user
