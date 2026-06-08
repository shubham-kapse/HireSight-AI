"""PDF parsing utilities."""

import fitz


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text from uploaded PDF bytes."""
    with fitz.open(stream=file_bytes, filetype="pdf") as pdf_document:
        return "\n".join(page.get_text() for page in pdf_document)
