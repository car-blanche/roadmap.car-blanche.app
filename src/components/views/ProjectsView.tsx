import { PlanBGH } from "../gh/PlanBGH";
import { ViewHero } from "../gh/ViewHero";
import { CollapseSection, CollapsePreview } from "../gh/CollapseSection";
import { useLang } from "../../context/LangContext";

export function ProjectsView() {
  const { lang } = useLang();

  const projectCards = [
    {
      title:    { ru: "Roadmap 2026 → 2029",    en: "Roadmap 2026 → 2029" },
      status:   { ru: "Активен",                 en: "Active" },
      progress: 32,
      color:    "#a371f7",
      updated:  { ru: "обновлено сегодня",       en: "updated today" },
    },
    {
      title:    { ru: "Академия шофёров Q1",    en: "Chauffeur Academy Q1" },
      status:   { ru: "Активен",                 en: "Active" },
      progress: 68,
      color:    "#3fb950",
      updated:  { ru: "обновлено 2 часа назад", en: "updated 2 hours ago" },
    },
    {
      title:    { ru: "ESG цели 2029",          en: "ESG Goals 2029" },
      status:   { ru: "Планируется",             en: "Planning" },
      progress: 14,
      color:    "#d29922",
      updated:  { ru: "обновлено вчера",         en: "updated yesterday" },
    },
  ];

  return (
    <section className="space-y-6">
      {/* HERO */}
      <ViewHero
        icon="🎯"
        kicker={{ ru: "Projects", en: "Projects" }}
        kickerColor="#a371f7"
        gradientFrom="#a371f7"
        gradientTo="#f0883e"
        title={{
          ru: "Что мы строим в Car Blanche до 2029",
          en: "What we build at Car Blanche through 2029",
        }}
        subtitle={{
          ru: "Все проекты команды: дорожная карта на 36 месяцев, академия шофёров, ESG-стратегия. Каждый проект — с открытым прогрессом и публичными KPI.",
          en: "All team projects: 36-month roadmap, chauffeur academy, ESG strategy. Each project has open progress and public KPIs.",
        }}
        audiences={["clients", "investors", "developers", "partners"]}
        stats={[
          { value: "3",       label: { ru: "Активных проектов", en: "Active projects" }, color: "#a371f7" },
          { value: "36 мес",  label: { ru: "Горизонт",          en: "Horizon" },         color: "#58a6ff" },
          { value: "9",       label: { ru: "Поэтапных релизов", en: "Phased releases" }, color: "#3fb950" },
          { value: "2029",    label: { ru: "Цель",              en: "Goal year" },       color: "#f0883e" },
        ]}
      />

      {/* CLIENT OVERVIEW — quick project status */}
      <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#a371f711] via-transparent to-[#3fb95011]" />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">📊</span>
            <h2 className="text-lg font-semibold text-[#e6edf3]">
              {lang === "ru" ? "Активные проекты команды" : "Active team projects"}
            </h2>
          </div>
          <p className="mb-4 text-sm text-[#8b949e]">
            {lang === "ru"
              ? "Главные проекты, над которыми сейчас работает команда. Прогресс открытый и обновляется ежеквартально."
              : "Top projects the team is working on. Progress is open and updated quarterly."}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {projectCards.map((p) => (
              <article
                key={p.title.en}
                className="rounded-md border bg-[#161b22] p-4"
                style={{ borderColor: p.color + "55" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#e6edf3]">{p.title[lang]}</h3>
                  <span
                    className="rounded-full px-1.5 py-0 text-[10px] font-semibold uppercase"
                    style={{ background: p.color + "22", color: p.color }}
                  >
                    {p.status[lang]}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-[#8b949e]">
                  <span>{lang === "ru" ? "Прогресс" : "Progress"}</span>
                  <span className="font-mono font-bold" style={{ color: p.color }}>{p.progress}%</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#21262d]">
                  <div
                    className="h-full transition-all"
                    style={{ width: `${p.progress}%`, background: p.color }}
                  />
                </div>
                <div className="mt-2 text-[11px] text-[#8b949e]">{p.updated[lang]}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPER DETAIL — Plan B */}
      <CollapseSection
        icon="🗺️"
        iconBg="#a371f733"
        badge="For developers"
        badgeColor="#a371f7"
        title={{
          ru: "Подробный план разработки · 36 месяцев",
          en: "Detailed development plan · 36 months",
        }}
        subtitle={{
          ru: "9 этапов от мая 2026 до апреля 2029 с поставками, KPI и треками работ.",
          en: "9 stages from May 2026 to April 2029 with deliverables, KPIs and work tracks.",
        }}
        preview={
          <CollapsePreview
            items={[
              { value: "9",    label: "stages",   color: "#a371f7" },
              { value: "4",    label: "tracks",   color: "#3fb950" },
            ]}
          />
        }
      >
        <PlanBGH />
      </CollapseSection>
    </section>
  );
}
