import { contributors, languages, releases } from "../../data/github";
import { ActivityFeed } from "./ActivityFeed";
import { useView, githubUser, COMPANY_LINKS } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";

export function Sidebar() {
  const { setView } = useView();
  const { t } = useLang();
  return (
    <aside className="space-y-6">
      {/* About */}
      <section>
        <h3 className="mb-2 flex items-center justify-between text-base font-semibold text-[#e6edf3]">
          {t("side.about")}
          <button className="rounded p-1 text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3]" aria-label="edit">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Z" />
            </svg>
          </button>
        </h3>
        <p className="text-sm text-[#c9d1d9]">
          Дорожная карта премиум-сервиса персонализированного мобильного транспорта.
          Профессиональные шофёры, ИИ-рекомендации, интеграция с умным городом.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-[#c9d1d9]">
          <li className="flex items-center gap-2 hover:text-[#2f81f7]">
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
            <a href={COMPANY_LINKS.github} target="_blank" rel="noopener noreferrer" className="truncate font-semibold hover:underline">
              github.com/car-blanche
            </a>
          </li>
          <li className="flex items-center gap-2 hover:text-[#2f81f7]">
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Z" /></svg>
            <a href={COMPANY_LINKS.net} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">car-blanche.net</a>
          </li>
          <li className="flex items-center gap-2 hover:text-[#2f81f7]">
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Z" /></svg>
            <a href={COMPANY_LINKS.app} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">car-blanche.app</a>
          </li>
          <SidebarLink icon="book" text="Readme" />
          <SidebarLink icon="shield" text="MIT-style ESG policy" />
          <SidebarLink icon="activity" text="Activity · ежедневно" />
          <SidebarLink icon="star" text="3.4k stars" />
          <SidebarLink icon="eye" text="284 watching" />
          <SidebarLink icon="fork" text="129 forks" />
        </ul>
      </section>

      <Divider />

      {/* Releases */}
      <section id="releases">
        <h3 className="mb-2 flex items-center justify-between text-base font-semibold text-[#e6edf3]">
          {t("side.releases")}
          <span className="text-xs font-normal text-[#8b949e]">{releases.length}</span>
        </h3>
        <ul className="space-y-3">
          {releases.map((r) => (
            <li key={r.tag} className="text-sm">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#3fb950]" fill="currentColor">
                  <path d="M1.75 2.5a.25.25 0 0 0-.25.25v3a.25.25 0 0 0 .25.25h3a.25.25 0 0 0 .25-.25v-3a.25.25 0 0 0-.25-.25Z" />
                </svg>
                <a href="#" className="font-semibold text-[#e6edf3] hover:text-[#2f81f7]">{r.title}</a>
                {r.latest && (
                  <span className="rounded-full border border-[#3fb950] bg-[#3fb95033] px-1.5 py-0.5 text-[10px] font-semibold text-[#3fb950]">
                    Latest
                  </span>
                )}
              </div>
              <div className="ml-6 mt-0.5 text-xs text-[#8b949e]">
                <span className="gh-code">{r.tag}</span> · {r.date}
              </div>
              <ul className="ml-6 mt-1.5 space-y-0.5 text-xs text-[#c9d1d9]">
                {r.highlights.map((h) => (
                  <li key={h}>· {h}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      {/* Team activity — живая лента */}
      <ActivityFeed />

      <Divider />

      {/* Sponsor */}
      <section>
        <button
          onClick={() => setView("team")}
          className="flex w-full items-center justify-between rounded-md border border-[#db61a266] bg-gradient-to-br from-[#db61a222] to-[#a371f722] px-3 py-2 text-sm font-semibold text-[#e6edf3] transition hover:from-[#db61a233] hover:to-[#a371f733]"
        >
          <span className="flex items-center gap-2">
            <span className="text-lg">💖</span>
            {t("side.sponsor")}
          </span>
          <span className="text-xs text-[#8b949e]">→</span>
        </button>
      </section>

      <Divider />

      {/* Contributors — реальная команда */}
      <section>
        <h3 className="mb-2 flex items-center justify-between text-base font-semibold text-[#e6edf3]">
          <span>{t("side.contributors")}</span>
          <button onClick={() => setView("team")} className="text-xs font-normal text-[#2f81f7] hover:underline">
            {t("side.viewTeam")}
          </button>
        </h3>
        <div className="mb-3 text-xs font-normal text-[#8b949e]">{contributors.length} active</div>
        <ul className="space-y-2">
          {contributors.map((c) => (
            <li key={c.name} className="group flex items-center gap-2.5">
              <a
                href={githubUser(c.name)}
                target="_blank" rel="noopener noreferrer"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white shadow-sm transition hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}aa)` }}
                title={`${c.fullName} · github.com/car-blanche`}
              >
                {c.initials}
              </a>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <a
                    href={githubUser(c.name)}
                    target="_blank" rel="noopener noreferrer"
                    className="truncate text-sm font-semibold text-[#e6edf3] hover:text-[#2f81f7] hover:underline"
                  >
                    @{c.name}
                  </a>
                  {c.badge === "Owner" && (
                    <span className="rounded-full border border-[#d2992266] bg-[#d2992222] px-1.5 py-0 text-[9px] font-semibold uppercase text-[#d29922]">
                      Owner
                    </span>
                  )}
                  {c.badge === "Maintainer" && (
                    <span className="rounded-full border border-[#3fb95066] bg-[#3fb95022] px-1.5 py-0 text-[9px] font-semibold uppercase text-[#3fb950]">
                      Maintainer
                    </span>
                  )}
                  {c.badge === "Collaborator" && (
                    <span className="rounded-full border border-[#a371f766] bg-[#a371f722] px-1.5 py-0 text-[9px] font-semibold uppercase text-[#a371f7]">
                      Collaborator
                    </span>
                  )}
                </div>
                <div className="truncate text-[11px] text-[#8b949e]">
                  {c.fullName} · {c.role}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-3 text-xs text-[#2f81f7] hover:underline">
          {t("side.invite")}
        </button>
      </section>

      <Divider />

      {/* Languages — реальные технологии */}
      <section>
        <h3 className="mb-3 flex items-center justify-between text-base font-semibold text-[#e6edf3]">
          {t("side.languages")}
        </h3>
        <div className="mb-3 flex h-2 w-full overflow-hidden rounded-full bg-[#21262d]">
          {languages.map((l) => (
            <div
              key={l.name}
              className="h-full transition hover:opacity-80"
              style={{ width: `${l.pct}%`, background: l.color }}
              title={`${l.name} · ${l.pct}%`}
            />
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
          {languages.map((l) => (
            <li key={l.name} className="flex items-center gap-1.5 text-[#c9d1d9]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: l.color }} />
              <span className="font-semibold text-[#e6edf3]">{l.name}</span>
              <span className="ml-auto text-[#8b949e]">{l.pct}%</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

function Divider() {
  return <hr className="border-t border-[#21262d]" />;
}

function SidebarLink({ icon, text }: { icon: string; text: string }) {
  const cls = "h-4 w-4 text-[#8b949e]";
  const iconEl = (() => {
    switch (icon) {
      case "link":
        return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Z" /></svg>);
      case "book":
        return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Z" /></svg>);
      case "shield":
        return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M7.467.133a1.748 1.748 0 0 1 1.066 0l5.25 1.68A1.75 1.75 0 0 1 15 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 0 1-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 0 1 1.217-1.667Z" /></svg>);
      case "activity":
        return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0ZM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z" /></svg>);
      case "star":
        return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" /></svg>);
      case "eye":
        return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 0 1 0 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 0 1 0-.136Z" /></svg>);
      case "fork":
        return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0Z" /></svg>);
      default:
        return null;
    }
  })();
  return (
    <li className="flex items-center gap-2 hover:text-[#2f81f7]">
      {iconEl}
      <a href="#" className="truncate hover:underline">{text}</a>
    </li>
  );
}
