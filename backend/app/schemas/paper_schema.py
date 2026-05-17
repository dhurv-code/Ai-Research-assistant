from pydantic import BaseModel
class PaperSchema(BaseModel):
    filename:str
    total_chunks:int