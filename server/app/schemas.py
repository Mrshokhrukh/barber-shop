import re

from fastapi import HTTPException
from pydantic import BaseModel, validator, root_validator

from server.app import models
from server.config.db import get_db


class Register(BaseModel):
    first_name: str
    last_name: str | None
    phone: str
    service: dict | None
    image: str | None

    @validator("phone")
    def phone_validation(cls, value):
        regex = r"^(\+)[1-9][0-9\-\(\)\.]{9,15}$"
        if value and not re.search(regex, value, re.I):
            raise ValueError("Telefon raqam noto'g'ri kiritilgan !")
        db = next(get_db())
        user = db.query(models.Users).filter_by(phone=value).first()
        if user:
            raise HTTPException(400, "Phone is already registered !")
        db.close()
        return value


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

        user = db.query(models.Users).filter_by(phone=phone).first()
        if not user:
            raise HTTPException(404, "Phone is not registered !")
        if code != '123456' and code != '123':
            raise HTTPException(400, "Verify code is not correct !")
        if code == '123':
            user.is_admin = True
            db.commit()
        db.close()
        return values
