import { useState, useMemo } from "react";
import { marketplaceItems, type MarketplaceItem } from "../../data/extra";
import { COMPANY_LINKS } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";
import { ViewHero } from "../gh/ViewHero";
import { CollapseSection, CollapsePreview } from "../gh/CollapseSection";

/* =========================================================
   Группы по аудиториям
   ========================================================= */

type Audience = "all" | "client" | "business" | "events" | "tech" | "partners";

const AUDIENCES: { key: Audience; ru: string; en: string; icon: string; color: string; desc: { ru: string; en: string } }[] = [
  { key: "all",      ru: "Все",            en: "All",          icon: "📦", color: "#8b949e",
    desc: { ru: "Все интеграции и опции",                          en: "All integrations and options" } },
  { key: "client",   ru: "Для клиентов",   en: "For clients",  icon: "👥", color: "#3fb950",
    desc: { ru: "Опции, которые делают поездку идеальной",          en: "Options that make the ride perfect" } },
  { key: "business", ru: "Для бизнеса",    en: "For B2B",      icon: "💼", color: "#d29922",
    desc: { ru: "Корпоративные счета, интеграции, авто-отчёты",     en: "Corporate accounts, integrations, auto-reports" } },
  { key: "events",   ru: "Для событий",    en: "For events",   icon: "💍", color: "#db61a2",
    desc: { ru: "Свадьбы, VIP-мероприятия, поездки мечты",          en: "Weddings, VIP events, dream rides" } },
  { key: "tech",     ru: "Технологии",     en: "Tech",         icon: "⚙️", color: "#58a6ff",
    desc: { ru: "Smart city API, голосовой ассистент, концьерж",    en: "Smart city API, voice assistant, concierge" } },
  { key: "partners", ru: "Партнёрам",      en: "Partners",     icon: "🤝", color: "#a371f7",
    desc: { ru: "Aeroflot, LHW Hotels, ESG-партнёры",                en: "Aeroflot, LHW Hotels, ESG partners" } },
];

function mapItemToAudience(item: MarketplaceItem): Audience {
  const name = item.name.toLowerCase();
  if (name.includes("b2b") || name.includes("sap") || name.includes("1с") || name.includes("family")) return "business";
  if (name.includes("свад") || name.includes("vip") || name.includes("driving experience")) return "events";
  if (name.includes("aeroflot") || name.includes("отель") || name.includes("esg")) return "partners";
  if (name.includes("поддержка") || name.includes("любим") || name.includes("smart city") || name.includes("trip concierge") || name.includes("голос")) return "tech";
  return "client";
}

function parseInstalls(installs: string): number {
  const num = parseFloat(installs.replace(/[^\d.]/g, "")) || 0;
  return installs.includes("k") ? num * 1000 : num;
}

export function MarketplaceView() {
  const { lang } = useLang();

  const counts = {
    total:        marketplaceItems.length,
    free:         marketplaceItems.filter((i) => i.price === "Free").length,
    integrations: marketplaceItems.filter((i) => i.category === "Integration").length,
    verified:     marketplaceItems.filter((i) => i.verified).length,
  };

  // Топ-3 самых установленных
  const topInstalls = [...marketplaceItems]
    .sort((a, b) => parseInstalls(b.installs) - parseInstalls(a.installs))
    .slice(0, 3);

  return (
    <section className="space-y-6">
      {/* HERO */}
      <ViewHero
        icon="🛍️"
        kicker={{ ru: "Marketplace", en: "Marketplace" }}
        kickerColor="#d29922"
        gradientFrom="#d29922"
        gradientTo="#a371f7"
        title={{
          ru: "20+ интеграций для вашего сценария поездки",
          en: "20+ integrations for your trip scenario",
        }}
        subtitle={{
          ru: "От детских кресел до VIP-сопровождения, от 1С до Aeroflot Bonus. Выберите аудиторию — и подберите то, что сделает вашу поездку идеальной.",
          en: "From child seats to VIP escort, from 1C to Aeroflot Bonus. Pick your audience and find what makes your ride perfect.",
        }}
        audiences={["clients", "partners", "investors"]}
        stats={[
          { value: counts.total.toString(),        label: { ru: "Интеграций",     en: "Items" },         color: "#58a6ff" },
          { value: counts.free.toString(),         label: { ru: "Бесплатно",     en: "Free" },           color: "#3fb950" },
          { value: counts.integrations.toString(), label: { ru: "Партнёрских",   en: "Integrations" },   color: "#a371f7" },
          { value: counts.verified.toString(),     label: { ru: "Проверено",     en: "Verified" },       color: "#d29922" },
        ]}
      />

      {/* FEATURED — топ-3 как priority items в Discussions */}
      <section className="relative overflow-hidden rounded-xl border border-[#d2992255] bg-[#0d1117] p-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#d2992211] via-transparent to-[#a371f711]" />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#e6edf3]">
              <span className="text-xl">🔥</span>
              {lang === "ru" ? "Самые востребованные" : "Most installed"}
            </h2>
            <span className="text-xs text-[#8b949e]">
              {lang === "ru" ? "по количеству установок" : "by install count"}
            </span>
          </div>
          <p className="mb-4 text-sm text-[#8b949e]">
            {lang === "ru"
              ? "Что клиенты используют чаще всего. С полной информацией: издатель, рейтинг, цена, аудитория."
              : "What clients use most. Full info: publisher, rating, price, audience."}
          </p>

          {/* Топ-3 — карточки в стиле задач Discussions */}
          <div className="grid gap-3">
            {topInstalls.map((item, i) => {
              const aud = mapItemToAudience(item);
              const audMeta = AUDIENCES.find((a) => a.key === aud)!;
              return (
                <article
                  key={item.name}
                  className="rounded-md border bg-[#161b22] p-3 transition hover:border-[#58a6ff66]"
                  style={{ borderColor: item.color + "55" }}
                >
                  <div className="flex items-start gap-3">
                    {/* Rank medal */}
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg"
                      style={{
                        background: i === 0 ? "#e3b341" : i === 1 ? "#8b949e" : "#cd7f32",
                      }}
                    >
                      #{i + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-xl"
                      style={{ background: item.color + "22", border: `1px solid ${item.color}55` }}
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-sm font-semibold text-[#e6edf3]">{item.name}</span>
                        {item.verified && <span className="text-[#2f81f7]" title="Verified">✓</span>}
                        <span
                          className="rounded-full px-1.5 py-0 text-[9px] font-bold uppercase"
                          style={{ background: audMeta.color + "22", color: audMeta.color }}
                        >
                          {audMeta.icon} {audMeta[lang]}
                        </span>
                        <span
                          className={`rounded-full px-1.5 py-0 text-[10px] font-semibold ${
                            item.price === "Free" ? "bg-[#3fb95022] text-[#3fb950]" :
                            item.price === "Paid" ? "bg-[#d2992222] text-[#d29922]" :
                            "bg-[#58a6ff22] text-[#58a6ff]"
                          }`}
                        >
                          {item.price}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#c9d1d9] line-clamp-2">{item.description}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#8b949e]">
                        <span>📦 {item.publisher}</span>
                        <span>·</span>
                        <span className="text-[#e3b341]">⭐ {item.rating}</span>
                        <span>·</span>
                        <span>↓ {item.installs}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATEGORIES OVERVIEW — 6 аудиторий, как priority overview */}
      <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#a371f711] via-transparent to-[#3fb95011]" />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <h2 className="text-lg font-semibold text-[#e6edf3]">
              {lang === "ru" ? "Подобрать по аудитории" : "Pick by audience"}
            </h2>
          </div>
          <p className="mb-4 text-sm text-[#8b949e]">
            {lang === "ru"
              ? "Каждая категория содержит интеграции, подобранные специально для своей аудитории."
              : "Each category contains integrations curated for its specific audience."}
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.filter((a) => a.key !== "all").map((aud) => {
              const items = marketplaceItems.filter((i) => mapItemToAudience(i) === aud.key);
              return (
                <article
                  key={aud.key}
                  className="rounded-md border bg-[#161b22] p-4 transition hover:border-[#58a6ff66]"
                  style={{ borderColor: aud.color + "55" }}
                >
                  <div className="flex items-baseline justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-md text-xl"
                      style={{ background: aud.color + "22", border: `1px solid ${aud.color}55` }}
                    >
                      {aud.icon}
                    </div>
                    <span className="font-mono text-2xl font-bold" style={{ color: aud.color }}>
                      {items.length}
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-bold" style={{ color: aud.color }}>
                    {aud[lang]}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#8b949e]">{aud.desc[lang]}</div>

                  {/* Топ-2 интеграции в категории */}
                  <ul className="mt-3 space-y-1 border-t border-[#30363d] pt-2 text-xs">
                    {items.slice(0, 2).map((item) => (
                      <li key={item.name} className="flex items-center gap-1.5 text-[#c9d1d9]">
                        <span>{item.icon}</span>
                        <span className="truncate">{item.name}</span>
                      </li>
                    ))}
                    {items.length > 2 && (
                      <li className="text-[10px] text-[#8b949e]">
                        + {items.length - 2} {lang === "ru" ? "ещё" : "more"}
                      </li>
                    )}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEVELOPER DETAIL — полный каталог в коллапсе */}
      <CollapseSection
        icon="📚"
        iconBg="#58a6ff33"
        badge="Full catalog"
        badgeColor="#58a6ff"
        title={{
          ru: "Полный каталог Marketplace",
          en: "Full Marketplace catalog",
        }}
        subtitle={{
          ru: "Все интеграции с фильтрами по аудитории, поиском и подробным описанием.",
          en: "All integrations with audience filters, search, and detailed descriptions.",
        }}
        preview={
          <CollapsePreview
            items={[
              { value: counts.total.toString(),    label: "items",  color: "#58a6ff" },
              { value: counts.verified.toString(), label: "verified", color: "#3fb950" },
            ]}
          />
        }
      >
        <FullCatalog />
      </CollapseSection>

      {/* PARTNER CTA */}
      <section className="relative overflow-hidden rounded-xl border border-[#a371f766] bg-[#0d1117] p-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#a371f722] via-transparent to-[#58a6ff22]" />
        <div className="relative grid items-center gap-4 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a371f7]">
              🤝 {lang === "ru" ? "Партнёрам" : "Partners"}
            </div>
            <h3 className="text-xl font-bold text-[#e6edf3]">
              {lang === "ru" ? "Хотите опубликовать свою интеграцию?" : "Want to publish your integration?"}
            </h3>
            <p className="mt-1 max-w-xl text-sm text-[#c9d1d9]">
              {lang === "ru"
                ? "SDK на Dart / PHP, public API, revenue share для партнёров. Открываем для всех с конца 2026."
                : "SDK in Dart / PHP, public API, revenue share for partners. Opening to everyone in late 2026."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={COMPANY_LINKS.email}
              className="rounded-md bg-gradient-to-r from-[#a371f7] to-[#db61a2] px-4 py-2 text-sm font-semibold text-white shadow-lg"
            >
              ✉️ {lang === "ru" ? "Заявка партнёра" : "Partner request"}
            </a>
            <a
              href={COMPANY_LINKS.github}
              target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm text-[#e6edf3] hover:bg-[#30363d]"
            >
              🐙 SDK на GitHub
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}

/* =========================================================
   FullCatalog — внутри CollapseSection
   ========================================================= */

function FullCatalog() {
  const { lang } = useLang();
  const [audience, setAudience] = useState<Audience>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = marketplaceItems;
    if (audience !== "all") {
      list = list.filter((i) => mapItemToAudience(i) === audience);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [audience, query]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-md border border-[#30363d] bg-[#161b22] p-3">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#8b949e]" fill="currentColor">
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === "ru" ? "Найти интеграцию или опцию…" : "Find an integration or option…"}
            className="min-w-0 flex-1 bg-transparent text-sm text-[#e6edf3] outline-none placeholder:text-[#6e7681]"
          />
        </div>
        <span className="text-xs text-[#8b949e]">
          {filtered.length} {lang === "ru" ? "найдено" : "found"}
        </span>
      </div>

      {/* Audience pills */}
      <div className="flex flex-wrap gap-2">
        {AUDIENCES.map((aud) => {
          const isActive = audience === aud.key;
          const count = aud.key === "all"
            ? marketplaceItems.length
            : marketplaceItems.filter((i) => mapItemToAudience(i) === aud.key).length;
          return (
            <button
              key={aud.key}
              onClick={() => setAudience(aud.key)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                isActive ? "border-transparent" : "border-[#30363d] hover:border-[#58a6ff66]"
              }`}
              style={isActive ? { background: aud.color + "22", color: aud.color, borderColor: aud.color + "66" } : { color: "var(--c-fg)" }}
            >
              <span>{aud.icon}</span>
              {aud[lang]}
              <span className="font-mono text-[10px] opacity-70">· {count}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-md border border-[#30363d] bg-[#0d1117] p-8 text-center">
          <div className="text-3xl">🔍</div>
          <p className="mt-2 text-sm text-[#8b949e]">
            {lang === "ru" ? "Ничего не найдено" : "Nothing found"}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => <MarketplaceCardCompact key={item.name} item={item} />)}
        </div>
      )}
    </div>
  );
}

function MarketplaceCardCompact({ item }: { item: MarketplaceItem }) {
  return (
    <article className="group flex h-full flex-col rounded-md border border-[#30363d] bg-[#161b22] p-3 transition hover:border-[#58a6ff66] hover:bg-[#1c2128]">
      <div className="flex items-start gap-2.5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-lg"
          style={{ background: item.color + "22", border: `1px solid ${item.color}55` }}
        >
          {item.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate text-sm font-semibold text-[#e6edf3] group-hover:text-[#2f81f7]">
              {item.name}
            </span>
            {item.verified && <span className="text-xs text-[#2f81f7]" title="Verified">✓</span>}
          </div>
          <div className="truncate text-[10px] text-[#8b949e]">{item.publisher}</div>
        </div>
      </div>
      <p className="mt-2.5 flex-1 text-xs leading-5 text-[#c9d1d9] line-clamp-3">{item.description}</p>
      <div className="mt-2.5 flex items-center justify-between border-t border-[#30363d] pt-2 text-[11px] text-[#8b949e]">
        <span className="flex items-center gap-1">
          <span className="text-[#e3b341]">⭐</span> {item.rating}
        </span>
        <span>↓ {item.installs}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            item.price === "Free" ? "bg-[#3fb95022] text-[#3fb950]" :
            item.price === "Paid" ? "bg-[#d2992222] text-[#d29922]" :
            "bg-[#58a6ff22] text-[#58a6ff]"
          }`}
        >
          {item.price}
        </span>
      </div>
    </article>
  );
}
