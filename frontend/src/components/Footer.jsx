import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div>
          <h3 className="mb-2 text-xl font-bold">
            HireSight AI
          </h3>

          <p className="text-zinc-500">
            AI-Powered Resume Intelligence
          </p>
        </div>

        <div className="flex gap-8 text-zinc-500">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#how-it-works" className="transition hover:text-white">
            How It Works
          </a>

          <Link to="/analyze" className="transition hover:text-white">
            Launch App
          </Link>
        </div>
      </div>

      <div className="mt-8 border-t border-white/5 pt-8 text-center text-zinc-600">
        (c) 2026 HireSight AI. Built by Shubham Kapse.
      </div>
    </footer>
  );
}

export default Footer;
