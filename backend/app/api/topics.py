from fastapi import APIRouter
from app.database.connection import db

router=APIRouter(
    prefix="/topics",
    tags=["Topics"])

@router.post("")
async def save_topics(topics:list[str]):
    data={
        "user_id":"demo_user",
        "topics":topics}
    await (
        db.topics.insert_one(data))
    return{
        "status":
        "saved"}