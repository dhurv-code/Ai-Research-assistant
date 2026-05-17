import arxiv

from app.database.connection import db

from app.services.summary_service import (
    SummaryService
)


class PaperMonitor:

    @staticmethod
    async def monitor():

        print("Monitor started")

        topics=[]

        async for item in db.topics.find():

            print(
                "Mongo item:",
                item
            )

            topics.extend(
                item["topics"]
            )


        print(
            "Topics found:",
            topics
        )


        client=arxiv.Client()


        for topic in topics:

            print(
                "Searching:",
                topic
            )


            search=arxiv.Search(

                query=topic,

                max_results=2

            )


            for paper in client.results(
                search
            ):


                existing=await (
                    db.auto_papers.find_one(
                        {
                            "title":
                            paper.title
                        }
                    )
                )


                if existing:

                    print(
                        "Already exists:",
                        paper.title
                    )

                    continue


                ai_summary=(
                    SummaryService
                    .summarize(
                        paper.summary
                    )
                )


                data={

                    "title":
                    paper.title,

                    "summary":
                    paper.summary,

                    "ai_summary":
                    ai_summary,

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
                    "Saved:",
                    paper.title
                )