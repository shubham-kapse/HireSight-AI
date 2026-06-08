# HireSight AI

HireSight AI is a full-stack resume screening and job matching platform that helps candidates and recruiters quickly evaluate how well a resume aligns with a job description.

The platform extracts skills from uploaded resumes, compares them against job requirements, identifies missing skills, calculates a match score, and generates actionable recommendations for improvement.

---

## Features

### Resume Upload

* Upload resumes in PDF format
* Extract resume content automatically
* Parse candidate skills from resume text

### Job Matching

* Compare resume skills with job description requirements
* Calculate skill match percentage
* Identify matched and missing skills

### Skill Analysis

* Categorize skills into:

  * Frontend
  * Backend
  * Database
  * Cloud
  * DevOps
  * AI/ML

### ATS Insights

* ATS compatibility scoring
* Skill gap detection
* Resume improvement suggestions

### Recommendations

* Generate personalized recommendations based on missing skills
* Highlight areas for improvement

---

## Screenshots

### Landing Page

(Add landing page screenshot here)

### Resume Analysis Dashboard

(Add analysis page screenshot here)

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router

### Backend

* FastAPI
* Python
* PyMuPDF

### AI / NLP Components

* Skill Extraction Engine
* Resume Parsing
* Job Description Analysis
* ATS Scoring
* Recommendation Engine

---

## Project Structure

```text
HireSight-AI/
│
├── backend/
│   ├── main.py
│   ├── parser.py
│   ├── skill_extractor.py
│   ├── job_matcher.py
│   ├── recommendation_engine.py
│   ├── ats_scorer.py
│   ├── category_mapper.py
│   ├── summary_generator.py
│   ├── skills_db.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## How It Works

### Step 1

Upload a PDF resume.

### Step 2

Paste a job description.

### Step 3

HireSight AI extracts skills from both the resume and job description.

### Step 4

The matching engine compares required skills against candidate skills.

### Step 5

The platform generates:

* Match Score
* ATS Score
* Matched Skills
* Missing Skills
* Skill Categories
* Recommendations

---

## Backend API Endpoints

### Upload Resume

```http
POST /upload-resume
```

Extracts text and skills from a PDF resume.

### Job Match

```http
POST /job-match
```

Compares resume text against a job description.

### Analyze Job Match

```http
POST /analyze-job-match
```

Returns:

* Match Score
* ATS Score
* Missing Skills
* Recommendations
* Skill Categories

---

## Installation

### Clone Repository

```bash
git clone https://github.com/shubham-kapse/HireSight-AI.git
cd HireSight-AI
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Future Improvements

* Semantic skill matching using embeddings
* Resume ranking for multiple candidates
* Recruiter dashboard
* Interview readiness analysis
* Cover letter generation
* Candidate comparison engine
* Role-specific ATS optimization

---

## Author

### Shubham Kapse

Full Stack Developer | AI Enthusiast

LinkedIn: Add your LinkedIn URL

GitHub:
https://github.com/shubham-kapse

---

## License

This project is created for educational and portfolio purposes.
