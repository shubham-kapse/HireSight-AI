"""Local resume analysis helpers.

This module intentionally avoids external LLM APIs so HireSight AI can run
fully locally and without paid services.
"""

from typing import Dict, List

from skill_extractor import extract_skills


def analyze_resume(resume_text: str) -> Dict[str, List[str]]:
    """Return a lightweight local resume analysis."""
    return {
        "skills": extract_skills(resume_text),
    }
