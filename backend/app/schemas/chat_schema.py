from pydantic import BaseModel


class QuestionRequest(
    BaseModel
):

    question:str

    paper_id:str

    session_id:str