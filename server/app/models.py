import typing as t
from datetime import datetime, date, time
from typing import Type

from sqlalchemy import (DateTime, Integer, String, func, Boolean, ForeignKey, Time, Date, ARRAY)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy.orm import Mapped, mapped_column, relationship

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


class Masters(Base, CreateDateBase):
    first_name: Mapped[str] = mapped_column(String(200))
    last_name: Mapped[str] = mapped_column(String(200), nullable=True)
    phone: Mapped[str] = mapped_column(String(200), unique=True)
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False)
    image: Mapped[str] = mapped_column(String(300), nullable=True)

    # master_time: Mapped[list['MasterOrder']] = relationship(back_populates='master', lazy='selectin')

    master_services: Mapped[list['MasterServices']] = relationship(back_populates='master',
                                                                   lazy='selectin')


class MasterServices(Base):
    name: Mapped[str] = mapped_column(String(200))
    master_id: Mapped[int] = mapped_column(Integer, ForeignKey('masters.id', ondelete='CASCADE'), nullable=True)
    master: Mapped[list['Masters']] = relationship(back_populates='master_services')


class Services(Base):
    name: Mapped[str] = mapped_column(String(200), unique=True)
    price: Mapped[int] = mapped_column(Integer)
    busy_time: Mapped[time] = mapped_column(Time)

# class MasterOrder(Base, CreateDateBase):
#     date: Mapped[date] = mapped_column(Date)
#     ordered_start = mapped_column(DateTime)
#     ordered_end = mapped_column(DateTime)
#
#     master_id: Mapped[int] = mapped_column(Integer, ForeignKey('Master.id', ondelete='CASCADE'))
#     master: Mapped['Masters'] = relationship(back_populates='master_time')
