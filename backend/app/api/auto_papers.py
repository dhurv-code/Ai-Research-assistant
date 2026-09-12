import arxiv

from fastapi import APIRouter, Query
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.database.connection import db


import httpx
import io

router = APIRouter(
    prefix="/discover",
    tags=["Discover"]
)


@router.get("")
async def discover(
    query: str = Query(default="machine learning"),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=50),
):
    """
    Search arXiv dynamically.

    page=1, limit=20
    page=2, limit=20
    etc.
    """

    start = (page - 1) * limit

    search = arxiv.Search(
        query=f'all:"{query}"',
        max_results=start + limit,
        sort_by=arxiv.SortCriterion.SubmittedDate,
        sort_order=arxiv.SortOrder.Descending,
    )

    client = arxiv.Client(
        page_size=limit,
        delay_seconds=3,
        num_retries=3,
    )

    papers = []

    try:
        for index, paper in enumerate(client.results(search)):

            # Skip previous pages
            if index < start:
                continue

            papers.append({
                "id": paper.entry_id,
                "title": paper.title,
                "summary": paper.summary,
                "abstract": paper.summary,
                "pdf_url": paper.pdf_url,
                "source": "arXiv",
                "authors": [
                    author.name
                    for author in paper.authors
                ],
                "published": (
                    paper.published.isoformat()
                    if paper.published
                    else None
                ),
                "updated": (
                    paper.updated.isoformat()
                    if paper.updated
                    else None
                ),
                "topic": query,
                "arxiv_id": paper.get_short_id(),
            })

            if len(papers) >= limit:
                break

    except Exception as e:
        print("arXiv error:", e)
        return {
            "papers": [],
            "page": page,
            "limit": limit,
            "has_more": False,
            "error": str(e),
        }

    return {
        "papers": papers,
        "page": page,
        "limit": limit,
        "has_more": len(papers) == limit,
    }

@router.get("/paper/{arxiv_id}")
async def discover_paper(arxiv_id: str):

    client = arxiv.Client(
        page_size=1,
        delay_seconds=3,
        num_retries=3,
    )

    search = arxiv.Search(
        id_list=[arxiv_id]
    )

    try:
        results = client.results(search)

        paper = next(results, None)

        if paper is None:
            return {
                "error": "Paper not found"
            }

        return {
            "id": paper.entry_id,
            "arxiv_id": paper.get_short_id(),
            "title": paper.title,
            "summary": paper.summary,
            "abstract": paper.summary,
            "pdf_url": paper.pdf_url,
            "source": "arXiv",
            "authors": [
                author.name
                for author in paper.authors
            ],
            "published": (
                paper.published.isoformat()
                if paper.published
                else None
            ),
            "updated": (
                paper.updated.isoformat()
                if paper.updated
                else None
            ),
            "categories": paper.categories,
        }

    except Exception as e:
        print("arXiv detail error:", e)

        return {
            "error": str(e)
        }

@router.get("/paper/{arxiv_id}/download")
async def download_paper(arxiv_id: str):

    clean_id = arxiv_id.strip()

    pdf_url = f"https://arxiv.org/pdf/{clean_id}.pdf"

    try:
        async with httpx.AsyncClient(
            follow_redirects=True,
            timeout=30.0
        ) as client:

            response = await client.get(pdf_url)

        if response.status_code != 200:
            raise HTTPException(
                status_code=404,
                detail="PDF not found on arXiv"
            )

        filename = f"{clean_id.replace('/', '_')}.pdf"

        return StreamingResponse(
            io.BytesIO(response.content),
            media_type="application/pdf",
            headers={
                "Content-Disposition": (
                    f'attachment; filename="{filename}"'
                )
            }
        )

    except httpx.RequestError as e:

        raise HTTPException(
            status_code=502,
            detail=f"Unable to download PDF from arXiv: {str(e)}"
        )


# # for showing monitored papers
# from fastapi import APIRouter
# from app.database.connection import db

# router=APIRouter(
#     prefix="/discover",
#     tags=["Discover"]
# )


# @router.get("")
# async def discover():

#     papers=[]

#     async for paper in (
#         db.auto_papers.find()
#     ):

#         paper["_id"]=str(
#             paper["_id"]
#         )

#         papers.append(
#             paper
#         )

#     return papers