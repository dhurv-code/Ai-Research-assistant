from chromadb.utils.embedding_functions import (
    SentenceTransformerEmbeddingFunction
)

class EmbeddingService:

    embedding_function = None

    @classmethod
    def get_embedding_function(cls):

        if cls.embedding_function is None:
            cls.embedding_function = (
                SentenceTransformerEmbeddingFunction(
                    model_name="all-MiniLM-L6-v2"
                )
            )

        return cls.embedding_function

    @classmethod
    def create_embeddings(cls, chunks):

        embedding_function = cls.get_embedding_function()

        embeddings = embedding_function(chunks)

        return embeddings

    @classmethod
    def create_query_embedding(cls, text):

        embedding_function = cls.get_embedding_function()

        return embedding_function([text])[0]