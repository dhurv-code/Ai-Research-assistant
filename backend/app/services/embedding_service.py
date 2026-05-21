from chromadb.utils.embedding_functions import (
    SentenceTransformerEmbeddingFunction
)

class EmbeddingService:

    embedding_function = (
        SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2",
            device="cpu"
        )
    )

    @classmethod
    def create_embeddings(
        cls,
        chunks
    ):

        return cls.embedding_function(
            chunks
        )


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