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

        query_embedding = (
    EmbeddingService
    .create_query_embedding(
        question
    )
)
        results = get_collection().query(
    query_embeddings=[query_embedding],
    n_results=4,
    where={
        "paper_id": paper_id
    }
)

        print("PAPER ID:", paper_id)
        print("RETRIEVAL RESULTS:", results)

        return results["documents"][0]