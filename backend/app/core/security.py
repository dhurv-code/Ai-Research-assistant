from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import os
import bcrypt

from jose import JWTError, jwt

from fastapi import (
    Depends,
    HTTPException,
    status
)

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

from app.database.connection import db


SECRET_KEY = os.getenv(
    "JWT_SECRET"
)

if not SECRET_KEY:
    raise ValueError(
        "JWT_SECRET missing"
    )


ALGORITHM="HS256"

ACCESS_TOKEN_EXPIRE_MINUTES=60*24


security=HTTPBearer()


def hash_password(
    password:str
)->str:

    return bcrypt.hashpw(
        password.encode(),
        bcrypt.gensalt()
    ).decode()



def verify_password(
    plain_password:str,
    hashed_password:str
)->bool:

    return bcrypt.checkpw(
        plain_password.encode(),
        hashed_password.encode()
    )



def create_access_token(
    data:Dict[str,Any],
    expires_delta:
    Optional[timedelta]=None
):

    to_encode=data.copy()

    expire=(
        datetime.utcnow()
        +
        (
            expires_delta
            or
            timedelta(
                minutes=
                ACCESS_TOKEN_EXPIRE_MINUTES
            )
        )
    )


    to_encode.update(
        {
            "exp":expire
        }
    )


    return jwt.encode(

        to_encode,

        SECRET_KEY,

        algorithm=ALGORITHM

    )



async def get_current_user(

    credentials:
    HTTPAuthorizationCredentials
    =
    Depends(
        security
    )

):

    token=credentials.credentials


    try:

        payload=jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[
                ALGORITHM
            ]
        )


        user_email=payload.get(
            "sub"
        )


        if not user_email:

            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )


    except JWTError:

        raise HTTPException(

            status_code=401,

            detail="Invalid token"

        )


    user=await (
        db.users.find_one(
            {
                "email":
                user_email
            }
        )
    )


    if not user:

        raise HTTPException(

            status_code=401,

            detail=
            "User not found"

        )


    user["id"]=str(
        user["_id"]
    )

    return user