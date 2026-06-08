"""Generate deterministic local recommendations for missing skills."""

from typing import Iterable, List


def generate_recommendation(missing_skills: Iterable[str]) -> List[str]:
    """Return practical recommendations for every missing skill."""
    recommendations = []
    recommendation_map = {
        "AWS": "Learn AWS fundamentals and deploy a cloud-based project.",
        "Docker": "Build and containerize an application using Docker.",
        "PostgreSQL": "Develop a project using PostgreSQL as the primary database.",
        "SQL": "Practice SQL queries and database design concepts.",
        "Kubernetes": "Learn container orchestration with Kubernetes.",
        "Machine Learning": "Build an end-to-end machine learning project.",
        "Python": "Strengthen Python skills through backend or AI projects.",
        "Git": "Practice version control workflows using Git and GitHub."
    }

    for skill in missing_skills:
        recommendations.append(
            recommendation_map.get(
                skill,
                f"Build a project demonstrating {skill} proficiency."
            )
        )

    return recommendations
