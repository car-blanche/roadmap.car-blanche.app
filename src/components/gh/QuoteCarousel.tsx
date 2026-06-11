import { useState, useEffect } from "react";
import { quotes } from "../../data/fleet";
import { useLang } from "../../context/LangContext";

export function QuoteCarousel() {
  const { lang, t } = useLang();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const q = quotes[idx];

  return (
    <section
      className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#a371f71f] via-transparent to-[#58a6ff1f]" />
      <div className="pointer-events-none absolute -left-12 top-4 text-[180px] leading-none text-[#a371f7] opacity-10 select-none font-serif">
        "
      </div>

      <div className="relative">
        {/* Kicker */}
        <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a371f7]">
          <span>💭</span> {t("qc.title")}
        </div>

        {/* Quote */}
        <div className="min-h-[140px]">
          <blockquote
            key={idx}
            className="text-2xl font-light leading-relaxed text-[#e6edf3] sm:text-3xl"
            style={{ animation: "quoteIn 0.45s ease-out" }}
          >
            {q.text[lang]}
          </blockquote>
          <div className="mt-4 text-sm font-mono text-[#a371f7]">
            — {q.author[lang]}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center gap-3">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Quote ${i + 1}`}
              className="h-1.5 overflow-hidden rounded-full bg-[#30363d] transition-all"
              style={{
                width: i === idx ? 32 : 8,
              }}
            >
              {i === idx && (
                <span
                  className="block h-full bg-[#a371f7]"
                  style={{
                    animation: paused ? "none" : "fillBar 6s linear",
                  }}
                />
              )}
            </button>
          ))}
          <span className="ml-auto font-mono text-[10px] text-[#8b949e]">
            {idx + 1} / {quotes.length}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes quoteIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fillBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
