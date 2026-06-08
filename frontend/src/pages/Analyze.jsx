import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "https://hiresight-ai-wwz2.onrender.com/analyze-job-match";
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function getMatchState(score = 0) {
  if (score >= 70) {
    return {
      label: "Strong match",
      color: "text-emerald-300",
      ring: "stroke-emerald-400",
      bg: "bg-emerald-400",
    };
  }

  if (score >= 40) {
    return {
      label: "Moderate match",
      color: "text-amber-300",
      ring: "stroke-amber-300",
      bg: "bg-amber-300",
    };
  }

  return {
    label: "Needs improvement",
    color: "text-rose-300",
    ring: "stroke-rose-300",
    bg: "bg-rose-300",
  };
}

function EmptyState({ text }) {
  return (
    <p className="rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-zinc-500">
      {text}
    </p>
  );
}

function SkillPill({ skill, tone = "emerald" }) {
  const tones = {
    emerald: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    amber: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    zinc: "border-white/10 bg-white/[0.04] text-zinc-300",
  };

  return (
    <span className={`rounded-full border px-3 py-1.5 text-sm ${tones[tone]}`}>
      {skill}
    </span>
  );
}

function Analyze() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canAnalyze = resumeFile && jobDescription.trim() && !loading;
  const matchState = useMemo(
    () => getMatchState(result?.match_score || 0),
    [result]
  );
  const circumference = 2 * Math.PI * 52;
  const scoreOffset = result
    ? circumference - (Math.min(result.match_score, 100) / 100) * circumference
    : circumference;

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError("Upload a resume and paste a job description before analyzing.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", resumeFile);
      formData.append("job_description", jobDescription);

      const response = await axios.post(API_URL, formData);
      setResult(response.data);
    } catch (requestError) {
      console.error(requestError);
      setError("Unable to analyze right now. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#050807] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(180deg,rgba(16,185,129,0.08),rgba(5,8,7,0)_72%)]"></div>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-8">
        <motion.nav
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between border-b border-white/5 pb-5"
        >
          <Link to="/" className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M12.5 4.5 7 10l5.5 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Back to Home
          </Link>

          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
            HireSight AI
          </div>
        </motion.nav>

        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid gap-8 py-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-end"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.55 }}>
            <p className="text-sm font-medium text-emerald-300">
              Resume match analysis
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-normal text-zinc-100 md:text-6xl">
              Compare candidates against the role in seconds
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
              Upload a resume PDF, paste the job description, and HireSight will
              map matched skills, missing skills, and practical recommendations.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="grid gap-3 rounded-lg border border-white/10 bg-zinc-950/80 p-4 sm:grid-cols-3"
          >
            {[
              ["PDF", "Resume input"],
              ["Skills", "Keyword mapping"],
              ["Score", "Role alignment"],
            ].map(([title, detail]) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -3, borderColor: "rgba(52, 211, 153, 0.24)" }}
                className="rounded-lg border border-white/5 bg-white/[0.03] p-4"
              >
                <div className="text-xl font-semibold text-emerald-300">{title}</div>
                <div className="mt-1 text-sm text-zinc-500">{detail}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-lg border border-white/10 bg-zinc-950/90 p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Upload resume</h2>
                <p className="mt-1 text-sm text-zinc-500">PDF files work best.</p>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                Step 01
              </span>
            </div>

            <label className="mt-6 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-emerald-400/25 bg-emerald-400/[0.04] px-6 text-center transition hover:border-emerald-300/50 hover:bg-emerald-400/[0.07]">
              <input
                type="file"
                accept="application/pdf"
                className="sr-only"
                onChange={(event) => setResumeFile(event.target.files?.[0] || null)}
              />
              <svg viewBox="0 0 24 24" className="h-9 w-9 text-emerald-300" fill="none" aria-hidden="true">
                <path d="M12 15V4m0 0L8 8m4-4 4 4M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="mt-4 text-sm font-semibold text-white">
                Choose resume file
              </span>
              <span className="mt-1 text-sm text-zinc-500">
                Dragging is optional. Click to browse.
              </span>
            </label>

            {resumeFile && (
              <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{resumeFile.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setResumeFile(null)}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400 transition hover:text-white"
                >
                  Remove
                </button>
              </div>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="rounded-lg border border-white/10 bg-zinc-950/90 p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Job description</h2>
                <p className="mt-1 text-sm text-zinc-500">Paste the target role requirements.</p>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                Step 02
              </span>
            </div>

            <textarea
              rows="11"
              className="mt-6 w-full resize-none rounded-lg border border-white/10 bg-black/30 p-4 text-sm leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/10"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-500">
                {jobDescription.trim().length} characters added
              </p>
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
              >
                {loading ? "Analyzing..." : "Analyze Match"}
              </button>
            </div>

            {error && (
              <p className="mt-4 rounded-lg border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </p>
            )}
          </motion.div>
        </motion.section>

        {result && (
          <motion.section
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid gap-5 py-8 lg:grid-cols-[0.72fr_1.28fr]"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="rounded-lg border border-white/10 bg-zinc-950/90 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Match score</h2>
                  <p className={`mt-1 text-sm ${matchState.color}`}>{matchState.label}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500">
                  {result.filename}
                </span>
              </div>

              <div className="mt-8 grid place-items-center">
                <div className="relative h-40 w-40">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      strokeWidth="10"
                      className="fill-none stroke-white/10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      strokeWidth="10"
                      strokeLinecap="round"
                      className={`fill-none ${matchState.ring}`}
                      strokeDasharray={circumference}
                      strokeDashoffset={scoreOffset}
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div>
                      <p className="text-5xl font-semibold text-white">{result.match_score}%</p>
                      <p className="mt-1 text-xs text-zinc-500">aligned</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 h-2 rounded-full bg-white/10">
                <div
                  className={`h-2 rounded-full ${matchState.bg}`}
                  style={{ width: `${Math.min(result.match_score, 100)}%` }}
                ></div>
              </div>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2">
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="rounded-lg border border-white/10 bg-zinc-950/90 p-6"
              >
                <h3 className="text-lg font-semibold text-white">Matched skills</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {result.matched_skills.length ? (
                    result.matched_skills.map((skill) => (
                      <SkillPill key={skill} skill={skill} />
                    ))
                  ) : (
                    <EmptyState text="No matched skills found yet." />
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="rounded-lg border border-white/10 bg-zinc-950/90 p-6"
              >
                <h3 className="text-lg font-semibold text-white">Missing skills</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {result.missing_skills.length ? (
                    result.missing_skills.map((skill) => (
                      <SkillPill key={skill} skill={skill} tone="amber" />
                    ))
                  ) : (
                    <EmptyState text="No missing skills detected." />
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="rounded-lg border border-white/10 bg-zinc-950/90 p-6 md:col-span-2"
              >
                <h3 className="text-lg font-semibold text-white">Recommendations</h3>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {result.recommendations?.length ? (
                    result.recommendations.map((recommendation) => (
                      <div
                        key={recommendation}
                        className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-zinc-300"
                      >
                        {recommendation}
                      </div>
                    ))
                  ) : (
                    <EmptyState text="No recommendations available for the current gaps." />
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </main>
    </div>
  );
}

export default Analyze;
