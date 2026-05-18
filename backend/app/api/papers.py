from fastapi import APIRouter
from app.database.connection import db

router=APIRouter(
    prefix="/papers",
    tags=["Papers"]
)

@router.get("")
async def get_papers():

    papers=[]

    async for paper in (
        db.papers.find()
    ):

        paper["_id"]=str(
            paper["_id"]
        )

        papers.append(
            paper
        )

    return papers