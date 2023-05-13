from datetime import datetime, timedelta

from fastapi import HTTPException, status, Depends
from fastapi.responses import UJSONResponse
from fastapi.security import HTTPBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app import models
from app.hashing import Hasher
from app.schemas import ActivateSchema, RegisterSchema, LoginSchema
from app.utils.caching_redis import get_from_cache
from config.db import get_db
from config.settings import settings

security = HTTPBearer()


async def register_worker(schema: RegisterSchema, db: Session):
    # save database
    data: dict = schema.dict(exclude_none=True)
    password = Hasher.make_hash(data.get('password'))
    data['password'] = password
    user = models.Users(**data)
    db.add(user)
    db.commit()
    # redis
    # code: int = generate_verification_code()
    # time = settings.REDIS_VERIFY_TIME
    # cache_redis(user.email, code, time)
    # print(code)
    # await send_verification_email(user, code)
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


def login_create_token(form: LoginSchema, db: Session):
    result: dict = authenticate_user(db, form.email, form.password)
    if result.get('error'):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=result.get('result'),
            headers={'WWW-Authenticate': 'Bearer'}
        )
    user = result['user']
    access_token = create_access_token(user.email)
    refresh_token = create_refresh_token(user.email)
    response = {
        'access_token': access_token,
        'refresh_token': refresh_token,
        'token_type': 'bearer'
    }
    return response


def create_access_token(email: str):
    expires_data = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    if expires_data:
        expire = datetime.utcnow() + expires_data
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {
        'type': 'access',
        'sub': email,
        'exp': expire
    }
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY)
    return encoded_jwt


def create_refresh_token(email: str):
    expire = datetime.utcnow() + timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES)
    payload = {
        'sub': email,
        'type': 'refresh',
        'exp': expire
    }
    encoded_jwt = jwt.encode(payload, settings.SECRET_KEY)
    return encoded_jwt


def authenticate_user(db: Session, email: str, password: str):
    user = get_user(db, email)
    if not user:
        response = {
            'error': True,
            'result': 'Email not available'
        }
        return response
    if not Hasher.check_hash(password, user.password):
        response = {
            'error': True,
            'result': 'Incorrect password'
        }
        return response
    response = {
        'error': False,
        'user': user
    }
    return response


def get_user(db: Session, email: str):
    user = db.query(models.Users).filter_by(email=email).first()
    if user:
        return user


def get_current_user(
        db=Depends(get_db),
        credentials=Depends(security),  # HTTPAuthorizationCredentials
):
    token: str = credentials.credentials
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={'WWW-Authenticate': 'Bearer'}
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY)
        email: str = payload.get('sub')
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(db, email)
    if user is None:
        raise credentials_exception
    db.close()
    return user
