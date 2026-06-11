import { useEffect } from "react";
import { useView, COMPANY_LINKS, type ViewKey } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { view, setView } = useView();
  const { t } = useLang();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const go = (v: ViewKey) => { setView(v); onClose(); };

  const primary: { key: ViewKey; label: string; icon: string }[] = [
    { key: "code",        label: t("tab.code"),        icon: "📁" },
    { key: "projects",    label: t("tab.projects"),    icon: "🎯" },
    { key: "issues",      label: t("tab.issues"),      icon: "🐛" },
    { key: "pulls",       label: t("tab.pulls"),       icon: "🔀" },
    { key: "discussions", label: t("tab.discussions"), icon: "💬" },
    { key: "actions",     label: t("tab.actions"),     icon: "⚡" },
    { key: "wiki",        label: t("tab.wiki"),        icon: "📚" },
    { key: "security",    label: t("tab.security"),    icon: "🛡️" },
    { key: "insights",    label: t("tab.insights"),    icon: "📊" },
  ];

  const secondary: { key: ViewKey; label: string; icon: string }[] = [
    { key: "team",        label: t("nav.team"),        icon: "👥" },
    { key: "resources",   label: t("nav.resources"),   icon: "📦" },
    { key: "marketplace", label: t("nav.marketplace"), icon: "🛍️" },
    { key: "explore",     label: t("nav.explore"),     icon: "🌐" },
    { key: "notifications", label: "Inbox",            icon: "🔔" },
  ];

  return (
    <div className="fixed inset-0 z-[90] md:hidden" role="dialog" aria-modal="true">
      {/* backdrop */}
      <button onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Close menu" />

      {/* drawer */}
      <aside
        className="absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-hidden border-r border-[#30363d] bg-[#0d1117] shadow-2xl"
        style={{ animation: "drawerInLeft 0.18s ease-out" }}
      >
        {/* header */}
        <div className="flex items-start justify-between border-b border-[#30363d] bg-[#161b22] px-4 py-3">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 16 16" className="h-6 w-6 text-[#e6edf3]" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" /></svg>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#8b949e]">car-blanche</div>
              <div className="text-sm font-semibold text-[#e6edf3]">mobile-tech-transport</div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md border border-[#30363d] bg-[#21262d] p-1.5 text-[#e6edf3] hover:bg-[#30363d]">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor"><path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" /></svg>
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-auto p-3">
          {/* Repo tabs */}
          <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
            Repository
          </div>
          <ul className="mb-4 space-y-0.5">
            {primary.map((n) => {
              const active = view === n.key;
              return (
                <li key={n.key}>
                  <button
                    onClick={() => go(n.key)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm ${
                      active ? "bg-[#1f6feb33] font-semibold text-[#58a6ff]" : "text-[#c9d1d9] hover:bg-[#1f6feb1f]"
                    }`}
                  >
                    <span className="text-lg">{n.icon}</span>
                    {n.label}
                    {active && <span className="ml-auto text-[#3fb950]">●</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Top nav */}
          <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
            Discover
          </div>
          <ul className="mb-4 space-y-0.5">
            {secondary.map((n) => {
              const active = view === n.key;
              return (
                <li key={n.key}>
                  <button
                    onClick={() => go(n.key)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm ${
                      active ? "bg-[#1f6feb33] font-semibold text-[#58a6ff]" : "text-[#c9d1d9] hover:bg-[#1f6feb1f]"
                    }`}
                  >
                    <span className="text-lg">{n.icon}</span>
                    {n.label}
                    {active && <span className="ml-auto text-[#3fb950]">●</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* External links */}
          <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
            Car Blanche
          </div>
          <ul className="space-y-0.5">
            <ExtLink href={COMPANY_LINKS.github}     icon="🐙" label="github.com/car-blanche" />
            <ExtLink href={COMPANY_LINKS.net}        icon="🌐" label="car-blanche.net" />
            <ExtLink href={COMPANY_LINKS.businessNews} icon="📰" label="Business News" />
            <ExtLink href={COMPANY_LINKS.app}        icon="📱" label="car-blanche.app" />
            <ExtLink href={COMPANY_LINKS.appStore}   icon="🍎" label="App Store" />
            <ExtLink href={COMPANY_LINKS.playStore}  icon="🤖" label="Google Play" />
            <ExtLink href={COMPANY_LINKS.showroom3d} icon="🎨" label="3D Showroom" />
            <ExtLink href={COMPANY_LINKS.email}      icon="✉️" label="b2b.car.blanche@gmail.com" />
          </ul>
        </div>

        {/* footer */}
        <div className="border-t border-[#30363d] bg-[#161b22] px-4 py-2.5 text-[11px] text-[#8b949e]">
          📍 Работаем в Уфе · 8 лет · 1 → 20+ городов к 2029
        </div>
      </aside>

      <style>{`
        @keyframes drawerInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ExtLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#1f6feb1f]"
      >
        <span className="text-lg">{icon}</span>
        <span className="truncate">{label}</span>
        <svg viewBox="0 0 16 16" className="ml-auto h-3 w-3 text-[#6e7681]" fill="currentColor">
          <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
        </svg>
      </a>
    </li>
  );
}
