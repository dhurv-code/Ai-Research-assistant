from fastapi import FastAPI
from app.api import (upload,chat,papers,history,topics,auto_papers)
from app.api import auth
from app.automation.scheduler import *
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware



@asynccontextmanager
async def lifespan(app:FastAPI):
    print(
        "Starting app..."
    )
    yield

app=FastAPI(title="AI Research Assistant",version="1.0",lifespan=lifespan)
app.add_middleware(CORSMiddleware,allow_origins=["*"],allow_methods=["*"],allow_headers=["*"])

app.include_router(upload.router)
app.include_router(chat.router)
app.include_router(papers.router)
app.include_router(history.router)
app.include_router(topics.router)
app.include_router(auto_papers.router)
app.include_router(auth.router)
@app.get("/")
def home():
    return{
        "message":"AI Research Assistant Backend Running"
    }