from chromadb.utils.embedding_functions import DefaultEmbeddingFunction


class EmbeddingService:

    embedding_function = None

    @classmethod
    def get_embedding_function(cls):

        if cls.embedding_function is None:
            cls.embedding_function = DefaultEmbeddingFunction()

        return cls.embedding_function

    @classmethod
    def create_embeddings(cls, chunks):

        embedding_function = cls.get_embedding_function()

        return embedding_function(chunks)

    @classmethod
    def create_query_embedding(cls, text):

        embedding_function = cls.get_embedding_function()

        return embedding_function([text])[0]


# import os

# os.environ["TOKENIZERS_PARALLELISM"] = "false"
# os.environ["OMP_NUM_THREADS"] = "1"
# os.environ["MKL_NUM_THREADS"] = "1"

# from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction


# class EmbeddingService:

#     embedding_function = None

#     @classmethod
#     def get_embedding_function(cls):

#         if cls.embedding_function is None:
#             cls.embedding_function = SentenceTransformerEmbeddingFunction(
#                 model_name="all-MiniLM-L6-v2",
#                 device="cpu"
#             )

#         return cls.embedding_function

#     @classmethod
#     def create_embeddings(cls, chunks):

#         embedding_function = cls.get_embedding_function()

#         embeddings = embedding_function(chunks)

#         return embeddings

#     @classmethod
#     def create_query_embedding(cls, text):

#         embedding_function = cls.get_embedding_function()

#         return embedding_function([text])[0]


