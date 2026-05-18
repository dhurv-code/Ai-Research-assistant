# for showing monitored papers
from fastapi import APIRouter
from app.database.connection import db

router=APIRouter(
    prefix="/discover",
    tags=["Discover"]
)


@router.get("")
async def discover():

    papers=[]

    async for paper in (
        db.auto_papers.find()
    ):

        paper["_id"]=str(
            paper["_id"]
        )

        papers.append(
            paper
        )

    return papers