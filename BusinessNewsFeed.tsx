import { useState } from "react";
import { businessNews, newsCategoriesMeta, type BusinessNews } from "../../data/fleet";
import { useLang } from "../../context/LangContext";
import { COMPANY_LINKS } from "../../context/ViewContext";

type FilterKey = BusinessNews["category"] | "all";

export function BusinessNewsFeed() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [openId, setOpenId] = useState<string | null>(businessNews[0].id);

  const filtered = filter === "all" ? businessNews : businessNews.filter((n) => n.category === filter);

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f0883e1f] via-transparent to-[#3fb9501f]" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-[#f0883e] opacity-10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f0883e]">
              <span>📰</span> {t("news.kicker")}
            </div>
            <h2 className="text-2xl font-semibold text-[#e6edf3] sm:text-3xl">{t("news.title")}</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#8b949e]">{t("news.subtitle")}</p>
          </div>

          <a
            href={COMPANY_LINKS.net + "businessnews"}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-[#f0883e66] bg-[#f0883e11] px-3 py-1.5 text-xs font-semibold text-[#f0883e] hover:bg-[#f0883e22]"
          >
            📄 car-blanche.net/businessnews ↗
          </a>
        </div>

        {/* Category filters */}
        <div className="mb-5 flex flex-wrap gap-2">
          <CatBtn
            active={filter === "all"}
            label={t("news.allNews")}
            color="#8b949e"
            count={businessNews.length}
            onClick={() => setFilter("all")}
          />
          {(Object.keys(newsCategoriesMeta) as Array<keyof typeof newsCategoriesMeta>).map((k) => {
            const meta = newsCategoriesMeta[k];
            const count = businessNews.filter((n) => n.category === k).length;
            return (
              <CatBtn
                key={k}
                active={filter === k}
                label={meta.icon + " " + (lang === "ru" ? meta.ru : meta.en)}
                color={meta.color}
                count={count}
                onClick={() => setFilter(k)}
              />
            );
          })}
        </div>

        {/* News list (expandable) */}
        <ul className="space-y-3">
          {filtered.map((n) => (
            <NewsArticle
              key={n.id}
              news={n}
              open={openId === n.id}
              onToggle={() => setOpenId(openId === n.id ? null : n.id)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function CatBtn({ active, label, color, count, onClick }: {
  active: boolean; label: string; color: string; count: number; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition ${
        active ? "border-transparent" : "border-[#30363d] hover:border-[#58a6ff66]"
      }`}
      style={active ? { background: color + "22", color, borderColor: color + "66" } : { color: "var(--c-fg)" }}
    >
      {label}
      <span className="font-mono text-[10px] opacity-70">· {count}</span>
    </button>
  );
}

function NewsArticle({ news, open, onToggle }: {
  news: BusinessNews; open: boolean; onToggle: () => void;
}) {
  const { lang, t } = useLang();
  const meta = newsCategoriesMeta[news.category];

  return (
    <li>
      <article
        className="overflow-hidden rounded-md border transition"
        style={{
          borderColor: open ? meta.color + "66" : "#30363d",
          background: open ? meta.color + "08" : "#161b22",
        }}
      >
        <button
          onClick={onToggle}
          className="flex w-full items-start gap-4 p-4 text-left hover:bg-[#1f6feb0d]"
        >
          {/* Date column */}
          <div className="hidden shrink-0 text-center sm:block">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-md text-2xl"
              style={{ background: meta.color + "22", border: `1px solid ${meta.color}55` }}
            >
              {meta.icon}
            </div>
            <div className="mt-1.5 font-mono text-[9px] uppercase tracking-wider text-[#8b949e]">
              {news.date}
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full border px-2 py-0 text-[10px] font-semibold uppercase"
                style={{ borderColor: meta.color + "66", background: meta.color + "22", color: meta.color }}
              >
                {meta.icon} {lang === "ru" ? meta.ru : meta.en}
              </span>
              <span className="font-mono text-[10px] text-[#8b949e] sm:hidden">{news.date}</span>
            </div>
            <h3 className="mt-1.5 text-base font-semibold text-[#e6edf3] sm:text-lg">
              {news.title[lang]}
            </h3>
            <p className="mt-1 text-sm leading-5 text-[#8b949e]">{news.excerpt[lang]}</p>

            {news.highlights && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {news.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-[#0d1117] px-2 py-0.5 text-[10px] text-[#c9d1d9]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Chevron */}
          <svg
            viewBox="0 0 16 16"
            className="mt-1 h-4 w-4 shrink-0 transition-transform"
            style={{ transform: open ? "rotate(90deg)" : "rotate(0)", color: meta.color }}
            fill="currentColor"
          >
            <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </button>

        {/* Expanded body */}
        {open && (
          <div className="border-t border-[#30363d] bg-[#0d1117] px-5 py-4">
            <p className="text-sm leading-6 text-[#c9d1d9]">{news.body[lang]}</p>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-[#30363d] pt-3">
              <a
                href={news.source}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]"
              >
                📄 {t("news.openSource")} ↗
              </a>
              <a
                href={COMPANY_LINKS.app}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]"
              >
                📱 car-blanche.app
              </a>
            </div>
          </div>
        )}
      </article>
    </li>
  );
}
