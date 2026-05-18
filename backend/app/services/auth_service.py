from app.database.connection import db
from app.core.security import hash_password, verify_password, create_access_token
from datetime import timedelta, datetime
import secrets


class AuthService:
    @staticmethod
    async def create_user(name: str, email: str, password: str):
        existing = await db.users.find_one({"email": email})
        if existing:
            return None
        hashed = hash_password(password)
        user = {
            "name": name,
            "email": email,
            "hashed_password": hashed,
            "created_at": datetime.utcnow().isoformat(),
            "reset_token": None,
            "reset_token_expiry": None,
        }
        result = await db.users.insert_one(user)
        user["id"] = str(result.inserted_id)
        return user

    @staticmethod
    async def authenticate_user(email: str, password: str):
        user = await db.users.find_one({"email": email})
        if not user:
            return None
        if not verify_password(password, user.get("hashed_password", "")):
            return None
        return user

    @staticmethod
    def create_token_for_user(user: dict):
        access_token_expires = timedelta(minutes=60 * 24)
        token = create_access_token({"sub": user.get("email")}, expires_delta=access_token_expires)
        return token

    @staticmethod
    async def generate_reset_token(email: str):
        user = await db.users.find_one({"email": email})
        if not user:
            return None
        token = secrets.token_urlsafe(32)
        expiry = datetime.utcnow() + timedelta(minutes=15)
        await db.users.update_one({"email": email}, {"$set": {"reset_token": token, "reset_token_expiry": expiry.isoformat()}})
        return token

    @staticmethod
    async def reset_password(token: str, new_password: str):
        user = await db.users.find_one({"reset_token": token})
        if not user:
            return None
        expiry = user.get("reset_token_expiry")
        if not expiry:
            return None
        if datetime.fromisoformat(expiry) < datetime.utcnow():
            return None
        hashed = hash_password(new_password)
        await db.users.update_one({"_id": user.get("_id")}, {"$set": {"hashed_password": hashed, "reset_token": None, "reset_token_expiry": None}})
        return True
