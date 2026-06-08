"""Map extracted skills into recruiter-friendly skill categories."""

from typing import Dict, Iterable, List

from skill_extractor import normalize_skills
from skills_db import SKILL_CATEGORIES


def categorize_skills(skills: Iterable[str], include_empty: bool = False) -> Dict[str, List[str]]:
    """Return skills grouped by category.

    Args:
        skills: Skill names to categorize.
        include_empty: Include every known category even when no skills match.
    """
    normalized_skills = set(normalize_skills(skills))
    categorized: Dict[str, List[str]] = {}

    for category, category_skills in SKILL_CATEGORIES.items():
        category_matches = [
            skill
            for skill in category_skills
            if skill in normalized_skills
        ]

        if category_matches or include_empty:
            categorized[category] = category_matches

    return categorized
