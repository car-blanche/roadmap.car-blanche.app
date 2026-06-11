import { topics } from "../../data/github";
import { useView, COMPANY_LINKS, type ViewKey } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";

export function RepoHeader() {
  const { view, setView } = useView();
  const { t, lang } = useLang();
  void view;

  return (
    <div className="border-b border-[#30363d] bg-[#0d1117]">
      {/* Тонкий breadcrumb-бар сверху — путь обратно к организации */}
      <RepoBreadcrumb />

      <div className="mx-auto max-w-[1400px] px-4 pt-5 lg:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="flex flex-wrap items-center gap-2 text-xl font-normal">
            <svg viewBox="0 0 16 16" className="h-5 w-5 text-[#8b949e]" fill="currentColor">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z" />
            </svg>
            <button
              onClick={() => setView("explore")}
              className="text-[#2f81f7] hover:underline"
              title={lang === "ru" ? "Обзор организации car-blanche" : "car-blanche org overview"}
            >
              car-blanche
            </button>
            <span className="text-[#8b949e]">/</span>
            <button
              onClick={() => setView("issues")}
              className="font-semibold text-[#2f81f7] hover:underline"
              title={lang === "ru" ? "Открыть репозиторий (Issues, PRs, ...)" : "Open repository (Issues, PRs, ...)"}
            >
              mobile-tech-transport-personalization
            </button>
            <span className="rounded-full border border-[#30363d] px-2 py-0.5 text-xs text-[#8b949e]">{t("repo.public")}</span>
          </h1>

          <div className="flex flex-wrap gap-2">
            <RepoButton icon="eye"  label={t("repo.watch")} count="284"  href={COMPANY_LINKS.github} />
            <RepoButton icon="fork" label={t("repo.fork")}  count="129"  href={COMPANY_LINKS.github} />
            <RepoButton icon="star" label={t("repo.star")}  count="3.4k" href={COMPANY_LINKS.github} />
          </div>
        </div>

        <div className="mt-3 max-w-3xl">
          <p className="text-sm text-[#8b949e]">
            {t("repo.description")}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {topics.map((t) => (
              <button
                key={t}
                className="inline-block rounded-full border border-transparent bg-[#388bfd1a] px-2.5 py-0.5 text-xs font-medium text-[#2f81f7] hover:bg-[#388bfd33]"
              >
                {t}
              </button>
            ))}
            <span className="mx-2 h-3 w-px bg-[#30363d]" />
            <a
              href={COMPANY_LINKS.github}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-0.5 text-xs text-[#e6edf3] hover:bg-[#30363d]"
            >
              🐙 github.com/car-blanche
              <ExtIcon />
            </a>
            <a
              href={COMPANY_LINKS.net}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-0.5 text-xs text-[#e6edf3] hover:bg-[#30363d]"
            >
              🌐 car-blanche.net
              <ExtIcon />
            </a>
            <a
              href={COMPANY_LINKS.app}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-0.5 text-xs text-[#e6edf3] hover:bg-[#30363d]"
            >
              📱 car-blanche.app
              <ExtIcon />
            </a>
          </div>
        </div>

        <Tabs />
      </div>
    </div>
  );
}

function ExtIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3 text-[#8b949e]" fill="currentColor">
      <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
    </svg>
  );
}

function RepoButton({ icon, label, count, href }: { icon: "eye" | "fork" | "star"; label: string; count: string; href?: string }) {
  const Tag: any = href ? "a" : "button";
  const extraProps = href ? { href, target: "_blank", rel: "noopener noreferrer", title: `${label} on GitHub` } : {};
  return (
    <Tag {...extraProps} className="inline-flex cursor-pointer items-center overflow-hidden rounded-md border border-[#30363d] text-sm transition hover:border-[#58a6ff66]">
      <span className="flex items-center gap-1.5 bg-[#21262d] px-3 py-1 text-[#e6edf3] hover:bg-[#30363d]">
        {icon === "star" && (
          <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#e3b341]" fill="currentColor">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
          </svg>
        )}
        {icon === "fork" && (
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0Z" />
          </svg>
        )}
        {icon === "eye" && (
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
            <path d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 0 1 0 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068Z" />
          </svg>
        )}
        {label}
      </span>
      <span className="border-l border-[#30363d] bg-[#0d1117] px-2 py-1 text-[#e6edf3]">{count}</span>
    </Tag>
  );
}

function Tabs() {
  const { view, setView } = useView();
  const { t } = useLang();

  // Репо-табы внутри mobile-tech-transport-personalization:
  //   только разработческий контекст (Issues, PRs, Discussions, CI/CD, Security, Insights)
  //
  // Code, Wiki, Projects — теперь в OrgNav как самостоятельные разделы для всех аудиторий.
  const tabs: { id: ViewKey; label: string; icon: string; count?: string | null }[] = [
    { id: "issues",      label: t("tab.issues"),      icon: "issue",  count: "18" },
    { id: "pulls",       label: t("tab.pulls"),       icon: "pr",     count: "7" },
    { id: "discussions", label: t("tab.discussions"), icon: "disc",   count: "7" },
    { id: "actions",     label: t("tab.actions"),     icon: "play" },
    { id: "security",    label: t("tab.security"),    icon: "shield" },
    { id: "insights",    label: t("tab.insights"),    icon: "chart" },
  ];

  return (
    <nav
      className="-mb-px mt-4 flex flex-wrap gap-1 overflow-x-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style>{`nav.repo-tabs::-webkit-scrollbar { display: none; }`}</style>
      {tabs.map((tab) => {
        const active = view === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2 text-sm transition ${
              active
                ? "border-[#f78166] font-semibold text-[#e6edf3]"
                : "border-transparent text-[#e6edf3] hover:border-[#30363d]"
            }`}
          >
            <TabIcon icon={tab.icon} />
            {tab.label}
            {tab.count && (
              <span className="rounded-full bg-[#30363d] px-1.5 py-0.5 font-mono text-[11px] text-[#e6edf3]">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

function TabIcon({ icon }: { icon: string }) {
  const cls = "h-4 w-4 text-[#8b949e]";
  switch (icon) {
    case "code": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z" /></svg>);
    case "issue": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" /></svg>);
    case "pr": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354Z" /></svg>);
    case "play": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Z" /></svg>);
    case "proj": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0Z" /></svg>);
    case "book": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Z" /></svg>);
    case "shield": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M7.467.133a1.748 1.748 0 0 1 1.066 0l5.25 1.68A1.75 1.75 0 0 1 15 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 0 1-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 0 1 1.217-1.667Z" /></svg>);
    case "chart": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.5 1.75V13.5h13.75a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 1.5 0Z" /></svg>);
    case "disc": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1Z" /><path d="M14.5 4.75a.75.75 0 0 0-.75-.75h-.5a.75.75 0 0 1 0-1.5h.5c1.243 0 2.25 1.007 2.25 2.25v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.458 1.458 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h1a.25.25 0 0 0 .25-.25Z" /></svg>);
    case "team": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" /></svg>);
    case "package": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M8.878.392a1.75 1.75 0 0 0-1.756 0l-5.25 3.045A1.75 1.75 0 0 0 1 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 0 0 1.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514ZM7.875 1.69a.25.25 0 0 1 .25 0l4.63 2.685L8 7.133 3.245 4.375ZM2.5 5.677l4.75 2.755v5.9l-4.625-2.683a.25.25 0 0 1-.125-.216Zm6.25 8.655v-5.9L13.5 5.677v5.756a.25.25 0 0 1-.125.216Z" /></svg>);
    case "marketplace": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.75 0A1.75 1.75 0 0 0 0 1.75v2.5a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .25-.25h12.5a.25.25 0 0 1 .25.25v2.5a.75.75 0 0 0 1.5 0v-2.5A1.75 1.75 0 0 0 14.25 0Z" /><path d="M3 8a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0Zm4 0a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0Zm4 0a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0Z" /></svg>);
    case "eye": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 0 1 0 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 0 1 0-.136ZM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 0 0 0 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 0 0 0-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2Zm0 8a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z" /></svg>);
    case "bell": return (<svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16ZM3 5a5 5 0 0 1 10 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.519 1.519 0 0 1 13.482 13H2.518a1.516 1.516 0 0 1-1.263-2.36l1.703-2.554A.255.255 0 0 0 3 7.947Z" /></svg>);
    default: return null;
  }
}

/* =========================================================
   Тонкий breadcrumb-бар над названием репо.
   Показывает путь: ← Репозитории / mobile-tech-transport-personalization
   Позволяет вернуться в OrgNav.
   ========================================================= */
function RepoBreadcrumb() {
  const { setView } = useView();
  const { lang } = useLang();
  return (
    <div className="border-b border-[#21262d] bg-[#010409] py-2">
      <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 text-xs lg:px-6">
        {/* ← Назад к Repositories (внутри car-blanche org) */}
        <button
          onClick={() => setView("repositories")}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[#8b949e] transition hover:bg-[#21262d] hover:text-[#2f81f7]"
        >
          ← {lang === "ru" ? "Репозитории" : "Repositories"}
        </button>
        <span className="text-[#30363d]">/</span>
        {/* car-blanche → Обзор (Explore) для клиентов */}
        <button
          onClick={() => setView("explore")}
          className="text-[#8b949e] hover:text-[#2f81f7] hover:underline"
          title={lang === "ru" ? "Обзор организации" : "Organization overview"}
        >
          car-blanche
        </button>
        <span className="text-[#30363d]">/</span>
        <button
          onClick={() => setView("issues")}
          className="font-semibold text-[#e6edf3] hover:text-[#2f81f7] hover:underline"
          title={lang === "ru" ? "Открыть репозиторий (Issues, PRs, ...)" : "Open repository (Issues, PRs, ...)"}
        >
          mobile-tech-transport-personalization
        </button>
        <a
          href={COMPANY_LINKS.github}
          target="_blank" rel="noopener noreferrer"
          className="text-[#6e7681] hover:text-[#2f81f7]"
          title="github.com/car-blanche"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
            <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
          </svg>
        </a>
        <span className="ml-auto hidden text-[10px] text-[#6e7681] sm:inline">
          {lang === "ru" ? "Открытый репозиторий" : "Public repository"}
        </span>
      </div>
    </div>
  );
}
