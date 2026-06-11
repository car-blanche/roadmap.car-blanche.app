import { useEffect } from "react";
import { useSettings, type Density } from "../../context/SettingsContext";
import { useTheme, COMPANY_LINKS, useView, type Theme } from "../../context/ViewContext";
import { useLang, type Lang } from "../../context/LangContext";
import { useToast } from "../../context/ToastContext";

export function SettingsDrawer() {
  const { drawerOpen, closeDrawer, density, setDensity, resetWelcome, openShortcuts } = useSettings();
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const { setView } = useView();
  const { showToast } = useToast();

  // Close on Escape
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;

  const themes: { key: Theme; icon: string; label: string; desc: string }[] = [
    { key: "dark",  icon: "🌙", label: t("set.theme.dark"),  desc: t("set.theme.darkDesc") },
    { key: "dim",   icon: "🌗", label: t("set.theme.dim"),   desc: t("set.theme.dimDesc") },
    { key: "light", icon: "☀️", label: t("set.theme.light"), desc: t("set.theme.lightDesc") },
  ];

  const langs: { key: Lang; flag: string; label: string }[] = [
    { key: "ru", flag: "🌐", label: t("lang.ru") },
    { key: "en", flag: "🌐", label: t("lang.en") },
  ];

  const densities: { key: Density; icon: string; label: string; desc: string }[] = [
    { key: "comfortable", icon: "▭", label: t("set.density.comfortable"), desc: t("set.density.comfDesc") },
    { key: "compact",     icon: "▬", label: t("set.density.compact"),     desc: t("set.density.compDesc") },
  ];

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      {/* backdrop */}
      <button onClick={closeDrawer} className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-label="Close" />

      {/* drawer */}
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-hidden border-l border-[#30363d] bg-[#0d1117] shadow-2xl"
        style={{ animation: "drawerIn 0.18s ease-out" }}
      >
        {/* header */}
        <div className="flex items-start justify-between border-b border-[#30363d] bg-[#161b22] px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⚙️</span>
              <h2 className="text-base font-semibold text-[#e6edf3]">{t("set.title")}</h2>
            </div>
            <p className="mt-0.5 text-xs text-[#8b949e]">{t("set.subtitle")}</p>
          </div>
          <button
            onClick={closeDrawer}
            className="rounded-md border border-[#30363d] bg-[#21262d] p-1.5 text-[#e6edf3] hover:bg-[#30363d]"
            aria-label={t("set.close")}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="flex-1 space-y-6 overflow-auto p-5">
          {/* === APPEARANCE === */}
          <Section title={t("set.sec.appearance")} icon="🎨">
            <div className="space-y-2">
              {themes.map((opt) => {
                const active = opt.key === theme;
                return (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setTheme(opt.key);
                      showToast({ kind: "success", icon: opt.icon, title: t("toast.themeChanged"), desc: t("toast.themeDesc") });
                    }}
                    className={`flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition ${
                      active
                        ? "border-[#58a6ff66] bg-[#1f6feb1f]"
                        : "border-[#30363d] bg-[#161b22] hover:border-[#58a6ff66] hover:bg-[#1c2128]"
                    }`}
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-[#e6edf3]">{opt.label}</div>
                      <div className="text-xs text-[#8b949e]">{opt.desc}</div>
                    </div>
                    {active && <span className="text-[#3fb950]">✓</span>}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* === LANGUAGE === */}
          <Section title={t("set.sec.lang")} icon="🌐">
            <div className="grid grid-cols-2 gap-2">
              {langs.map((opt) => {
                const active = opt.key === lang;
                return (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setLang(opt.key);
                      showToast({ kind: "info", icon: opt.flag, title: t("toast.langChanged"), desc: t("toast.langDesc") });
                    }}
                    className={`flex items-center gap-2 rounded-md border px-3 py-2.5 text-left transition ${
                      active
                        ? "border-[#58a6ff66] bg-[#1f6feb1f]"
                        : "border-[#30363d] bg-[#161b22] hover:border-[#58a6ff66] hover:bg-[#1c2128]"
                    }`}
                  >
                    <span className="text-xl">{opt.flag}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-[#e6edf3]">{opt.label}</div>
                      <div className="text-xs text-[#8b949e]">{opt.key.toUpperCase()}</div>
                    </div>
                    {active && <span className="text-[#3fb950]">✓</span>}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* === DENSITY === */}
          <Section title={t("set.sec.density")} icon="↔️">
            <div className="space-y-2">
              {densities.map((opt) => {
                const active = opt.key === density;
                return (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setDensity(opt.key);
                      showToast({ kind: "info", icon: opt.icon, title: t("toast.densityChanged"), desc: opt.label });
                    }}
                    className={`flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition ${
                      active
                        ? "border-[#58a6ff66] bg-[#1f6feb1f]"
                        : "border-[#30363d] bg-[#161b22] hover:border-[#58a6ff66] hover:bg-[#1c2128]"
                    }`}
                  >
                    <span className="font-mono text-lg text-[#8b949e]">{opt.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-[#e6edf3]">{opt.label}</div>
                      <div className="text-xs text-[#8b949e]">{opt.desc}</div>
                    </div>
                    {active && <span className="text-[#3fb950]">✓</span>}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* === INTERFACE === */}
          <Section title={t("set.sec.interface")} icon="🎛️">
            <div className="space-y-2">
              <ActionRow
                icon="👋"
                title={t("set.welcome.show")}
                desc={t("set.welcome.desc")}
                onClick={() => {
                  showToast({ kind: "success", icon: "👋", title: t("toast.welcomeReset") });
                  setTimeout(() => resetWelcome(), 500);
                }}
              />
              <ActionRow
                icon="⌨️"
                title={t("set.shortcuts")}
                desc={t("set.shortcuts.desc")}
                action={t("set.shortcuts.open")}
                onClick={() => { closeDrawer(); openShortcuts(); }}
              />
            </div>
          </Section>

          {/* === ACCOUNT / LINKS === */}
          <Section title={t("set.sec.account")} icon="👤">
            <div className="space-y-2">
              <ActionRow
                icon="👥"
                title={t("set.account.profile")}
                onClick={() => { setView("team"); closeDrawer(); }}
              />
              <ActionRow
                icon="🐙"
                title={t("set.account.github")}
                external
                href={COMPANY_LINKS.github}
              />
              <ActionRow
                icon="🌐"
                title={t("set.account.site")}
                external
                href={COMPANY_LINKS.net}
              />
              <ActionRow
                icon="📱"
                title={t("set.account.app")}
                external
                href={COMPANY_LINKS.app}
              />
              <ActionRow
                icon="🍎"
                title="App Store"
                desc="iOS · iPhone, iPad"
                external
                href={COMPANY_LINKS.appStore}
              />
              <ActionRow
                icon="🤖"
                title="Google Play"
                desc="Android · телефоны и планшеты"
                external
                href={COMPANY_LINKS.playStore}
              />
            </div>
          </Section>

          <p className="rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-[11px] text-[#8b949e]">
            ℹ️ {t("set.save.note")}
          </p>
        </div>
      </aside>

      <style>{`
        @keyframes drawerIn {
          from { transform: translateX(20px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
        <span className="text-sm">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function ActionRow({
  icon, title, desc, action, onClick, external, href,
}: {
  icon: string;
  title: string;
  desc?: string;
  action?: string;
  onClick?: () => void;
  external?: boolean;
  href?: string;
}) {
  const Tag: any = external && href ? "a" : "button";
  const props = external && href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };
  return (
    <Tag
      {...props}
      className="flex w-full items-center gap-3 rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2.5 text-left transition hover:border-[#58a6ff66] hover:bg-[#1c2128]"
    >
      <span className="text-lg">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-[#e6edf3]">{title}</div>
        {desc && <div className="text-xs text-[#8b949e]">{desc}</div>}
      </div>
      {external ? (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#8b949e]" fill="currentColor">
          <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
        </svg>
      ) : action ? (
        <span className="text-xs text-[#2f81f7]">{action} →</span>
      ) : (
        <span className="text-[#8b949e]">→</span>
      )}
    </Tag>
  );
}
