import datetime

from fastapi import Form
from pydantic import BaseModel


class Register(BaseModel):
    name: str
    email: str
