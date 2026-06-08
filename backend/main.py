"""FastAPI application for local HireSight AI resume analysis."""

from typing import Dict, List

import fitz
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from parser import extract_text_from_pdf
from skill_extractor import extract_skills
from pydantic import BaseModel
from job_matcher import calculate_match
from recommendation_engine import generate_recommendation
from category_mapper import categorize_skills
from ats_scorer import calculate_ats_score
from summary_generator import generate_analysis_summary


MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024


class JobRequest(BaseModel):
    resume_text: str
    job_description: str


app = FastAPI(title="HireSight AI")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


def validate_pdf_upload(file: UploadFile, file_bytes: bytes) -> None:
    """Validate that an uploaded file is a non-empty PDF."""
    filename = file.filename or ""
    content_type = file.content_type or ""

    if not filename.lower().endswith(".pdf") and content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF resumes are supported.")

    if not file_bytes:
        raise HTTPException(status_code=400, detail="Uploaded PDF is empty.")

    if len(file_bytes) > MAX_UPLOAD_SIZE_BYTES:
        raise HTTPException(status_code=413, detail="PDF must be 10 MB or smaller.")


def parse_resume_pdf(file: UploadFile, file_bytes: bytes) -> str:
    """Validate and extract text from an uploaded resume PDF."""
    validate_pdf_upload(file, file_bytes)

    try:
        resume_text = extract_text_from_pdf(file_bytes).strip()
    except fitz.FileDataError as exc:
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid PDF.") from exc
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Unable to read the uploaded PDF.") from exc

    if not resume_text:
        raise HTTPException(
            status_code=422,
            detail="No readable text found in the PDF. Upload a text-based resume PDF.",
        )

    return resume_text


def build_analysis_response(filename: str, resume_text: str, job_description: str) -> Dict[str, object]:
    """Build the full recruiter-facing analysis response."""
    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)
    match_result = calculate_match(resume_skills, job_skills)

    matched_skills: List[str] = match_result["matched_skills"]
    missing_skills: List[str] = match_result["missing_skills"]
    categorized_matched_skills = categorize_skills(matched_skills, include_empty=True)
    categorized_missing_skills = categorize_skills(missing_skills, include_empty=True)
    recommendations = generate_recommendation(missing_skills)
    ats_score = calculate_ats_score(
        resume_text=resume_text,
        resume_skills=resume_skills,
        matched_skills=matched_skills,
        job_skills=job_skills,
    )
    summary = generate_analysis_summary(
        match_score=match_result["match_score"],
        categorized_matched_skills=categorized_matched_skills,
        categorized_missing_skills=categorized_missing_skills,
    )

    return {
        "filename": filename,
        "match_score": match_result["match_score"],
        "ats_score": ats_score,
        "summary": summary,
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "categorized_matched_skills": categorized_matched_skills,
        "categorized_missing_skills": categorized_missing_skills,
        "recommendations": recommendations,
    }


@app.get("/")
def home() -> Dict[str, str]:
    """Health check endpoint."""
    return {
        "message": "HireSight AI backend running successfully"
    }


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)) -> Dict[str, object]:
    """Upload a resume PDF and return extracted skills."""
    file_bytes = await file.read()
    resume_text = parse_resume_pdf(file, file_bytes)
    skills = extract_skills(resume_text)

    return {
        "filename": file.filename,
        "skills": skills
    }


@app.post("/job-match")
def job_match(data: JobRequest) -> Dict[str, object]:
    """Compare plain-text resume and job-description skills."""
    if not data.resume_text.strip():
        raise HTTPException(status_code=422, detail="Resume text cannot be empty.")

    if not data.job_description.strip():
        raise HTTPException(status_code=422, detail="Job description cannot be empty.")

    resume_skills = extract_skills(data.resume_text)
    job_skills = extract_skills(data.job_description)
    result = calculate_match(resume_skills, job_skills)

    return result


@app.post("/analyze-job-match")
async def analyze_job_match(
    file: UploadFile = File(...),
    job_description: str = Form(...)
) -> Dict[str, object]:
    """Analyze a resume PDF against a job description."""
    if not job_description.strip():
        raise HTTPException(status_code=422, detail="Job description cannot be empty.")

    file_bytes = await file.read()
    resume_text = parse_resume_pdf(file, file_bytes)

    return build_analysis_response(
        filename=file.filename or "",
        resume_text=resume_text,
        job_description=job_description,
    )

