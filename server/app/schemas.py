import re

from fastapi import HTTPException
from pydantic import BaseModel, validator

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

    @validator('phone')
    def phone_validate(cls, value):
        regex = r"^(\+)[1-9][0-9\-\(\)\.]{9,15}$"
        if value and not re.search(regex, value, re.I):
            raise ValueError("Telefon raqam noto'g'ri kiritilgan !")
        db = next(get_db())
        user = db.query(models.Users).filter_by(phone=value).first()
        if not user:
            raise HTTPException(400, "Phone is not registered !")
        db.close()
        return value

    @validator('code')
    def code_validate(cls, value):
        if value != '123456':
            raise HTTPException(400, "Verify code is not correct !")
        return value
