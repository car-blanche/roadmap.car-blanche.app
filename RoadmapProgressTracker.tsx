import { cities, statusMeta } from "../../data/company";
import { useLang } from "../../context/LangContext";

export function RoadmapProgressTracker() {
  const { lang } = useLang();

  const phases = [
    { key: "hq",        year: "2018", label: { ru: "Сейчас · Уфа",   en: "Now · Ufa" }, status: "hq" as const },
    { key: "soon-2026", year: "2026", label: { ru: "Q4 2026",         en: "Q4 2026" } },
    { key: "soon-2027", year: "2027", label: { ru: "2027",            en: "2027" } },
    { key: "soon-2028", year: "2028", label: { ru: "2028",            en: "2028" } },
    { key: "soon-2029", year: "2029", label: { ru: "2029 · цель",     en: "2029 · goal" } },
  ];

  const total = cities.length;
  let cumulative = 0;
  const phaseData = phases.map((p) => {
    const inPhase = cities.filter((c) => (c.status as string) === p.key);
    cumulative += inPhase.length;
    const meta = statusMeta[p.key === "hq" ? "hq" : (p.key as keyof typeof statusMeta)];
    return {
      ...p,
      cities: inPhase,
      cumulativeCount: cumulative,
      progressPct: (cumulative / total) * 100,
      color: meta.color,
    };
  });

  const currentPhaseIdx = 0;
  const currentProgress = (1 / total) * 100;

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3fb9501f] via-transparent to-[#db61a21f]" />

      <div className="relative">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#3fb950]">
              <span>📈</span>{" "}
              {lang === "ru" ? "Прогресс до 2029" : "Progress to 2029"}
            </div>
            <h2 className="text-2xl font-semibold text-[#e6edf3] sm:text-3xl">
              {lang === "ru" ? "От Уфы — к 21 городу за 3 года" : "From Ufa to 21 cities in 3 years"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#8b949e]">
              {lang === "ru"
                ? "Каждая фаза — конкретные города, сроки и KPI. Прогресс открыт публично, обновляется ежеквартально."
                : "Each phase — specific cities, deadlines, and KPIs. Progress is publicly tracked, updated quarterly."}
            </p>
          </div>

          {/* Current state */}
          <div className="rounded-md border border-[#3fb95066] bg-[#3fb95011] px-4 py-3 text-right">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#3fb950]">
              {lang === "ru" ? "Сегодня" : "Today"}
            </div>
            <div className="mt-0.5 font-mono text-2xl font-bold text-[#3fb950]">
              {currentProgress.toFixed(0)}%
            </div>
            <div className="text-[11px] text-[#8b949e]">
              1 / 21 {lang === "ru" ? "городов" : "cities"}
            </div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-[11px] font-mono text-[#8b949e]">
            <span>2018</span>
            <span>2026</span>
            <span>2027</span>
            <span>2028</span>
            <span className="text-[#db61a2]">2029</span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-[#161b22]">
            {/* Cumulative segments */}
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#3fb950] via-[#58a6ff] via-[#a371f7] via-[#d29922] to-[#db61a2]"
              style={{ width: "100%", opacity: 0.18 }}
            />
            {/* Current progress */}
            <div
              className="absolute left-0 top-0 h-full bg-[#3fb950] transition-all duration-700"
              style={{
                width: `${currentProgress}%`,
                boxShadow: "0 0 12px rgba(63, 185, 80, 0.6)",
              }}
            />
            {/* Marker for current */}
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0d1117] bg-[#3fb950]"
              style={{
                left: `${currentProgress}%`,
                boxShadow: "0 0 0 2px #3fb950, 0 0 12px rgba(63, 185, 80, 0.8)",
              }}
            />
          </div>
          <div className="mt-2 text-center text-[11px] text-[#8b949e]">
            {lang === "ru"
              ? `Сейчас работаем в 1 городе из ${total} запланированных к 2029`
              : `Currently operating in 1 of ${total} cities planned by 2029`}
          </div>
        </div>

        {/* Phase tracks */}
        <div className="space-y-3">
          {phaseData.map((phase, idx) => {
            const isCurrent = idx === currentPhaseIdx;
            const isFuture = idx > currentPhaseIdx;
            const phaseColor = phase.color;

            return (
              <div
                key={phase.key}
                className={`group rounded-md border p-4 transition ${
                  isCurrent
                    ? "border-[#3fb95066] bg-[#3fb95011]"
                    : isFuture
                    ? "border-[#30363d] bg-[#161b22] hover:border-[#58a6ff66]"
                    : "border-[#30363d] bg-[#161b22]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
                      style={{
                        background: phaseColor,
                        boxShadow: isCurrent ? `0 0 0 3px ${phaseColor}33` : undefined,
                      }}
                    >
                      {phase.year.slice(-2)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#e6edf3]">
                          {phase.label[lang]}
                        </span>
                        {isCurrent && (
                          <span className="flex items-center gap-1 rounded-full bg-[#3fb95022] px-1.5 py-0 text-[9px] font-semibold uppercase text-[#3fb950]">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fb950] opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3fb950]" />
                            </span>
                            {lang === "ru" ? "Сейчас" : "Now"}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#8b949e]">
                        +{phase.cities.length} {lang === "ru" ? "городов" : "cities"} ·{" "}
                        {lang === "ru" ? "итого" : "total"}: {phase.cumulativeCount}/{total}
                      </div>
                    </div>
                  </div>

                  {/* Phase cumulative bar */}
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[#21262d]">
                      <div
                        className="h-full transition-all duration-700"
                        style={{
                          width: `${phase.progressPct}%`,
                          background: phaseColor,
                        }}
                      />
                    </div>
                    <span className="font-mono text-xs font-semibold" style={{ color: phaseColor }}>
                      {phase.progressPct.toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Cities pills */}
                {phase.cities.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {phase.cities.map((c) => (
                      <span
                        key={c.name.en}
                        className="inline-flex items-center gap-1 rounded-full border border-[#30363d] bg-[#0d1117] px-2 py-0.5 text-[11px] text-[#c9d1d9]"
                      >
                        <span>{c.flag}</span>
                        {c.name[lang]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-6 rounded-md border border-[#30363d] bg-[#161b22] p-3 text-[11px] text-[#8b949e]">
          ℹ️{" "}
          {lang === "ru"
            ? "Запуск в новых городах — последовательный: сначала аренда автомобилей и формирование локальной академии шофёров (6 мес), затем soft launch для корпоративных клиентов, затем публичный релиз."
            : "Each new city launch is gradual: car fleet rental and local chauffeur academy setup (6 months), then soft launch for corporate clients, then public release."}{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); }} className="text-[#2f81f7] hover:underline">
            {lang === "ru" ? "Читать стратегию →" : "Read strategy →"}
          </a>
        </div>
      </div>
    </section>
  );
}
