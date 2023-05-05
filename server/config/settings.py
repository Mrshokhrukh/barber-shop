import os

import redis
from dotenv import load_dotenv

load_dotenv()


class Settings:
    PROJECT_NAME: str = "FastApi api"
    PROJECT_DESCRIPTION: str = "New project"
    PROJECT_VERSION: str = "1.0.0"
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", 'postgres')
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", '11111111')
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", 'localhost')
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", 5432)
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", 'postgres')
    PG_URL: str = f'{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}/{POSTGRES_DB}'
    DATABASE_URL: str = f"postgresql+psycopg2://{PG_URL}"

    SECRET_KEY: str = os.getenv('SECRET_KEY', '@IF&62t6cg712fs12ytf')
    ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15  # in min
    DEFAULT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 20  # in min
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 120  # in min

    # redis

    REDIS_VERIFY_TIME: int = 120  # in sec
    REDIS_CLIENT = redis.Redis(host='localhost', port=6379, decode_responses=True)

    # send email
    SMTP_HOST: str = os.getenv('SMTP_HOST', 'smtp.gmail.com')
    SMTP_PORT: int = os.getenv('SMTP_PORT', 465)
    SMTP_EMAIL: str = os.getenv('SMTP_EMAIL', 'khasanjon.eng@gmail.com')
    SMTP_PASSWORD: str = os.getenv('SMTP_PASSWORD', 'vqvaikrjhrjjbpwl')  # noqa


settings = Settings()
