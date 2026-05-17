from app.services.summary_service import ( SummaryService )
text="""Large Language models are used for retrieval..."""

print(SummaryService.summarize(text))