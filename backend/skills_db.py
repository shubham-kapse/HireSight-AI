"""Skill keyword, alias, and category configuration for local analysis."""

from typing import Dict, List


SKILLS_DB: Dict[str, str] = {
    # Programming Languages
    "python": "Python",
    "javascript": "JavaScript",
    "js": "JavaScript",
    "typescript": "TypeScript",
    "ts": "TypeScript",
    "java": "Java",
    "c++": "C++",
    "c#": "C#",
    "go": "Go",
    "rust": "Rust",

    # Frontend
    "react": "React.js",
    "react.js": "React.js",
    "next.js": "Next.js",
    "angular": "Angular",
    "vue": "Vue.js",
    "tailwind": "Tailwind CSS",
    "tailwind css": "Tailwind CSS",

    # Backend
    "node.js": "Node.js",
    "node": "Node.js",
    "express": "Express.js",
    "fastapi": "FastAPI",
    "django": "Django",
    "flask": "Flask",
    "spring boot": "Spring Boot",

    # Databases
    "sql": "SQL",
    "mysql": "MySQL",
    "postgresql": "PostgreSQL",
    "mongodb": "MongoDB",
    "redis": "Redis",

    # Cloud
    "aws": "AWS",
    "amazon web services": "AWS",
    "azure": "Microsoft Azure",
    "gcp": "Google Cloud Platform",
    "google cloud platform": "Google Cloud Platform",

    # DevOps
    "docker": "Docker",
    "kubernetes": "Kubernetes",
    "jenkins": "Jenkins",
    "ci/cd": "CI/CD",

    # AI/ML
    "machine learning": "Machine Learning",
    "deep learning": "Deep Learning",
    "tensorflow": "TensorFlow",
    "pytorch": "PyTorch",
    "nlp": "Natural Language Processing",
    "llm": "Large Language Models",
    "llms": "Large Language Models",
    "rag": "Retrieval Augmented Generation",
    "langchain": "LangChain",
    "openai": "OpenAI",
    "gemini": "Gemini AI",
    "prompt engineering": "Prompt Engineering",

    # Version Control
    "git": "Git",
    "github": "GitHub"
}

SKILL_ALIASES: Dict[str, str] = {
    "react": "React.js",
    "react.js": "React.js",
    "node": "Node.js",
    "node.js": "Node.js",
    "js": "JavaScript",
    "javascript": "JavaScript",
    "ts": "TypeScript",
    "typescript": "TypeScript",
}

SKILL_CATEGORIES: Dict[str, List[str]] = {
    "Cloud": [
        "AWS",
        "Google Cloud Platform",
        "Microsoft Azure"
    ],

    "DevOps": [
        "Docker",
        "Kubernetes",
        "Jenkins",
        "CI/CD"
    ],

    "Frontend": [
        "React.js",
        "Next.js",
        "Angular",
        "Vue.js"
    ],

    "Backend": [
        "Node.js",
        "Express.js",
        "FastAPI",
        "Django",
        "Flask",
        "Spring Boot"
    ],

    "Database": [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "SQL"
    ],

    "AI/ML": [
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "LangChain",
        "Large Language Models",
        "Prompt Engineering",
        "Retrieval Augmented Generation"
    ]
}
