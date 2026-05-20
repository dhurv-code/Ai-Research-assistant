# from fastapi import APIRouter
# import arxiv
# import time

# router = APIRouter(
#     prefix="/search",
#     tags=["Search"]
# )

# client = arxiv.Client()

# @router.get("")
# async def search(query:str):

#     papers=[]

#     try:

#         time.sleep(3)

#         search=arxiv.Search(

#             query=f'all:"{query}"',

#             max_results=5,

#             sort_by=
#             arxiv.SortCriterion.Relevance

#         )

#         for paper in client.results(search):

#             papers.append({

#                 "title":
#                 paper.title,

#                 "summary":
#                 paper.summary,

#                 "pdf_url":
#                 paper.pdf_url,

#                 "topic":
#                 query

#             })

#     except Exception as e:

#         print(
#             "arxiv error:",
#             e
#         )

#         return []

#     return papers