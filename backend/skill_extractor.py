"""Local keyword-based skill extraction and normalization."""

import re
from typing import Iterable, List

from skills_db import SKILL_ALIASES, SKILLS_DB


def normalize_skill(skill: str) -> str:
    """Return the canonical display name for a skill or alias."""
    cleaned_skill = " ".join(skill.strip().split())
    return SKILL_ALIASES.get(cleaned_skill.lower(), cleaned_skill)


def normalize_skills(skills: Iterable[str]) -> List[str]:
    """Normalize, de-duplicate, and sort a collection of skills."""
    normalized = {
        normalize_skill(skill)
        for skill in skills
        if skill and skill.strip()
    }

    return sorted(normalized)


def extract_skills(text: str) -> List[str]:
    """Extract known technical skills from free-form text."""
    if not text:
        return []

    text_lower = text.lower()
    found_skills = set()

    for keyword, normalized_name in SKILLS_DB.items():
        pattern = rf"(?<![a-z0-9+#]){re.escape(keyword.lower())}(?![a-z0-9+#])"

        if re.search(pattern, text_lower):
            found_skills.add(normalized_name)

    return normalize_skills(found_skills)
