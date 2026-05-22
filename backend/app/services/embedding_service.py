from chromadb.utils.embedding_functions import (
    SentenceTransformerEmbeddingFunction
)

class EmbeddingService:

    embedding_function = (
        SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"
        )
    )

    @classmethod
    def create_embeddings(
        cls,
        chunks
    ):

        embeddings = (
            cls.embedding_function(
                chunks
            )
        )

        return embeddings


    @classmethod
    def create_query_embedding(
        cls,
        text
    ):

        return (
            cls.embedding_function(
                [text]
            )[0]
        )