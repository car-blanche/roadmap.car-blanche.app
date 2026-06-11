import { useView } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";
import { useSettings } from "../../context/SettingsContext";

const titles: Record<string, { ru: string; en: string; icon: string; desc?: { ru: string; en: string } }> = {
  code:        { ru: "О продукте", en: "Product", icon: "📖",
                 desc: { ru: "Главная презентация Car Blanche: парк, тарифы, сценарии, 3D Showroom.",
                         en: "Main Car Blanche presentation: fleet, tariffs, scenarios, 3D Showroom." } },
  issues:      { ru: "Issues", en: "Issues", icon: "🐛",
                 desc: { ru: "Открытые решения, риски, обсуждения.", en: "Open decisions, risks, discussions." } },
  pulls:       { ru: "Pull requests", en: "Pull requests", icon: "🔀",
                 desc: { ru: "Изменения в продукте на ревью.", en: "Product changes in review." } },
  discussions: { ru: "Discussions", en: "Discussions", icon: "💬",
                 desc: { ru: "Объявления, Q&A, идеи команды.", en: "Announcements, Q&A, team ideas." } },
  actions:     { ru: "Actions", en: "Actions", icon: "⚡",
                 desc: { ru: "CI/CD, тесты, деплои.", en: "CI/CD, tests, deploys." } },
  projects:    { ru: "Projects", en: "Projects", icon: "🎯",
                 desc: { ru: "Дорожная карта на 36 месяцев.", en: "36-month roadmap." } },
  wiki:        { ru: "Wiki · база знаний", en: "Wiki · knowledge base", icon: "📚" },
  security:    { ru: "Security", en: "Security", icon: "🛡️",
                 desc: { ru: "PCI DSS, ISO 27001, GDPR, ESG.", en: "PCI DSS, ISO 27001, GDPR, ESG." } },
  insights:    { ru: "Insights", en: "Insights", icon: "📊",
                 desc: { ru: "Метрики команды и продукта.", en: "Team and product metrics." } },
  team:        { ru: "Команда", en: "Team", icon: "👥" },
  resources:   { ru: "Пакеты · Ресурсы", en: "Packages · Resources", icon: "📦",
                 desc: { ru: "Документация, SDK, бренд-материалы, кейсы.", en: "Documentation, SDK, brand assets, cases." } },
  repositories:{ ru: "Репозитории",   en: "Repositories",   icon: "📁",
                 desc: { ru: "Все репозитории организации car-blanche.", en: "All car-blanche organization repositories." } },
  marketplace: { ru: "Маркетплейс", en: "Marketplace", icon: "🛍️" },
  explore:     { ru: "Explore · Обзор", en: "Explore · Overview", icon: "🌐",
                 desc: { ru: "Аналитика поездок, новости, философия, open-source.",
                         en: "Ride analytics, news, philosophy, open-source." } },
  notifications:{ ru: "Inbox", en: "Inbox", icon: "🔔" },
};

export function PageHeader() {
  const { view, setView } = useView();
  const { lang, t } = useLang();
  const { openDrawer, openShortcuts } = useSettings();
  const meta = titles[view];
  if (!meta) return null;

  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[#21262d] pb-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#8b949e]">
          <button onClick={() => setView("code")} className="hover:text-[#2f81f7] hover:underline">
            car-blanche
          </button>
          <span>/</span>
          <span className="text-[#c9d1d9]">{view === "code" ? "main" : view}</span>
        </div>
        <h1 className="mt-1 flex items-center gap-2 text-xl font-semibold text-[#e6edf3] sm:text-2xl">
          <span>{meta.icon}</span>
          <span>{lang === "ru" ? meta.ru : meta.en}</span>
        </h1>
        {meta.desc && (
          <p className="mt-0.5 text-xs text-[#8b949e] sm:text-sm">
            {lang === "ru" ? meta.desc.ru : meta.desc.en}
          </p>
        )}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={openShortcuts}
          className="hidden items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d] sm:inline-flex"
          title={t("kb.title")}
        >
          ⌨️
          <kbd className="rounded border border-[#30363d] bg-[#161b22] px-1 font-mono text-[10px]">?</kbd>
        </button>
        <button
          onClick={openDrawer}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]"
          title={t("set.title")}
        >
          ⚙️ {t("set.title")}
        </button>
      </div>
    </div>
  );
}
