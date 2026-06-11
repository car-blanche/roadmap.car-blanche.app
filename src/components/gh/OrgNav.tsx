import { useView, COMPANY_LINKS, isRepoView, type ViewKey } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";

/* =========================================================
   Навигация уровня организации car-blanche.
   Стиль: GitHub user/org profile (Overview · Repositories · Projects · …)
   ========================================================= */

type OrgTab = {
  key: ViewKey | "external";
  icon: string;
  label: { ru: string; en: string };
  count?: string;
  href?: string;
  highlight?: boolean;
};

export function OrgNav() {
  const { view, setView } = useView();
  const { lang } = useLang();

  const tabs: OrgTab[] = [
    {
      key: "explore",
      icon: "M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm.5 4.75v3.25l2.5 1.5-.5.866L7.5 8.5V4.75Z",
      label: { ru: "Обзор",          en: "Overview" },
    },
    {
      key: "code",
      icon: "m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z",
      label: { ru: "О продукте",     en: "Product" },
    },
    {
      key: "wiki",
      icon: "M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Z",
      label: { ru: "Wiki",           en: "Wiki" },
      count: "21",
    },
    {
      key: "projects",
      icon: "M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0Z",
      label: { ru: "Проекты",        en: "Projects" },
      count: "3",
    },
    {
      key: "team",
      icon: "M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z",
      label: { ru: "Команда",        en: "Team" },
      count: "3",
    },
    {
      key: "marketplace",
      icon: "M1.75 0A1.75 1.75 0 0 0 0 1.75v2.5a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .25-.25h12.5a.25.25 0 0 1 .25.25v2.5a.75.75 0 0 0 1.5 0v-2.5A1.75 1.75 0 0 0 14.25 0Z M3 8a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0Zm4 0a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0Zm4 0a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0Z",
      label: { ru: "Маркетплейс",    en: "Marketplace" },
      count: "20+",
    },
    {
      key: "resources",
      icon: "M8.878.392a1.75 1.75 0 0 0-1.756 0l-5.25 3.045A1.75 1.75 0 0 0 1 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 0 0 1.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514ZM7.875 1.69a.25.25 0 0 1 .25 0l4.63 2.685L8 7.133 3.245 4.375ZM2.5 5.677l4.75 2.755v5.9l-4.625-2.683a.25.25 0 0 1-.125-.216Zm6.25 8.655v-5.9L13.5 5.677v5.756a.25.25 0 0 1-.125.216Z",
      label: { ru: "Пакеты",         en: "Packages" },
      count: "PDF",
    },
    {
      key: "repositories",
      icon: "M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z",
      label: { ru: "Репозитории",    en: "Repositories" },
      count: "13",
    },
    {
      key: "external",
      icon: "M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z",
      label: { ru: "Звёзды",          en: "Stars" },
      count: "9.4k",
      href: COMPANY_LINKS.github,
      highlight: true,
    },
  ];

  return (
    <nav className="border-b border-[#30363d] bg-[#010409]" aria-label="Organization navigation">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
        <div
          className="flex gap-1 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`nav[aria-label="Organization navigation"] > div > div::-webkit-scrollbar { display: none; }`}</style>

          {tabs.map((tab) => {
            // «Репозитории» подсвечивается если мы в repositories ИЛИ в любом репо-таб (Issues/PRs/...)
            const isActive =
              tab.key === "repositories"
                ? view === "repositories" || isRepoView(view)
                : tab.key !== "external" && view === tab.key;

            const inner = (
              <>
                <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill={isActive ? "#e6edf3" : "#8b949e"} aria-hidden>
                  <path d={tab.icon} />
                </svg>
                <span>{tab.label[lang]}</span>
                {tab.count && (
                  <span
                    className={`rounded-full px-1.5 py-0 font-mono text-[10px] font-medium ${
                      isActive
                        ? "bg-[#30363d] text-[#e6edf3]"
                        : tab.highlight
                        ? "bg-[#e3b34122] text-[#e3b341]"
                        : "bg-[#21262d] text-[#8b949e]"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
                {tab.key === "external" && (
                  <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 opacity-50" fill="currentColor" aria-hidden>
                    <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
                  </svg>
                )}
              </>
            );

            const cls = `inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2 text-sm transition ${
              isActive
                ? "border-[#f78166] font-semibold text-[#e6edf3]"
                : "border-transparent text-[#c9d1d9] hover:border-[#30363d] hover:text-[#e6edf3]"
            }`;

            if (tab.href) {
              return (
                <a key={tab.key} href={tab.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              );
            }

            return (
              <button
                key={tab.key}
                onClick={() => tab.key !== "external" && setView(tab.key)}
                className={cls}
              >
                {inner}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
