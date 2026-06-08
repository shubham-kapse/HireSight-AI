"""Local ATS compatibility scoring."""

import re
from typing import Iterable

from skill_extractor import normalize_skills


EMAIL_PATTERN = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+")
PHONE_PATTERN = re.compile(r"(?:\+?\d[\d\s().-]{7,}\d)")


def has_contact_information(resume_text: str) -> bool:
    """Return whether the resume contains an email address or phone number."""
    return bool(EMAIL_PATTERN.search(resume_text) or PHONE_PATTERN.search(resume_text))


def calculate_ats_score(
    resume_text: str,
    resume_skills: Iterable[str],
    matched_skills: Iterable[str],
    job_skills: Iterable[str],
) -> int:
    """Calculate a deterministic ATS compatibility score out of 100."""
    normalized_resume_skills = normalize_skills(resume_skills)
    normalized_matched_skills = normalize_skills(matched_skills)
    normalized_job_skills = normalize_skills(job_skills)
    resume_words = resume_text.split()
    word_count = len(resume_words)

    score = 0

    if normalized_job_skills:
        score += round((len(normalized_matched_skills) / len(normalized_job_skills)) * 45)

    if 350 <= word_count <= 900:
        score += 25
    elif 200 <= word_count < 350 or 900 < word_count <= 1200:
        score += 15
    elif word_count > 0:
        score += 8

    if normalized_resume_skills:
        score += min(20, len(normalized_resume_skills) * 2)

    if has_contact_information(resume_text):
        score += 10

    return min(score, 100)
