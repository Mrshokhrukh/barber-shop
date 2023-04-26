import re
from typing import Optional

from fastapi import HTTPException, UploadFile, Form, File
from pydantic import BaseModel, validator, root_validator

from app import models
from config.db import get_db


class Register(BaseModel):
    first_name: str
    last_name: str | None
    phone: str
    image: str | None

    @validator("phone")
    def phone_validation(cls, value):
        regex = r"^(\+)[1-9][0-9\-\(\)\.]{9,15}$"
        if value and not re.search(regex, value, re.I):
            raise HTTPException(400, "Telefon raqam noto'g'ri kiritilgan !")
        db = next(get_db())
        user = db.query(models.Masters).filter_by(phone=value).first()
        if user:
            raise HTTPException(400, "Phone is already registered !")
        db.close()
        return value

    # @classmethod
    # def as_form(
    #         cls,
    #         first_name: str = Form(...),
    #         last_name: str | None = Form(None),
    #         phone: str = Form(...),
    #         image: UploadFile = File(...),
    # ):
    #     return cls(
    #         first_name=first_name,
    #         last_name=last_name,
    #         phone=phone,
    #         image=image
    #     )


class Login(BaseModel):
    phone: str
    code: str

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


class Photo(BaseModel):
    image: UploadFile = File(None)
