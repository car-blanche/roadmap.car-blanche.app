import { useState } from "react";
import { cities, statusMeta, headquarters, type CityStatus } from "../../data/company";
import { useLang } from "../../context/LangContext";

const FILTER_ORDER: (CityStatus | "all")[] = [
  "all", "hq", "active", "soon-2026", "soon-2027", "soon-2028", "soon-2029",
];

export function ExpansionMap() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<CityStatus | "all">("all");

  const list = filter === "all" ? cities : cities.filter((c) => c.status === filter);

  const activeCount = cities.filter((c) => c.status === "active" || c.status === "hq").length;
  const totalCount = cities.length;
  const countriesNow = new Set(
    cities.filter((c) => c.status === "active" || c.status === "hq").map((c) => c.countryCode)
  ).size;
  const countries2029 = new Set(cities.map((c) => c.countryCode)).size;

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3fb9501f] via-transparent to-[#a371f71f]" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#3fb950] opacity-10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#3fb950]">
              <span>🌍</span> {t("hq.kicker")}
            </div>
            <h2 className="text-2xl font-semibold text-[#e6edf3] sm:text-3xl">{t("hq.title")}</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#8b949e]">{t("hq.subtitle")}</p>
          </div>

          {/* HQ badge */}
          <div className="flex items-center gap-3 rounded-md border border-[#3fb95066] bg-[#3fb95011] px-4 py-3">
            <div className="text-3xl">📍</div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#3fb950]">HQ</div>
              <div className="text-base font-semibold text-[#e6edf3]">
                {lang === "ru" ? headquarters.city.ru : headquarters.city.en}
              </div>
              <div className="text-[11px] text-[#8b949e]">
                {t("hq.since")} {headquarters.since} · {headquarters.team}
              </div>
            </div>
          </div>
        </div>

        {/* Big stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <BigStat label={t("hq.stats.now") + " · " + t("hq.cities")} value={activeCount.toString()} color="#3fb950" />
          <BigStat label={t("hq.stats.now") + " · " + t("hq.countries")} value={countriesNow.toString()} color="#58a6ff" />
          <BigStat label={t("hq.stats.by2029") + " · " + t("hq.cities")} value={totalCount.toString() + "+"} color="#a371f7" />
          <BigStat label={t("hq.stats.by2029") + " · " + t("hq.countries")} value={countries2029.toString()} color="#f0883e" />
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {FILTER_ORDER.map((f) => {
            const isActive = f === filter;
            const count = f === "all" ? cities.length : cities.filter((c) => c.status === f).length;
            const meta = f === "all"
              ? { ru: "Все", en: "All", color: "#8b949e" }
              : statusMeta[f];
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                  isActive ? "border-transparent" : "border-[#30363d] hover:border-[#58a6ff66]"
                }`}
                style={isActive ? { background: meta.color + "22", color: meta.color, borderColor: meta.color + "66" } : { color: "var(--c-fg)" }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} />
                {lang === "ru" ? meta.ru : meta.en}
                <span className="font-mono text-[10px] opacity-70">· {count}</span>
              </button>
            );
          })}
        </div>

        {/* Cities grid */}
        <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((city) => {
            const meta = statusMeta[city.status];
            return (
              <article
                key={city.name.en}
                className="group rounded-md border border-[#30363d] bg-[#161b22] p-3 transition hover:border-[#58a6ff66]"
                style={city.status === "hq" ? { borderColor: meta.color + "88" } : undefined}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl">{city.flag}</span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-[#e6edf3]">
                        {lang === "ru" ? city.name.ru : city.name.en}
                      </div>
                      <div className="truncate text-[11px] text-[#8b949e]">
                        {lang === "ru" ? city.country.ru : city.country.en}
                      </div>
                    </div>
                  </div>
                  {city.status === "hq" && (
                    <span className="rounded-full bg-[#3fb95022] px-1.5 py-0 text-[9px] font-semibold uppercase text-[#3fb950]">
                      HQ
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: meta.color }}>
                    {lang === "ru" ? meta.ru : meta.en}
                  </span>
                </div>

                {(city.population || city.fleet || city.since) && (
                  <div className="mt-2 grid grid-cols-2 gap-1 border-t border-[#30363d] pt-2 text-[10px]">
                    {city.since && (
                      <div className="col-span-2 text-[#8b949e]">
                        {t("hq.since")} <span className="font-mono text-[#c9d1d9]">{city.since}</span>
                      </div>
                    )}
                    {city.population && (
                      <div className="text-[#8b949e]">
                        {t("hq.population")}: <span className="font-mono text-[#c9d1d9]">{city.population}</span>
                      </div>
                    )}
                    {city.fleet && (
                      <div className="text-[#8b949e]">
                        {t("hq.fleet")}: <span className="font-mono text-[#c9d1d9]">{city.fleet}</span>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BigStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-md border border-[#30363d] bg-[#161b22] px-4 py-3">
      <div className="font-mono text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-[#8b949e]">{label}</div>
    </div>
  );
}
