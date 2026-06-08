"""Skill matching utilities for resume-to-job comparisons."""

from typing import Dict, List

from skill_extractor import normalize_skills


def calculate_match(resume_skills: List[str], job_skills: List[str]) -> Dict[str, object]:
    """Compare normalized resume skills against normalized job skills."""
    normalized_resume_skills = normalize_skills(resume_skills)
    normalized_job_skills = normalize_skills(job_skills)
    resume_skill_set = set(normalized_resume_skills)

    matched_skills = [
        skill
        for skill in normalized_job_skills
        if skill in resume_skill_set
    ]
    missing_skills = [
        skill
        for skill in normalized_job_skills
        if skill not in resume_skill_set
    ]

    match_score = 0
    if normalized_job_skills:
        match_score = round((len(matched_skills) / len(normalized_job_skills)) * 100)

    return {
        "match_score": match_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
    }
