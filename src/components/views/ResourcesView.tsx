import { useState, useMemo } from "react";
import { resources, type ResourceCard } from "../../data/wiki";
import { COMPANY_LINKS } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";
import { ViewHero } from "../gh/ViewHero";
import { generatePdf, pdfTemplates } from "../../utils/pdfGenerator";
import { useToast } from "../../context/ToastContext";
import { AppStoreButtons } from "../gh/AppStoreButtons";

/* =========================================================
   Группы по аудиториям, не только категории
   ========================================================= */

type Audience = "client" | "partner" | "developer" | "press";

const AUDIENCES: { key: Audience; ru: string; en: string; icon: string; color: string; subtitle: { ru: string; en: string } }[] = [
  { key: "client",    ru: "Для клиентов",    en: "For clients",   icon: "👥", color: "#3fb950",
    subtitle: { ru: "Документация, гайды, поддержка, кейсы", en: "Docs, guides, support, cases" } },
  { key: "partner",   ru: "Для партнёров",   en: "For partners",  icon: "🤝", color: "#a371f7",
    subtitle: { ru: "API, SDK, integrations marketplace",     en: "API, SDK, integrations marketplace" } },
  { key: "developer", ru: "Для разработчиков", en: "For developers", icon: "⚙️", color: "#58a6ff",
    subtitle: { ru: "GitHub, спецификации, тех-документация",  en: "GitHub, specs, tech documentation" } },
  { key: "press",     ru: "Для прессы",      en: "For press",     icon: "📰", color: "#f0883e",
    subtitle: { ru: "Бренд, лого, факты, исследования",       en: "Brand, logos, facts, research" } },
];

function categoryToAudience(category: ResourceCard["category"]): Audience {
  switch (category) {
    case "docs":
    case "tools":
    case "video":
      return "client";
    case "api":
      return "developer";
    case "brand":
    case "research":
    case "legal":
      return "press";
    case "cases":
      return "partner";
    default:
      return "client";
  }
}

export function ResourcesView() {
  const { lang, t } = useLang();
  const [activeAudience, setActiveAudience] = useState<Audience>("client");
  const [query, setQuery] = useState("");

  const audienceResources = useMemo(() => {
    let list = resources.filter((r) => categoryToAudience(r.category) === activeAudience);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) => r.title[lang].toLowerCase().includes(q) || r.desc[lang].toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeAudience, query, lang]);

  return (
    <section className="space-y-6">
      {/* HERO */}
      <ViewHero
        icon="📦"
        kicker={{ ru: "Ресурсы", en: "Resources" }}
        kickerColor="#a371f7"
        gradientFrom="#a371f7"
        gradientTo="#3fb950"
        title={{
          ru: "Всё, что нужно знать о Car Blanche",
          en: "Everything you need to know about Car Blanche",
        }}
        subtitle={{
          ru: "Документация для клиентов, API для партнёров, тех-данные для разработчиков, бренд-материалы для прессы. Выберите свою аудиторию.",
          en: "Docs for clients, APIs for partners, tech specs for developers, brand assets for press. Pick your audience.",
        }}
        audiences={["clients", "partners", "developers", "press"]}
        stats={[
          { value: resources.length.toString(),                                  label: { ru: "Ресурсов", en: "Resources" }, color: "#58a6ff" },
          { value: resources.filter((r) => r.category === "api").length.toString(),    label: { ru: "API & SDK", en: "API & SDK" }, color: "#a371f7" },
          { value: resources.filter((r) => r.category === "brand").length.toString(),  label: { ru: "Бренд",     en: "Brand" },      color: "#db61a2" },
          { value: resources.filter((r) => r.category === "cases").length.toString(),  label: { ru: "Кейсов",   en: "Cases" },      color: "#3fb950" },
        ]}
        actions={
          <>
            <AppStoreButtons size="md" />
            <a
              href={COMPANY_LINKS.showroom3d}
              target="_blank" rel="noopener noreferrer"
              className="rounded-md bg-gradient-to-r from-[#a371f7] to-[#db61a2] px-4 py-2 text-sm font-semibold text-white shadow-lg"
            >
              🎨 3D Showroom
            </a>
            <a
              href={COMPANY_LINKS.github}
              target="_blank" rel="noopener noreferrer"
              className="rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm text-[#e6edf3] hover:bg-[#30363d]"
            >
              🐙 GitHub
            </a>
          </>
        }
      />

      {/* Featured · 3D Showroom — большая карточка */}
      <article className="relative overflow-hidden rounded-xl border border-[#a371f766] bg-[#0d1117] p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#a371f722] via-transparent to-[#db61a222]" />
        <div className="pointer-events-none absolute -right-12 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#a371f7] opacity-15 blur-3xl" />

        <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a371f7] to-[#db61a2] px-3 py-1 text-xs font-semibold text-white">
              ⭐ Featured · Showcase
            </div>
            <h2 className="text-2xl font-semibold text-[#e6edf3] sm:text-3xl">{t("res.feat.title")}</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#c9d1d9]">{t("res.feat.subtitle")}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Pill label={t("res.feat.b1")} color="#a371f7" />
              <Pill label={t("res.feat.b2")} color="#58a6ff" />
              <Pill label={t("res.feat.b3")} color="#3fb950" />
              <Pill label={t("res.feat.b4")} color="#f0883e" />
            </div>

            <a
              href={COMPANY_LINKS.showroom3d}
              target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#238636] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2ea043]"
            >
              {t("res.feat.open")} →
            </a>
          </div>

          <div className="hidden lg:block">
            <div className="flex h-48 w-72 items-center justify-center overflow-hidden rounded-xl border border-[#30363d] bg-gradient-to-br from-[#161b22] to-[#0d1117]">
              <div className="text-6xl">🎨</div>
            </div>
          </div>
        </div>
      </article>

      {/* AUDIENCE SELECTOR — большие кнопки */}
      <section>
        <h2 className="mb-3 text-lg font-semibold text-[#e6edf3]">
          {lang === "ru" ? "Выберите аудиторию" : "Choose your audience"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((aud) => {
            const isActive = activeAudience === aud.key;
            const count = resources.filter((r) => categoryToAudience(r.category) === aud.key).length;
            return (
              <button
                key={aud.key}
                onClick={() => setActiveAudience(aud.key)}
                className={`group relative overflow-hidden rounded-lg border p-4 text-left transition ${
                  isActive
                    ? "border-transparent shadow-lg"
                    : "border-[#30363d] bg-[#161b22] hover:border-[#58a6ff66]"
                }`}
                style={isActive ? {
                  background: aud.color + "11",
                  borderColor: aud.color + "88",
                  boxShadow: `0 8px 24px ${aud.color}22`,
                } : undefined}
              >
                {isActive && (
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-30 blur-2xl"
                    style={{ background: aud.color }}
                  />
                )}
                <div className="relative">
                  <div className="flex items-baseline justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-md text-xl transition-transform group-hover:scale-110"
                      style={{ background: aud.color + "22", border: `1px solid ${aud.color}55` }}
                    >
                      {aud.icon}
                    </div>
                    <span
                      className="font-mono text-2xl font-bold"
                      style={{ color: isActive ? aud.color : "#8b949e" }}
                    >
                      {count}
                    </span>
                  </div>
                  <div
                    className="mt-2 text-base font-bold"
                    style={isActive ? { color: aud.color } : { color: "#e6edf3" }}
                  >
                    {aud[lang]}
                  </div>
                  <div className="mt-1 text-[11px] text-[#8b949e]">{aud.subtitle[lang]}</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* LANG INFO — пояснение про язык PDF */}
      <div className="flex items-center gap-3 rounded-md border border-[#3fb95044] bg-[#3fb95011] px-4 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#3fb95022] text-lg">
          📄
        </div>
        <div className="min-w-0 flex-1 text-xs leading-5 text-[#c9d1d9]">
          {lang === "ru" ? (
            <>
              <strong className="text-[#e6edf3]">PDF-документы — на русском языке</strong>
              {" · одна страница A4 · готово к печати или отправке партнёрам."}
            </>
          ) : (
            <>
              <strong className="text-[#e6edf3]">PDF documents are in Russian</strong>
              {" · A4 one-pager · ready to print or share with partners."}
            </>
          )}
        </div>
        <span className="shrink-0 rounded-md bg-[#3fb95022] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#3fb950]">
          📄 PDF · RU
        </span>
      </div>

      {/* SEARCH + RESOURCES GRID */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#e6edf3]">
            <span>{AUDIENCES.find((a) => a.key === activeAudience)?.icon}</span>
            {AUDIENCES.find((a) => a.key === activeAudience)?.[lang]}
            <span className="text-sm font-normal text-[#8b949e]">
              · {audienceResources.length}
            </span>
          </h2>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === "ru" ? "Найти ресурс…" : "Find a resource…"}
            className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-sm text-[#e6edf3] outline-none focus:border-[#58a6ff] sm:w-72"
          />
        </div>

        {audienceResources.length === 0 ? (
          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-8 text-center">
            <div className="text-3xl">🔍</div>
            <p className="mt-2 text-sm text-[#8b949e]">
              {lang === "ru" ? "Ничего не найдено в этой категории" : "Nothing found in this category"}
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {audienceResources.map((r, i) => <ResourceCardView key={i} r={r} />)}
          </div>
        )}
      </section>

      {/* QUICK ACTIONS — три блока */}
      <section className="grid gap-4 lg:grid-cols-3">
        <QuickAction
          icon="📨"
          color="#58a6ff"
          title={t("res.newsletter.title")}
          desc={t("res.newsletter.desc")}
          cta={
            <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t("res.newsletter.input")}
                className="min-w-0 flex-1 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-sm text-[#e6edf3] outline-none focus:border-[#58a6ff]"
              />
              <button
                type="submit"
                className="rounded-md bg-[#238636] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#2ea043]"
              >
                {t("res.newsletter.btn")}
              </button>
            </form>
          }
        />
        <QuickAction
          icon="💬"
          color="#3fb950"
          title={t("res.support.title")}
          desc={t("res.support.desc")}
          cta={
            <div className="mt-3 space-y-2">
              <AppStoreButtons size="sm" />
              <a
                href={COMPANY_LINKS.email}
                className="inline-block rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs text-[#e6edf3] hover:bg-[#30363d]"
              >
                ✉️ {t("res.support.email")}
              </a>
            </div>
          }
        />
        <QuickAction
          icon="🤝"
          color="#a371f7"
          title={lang === "ru" ? "Стать партнёром" : "Become a partner"}
          desc={lang === "ru" ? "API, SDK, revenue share для интеграторов и брендов." : "API, SDK, revenue share for integrators and brands."}
          cta={
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={COMPANY_LINKS.email}
                className="rounded-md bg-gradient-to-r from-[#a371f7] to-[#db61a2] px-3 py-1.5 text-sm font-semibold text-white shadow-lg"
              >
                ✉️ {lang === "ru" ? "Заявка партнёра" : "Partner request"}
              </a>
              <a
                href={COMPANY_LINKS.github}
                target="_blank" rel="noopener noreferrer"
                className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-sm text-[#e6edf3] hover:bg-[#30363d]"
              >
                🐙 GitHub
              </a>
            </div>
          }
        />
      </section>
    </section>
  );
}

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
      style={{ borderColor: color + "66", background: color + "22", color }}
    >
      {label}
    </span>
  );
}

function ResourceCardView({ r }: { r: ResourceCard }) {
  const { lang } = useLang();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePdf = async () => {
    if (!r.pdfKey || loading) return;
    const tpl = pdfTemplates[r.pdfKey];
    if (!tpl) return;

    setLoading(true);
    // Toast: подготовка (особенно важно для RU — загрузка кириллического шрифта 1 раз)
    showToast({
      kind: "info",
      icon: "⏳",
      title: lang === "ru" ? "Готовим PDF…" : "Preparing PDF…",
      desc: r.title[lang],
    });

    try {
      await generatePdf(tpl);
      showToast({
        kind: "success",
        icon: "📥",
        title: lang === "ru" ? "PDF скачан" : "PDF downloaded",
        desc: r.title[lang],
      });
    } catch (e) {
      showToast({
        kind: "error",
        icon: "⚠️",
        title: lang === "ru" ? "Ошибка генерации" : "Generation error",
        desc: lang === "ru" ? "Попробуйте ещё раз" : "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  // 3 типа карточки:
  // 1. r.pdfKey — PDF-генерация (button)
  // 2. r.href   — внешняя ссылка (a)
  // 3. иначе    — div
  const isPdf = !!r.pdfKey;
  const Wrapper: any = isPdf ? "button" : r.href ? "a" : "div";
  const extra = isPdf
    ? { onClick: handlePdf, type: "button" as const }
    : r.href
    ? { href: r.href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...extra}
      className="group flex h-full w-full flex-col rounded-md border border-[#30363d] bg-[#161b22] p-4 text-left transition hover:border-[#58a6ff66] hover:bg-[#1c2128]"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8b949e]">
          {r.format}{r.size ? ` · ${r.size}` : ""}
        </span>
        {r.badge && (
          <span
            className="rounded-full px-1.5 py-0 text-[9px] font-semibold uppercase"
            style={{
              background: (r.badgeColor || "#58a6ff") + "33",
              color: r.badgeColor || "#58a6ff",
            }}
          >
            {r.badge}
          </span>
        )}
      </div>
      <h3 className="mt-2 text-sm font-semibold text-[#e6edf3] group-hover:text-[#2f81f7]">
        {r.title[lang]}
      </h3>
      <p className="mt-1 flex-1 text-xs leading-5 text-[#c9d1d9]">{r.desc[lang]}</p>

      {/* CTA */}
      {isPdf ? (
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#30363d] pt-3">
          <span className="flex items-center gap-1.5 text-xs text-[#8b949e]">
            <span>↓ {r.downloads || "—"}</span>
            <span
              className="rounded-sm bg-[#3fb95022] px-1.5 py-0 text-[9px] font-bold uppercase tracking-wider text-[#3fb950]"
              title={lang === "ru" ? "PDF на русском · 1 страница A4" : "PDF in Russian · A4 one-pager"}
            >
              RU
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#238636] px-3 py-1 text-xs font-semibold text-white shadow-sm group-hover:bg-[#2ea043]">
            {loading ? (
              <>
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {lang === "ru" ? "Генерация…" : "Generating…"}
              </>
            ) : (
              <>📥 {lang === "ru" ? "Скачать PDF" : "Download PDF"}</>
            )}
          </span>
        </div>
      ) : (
        <div className="mt-3 flex items-center justify-between border-t border-[#30363d] pt-2 text-xs text-[#8b949e]">
          <span>{r.href ? "↗" : "↓"} {r.downloads || "—"}</span>
          <span className="font-mono text-[10px]">
            {r.href ? (lang === "ru" ? "Открыть" : "Open") : (lang === "ru" ? "Скачать" : "Download")}
          </span>
        </div>
      )}
    </Wrapper>
  );
}

function QuickAction({
  icon, color, title, desc, cta,
}: { icon: string; color: string; title: string; desc: string; cta: React.ReactNode }) {
  return (
    <article
      className="relative overflow-hidden rounded-xl border bg-[#0d1117] p-5"
      style={{ borderColor: color + "55" }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-15 blur-2xl"
        style={{ background: color }}
      />
      <div className="relative">
        <div
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-md text-xl"
          style={{ background: color + "22", border: `1px solid ${color}55` }}
        >
          {icon}
        </div>
        <h3 className="text-base font-bold text-[#e6edf3]">{title}</h3>
        <p className="mt-1 text-xs text-[#c9d1d9]">{desc}</p>
        {cta}
      </div>
    </article>
  );
}
