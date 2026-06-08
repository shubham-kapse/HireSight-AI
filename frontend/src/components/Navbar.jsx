import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-white/5 py-5">
      <Link to="/" className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_24px_rgba(16,185,129,0.16)]">
          <svg
            viewBox="0 0 28 28"
            aria-hidden="true"
            className="h-5 w-5 text-emerald-300"
            fill="none"
          >
            <path
              d="M8.5 4.5h7.4l3.6 3.7v15.3h-11a3 3 0 0 1-3-3v-13a3 3 0 0 1 3-3Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M15.7 4.7v3.7h3.6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.8 13.2h5.4M9.8 16.3h4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M18.9 14.5l.8 1.6 1.6.8-1.6.8-.8 1.6-.8-1.6-1.6-.8 1.6-.8.8-1.6Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <h1 className="text-lg font-bold tracking-normal text-white">
          HireSight AI
        </h1>
      </Link>

      <div className="hidden items-center gap-7 text-sm md:flex">
        <a href="#features" className="text-zinc-400 transition hover:text-white">
          Features
        </a>

        <a href="#how-it-works" className="text-zinc-400 transition hover:text-white">
          How it Works
        </a>

        <a href="#insights" className="text-zinc-400 transition hover:text-white">
          Insights
        </a>
      </div>

      <Link
        to="/analyze"
        className="rounded-full border border-emerald-400/30 bg-emerald-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-emerald-300"
      >
        Get Started
      </Link>
    </nav>
  );
}

export default Navbar;
