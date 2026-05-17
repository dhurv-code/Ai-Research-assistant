from fastapi import FastAPI
from app.api import (upload,chat,papers,history,topics)
from app.automation.scheduler import *

app=FastAPI(title="AI Research Assistant",version="1.0")

app.include_router(upload.router)
app.include_router(chat.router)
app.include_router(papers.router)
app.include_router(history.router)
app.include_router(topics.router)
@app.get("/")
def home():
    return{
        "message":"AI Research Assistant Backend Running"
    }