import { useState, useEffect } from "react";
import { useView, COMPANY_LINKS } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";
import { tariffs } from "../../data/fleet";
import { AppStoreButtons } from "./AppStoreButtons";

export function HeroSection() {
  const { setView } = useView();
  const { lang } = useLang();
  const [tarIdx, setTarIdx] = useState(0);

  // Карусель по топовым тарифам
  const featured = [
    tariffs.find((t) => t.key === "business")!,
    tariffs.find((t) => t.key === "elegance")!,
    tariffs.find((t) => t.key === "luxury")!,
    tariffs.find((t) => t.key === "premium")!,
    tariffs.find((t) => t.key === "exclusive")!,
    tariffs.find((t) => t.key === "topcar")!,
  ];

  useEffect(() => {
    const id = setInterval(() => setTarIdx((i) => (i + 1) % featured.length), 3500);
    return () => clearInterval(id);
  }, [featured.length]);

  const tar = featured[tarIdx];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#30363d] bg-[#0d1117]">
      {/* layered gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1f6feb22] via-transparent to-[#a371f722]" />
      <div className="pointer-events-none absolute -top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#58a6ff] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#a371f7] opacity-15 blur-3xl" />

      {/* animated grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative grid items-center gap-6 p-8 sm:p-12 lg:grid-cols-[1fr_360px]">
        {/* Left: content */}
        <div className="min-w-0">
          {/* badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3fb95066] bg-[#3fb95011] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#3fb950]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fb950] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3fb950]" />
            </span>
            📍 {lang === "ru" ? "Уфа · с 2018" : "Ufa · since 2018"}
          </div>

          {/* H1 */}
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-[#e6edf3] sm:text-5xl lg:text-6xl">
            {lang === "ru" ? "Премиум-транспорт," : "Premium transport,"}
            <span className="block bg-gradient-to-r from-[#58a6ff] via-[#a371f7] to-[#f0883e] bg-clip-text text-transparent">
              {lang === "ru" ? "адаптированный под вас" : "tailored to you"}
            </span>
          </h1>

          {/* tagline */}
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#c9d1d9] sm:text-lg">
            {lang === "ru"
              ? "8 тарифов — от Business до Top Car с Ferrari. Профессиональные шофёры с 120 часами обучения. Из Уфы — в 20+ городов к 2029."
              : "8 tariffs — from Business to Top Car with Ferrari. Professional chauffeurs with 120 hours of training. From Ufa to 20+ cities by 2029."}
          </p>

          {/* big numbers row */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[#30363d] pt-5 sm:max-w-md">
            <BigStat value="8" label={lang === "ru" ? "тарифов сервиса" : "service tariffs"} />
            <BigStat value="от 1К ₽" label={lang === "ru" ? "минимальная цена" : "starting price"} />
            <BigStat value="24/7" label={lang === "ru" ? "поддержка" : "support"} />
          </div>

          {/* CTAs — App Store + Google Play */}
          <div className="mt-6 space-y-3">
            <AppStoreButtons size="md" />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setView("projects")}
                className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-5 py-2.5 text-sm font-semibold text-[#e6edf3] hover:bg-[#30363d]"
              >
                🎯 {lang === "ru" ? "Дорожная карта" : "Roadmap"}
              </button>
              <a
                href={COMPANY_LINKS.businessNews}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-5 py-2.5 text-sm text-[#e6edf3] hover:bg-[#30363d]"
              >
                📰 News
              </a>
            </div>
          </div>
        </div>

        {/* Right: animated tariff card */}
        <div className="relative hidden lg:block">
          <div
            key={tarIdx}
            className="relative overflow-hidden rounded-xl border bg-[#161b22] p-6"
            style={{
              borderColor: tar.color + "66",
              background: `radial-gradient(ellipse at top right, ${tar.color}22, transparent 70%), #161b22`,
              transition: "background 1.2s ease",
              animation: "tariffSlide 0.6s ease-out",
            }}
          >
            {/* Top badge */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-bold text-white"
                  style={{ background: tar.color }}
                >
                  {tar.rank}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
                  {lang === "ru" ? "Тариф" : "Tariff"}
                </span>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#3fb950]">
                ⭐ {lang === "ru" ? "Доступен" : "Available"}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-3xl font-bold" style={{ color: tar.color }}>
              {tar.name}
            </h3>

            {/* Tagline */}
            <p className="mt-1 text-sm italic text-[#c9d1d9] min-h-[40px]">
              {tar.tagline[lang]}
            </p>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-1 border-t border-[#30363d] pt-3">
              <span className="text-[10px] uppercase tracking-wider text-[#8b949e]">
                {lang === "ru" ? "от" : "from"}
              </span>
              <span className="font-mono text-3xl font-bold" style={{ color: tar.color }}>
                {tar.priceFrom.toLocaleString("ru-RU")}
              </span>
              <span className="text-lg text-[#8b949e]">₽</span>
            </div>

            {/* First 3 models hint */}
            <div className="mt-3 flex flex-wrap gap-1">
              {tar.models.slice(0, 3).map((m) => (
                <span
                  key={m}
                  className="rounded border border-[#30363d] bg-[#0d1117] px-1.5 py-0.5 text-[10px] text-[#c9d1d9]"
                >
                  {m}
                </span>
              ))}
              {tar.models.length > 3 && (
                <span className="rounded border border-[#30363d] bg-[#0d1117] px-1.5 py-0.5 text-[10px] text-[#8b949e]">
                  +{tar.models.length - 3}
                </span>
              )}
            </div>

            {/* progress dots */}
            <div className="mt-5 flex items-center justify-center gap-1.5">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTarIdx(i)}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === tarIdx ? 24 : 6,
                    background: i === tarIdx ? tar.color : "#30363d",
                  }}
                  aria-label={`Tariff ${featured[i].name}`}
                />
              ))}
            </div>
          </div>

          {/* floating badge */}
          <div className="absolute -bottom-4 -right-4 rounded-md border border-[#3fb95066] bg-[#0d1117] px-3 py-1.5 shadow-lg">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[#3fb950]">
              ⭐ {lang === "ru" ? "Рейтинг" : "Rating"}
            </div>
            <div className="text-sm font-bold text-[#e6edf3]">4.94 / 5.0</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tariffSlide {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

function BigStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-2xl font-bold text-[#e6edf3] sm:text-3xl">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-[#8b949e]">{label}</div>
    </div>
  );
}
