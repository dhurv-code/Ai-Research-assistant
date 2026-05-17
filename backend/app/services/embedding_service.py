from sentence_transformers import SentenceTransformer
class EmbeddingService:
    model=SentenceTransformer("all-MiniLM-L6-v2")

    @classmethod
    def create_embeddings(cls, chunks):
        vectors=cls.model.encode(chunks)
        return vectors