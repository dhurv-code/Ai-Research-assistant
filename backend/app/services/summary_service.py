from app.services.llm_service import (
    LLMService
)


class SummaryService:

    @staticmethod
    def summarize(text):

        prompt=f"""
Summarize this paper:

{text}

Return:

1 contribution

2 methods

3 limitations

4 future scope
"""


        return (
            LLMService
            .generate_answer(
                prompt,
                []
            )
        )