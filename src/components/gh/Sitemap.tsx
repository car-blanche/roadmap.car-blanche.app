import { useView, type ViewKey } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";

type Node = {
  view?: ViewKey;
  icon: string;
  ru: string;
  en: string;
  desc?: { ru: string; en: string };
  badge?: string;
  badgeColor?: string;
};

type Group = {
  title: { ru: string; en: string };
  icon: string;
  color: string;
  desc: { ru: string; en: string };
  nodes: Node[];
};

const GROUPS: Group[] = [
  {
    title: { ru: "🎬 Для клиентов", en: "🎬 For clients" },
    icon: "🎯", color: "#3fb950",
    desc: { ru: "Что увидит клиент при первом заходе на сайт.", en: "What clients see on first visit." },
    nodes: [
      { view: "code", icon: "🏠", ru: "Главная (Code)",      en: "Home (Code)",
        desc: { ru: "Hero, цифры, парк, сценарии, 3D Showroom — главный экран.",
                en: "Hero, numbers, fleet, scenarios, 3D Showroom — main screen." },
        badge: "Главная", badgeColor: "#3fb950" },
      { view: "wiki", icon: "📚", ru: "Wiki · база знаний",  en: "Wiki · knowledge base",
        desc: { ru: "21 страница за 8 лет разработки. Редактируемая.", en: "21 pages over 8 years. Editable." },
        badge: "Docs", badgeColor: "#a371f7" },
      { view: "resources", icon: "📦", ru: "Ресурсы и материалы", en: "Resources & materials",
        desc: { ru: "Документация, API, бренд, кейсы, 3D Showroom.", en: "Docs, API, brand, cases, 3D Showroom." } },
      { view: "marketplace", icon: "🛍️", ru: "Маркетплейс", en: "Marketplace",
        desc: { ru: "20 транспортных интеграций: кресла, страховка, B2B, VIP.", en: "20 transport integrations." } },
    ],
  },
  {
    title: { ru: "👥 Для команды", en: "👥 For team" },
    icon: "👥", color: "#a371f7",
    desc: { ru: "Профили, репозитории, обсуждения.", en: "Profiles, repos, discussions." },
    nodes: [
      { view: "team", icon: "👥", ru: "Команда", en: "Team",
        desc: { ru: "3 контрибьютора из Уфы. Репозитории, достижения, heatmap.",
                en: "3 contributors from Ufa. Repositories, achievements, heatmap." },
        badge: "13 repos", badgeColor: "#58a6ff" },
      { view: "discussions", icon: "💬", ru: "Discussions", en: "Discussions",
        desc: { ru: "Обсуждения команды: announcements, Q&A, ideas.", en: "Team discussions: announcements, Q&A, ideas." },
        badge: "7", badgeColor: "#a371f7" },
      { view: "notifications", icon: "🔔", ru: "Inbox", en: "Inbox",
        desc: { ru: "Уведомления о PR, issues, релизах.", en: "Notifications about PRs, issues, releases." } },
    ],
  },
  {
    title: { ru: "🚀 Roadmap и аналитика", en: "🚀 Roadmap & analytics" },
    icon: "🎯", color: "#f0883e",
    desc: { ru: "Планы развития и метрики.", en: "Development plans and metrics." },
    nodes: [
      { view: "projects", icon: "🎯", ru: "Projects · Roadmap", en: "Projects · Roadmap",
        desc: { ru: "Дорожная карта на 36 месяцев. От Уфы — к 21 городу.",
                en: "36-month roadmap. From Ufa to 21 cities." },
        badge: "Roadmap", badgeColor: "#f0883e" },
      { view: "insights", icon: "📊", ru: "Insights · аналитика", en: "Insights · analytics",
        desc: { ru: "Метрики команды, активность, тренды.", en: "Team metrics, activity, trends." } },
      { view: "actions", icon: "⚡", ru: "Actions · CI/CD", en: "Actions · CI/CD",
        desc: { ru: "Автоматизация: сборка, тесты, деплои.", en: "Automation: build, tests, deploys." } },
    ],
  },
  {
    title: { ru: "🐛 Разработка и трекинг", en: "🐛 Development & tracking" },
    icon: "🐛", color: "#58a6ff",
    desc: { ru: "Issues, PR, безопасность.", en: "Issues, PRs, security." },
    nodes: [
      { view: "issues",   icon: "🐛", ru: "Issues",        en: "Issues",
        desc: { ru: "Открытые задачи и обсуждения.", en: "Open tasks and discussions." },
        badge: "18", badgeColor: "#3fb950" },
      { view: "pulls",    icon: "🔀", ru: "Pull requests", en: "Pull requests",
        desc: { ru: "Изменения на ревью.", en: "Changes under review." },
        badge: "7", badgeColor: "#3fb950" },
      { view: "security", icon: "🛡️", ru: "Security",     en: "Security",
        desc: { ru: "PCI DSS L1, ISO 27001, 152-ФЗ, GDPR.", en: "PCI DSS L1, ISO 27001, GDPR." },
        badge: "L1", badgeColor: "#3fb950" },
    ],
  },
];

export function Sitemap() {
  const { view, setView } = useView();
  const { lang, t } = useLang();

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#58a6ff1f] via-transparent to-[#3fb9501f]" />

      <div className="relative">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#58a6ff]">
            <span>🗂️</span> {lang === "ru" ? "Карта сайта" : "Sitemap"}
          </div>
          <h2 className="text-2xl font-semibold text-[#e6edf3] sm:text-3xl">
            {lang === "ru" ? "Все разделы Car Blanche Roadmap" : "All Car Blanche Roadmap sections"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#8b949e]">
            {lang === "ru"
              ? "Визуальная карта всех страниц и инструментов сайта. Клик переводит на нужный раздел."
              : "Visual map of all pages and tools. Click to navigate."}
          </p>
        </div>

        {/* Groups */}
        <div className="grid gap-5 lg:grid-cols-2">
          {GROUPS.map((group) => (
            <div
              key={group.title.en}
              className="rounded-lg border border-[#30363d] bg-[#161b22] p-4"
              style={{ borderColor: group.color + "33" }}
            >
              {/* Group header */}
              <div className="mb-3 flex items-center gap-3 border-b border-[#30363d] pb-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-md text-xl"
                  style={{ background: group.color + "22", border: `1px solid ${group.color}55` }}
                >
                  {group.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#e6edf3]">
                    {group.title[lang]}
                  </h3>
                  <p className="text-[11px] text-[#8b949e]">{group.desc[lang]}</p>
                </div>
              </div>

              {/* Nodes */}
              <ul className="space-y-1.5">
                {group.nodes.map((node) => {
                  const isActive = node.view === view;
                  return (
                    <li key={node.en}>
                      <button
                        onClick={() => node.view && setView(node.view)}
                        className={`group/n flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left transition ${
                          isActive
                            ? "border-transparent"
                            : "border-[#30363d] bg-[#0d1117] hover:border-[#58a6ff66] hover:bg-[#1c2128]"
                        }`}
                        style={isActive ? {
                          background: group.color + "11",
                          borderColor: group.color + "66",
                        } : undefined}
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-base">
                          {node.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`text-sm font-semibold ${isActive ? "text-[#e6edf3]" : "text-[#e6edf3] group-hover/n:text-[#2f81f7]"}`}>
                              {lang === "ru" ? node.ru : node.en}
                            </span>
                            {node.badge && (
                              <span
                                className="rounded-full px-1.5 py-0 text-[9px] font-semibold uppercase"
                                style={{
                                  background: (node.badgeColor || group.color) + "33",
                                  color: node.badgeColor || group.color,
                                }}
                              >
                                {node.badge}
                              </span>
                            )}
                            {isActive && (
                              <span className="ml-auto text-[10px] font-semibold uppercase text-[#3fb950]">
                                ● {lang === "ru" ? "сейчас здесь" : "you are here"}
                              </span>
                            )}
                          </div>
                          {node.desc && (
                            <p className="mt-0.5 text-[11px] leading-4 text-[#8b949e]">
                              {node.desc[lang]}
                            </p>
                          )}
                        </div>
                        <svg
                          viewBox="0 0 16 16"
                          className="mt-1 h-3 w-3 shrink-0 text-[#6e7681] transition-transform group-hover/n:translate-x-0.5 group-hover/n:text-[#58a6ff]"
                          fill="currentColor"
                        >
                          <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: external links */}
        <div className="mt-5 rounded-lg border border-[#30363d] bg-[#161b22] p-4">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
            🌐 {lang === "ru" ? "Внешние ресурсы" : "External resources"}
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <ExtLink href="https://github.com/car-blanche"     icon="🐙" label="github.com/car-blanche" />
            <ExtLink href="http://car-blanche.net/"             icon="🌐" label="car-blanche.net" />
            <ExtLink href="http://car-blanche.net/businessnews" icon="📰" label="Business News" />
            <ExtLink href="https://car-blanche.app/"            icon="📱" label="car-blanche.app" />
            <ExtLink href="https://apps.apple.com/ru/app/car-blanche/id6737855245" icon="🍎" label="App Store" />
            <ExtLink href="https://play.google.com/store/apps/details?id=app.carblanche.car_blanche_taxi_app" icon="🤖" label="Google Play" />
            <ExtLink href="https://car-blanche-3d-showroom-experience.car-blanche.app/" icon="🎨" label="3D Showroom" />
            <ExtLink href="mailto:b2b.car.blanche@gmail.com"   icon="✉️" label={t("set.account.app").startsWith("Open") ? "Email us" : "Написать на почту"} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ExtLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className="group flex items-center gap-2 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#c9d1d9] transition hover:border-[#58a6ff66] hover:bg-[#1c2128] hover:text-[#2f81f7]"
    >
      <span className="text-base">{icon}</span>
      <span className="truncate">{label}</span>
      <svg viewBox="0 0 16 16" className="ml-auto h-3 w-3 text-[#6e7681] transition group-hover:text-[#58a6ff]" fill="currentColor">
        <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
      </svg>
    </a>
  );
}
