import { useView, COMPANY_LINKS, type ViewKey } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";
import { AppStoreButtons } from "./AppStoreButtons";

export function GHFooter() {
  const { setView } = useView();
  const { t } = useLang();

  const cols: { title: string; links: { label: string; view?: ViewKey; href?: string }[] }[] = [
    {
      title: t("footer.product"),
      links: [
        { label: t("footer.codeRepo"), view: "code" },
        { label: t("footer.roadmap"),  view: "projects" },
        { label: t("footer.tasks"),    view: "issues" },
        { label: t("footer.pulls"),    view: "pulls" },
        { label: t("footer.cicd"),     view: "actions" },
      ],
    },
    {
      title: t("footer.platform"),
      links: [
        { label: t("footer.wiki"),        view: "wiki" },
        { label: t("footer.security"),    view: "security" },
        { label: t("footer.insights"),    view: "insights" },
        { label: t("footer.marketplace"), view: "marketplace" },
        { label: t("footer.explore"),     view: "explore" },
      ],
    },
    {
      title: "Car Blanche",
      links: [
        { label: "🐙 github.com/car-blanche",   href: COMPANY_LINKS.github },
        { label: "🌐 car-blanche.net",          href: COMPANY_LINKS.net },
        { label: "📰 Business News",            href: COMPANY_LINKS.businessNews },
        { label: "🍎 App Store",                href: COMPANY_LINKS.appStore },
        { label: "🤖 Google Play",              href: COMPANY_LINKS.playStore },
        { label: "🎨 3D Showroom",              href: COMPANY_LINKS.showroom3d },
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        { label: t("footer.docs"),      view: "resources" },
        { label: t("footer.api"),       view: "resources" },
        { label: t("footer.brand"),     view: "resources" },
        { label: t("footer.cases"),     view: "resources" },
        { label: t("footer.changelog"), view: "resources" },
        { label: t("footer.support"),   view: "resources" },
      ],
    },
  ];

  return (
    <footer className="mt-12 border-t border-[#30363d] bg-[#0d1117]">
      <div className="mx-auto max-w-[1400px] px-4 py-10 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 text-[#e6edf3]">
              <svg viewBox="0 0 16 16" className="h-7 w-7" fill="currentColor">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
              </svg>
              <span className="font-semibold">car-blanche</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-[#8b949e]">
              Документация дорожной карты премиум-сервиса персонализированного мобильного транспорта.
            </p>
            {/* App Store + Google Play */}
            <div className="mt-4">
              <AppStoreButtons size="sm" />
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-3 text-sm font-semibold text-[#e6edf3]">{c.title}</h4>
              <ul className="space-y-1.5 text-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.href ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-[#2f81f7]">
                        {l.label}
                      </a>
                    ) : (
                      <button
                        onClick={() => l.view && setView(l.view)}
                        className="text-left text-[#8b949e] hover:text-[#2f81f7]"
                      >
                        {l.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#30363d] pt-6 text-xs text-[#8b949e]">
          <div>© {new Date().getFullYear()} Car Blanche · Документ-дорожная карта</div>
          <div className="flex flex-wrap items-center gap-4">
            <a href={COMPANY_LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#2f81f7]">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" /></svg>
              github.com/car-blanche
            </a>
            <a href={COMPANY_LINKS.net} target="_blank" rel="noopener noreferrer" className="hover:text-[#2f81f7]">car-blanche.net</a>
            <a href={COMPANY_LINKS.app} target="_blank" rel="noopener noreferrer" className="hover:text-[#2f81f7]">car-blanche.app</a>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3fb950]" />
              <span className="text-[#3fb950]">●</span> {t("footer.status")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
