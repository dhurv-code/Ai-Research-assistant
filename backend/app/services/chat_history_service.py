from app.database.connection import db
from datetime import datetime


class ChatHistoryService:

    @staticmethod
    async def save_chat(
        session_id,
        paper_id,
        question,
        answer
    ):

        data={

            "session_id":
            session_id,

            "paper_id":
            paper_id,

            "question":
            question,

            "answer":
            answer,

            "created_at":
            datetime.utcnow()
        }

        await db.chat_history.insert_one(
            data
        )

            @staticmethod
    async def get_history(
        session_id
    ):

        chats=[]

        async for item in (
            db.chat_history.find(
                {
                  "session_id":
                  session_id
                }
            )
        ):

            item["_id"]=str(
                item["_id"]
            )

            chats.append(item)

        return chats