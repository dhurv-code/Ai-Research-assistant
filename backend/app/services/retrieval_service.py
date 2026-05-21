from app.services.embedding_service import (
    EmbeddingService
)

def get_collection():

    from app.vectorstore.chroma_service import (
        collection
    )

    return collection

import os

class RetrievalService:

    @staticmethod
    def search(
        question,
        paper_id
    ):

        if os.getenv(
            "RENDER"
        )=="true":

            return [
                "Search temporarily unavailable on free deployment"
            ]

        model=(
            EmbeddingService
            .get_model()
        )

        query_embedding=(
            model.encode(
                question
            )
        )

        results=(
            get_collection().query(
                query_embeddings=[
                    query_embedding.tolist()
                ],

                n_results=4,

                where={
                    "paper_id":
                    paper_id
                }
            )
        )

        return results[
            "documents"
        ][0]