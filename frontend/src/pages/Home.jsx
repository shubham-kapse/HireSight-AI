import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const logos = ["Northstar", "TalentOS", "SkillGrid", "Rolebase", "VectorHR"];
const categoryBars = [42, 68, 48, 88, 56, 76, 34];
const workflowSteps = [
  ["Upload", "Resume PDF"],
  ["Compare", "Job description"],
  ["Improve", "Skill gaps"],
];

function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050807] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      <div className="absolute inset-x-0 top-0 h-[760px] bg-[linear-gradient(180deg,rgba(16,185,129,0.08),rgba(5,8,7,0)_72%)]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Navbar />
        <Hero />

        <section className="border-y border-white/5 bg-black/35 py-5">
          <div className="grid grid-cols-2 items-center gap-6 text-center text-sm font-semibold text-zinc-500 md:grid-cols-5">
            {logos.map((logo) => (
              <div key={logo} className="tracking-normal">
                {logo}
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="py-20 text-center">
          <p className="text-sm font-medium text-emerald-300">
            Access to better screening
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-normal text-zinc-100 md:text-5xl">
            Resume insights your team can act on immediately
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400">
            HireSight turns resume PDFs and job descriptions into a practical
            match report with skills, gaps, categories, and next-step guidance.
          </p>
        </section>

        <section id="insights" className="grid gap-4 pb-24 md:grid-cols-2">
          <div className="min-h-[300px] rounded-lg border border-emerald-400/20 bg-emerald-500/10 p-8 text-left">
            <span className="rounded-full border border-emerald-300/20 bg-black/25 px-3 py-1 text-xs font-medium text-emerald-100">
              Scalability
            </span>
            <h3 className="mt-20 max-w-md text-3xl font-semibold leading-tight text-white">
              Build a repeatable resume review flow with AI support
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-6 text-emerald-50/70">
              Convert every job description into a focused skill profile and
              see where each candidate aligns before deeper review.
            </p>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
            <img
              src="/feature-workspace.png"
              alt="Professional reviewing AI resume insights on a laptop"
              className="h-full min-h-[300px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"></div>
          </div>

          <div className="rounded-lg border border-white/10 bg-zinc-950 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Skill categories</span>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                Auto grouped
              </span>
            </div>
            <div className="mt-8 flex h-32 items-end gap-3">
              {categoryBars.map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t bg-emerald-400/80"
                  style={{ height: `${height}%` }}
                ></span>
              ))}
            </div>
          </div>

          <div id="how-it-works" className="rounded-lg border border-white/10 bg-zinc-950 p-6 text-left">
            <span className="text-sm font-medium text-white">Simple workflow</span>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {workflowSteps.map(([title, detail]) => (
                <div key={title} className="rounded-lg border border-white/5 bg-white/[0.03] p-4">
                  <div className="text-lg font-semibold text-emerald-300">{title}</div>
                  <div className="mt-2 text-sm text-zinc-500">{detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
