import chromadb

client = chromadb.PersistentClient(
    path="data/embeddings"
)

collection = client.get_or_create_collection(
    name="research_papers"
)

class ChromaService:
    @staticmethod
    def store(
        paper_id,
        chunks,
        vectors
    ):

        ids = [
            f"{paper_id}_{i}"
            for i in range(
                len(chunks)
            )
        ]


        metadatas=[
            {
                "paper_id":
                paper_id
            }

            for _ in chunks
        ]

        collection.add(
            ids=ids,
            documents=chunks,
            embeddings=vectors,
            metadatas=metadatas
        )