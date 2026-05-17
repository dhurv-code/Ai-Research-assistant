from fastapi import APIRouter

from app.services.chat_history_service import (
    ChatHistoryService
)

router=APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get("/{session_id}")
async def get_history(
        session_id:str
):

    return await (
        ChatHistoryService
        .get_history(
            session_id
        )
    )