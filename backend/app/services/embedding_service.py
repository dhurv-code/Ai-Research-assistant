from sentence_transformers import SentenceTransformer

class EmbeddingService:

    model = None

    @classmethod
    def get_model(cls):

        if cls.model is None:

            print(
                "Loading embedding model..."
            )

            cls.model = SentenceTransformer(
                "all-MiniLM-L6-v2",
                device="cpu"
            )

        return cls.model


    @classmethod
    def create_embeddings(
        cls,
        chunks
    ):

        model = cls.get_model()

        embeddings = model.encode(
            chunks
        )

        return embeddings

# from sentence_transformers import (SentenceTransformer)

# class EmbeddingService:

#     model = None

#     @classmethod
#     def get_model(cls):

#         if cls.model is None:

#             print("Loading embedding model...")
#             cls.model = (SentenceTransformer("all-MiniLM-L6-v2"))

#         return cls.model
#     @classmethod
#     def create_embeddings(
#         cls,chunks
#     ):
#         model = cls.get_model()
#         embeddings = model.encode(chunks)
#         return embeddings

# from sentence_transformers import SentenceTransformer
# class EmbeddingService:
#     model=SentenceTransformer("all-MiniLM-L6-v2")

#     @classmethod
#     def create_embeddings(cls, chunks):
#         vectors=cls.model.encode(chunks)
#         return vectors