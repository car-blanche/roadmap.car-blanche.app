import { useEffect, useState } from "react";
import { useView, COMPANY_LINKS } from "../../context/ViewContext";
import { SearchPalette } from "./SearchPalette";
import { MobileNav } from "./MobileNav";
import { StatusIndicator } from "./StatusIndicator";
import { useLang } from "../../context/LangContext";
import { useSettings } from "../../context/SettingsContext";

export function GHHeader() {
  const { view, setView } = useView();
  const { t } = useLang();
  const { openDrawer, openShortcuts } = useSettings();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Глобальные ярлыки
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || (target as HTMLElement).isContentEditable);

      if (isTyping) return;

      if (!searchOpen && e.key === "/") { e.preventDefault(); setSearchOpen(true); }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearchOpen((v) => !v); }
      if (e.key === "?") { e.preventDefault(); openShortcuts(); }
      if (e.key === ",") { e.preventDefault(); openDrawer(); }

      // g + key navigation
      if (e.key === "g") {
        const handler = (e2: KeyboardEvent) => {
          if (e2.key === "h") setView("explore");           // g h — Home (Обзор)
          else if (e2.key === "c") setView("code");          // g c — О продукте (бывший Code)
          else if (e2.key === "i") setView("issues");        // g i — Issues
          else if (e2.key === "t") setView("team");          // g t — Team
          else if (e2.key === "w") setView("wiki");          // g w — Wiki
          else if (e2.key === "r") setView("resources");
          else if (e2.key === "p") setView("projects");
          window.removeEventListener("keydown", handler);
        };
        window.addEventListener("keydown", handler);
        setTimeout(() => window.removeEventListener("keydown", handler), 1500);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setView, openDrawer, openShortcuts]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#30363d] bg-[#010409]">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-2.5 lg:px-6">
        {/* Burger (mobile) — открывает MobileNav */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="rounded-md border border-[#30363d] bg-[#21262d] p-1.5 text-[#e6edf3] hover:bg-[#30363d] md:hidden"
          aria-label="Menu"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
            <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z" />
          </svg>
        </button>

        {/* Octocat → Explore (главная сайта = Обзор) */}
        <button onClick={() => setView("explore")} className="text-[#e6edf3] transition hover:opacity-80" aria-label="Home · Overview" title="Explore · Обзор и open-source">
          <svg viewBox="0 0 16 16" className="h-8 w-8" fill="currentColor" aria-hidden>
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>
        </button>

        {/* Breadcrumb */}
        <nav className="hidden min-w-0 items-center gap-1.5 text-sm sm:flex">
          <button
            onClick={() => setView("explore")}
            className="text-[#2f81f7] hover:underline"
            title="Explore · Обзор и open-source"
          >
            car-blanche
          </button>
          <span className="text-[#8b949e]">/</span>
          <button
            onClick={() => setView("issues")}
            className="truncate font-semibold text-[#e6edf3] hover:text-[#2f81f7] hover:underline"
            title="Открыть репозиторий (Issues, PRs, …)"
          >
            mobile-tech-transport-personalization
          </button>
        </nav>

        {/* Right side */}
        <div className="ml-auto flex flex-1 items-center justify-end gap-2 md:ml-6 md:flex-none">
          {/* Search input */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1 text-sm text-[#8b949e] transition hover:border-[#58a6ff66] hover:bg-[#161b22] hover:text-[#e6edf3] md:flex md:w-72"
            aria-label={t("header.search")}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
            </svg>
            <span className="flex-1 truncate text-left">{t("header.search")}</span>
            <kbd className="rounded border border-[#30363d] bg-[#161b22] px-1.5 font-mono text-[10px] text-[#8b949e]">/</kbd>
          </button>

          {/* Mobile search */}
          <button onClick={() => setSearchOpen(true)} className="rounded-md border border-[#30363d] bg-[#21262d] p-1.5 text-[#e6edf3] hover:bg-[#30363d] md:hidden" aria-label="Search">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
            </svg>
          </button>

          {/* Top nav теперь в OrgNav под GHHeader — здесь убрано чтобы не дублировать */}

          {/* System status */}
          <StatusIndicator />

          {/* GitHub */}
          <a
            href={COMPANY_LINKS.github}
            target="_blank" rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs font-medium text-[#e6edf3] hover:bg-[#30363d] sm:inline-flex"
            title="github.com/car-blanche"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
            GitHub
          </a>

          {/* Notifications */}
          <button
            onClick={() => setView("notifications")}
            className={`rounded-md border border-[#30363d] p-1.5 text-[#e6edf3] hover:bg-[#30363d] ${
              view === "notifications" ? "bg-[#30363d]" : "bg-[#21262d]"
            }`}
            aria-label="Notifications"
            title="Inbox"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
              <path d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16ZM3 5a5 5 0 0 1 10 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.519 1.519 0 0 1 13.482 13H2.518a1.516 1.516 0 0 1-1.263-2.36l1.703-2.554A.255.255 0 0 0 3 7.947Z" />
            </svg>
          </button>

          {/* Settings — единая кнопка */}
          <button
            onClick={openDrawer}
            className="rounded-md border border-[#30363d] bg-[#21262d] p-1.5 text-[#e6edf3] hover:bg-[#30363d]"
            aria-label={t("set.title")}
            title={`${t("set.title")}  ·  ,`}
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
              <path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C5.91.645 6.456.095 7.199.03 7.433.01 7.666 0 7.9 0Zm-.668 1.535a.348.348 0 0 0-.045.041l-.32 1.221c-.105.404-.385.692-.65.823a4.41 4.41 0 0 0-.505.292c-.245.163-.6.273-1.004.163l-1.116-.305a.428.428 0 0 0-.044-.005L3.6 4c-.16.232-.302.476-.425.728l1.097.815c.337.343.412.764.392 1.066-.012.183-.012.367 0 .55.02.302-.055.722-.392 1.066L3.175 9.04c.075.252.217.495.378.728L5.05 9.4c.337-.142.692-.05.937.115.165.108.336.211.512.295.262.13.546.413.658.812l.32 1.222a.305.305 0 0 0 .044.04 6.706 6.706 0 0 0 1.158 0c.014-.01.029-.024.045-.041l.32-1.221c.105-.404.385-.692.65-.823.171-.084.342-.187.505-.292.245-.163.6-.273 1.004-.163l1.116.305c.013.003.027.005.044.005-.004 0 .031-.013.062-.054.16-.232.302-.476.425-.728l-1.097-.815c-.337-.343-.412-.764-.392-1.066.012-.183.012-.367 0-.55-.02-.302.055-.722.392-1.066l.815-.806a6.84 6.84 0 0 0-.378-.728L11.45 4.6c-.337.142-.692.05-.937-.115a4.402 4.402 0 0 0-.512-.295c-.262-.13-.546-.413-.658-.812L9.023 2.156a.317.317 0 0 0-.044-.041 6.762 6.762 0 0 0-1.158 0Zm.067 9.215a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5ZM7.398 5.5a2.5 2.5 0 1 0 1.21 4.831 2.5 2.5 0 0 0-1.21-4.831Z" />
            </svg>
          </button>
        </div>
      </div>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </header>
  );
}
