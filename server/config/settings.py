import os

from dotenv import load_dotenv

load_dotenv('.env')


class Settings:
    PROJECT_NAME: str = "FastApi api"
    PROJECT_DESCRIPTION: str = "New project"
    PROJECT_VERSION: str = "1.0.0"
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", 'postgres')
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", '1')
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", 'localhost')
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", 5432)
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", 'fast_api_db')
    PG_URL: str = f'{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}/{POSTGRES_DB}'
    DATABASE_URL: str = f"postgresql+psycopg2://{PG_URL}"

    SECRET_KEY: str = os.getenv('SECRET_KEY', '@IF&62t6cg712fs12ytf')
    ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15  # in min
    DEFAULT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 15  # in min
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 120  # in min


settings = Settings()
