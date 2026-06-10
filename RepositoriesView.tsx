import { useState, useMemo } from "react";
import { repos, type Repo } from "../../data/repos";
import { useView, COMPANY_LINKS } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";
import { ViewHero } from "../gh/ViewHero";

/* =========================================================
   Список репозиториев организации car-blanche.
   Один main-репо (mobile-tech-transport-personalization) при клике
   уводит в Code · Issues · Wiki и т.д. — это «наш» репо.
   Остальные — внешние ссылки на GitHub.
   ========================================================= */

const MAIN_REPO_NAME = "car-blanche-app"; // (или другой репо команды по умолчанию)

export function RepositoriesView() {
  const { lang } = useLang();
  const { setView } = useView();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "Public" | "Private">("all");

  const filtered = useMemo(() => {
    let list = repos;
    if (filter !== "all") list = list.filter((r) => r.visibility === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description[lang].toLowerCase().includes(q) ||
          r.topics.some((t) => t.includes(q))
      );
    }
    return list;
  }, [filter, query, lang]);

  const counts = {
    total: repos.length,
    public: repos.filter((r) => r.visibility === "Public").length,
    stars: repos.reduce((s, r) => s + r.stars, 0),
    languages: new Set(repos.map((r) => r.language)).size,
  };

  return (
    <section className="space-y-6">
      {/* HERO */}
      <ViewHero
        icon="📁"
        kicker={{ ru: "Репозитории", en: "Repositories" }}
        kickerColor="#58a6ff"
        gradientFrom="#58a6ff"
        gradientTo="#a371f7"
        title={{
          ru: "Все репозитории организации car-blanche",
          en: "All repositories of car-blanche organization",
        }}
        subtitle={{
          ru: "Открытый код команды: основное приложение, SDK, дизайн-система, расширения Yii2, ESG-инструменты. Кликните на репозиторий — попадёте внутрь.",
          en: "Team open code: main app, SDKs, design system, Yii2 extensions, ESG tools. Click a repo to dive in.",
        }}
        audiences={["developers", "partners"]}
        stats={[
          { value: counts.total.toString(),                     label: { ru: "Репозиториев",  en: "Repositories" }, color: "#58a6ff" },
          { value: counts.public.toString(),                    label: { ru: "Public",        en: "Public" },        color: "#3fb950" },
          { value: `${(counts.stars / 1000).toFixed(1)}k`,      label: { ru: "Звёзд всего",  en: "Total stars" },    color: "#e3b341" },
          { value: counts.languages.toString(),                 label: { ru: "Языков",        en: "Languages" },     color: "#a371f7" },
        ]}
      />

      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-3 rounded-md border border-[#30363d] bg-[#161b22] p-2">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#8b949e]" fill="currentColor">
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === "ru" ? "Найти репозиторий…" : "Find a repository…"}
            className="min-w-0 flex-1 bg-transparent text-sm text-[#e6edf3] outline-none placeholder:text-[#6e7681]"
          />
        </div>
        <div className="flex gap-1 rounded-md border border-[#30363d] bg-[#0d1117] p-0.5">
          {(["all", "Public", "Private"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition ${
                filter === f ? "bg-[#1f6feb33] text-[#58a6ff]" : "text-[#c9d1d9] hover:bg-[#21262d]"
              }`}
            >
              {f === "all" ? (lang === "ru" ? "Все" : "All") : f}
            </button>
          ))}
        </div>
        <a
          href={COMPANY_LINKS.github}
          target="_blank" rel="noopener noreferrer"
          className="rounded-md bg-[#238636] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2ea043]"
        >
          🐙 GitHub
        </a>
      </div>

      {/* GRID */}
      <ul className="space-y-3">
        {filtered.map((r) => (
          <RepoListItem
            key={r.name}
            repo={r}
            isMain={r.name === MAIN_REPO_NAME || r.name === "tariffs-spec"}
            onOpen={() => setView("issues")}
          />
        ))}
      </ul>

      <div className="text-center text-xs text-[#8b949e]">
        {lang === "ru"
          ? `Показано ${filtered.length} из ${repos.length} репозиториев`
          : `Showing ${filtered.length} of ${repos.length} repositories`}
      </div>
    </section>
  );
}

function RepoListItem({ repo, isMain, onOpen }: { repo: Repo; isMain: boolean; onOpen: () => void }) {
  const { lang } = useLang();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMain) {
      // Открываем «наш» репо — переходим внутрь (Code)
      onOpen();
    } else {
      // Внешние — на GitHub
      window.open(COMPANY_LINKS.github, "_blank");
    }
  };

  return (
    <li>
      <a
        href="#"
        onClick={handleClick}
        className="block rounded-md border border-[#30363d] bg-[#161b22] p-4 transition hover:border-[#58a6ff66] hover:bg-[#1c2128]"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-base">
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Z" />
              </svg>
              <span className="text-[#2f81f7] hover:underline">car-blanche</span>
              <span className="text-[#8b949e]">/</span>
              <span className="font-semibold text-[#2f81f7] hover:underline">{repo.name}</span>
              <span className="rounded-full border border-[#30363d] px-2 py-0 text-[10px] text-[#8b949e]">
                {repo.visibility}
              </span>
              {isMain && (
                <span className="rounded-full border border-[#3fb95066] bg-[#3fb95022] px-1.5 py-0 text-[10px] font-semibold uppercase text-[#3fb950]">
                  ★ Main
                </span>
              )}
              {repo.isPinned && (
                <span className="rounded-full border border-[#e3b34166] bg-[#e3b34122] px-1.5 py-0 text-[10px] font-semibold uppercase text-[#e3b341]">
                  📌 Pinned
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-[#c9d1d9]">{repo.description[lang]}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {repo.topics.map((t) => (
                <span key={t} className="rounded-full bg-[#388bfd1a] px-2 py-0.5 text-[11px] font-medium text-[#2f81f7]">
                  {t}
                </span>
              ))}
            </div>
          </div>
          {isMain && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#238636] px-3 py-1.5 text-xs font-semibold text-white">
              {lang === "ru" ? "Открыть →" : "Open →"}
            </span>
          )}
        </div>

        {/* Stats footer */}
        <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-[#30363d] pt-2.5 text-xs text-[#8b949e]">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: repo.languageColor }} />
            {repo.language}
          </span>
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
            </svg>
            {repo.stars >= 1000 ? `${(repo.stars / 1000).toFixed(1)}k` : repo.stars}
          </span>
          <span className="flex items-center gap-1">
            🔀 {repo.forks}
          </span>
          <span className="ml-auto text-[#8b949e]">Updated {repo.updated}</span>
        </div>
      </a>
    </li>
  );
}
