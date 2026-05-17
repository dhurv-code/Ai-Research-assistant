from dotenv import load_dotenv
from groq import Groq
import os

load_dotenv()
client=Groq(api_key=os.getenv("GROQ_API_KEY"))

class LLMService:
    @staticmethod
    def generate_answer(question,context):
        joined_context="\n".join(context)
        prompt=f"""
Answer Only from context
Context:
{joined_context}
Question:{question}"""
        response=client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role":"user","content":prompt}
            ]
        )
        return (response.choices[0].message.content)

