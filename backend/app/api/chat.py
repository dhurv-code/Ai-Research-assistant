from fastapi import APIRouter

from app.schemas.chat_schema import (QuestionRequest)
from app.services.retrieval_service import (RetrievalService)
from app.services.llm_service import (LLMService)
from app.services.chat_history_service import (ChatHistoryService)

router=APIRouter(prefix="/chat",tags=["Chat"])

@router.post("")
async def ask_question(data:QuestionRequest):
    docs=RetrievalService.search(data.question,data.paper_id)

    answer=(LLMService.generate_answer(data.question,docs))

    await ChatHistoryService.save_chat(data.session_id,
    data.paper_id,data.question,answer)

    return {"question":data.question,"answer":answer}