import arxiv
from app.database.connection import db


class PaperMonitor:

    @staticmethod
    async def monitor():

        topics=[]

        async for item in (
            db.topics.find()
        ):
            topics.extend(
                item["topics"]
            )


        for topic in topics:

            search=arxiv.Search(

                query=topic,

                max_results=5

            )


            for paper in search.results():

                existing=await (
                    db.auto_papers.find_one(
                        {
                          "title":
                          paper.title
                        }
                    )
                )


                if existing:
                    continue


                data={

                    "title":
                    paper.title,

                    "summary":
                    paper.summary,

                    "ai_summary":
                    ai_summary

                    "pdf_url":
                    paper.pdf_url,

                    "topic":
                    topic

                }


                await (
                    db.auto_papers.insert_one(
                        data
                    )
                )


                print(
                    "NEW:",
                    paper.title
                )