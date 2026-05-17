import fitz

class PDFService:
    @staticmethod
    def extract_text(file_path:str):
        doc=fitz.open(file_path)
        full_text=""

        for page in doc:
            text=page.get_text()
            full_text+=text
        doc.close()
        return full_text

