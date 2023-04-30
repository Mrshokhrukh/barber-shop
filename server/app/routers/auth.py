from fastapi import APIRouter

auth = APIRouter(tags=['auth'])


@auth.post('/register', summary='register user')
async def register():
    pass
