from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_DB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

print("URL:", MONGO_URL)
print("DB:", DATABASE_NAME)

client = AsyncIOMotorClient(
    MONGO_URL
)

db = client[DATABASE_NAME]