import { useState, useEffect } from "react";
import { useView, COMPANY_LINKS } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";
import { AppStoreButtons } from "./AppStoreButtons";

export function WelcomeBanner() {
  const { setView } = useView();
  const { t } = useLang();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHidden(localStorage.getItem("cb-welcome-hidden") === "1");
    }
  }, []);

  const close = () => {
    setHidden(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("cb-welcome-hidden", "1");
    }
  };

  if (hidden) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-5 sm:p-6">
      {/* мягкий градиент-фон, без тёмных пятен — работает во всех темах */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1f6feb1f] via-transparent to-[#a371f71f]" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#1f6feb] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[#a371f7] opacity-10 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a371f7]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fb950] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3fb950]" />
            </span>
            {t("welcome.kicker")}
          </div>
          <button
            onClick={close}
            className="rounded-md p-1 text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3]"
            aria-label={t("welcome.close")}
            title={t("welcome.close")}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>
        </div>

        <h2 className="mt-3 text-2xl font-semibold text-[#e6edf3] sm:text-3xl">
          {t("welcome.title1")}
          <span className="bg-gradient-to-r from-[#58a6ff] via-[#a371f7] to-[#f0883e] bg-clip-text text-transparent">
            {" "}{t("welcome.title2")}
          </span>
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#c9d1d9]">
          {t("welcome.body")}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => setView("projects")}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#238636] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2ea043]"
          >
            {t("welcome.cta.plan")}
          </button>
          <button
            onClick={() => setView("team")}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm font-semibold text-[#e6edf3] hover:bg-[#30363d]"
          >
            {t("welcome.cta.team")}
          </button>
          <a
            href={COMPANY_LINKS.github}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm font-semibold text-[#e6edf3] hover:bg-[#30363d]"
          >
            {t("welcome.cta.gh")}
          </a>
        </div>

        {/* App Store + Google Play */}
        <div className="mt-4">
          <AppStoreButtons size="sm" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value={t("welcome.stat1.v")} label={t("welcome.stat1.l")} />
          <Stat value={t("welcome.stat2.v")} label={t("welcome.stat2.l")} />
          <Stat value={t("welcome.stat3.v")} label={t("welcome.stat3.l")} />
          <Stat value={t("welcome.stat4.v")} label={t("welcome.stat4.l")} />
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md border border-[#30363d] bg-[#0d1117]/60 px-3 py-2 backdrop-blur">
      <div className="font-mono text-lg font-semibold text-[#e6edf3]">{value}</div>
      <div className="text-[11px] text-[#8b949e]">{label}</div>
    </div>
  );
}
