from langchain_text_splitters import RecursiveCharacterTextSplitter

class ChunkService:
    @staticmethod
    def split_text(text:str):
        splitter=RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            separators=[
                "\n\n",
                "\n",
                ".",
                " "
            ]
        )
        chunks=splitter.split_text(text)
        return chunks