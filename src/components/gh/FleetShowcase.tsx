import { useState } from "react";
import { tariffs, type Tariff } from "../../data/fleet";
import { useLang } from "../../context/LangContext";
import { COMPANY_LINKS } from "../../context/ViewContext";
import { AppleIcon, PlayIcon } from "./AppStoreButtons";

export function FleetShowcase() {
  const { lang, t } = useLang();
  const [activeIdx, setActiveIdx] = useState(0);

  const tariff = tariffs[activeIdx];

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f851491f] via-transparent to-[#a371f71f]" />
      <div
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full blur-3xl opacity-20 transition-colors duration-500"
        style={{ background: tariff.color }}
      />

      <div className="relative">
        {/* Header */}
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f85149]">
              <span>🏷️</span> {lang === "ru" ? "Тарифы Car Blanche" : "Car Blanche tariffs"}
            </div>
            <h2 className="text-2xl font-semibold text-[#e6edf3] sm:text-3xl">
              {lang === "ru" ? "8 классов сервиса — от Business до Top Car" : "8 service classes — from Business to Top Car"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#8b949e]">
              {lang === "ru"
                ? "Прозрачные цены от 1000 ₽. Каждый тариф — фиксированный пул моделей и понятный уровень сервиса."
                : "Transparent pricing from ₽1000. Each tariff — fixed model pool and clear service level."}
            </p>
          </div>

          <a
            href={COMPANY_LINKS.net + "businessnews"}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs text-[#e6edf3] hover:bg-[#30363d]"
          >
            📄 car-blanche.net ↗
          </a>
        </div>

        {/* Tariff pills bar */}
        <div className="mb-5 flex flex-wrap gap-2">
          {tariffs.map((tar, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={tar.key}
                onClick={() => setActiveIdx(i)}
                className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "border-transparent shadow-lg"
                    : "border-[#30363d] bg-[#161b22] text-[#c9d1d9] hover:border-[#58a6ff66]"
                }`}
                style={isActive ? {
                  background: tar.color + "22",
                  color: tar.color,
                  borderColor: tar.color + "88",
                  boxShadow: `0 4px 12px ${tar.color}33`,
                } : undefined}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] font-bold"
                  style={{
                    background: isActive ? tar.color : tar.color + "33",
                    color: isActive ? "#fff" : tar.color,
                  }}
                >
                  {tar.rank}
                </span>
                {tar.name}
                <span className="opacity-70 font-mono text-[10px]">
                  от {tar.priceFrom.toLocaleString("ru-RU")} ₽
                </span>
              </button>
            );
          })}
        </div>

        {/* Active tariff DETAIL — full width hero card */}
        <TariffDetail tariff={tariff} />

        {/* Compare all tariffs · compact grid */}
        <div className="mt-6">
          <details className="group/cmp">
            <summary className="flex cursor-pointer items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-4 py-2.5 text-sm text-[#e6edf3] hover:bg-[#1c2128]">
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e] transition-transform group-open/cmp:rotate-90" fill="currentColor">
                <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
              </svg>
              <span className="font-semibold">
                {lang === "ru" ? "Сравнить все тарифы" : "Compare all tariffs"}
              </span>
              <span className="ml-auto text-xs text-[#8b949e]">{tariffs.length} {t("res.cards.count")}</span>
            </summary>

            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {tariffs.map((tar, i) => (
                <button
                  key={tar.key}
                  onClick={() => setActiveIdx(i)}
                  className={`group rounded-md border bg-[#161b22] p-3 text-left transition hover:bg-[#1c2128] ${
                    i === activeIdx ? "" : "border-[#30363d] hover:border-[#58a6ff66]"
                  }`}
                  style={i === activeIdx ? { borderColor: tar.color + "aa" } : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold" style={{ color: tar.color }}>
                      {tar.name}
                    </span>
                    <span className="font-mono text-xs text-[#8b949e]">от {tar.priceFrom} ₽</span>
                  </div>
                  <div className="mt-1 text-[10px] text-[#8b949e] line-clamp-2">
                    {tar.models.slice(0, 3).join(" · ")}…
                  </div>
                </button>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

function TariffDetail({ tariff }: { tariff: Tariff }) {
  const { lang } = useLang();

  return (
    <article
      key={tariff.key}
      className="overflow-hidden rounded-xl border bg-[#161b22] transition"
      style={{
        borderColor: tariff.color + "55",
        animation: "tariffIn 0.35s ease-out",
      }}
    >
      {/* Hero band */}
      <div
        className="relative px-6 py-6 sm:px-8"
        style={{
          background: `linear-gradient(135deg, ${tariff.color}22 0%, transparent 60%)`,
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-baseline gap-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-md font-mono text-sm font-bold text-white"
                style={{ background: tariff.color }}
              >
                {tariff.rank}
              </span>
              <h3 className="text-3xl font-bold text-[#e6edf3] sm:text-4xl">
                {tariff.name}
              </h3>
            </div>
            <p
              className="mt-2 max-w-md text-base italic"
              style={{ color: tariff.color }}
            >
              {tariff.tagline[lang]}
            </p>
            <p className="mt-1 max-w-md text-sm text-[#c9d1d9]">
              {tariff.desc[lang]}
            </p>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
              {lang === "ru" ? "Цена от" : "From"}
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-mono text-4xl font-bold text-[#e6edf3] sm:text-5xl">
                {tariff.priceFrom.toLocaleString("ru-RU")}
              </span>
              <span className="text-lg text-[#8b949e]">₽</span>
            </div>
            <div className="mt-0.5 text-[11px] text-[#8b949e]">
              {lang === "ru" ? "за поездку" : "per ride"}
            </div>
          </div>
        </div>
      </div>

      {/* Models list */}
      <div className="border-t border-[#30363d] px-6 py-5 sm:px-8">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
          {lang === "ru" ? "🚙 Модели в тарифе" : "🚙 Models in this tariff"}
        </div>
        <div className="flex flex-wrap gap-2">
          {tariff.models.map((m) => (
            <span
              key={m}
              className="rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-sm font-medium text-[#c9d1d9]"
              style={{ borderLeft: `3px solid ${tariff.color}` }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Best for + CTA */}
      <div className="border-t border-[#30363d] bg-[#0d1117] px-6 py-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
              🎯 {lang === "ru" ? "Идеально для" : "Best for"}
            </div>
            <div className="mt-0.5 text-sm font-medium text-[#e6edf3]">
              {tariff.bestFor[lang]}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={COMPANY_LINKS.appStore}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#000] px-3 py-2 text-xs font-semibold text-white transition hover:opacity-80"
              title="App Store"
            >
              <AppleIcon className="h-4 w-4" />
              App Store
            </a>
            <a
              href={COMPANY_LINKS.playStore}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#000] px-3 py-2 text-xs font-semibold text-white transition hover:opacity-80"
              title="Google Play"
            >
              <PlayIcon className="h-4 w-4" />
              Google Play
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tariffIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </article>
  );
}
