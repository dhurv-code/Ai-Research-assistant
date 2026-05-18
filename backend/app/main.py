from fastapi import FastAPI
print("1")
from app.api import upload
print("2")

from app.api import chat
print("3")

from app.api import papers
print("4")

from app.api import history
print("5")

from app.api import topics
print("6")

from app.api import auto_papers
print("7")
from app.api import auth
# from app.automation.scheduler import *
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware



@asynccontextmanager
async def lifespan(app:FastAPI):
    print(
        "Starting app..."
    )
    yield

app=FastAPI(title="AI Research Assistant",version="1.0",lifespan=lifespan)
app.add_middleware(CORSMiddleware,
    allow_origins=["https://ai-research-assistant-tan-chi.vercel.app","http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

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