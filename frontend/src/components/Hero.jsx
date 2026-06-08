import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const statCards = [
  ["92%", "Role match", "text-emerald-300"],
  ["14", "Skills found", "text-cyan-200"],
  ["4", "Gaps to close", "text-amber-200"],
];

const chartBars = [32, 52, 44, 76, 58, 88, 66, 92, 72, 84];

function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 text-center md:pb-20 md:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-5xl"
      >
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-zinc-950/70 px-4 py-2 text-xs font-medium text-emerald-200 shadow-[0_0_28px_rgba(16,185,129,0.18)]">
          <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
          AI-powered resume intelligence for faster hiring decisions
        </div>

        <h1 className="text-5xl font-semibold leading-[0.95] tracking-normal text-zinc-100 md:text-7xl">
          The AI hiring
          <br />
          <span className="bg-gradient-to-r from-white via-emerald-200 to-zinc-200 bg-clip-text text-transparent">
            insight layer
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
          Upload a resume, compare it against a role, uncover skill gaps, and
          turn a messy screening step into a clear match score.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/analyze"
            className="rounded-full bg-emerald-500 px-7 py-3 font-semibold text-black transition hover:bg-emerald-300"
          >
            Start Analysis
          </Link>

          <a
            href="#features"
            className="rounded-full border border-white/10 bg-black/30 px-7 py-3 text-white transition hover:bg-white/10"
          >
            Learn More
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mx-auto mt-12 max-w-4xl"
      >
        <div className="rounded-lg border border-white/10 bg-zinc-950/90 p-3 shadow-[0_30px_120px_rgba(16,185,129,0.24)]">
          <div className="rounded-lg border border-white/5 bg-[#090d0c] p-4">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                HireSight
              </div>
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-zinc-700"></span>
                <span className="h-3 w-3 rounded-full bg-zinc-700"></span>
                <span className="h-3 w-10 rounded-full bg-zinc-700"></span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[0.9fr_2fr]">
              <div className="space-y-4 rounded-lg border border-white/5 bg-white/[0.03] p-4">
                <div className="h-3 w-24 rounded-full bg-zinc-700"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-zinc-700"></span>
                      <span className="h-2.5 w-24 rounded-full bg-zinc-800"></span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {statCards.map(([value, label, color]) => (
                  <div key={label} className="rounded-lg border border-white/5 bg-zinc-900 p-4 text-left">
                    <div className={`text-3xl font-semibold ${color}`}>
                      {value}
                    </div>
                    <div className="mt-2 text-xs text-zinc-500">
                      {label}
                    </div>
                    <div className="mt-5 h-2 rounded-full bg-zinc-800">
                      <div className="h-2 w-3/4 rounded-full bg-emerald-400"></div>
                    </div>
                  </div>
                ))}

                <div className="rounded-lg border border-white/5 bg-zinc-900 p-4 text-left md:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Skill coverage</span>
                    <span className="text-xs text-emerald-300">Live</span>
                  </div>
                  <div className="flex h-24 items-end gap-2">
                    {chartBars.map((height, index) => (
                      <span
                        key={index}
                        className="flex-1 rounded-t bg-emerald-400/80"
                        style={{ height: `${height}%` }}
                      ></span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-white/5 bg-zinc-900 p-4 text-left">
                  <span className="text-sm font-medium text-white">Recommendations</span>
                  <div className="mt-4 space-y-3">
                    <span className="block h-2 rounded-full bg-zinc-700"></span>
                    <span className="block h-2 rounded-full bg-zinc-800"></span>
                    <span className="block h-2 w-2/3 rounded-full bg-zinc-800"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
