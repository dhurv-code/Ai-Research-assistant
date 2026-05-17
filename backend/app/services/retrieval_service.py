from app.services.embedding_service import (
    EmbeddingService
)

from app.vectorstore.chroma_service import (
    collection
)
class RetrievalService:

    @staticmethod
    def search(
        question,
        paper_id
    ):
        query_embedding=(
            EmbeddingService
            .model
            .encode(
                question
            )
        )
        results=(
            collection.query(
                query_embeddings=[query_embedding.tolist()],
                n_results=4,
                where={"paper_id":paper_id}
            )
        )


        return (
            results
            ["documents"][0]
        )