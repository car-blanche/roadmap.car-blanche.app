import { useView, type ViewKey } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";
import { useSettings } from "../../context/SettingsContext";

const ICONS = {
  code: "📁", projects: "🎯", wiki: "📚", team: "👥",
} as const;

export function MobileBottomBar() {
  const { view, setView } = useView();
  const { t } = useLang();
  const { openDrawer } = useSettings();

  const tabs: { key: ViewKey | "settings"; label: string; icon: string; onClick: () => void }[] = [
    { key: "code",     label: t("tab.code"),     icon: ICONS.code,     onClick: () => setView("code") },
    { key: "projects", label: t("tab.projects"), icon: ICONS.projects, onClick: () => setView("projects") },
    { key: "wiki",     label: t("tab.wiki"),     icon: ICONS.wiki,     onClick: () => setView("wiki") },
    { key: "team",     label: t("nav.team"),     icon: ICONS.team,     onClick: () => setView("team") },
    { key: "settings", label: t("set.title"),    icon: "⚙️",           onClick: openDrawer },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#30363d] bg-[#010409]/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}
      aria-label="Mobile navigation"
    >
      <ul className="grid grid-cols-5">
        {tabs.map((tab) => {
          const isActive = view === tab.key;
          return (
            <li key={tab.key}>
              <button
                onClick={tab.onClick}
                className={`flex w-full flex-col items-center gap-0.5 px-1 py-2 text-[10px] transition ${
                  isActive ? "text-[#58a6ff]" : "text-[#8b949e] hover:text-[#e6edf3]"
                }`}
              >
                <span className={`text-xl leading-none ${isActive ? "scale-110" : ""} transition-transform`}>
                  {tab.icon}
                </span>
                <span className="truncate font-medium">{tab.label}</span>
                {isActive && tab.key !== "settings" && (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-[#58a6ff]" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
