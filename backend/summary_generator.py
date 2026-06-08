"""Generate local recruiter-facing summaries from match results."""

from typing import Dict, List


def _format_category_list(categories: List[str]) -> str:
    """Format category names for short summary sentences."""
    if not categories:
        return ""
    if len(categories) == 1:
        return categories[0]
    return ", ".join(categories[:-1]) + f" and {categories[-1]}"


def generate_analysis_summary(
    match_score: int,
    categorized_matched_skills: Dict[str, List[str]],
    categorized_missing_skills: Dict[str, List[str]],
) -> str:
    """Create a deterministic summary from categorized match data."""
    strong_categories = [
        category.lower()
        for category, skills in categorized_matched_skills.items()
        if skills
    ]
    gap_categories = [
        category.lower()
        for category, skills in categorized_missing_skills.items()
        if skills
    ]

    summary = f"Candidate matches {match_score}% of required skills."

    if strong_categories:
        summary += f" Strong in {_format_category_list(strong_categories)} technologies"
    else:
        summary += " No strong technical category match detected"

    if gap_categories:
        summary += f" but lacks {_format_category_list(gap_categories)} experience."
    else:
        summary += " with no major categorized skill gaps detected."

    return summary
