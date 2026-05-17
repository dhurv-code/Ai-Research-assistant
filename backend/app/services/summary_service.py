from app.services.llm_service import (
    LLMService
)


class SummaryService:

    @staticmethod
    def summarize(text):

        prompt=f"""
You are analyzing a research paper abstract.

Abstract:

{text}

Return:

1. Main contribution

2. Methods used

3. Limitations

4. Future scope

If information is missing,
state "Not explicitly mentioned".
"""

        return (
            LLMService.generate_answer(
                prompt,
                [text]
            )
        )