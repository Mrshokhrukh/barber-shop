import json
import typing as t
from datetime import datetime

from sqlalchemy import (DateTime, Integer, String,
                        func, Boolean)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy.orm import Mapped, mapped_column

class_registry: t.Dict = {}


@as_declarative(class_registry=class_registry)
class Base:
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    __name__: str

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()


class CreateDateBase:
    updated_at: Mapped[datetime] = mapped_column(DateTime,
                                                 onupdate=func.current_timestamp(),
                                                 nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class Users(Base, CreateDateBase):
    first_name: Mapped[str] = mapped_column(String(200))
    last_name: Mapped[str] = mapped_column(String(200), nullable=True)
    phone: Mapped[str] = mapped_column(String(200), unique=True)
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False)
    service: Mapped[json] = mapped_column(JSONB, nullable=True)
    image: Mapped[str] = mapped_column(String(300), nullable=True)

# class MasterTime(Base, CreateDateBase):
#     day: Mapped[datetime] = mapped_column(DateTime)  # kuni
#     time: Mapped[datetime] = mapped_column(DateTime)  # boshlanish vaqti
#     time_ordered: Mapped[datetime] = mapped_column(DateTime)  # tugash vaqti
