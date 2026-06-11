import { useState } from "react";
import { scenarios, insights, articleSource } from "../../data/company";
import { useLang } from "../../context/LangContext";

export function ScenariosShowcase() {
  const { lang, t } = useLang();
  const [active, setActive] = useState(0);
  const scenario = scenarios[active];

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#58a6ff1f] via-transparent to-[#a371f71f]" />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#58a6ff]">
              <span>🎯</span> {t("sc.kicker")}
            </div>
            <h2 className="text-2xl font-semibold text-[#e6edf3] sm:text-3xl">{t("sc.title")}</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#8b949e]">{t("sc.subtitle")}</p>
          </div>

          {/* McKinsey insight card */}
          <a
            href={articleSource.url}
            target="_blank" rel="noopener noreferrer"
            className="block rounded-md border border-[#58a6ff66] bg-[#58a6ff11] px-4 py-3 transition hover:border-[#58a6ff] hover:bg-[#58a6ff22]"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-bold text-[#58a6ff]">{insights.mckinsey.valuePct}%</span>
              <span className="text-xs text-[#8b949e]">+</span>
            </div>
            <div className="mt-0.5 max-w-[220px] text-[11px] leading-4 text-[#c9d1d9]">
              {lang === "ru" ? insights.mckinsey.ru.slice(0, 70) + "…" : insights.mckinsey.en.slice(0, 70) + "…"}
            </div>
            <div className="mt-1 truncate font-mono text-[10px] text-[#58a6ff]">
              {insights.mckinsey.source} ↗
            </div>
          </a>
        </div>

        {/* Scenario tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {scenarios.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.key}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-transparent"
                    : "border-[#30363d] bg-[#161b22] text-[#c9d1d9] hover:border-[#58a6ff66]"
                }`}
                style={isActive ? {
                  background: s.color + "22",
                  color: s.color,
                  borderColor: s.color + "66",
                } : undefined}
              >
                <span className="text-lg">{s.icon}</span>
                {lang === "ru" ? s.title.ru : s.title.en}
              </button>
            );
          })}
        </div>

        {/* Active scenario detail */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
          {/* Description */}
          <div
            className="rounded-md border bg-[#161b22] p-5"
            style={{ borderColor: scenario.color + "55" }}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-2xl"
                style={{ background: scenario.color + "22", border: `1px solid ${scenario.color}55` }}
              >
                {scenario.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-[#e6edf3]">
                  {lang === "ru" ? scenario.title.ru : scenario.title.en}
                </h3>
                <p className="mt-1 text-sm text-[#c9d1d9]">
                  {lang === "ru" ? scenario.desc.ru : scenario.desc.en}
                </p>
              </div>
            </div>

            {/* Recommended car */}
            <div className="mt-4 rounded-md border border-[#30363d] bg-[#0d1117] p-3">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
                🚗 {t("sc.recommended")}
              </div>
              <div className="font-mono text-base font-semibold" style={{ color: scenario.color }}>
                {scenario.car}
              </div>
            </div>

            {/* Options */}
            <div className="mt-4">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
                ⚡ {t("sc.options")}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {scenario.options.map((opt) => (
                  <div
                    key={opt.en}
                    className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[#0d1117] px-2.5 py-1.5 text-xs text-[#c9d1d9]"
                  >
                    <span style={{ color: scenario.color }}>✓</span>
                    {lang === "ru" ? opt.ru : opt.en}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side: quote + article link */}
          <aside className="space-y-3">
            <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#a371f7]">
                {t("quote.label")}
              </div>
              <blockquote className="border-l-2 border-[#a371f7] pl-3 text-sm italic text-[#c9d1d9]">
                {t("quote.main")}
              </blockquote>
            </div>

            <a
              href={articleSource.url}
              target="_blank" rel="noopener noreferrer"
              className="block rounded-md border border-[#30363d] bg-[#161b22] p-4 transition hover:border-[#58a6ff66] hover:bg-[#1c2128]"
            >
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
                📄 {t("sc.source")}
              </div>
              <div className="text-sm font-semibold text-[#e6edf3]">
                {lang === "ru" ? articleSource.title.ru : articleSource.title.en}
              </div>
              <div className="mt-1 text-xs text-[#8b949e]">
                {lang === "ru" ? articleSource.excerpt.ru : articleSource.excerpt.en}
              </div>
              <div className="mt-2 text-xs font-semibold text-[#58a6ff]">
                {t("sc.readArticle")}
              </div>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
