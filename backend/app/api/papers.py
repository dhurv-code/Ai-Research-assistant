from fastapi import (APIRouter,Depends)
from app.database.connection import db
from app.core.security import (get_current_user)

router=APIRouter(prefix="/papers",tags=["Papers"])

@router.get("/")
async def get_papers(current_user:dict=Depends(get_current_user)):
    papers=[]

    async for paper in (db.papers.find(
            {
                "user_id":current_user["id"]
            }
        )
    ):
        paper["_id"]=str(paper["_id"])
        papers.append(paper)

    return papers