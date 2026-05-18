from fastapi import APIRouter, Depends
from app.database.connection import db
from app.core.security import get_current_user

router=APIRouter(
    prefix="/topics",
    tags=["Topics"])

@router.post("")
async def save_topics(topics:list[str], current_user:dict = Depends(get_current_user)):
    data={
        "user_id": current_user.get("id"),
        "topics": topics
    }
    await (
        db.topics.insert_one(data))
    return{
        "status":
        "saved"}