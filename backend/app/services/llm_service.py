from dotenv import load_dotenv
from groq import Groq
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


class LLMService:

    @staticmethod
    def generate_answer(question, context):

        print("=" * 50)
        print("QUESTION:", question)
        print("=" * 50)

        print("CONTEXT RECEIVED:")
        print(context)

        if not context:
            return "No relevant information was found in the uploaded PDF."

        joined_context = "\n\n".join(context)

        print("=" * 50)
        print("JOINED CONTEXT:")
        print(joined_context[:2000])
        print("=" * 50)

        prompt = f"""
You are an AI research assistant.

Answer the user's question ONLY using the provided PDF context.

Rules:
1. Use only information from the context.
2. If the answer exists in the context, answer directly.
3. Summarize when appropriate.
4. Do not say the PDF was not provided if context exists.
5. If the answer truly does not exist in the context, say:
   "The uploaded PDF does not contain enough information to answer that question."

PDF Context:
{joined_context}

User Question:
{question}

Answer:
"""

        print("=" * 50)
        print("PROMPT SENT TO LLM")
        print("=" * 50)

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You answer questions strictly from provided PDF context."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
            max_tokens=1000
        )

        answer = response.choices[0].message.content

        print("=" * 50)
        print("LLM RESPONSE:")
        print(answer)
        print("=" * 50)

        return answer
# from dotenv import load_dotenv
# from groq import Groq
# import os

# load_dotenv()
# client=Groq(api_key=os.getenv("GROQ_API_KEY"))

# class LLMService:
#     @staticmethod
#     def generate_answer(question,context):
#         joined_context="\n".join(context)
#         prompt=f"""
# Answer Only from context
# Context:
# {joined_context}
# Question:{question}"""
#         response=client.chat.completions.create(
#             model="llama-3.3-70b-versatile",
#             messages=[
#                 {"role":"user","content":prompt}
#             ]
#         )
#         return (response.choices[0].message.content)

