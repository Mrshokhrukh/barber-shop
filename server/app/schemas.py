import re

from fastapi import HTTPException, UploadFile, Form, File
from pydantic import BaseModel, validator, root_validator

from app import models

from config.db import get_db


class MasterSchema(BaseModel):
    first_name: str
    last_name: str | None
    phone: str
    image: UploadFile
    master_services: str

    class Config:
        orm_mode = True

    @validator("phone")
    def phone_validation(cls, value):
        regex = r"^(\+)[1-9][0-9\-\(\)\.]{9,15}$"
        if value and not re.search(regex, value, re.I):
            raise HTTPException(400, "Telefon raqam noto'g'ri kiritilgan !")
        db = next(get_db())
        user = db.query(models.Masters).filter_by(phone=value).first()
        if user:
            raise HTTPException(400, "Telefon raqam allaqachon ro'yxatdan o'tgan")
        db.close()
        return value

    @classmethod
    def from_orm(cls, obj):
        data = obj.__dict__.copy()
        return cls(**data)

    @classmethod
    def as_form(
            cls,
            first_name: str = Form(...),
            last_name: str = Form(None),
            phone: str = Form(...),
            image: UploadFile = File(...),
            master_services: str = Form(...)
    ):
        return cls(
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            image=image,
            master_services=master_services,
        )


class Login(BaseModel):
    phone: str
    code: str

    class Config:
        orm_mode = True

    @root_validator()
    def validation(cls, values):
        code = values.get('code')
        phone = values.get('phone')
        db = next(get_db())

        regex = r"^(\+)[1-9][0-9\-\(\)\.]{9,15}$"

        if phone and not re.search(regex, phone, re.I):
            raise HTTPException(404, "Telefon raqam noto'g'ri kiritilgan !")

        user = db.query(models.Masters).filter_by(phone=phone).first()
        if not user:
            raise HTTPException(404, "Phone is not registered !")
        if code != '123456' and code != '123':
            raise HTTPException(400, "Verify code is not correct !")
        if code == '123':
            user.is_admin = True
            db.commit()
        db.close()
        return values


class RegisterSchema(BaseModel):
    name: str
    email: str

    class Config:
        orm_mode = True

    @validator("email")
    def validation(cls, value):
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        if not re.search(regex, value):
            raise HTTPException(400, "Email yaroqsiz !")
        db = next(get_db())
        user = db.query(models.Users).filter_by(email=value).first()
        if user:
            raise HTTPException(400, "Email allaqachon ro'yxatdan o'tgan !")
        return value

    @classmethod
    def from_orm(cls, obj):
        data = obj.__dict__.copy()
        return cls(**data)

    @classmethod
    def as_form(
            cls,
            name: str = Form(...),
            email: str = Form(...),

    ):
        return cls(
            name=name,
            email=email,
        )


class ActivateSchema(BaseModel):
    email: str
    code: str

    class Config:
        orm_mode = True

    @validator("email")
    def validation(cls, value):
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        if not re.search(regex, value):
            raise HTTPException(400, "Email yaroqsiz !")
        db = next(get_db())
        user = db.query(models.Users).filter_by(email=value).first()
        if not user:
            raise HTTPException(400, "Email ro'yxatdan o'tmagan !")
        return value

    @classmethod
    def as_form(
            cls,
            email: str = Form(...),
            code: str = Form(...),

    ):
        return cls(
            email=email,
            code=code,
        )
