from fastapi import APIRouter, UploadFile, File, Depends
from app.core.security import get_current_user
# comment out for heavy for deploying on render, restore if move to aws or paid deployment
# from app.services.pdf_service import PDFService
# from app.services.chunk_service import ChunkService
# from app.services.embedding_service import EmbeddingService
from app.vectorstore.chroma_service import collection
from app.database.connection import db
import os
router=APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


UPLOAD_DIR="data/uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)
@router.post("")
async def upload_pdf(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    from app.services.pdf_service import PDFService
    from app.services.chunk_service import ChunkService
    from app.services.embedding_service import EmbeddingService
    from app.vectorstore.chroma_service import ChromaService, collection

    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    print("FILE SAVED")

    extracted_text = PDFService.extract_text(file_path)
    print("TEXT EXTRACTED")

    chunks = ChunkService.split_text(extracted_text)
    print("CHUNKS:", len(chunks))

    vectors = EmbeddingService.create_embeddings(chunks)
    print("EMBEDDINGS CREATED")

    paper_data = {
        "filename": file.filename,
        "user_id": current_user["id"],
        "total_chunks": len(chunks)
    }

    result = await db.papers.insert_one(paper_data)

    paper_id = str(result.inserted_id)

    print("STORE PAPER ID:", paper_id)

    ChromaService.store(
        paper_id,
        chunks,
        vectors
    )
    print("STORE PAPER ID:", paper_id)

    stored = collection.get(
        where={"paper_id": paper_id}
    )

    print("STORED DATA:", stored)

    print("CHROMA STORE COMPLETE")

    print(
        collection.get(
            where={"paper_id": paper_id}
        )
    )

    return {
        "paper_id": paper_id,
        "chunks": len(chunks),
        "status": "uploaded"
    }

# @router.post("")
# async def upload_pdf(
#     file:UploadFile=File(...),
#     current_user: dict = Depends(get_current_user)
# ):
#     from app.services.pdf_service import PDFService
#     from app.services.chunk_service import ChunkService
#     from app.services.embedding_service import EmbeddingService
#     from app.vectorstore.chroma_service import ChromaService


#     file_path=f"{UPLOAD_DIR}/{file.filename}"


#     with open(file_path,"wb") as f:

#         content=await file.read()

#         f.write(content)


#     extracted_text=(
#         PDFService.extract_text(file_path)
#     )
#     chunks=(ChunkService.split_text(extracted_text))


#     vectors=(EmbeddingService.create_embeddings(chunks))


#     paper_data={
#         "filename":file.filename,

#         "user_id": current_user.get("id"),

#         "total_chunks":len(chunks)
#     }


#     result=await (db.papers.insert_one(paper_data))

#     paper_id=str(result.inserted_id)

#     ChromaService.store(
#         paper_id,
#         chunks,
#         vectors
#     )
#     return{
#         "paper_id":paper_id,

#         "filename":file.filename,

#         "chunks":len(chunks),

#         "status":"uploaded"
#     }
