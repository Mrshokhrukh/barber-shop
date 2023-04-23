from fastapi import Form
from pydantic import BaseModel


class Register(BaseModel):
    name: str
    email: str


    class Config:
        orm_mode = True

    @classmethod
    def as_form(
            cls,
            name: str = Form(),
            email: str = Form(),
    ):
        return cls(
            name=name,
            email=email,
        )
