import { useState, useMemo } from "react";
import { repos } from "../../data/repos";
import { team } from "../../data/team";
import { RepoCard } from "./RepoCard";
import { useLang } from "../../context/LangContext";
import { COMPANY_LINKS } from "../../context/ViewContext";

type Filter = "all" | "Forumbit" | "freesorgo" | "ookami-kb";
type Sort = "stars" | "updated" | "name";

export function TeamRepositories() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("stars");
  const [showOnlyPinned, setShowOnlyPinned] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...repos];
    if (filter !== "all") list = list.filter((r) => r.owner === filter);
    if (showOnlyPinned) list = list.filter((r) => r.isPinned);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description[lang].toLowerCase().includes(q) ||
          r.topics.some((t) => t.includes(q))
      );
    }
    if (sort === "stars") list.sort((a, b) => b.stars - a.stars);
    if (sort === "name")  list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "updated") {
      // простая сортировка по строкам — pinned topics first
      list.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    }
    return list;
  }, [filter, showOnlyPinned, query, sort, lang]);

  // Aggregate stats
  const totalStars = repos.reduce((s, r) => s + r.stars, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks, 0);
  const totalPRs = repos.reduce((s, r) => s + (r.pulls || 0), 0);

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#58a6ff1f] via-transparent to-[#a371f71f]" />

      <div className="relative">
        {/* Header */}
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#58a6ff]">
              <span>📦</span> {lang === "ru" ? "Репозитории команды" : "Team repositories"}
            </div>
            <h2 className="text-2xl font-semibold text-[#e6edf3] sm:text-3xl">
              {lang === "ru" ? "Открытый код Car Blanche" : "Open code of Car Blanche"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#8b949e]">
              {lang === "ru"
                ? "Всё, что команда выкладывает в open-source: SDK, расширения Yii2, дизайн-система, дорожные карты."
                : "Everything the team open-sources: SDKs, Yii2 extensions, design system, roadmaps."}
            </p>
          </div>

          <a
            href={COMPANY_LINKS.github}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-[#238636] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2ea043]"
          >
            🐙 github.com/car-blanche
          </a>
        </div>

        {/* Aggregate stats */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat icon="📦" value={repos.length}                    label={lang === "ru" ? "репозиториев" : "repositories"} color="#58a6ff" />
          <Stat icon="⭐" value={`${(totalStars / 1000).toFixed(1)}k`} label={lang === "ru" ? "звёзд всего" : "total stars"}       color="#e3b341" />
          <Stat icon="🔀" value={totalForks}                       label={lang === "ru" ? "форков" : "forks"}                  color="#a371f7" />
          <Stat icon="🔄" value={totalPRs}                         label={lang === "ru" ? "открытых PR" : "open PRs"}          color="#3fb950" />
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] p-2">
          {/* Search */}
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

          {/* Pinned filter */}
          <button
            onClick={() => setShowOnlyPinned(!showOnlyPinned)}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition ${
              showOnlyPinned
                ? "border-[#e3b34166] bg-[#e3b34122] text-[#e3b341]"
                : "border-[#30363d] bg-[#0d1117] text-[#c9d1d9] hover:border-[#58a6ff66]"
            }`}
          >
            📌 {lang === "ru" ? "Только pinned" : "Pinned only"}
          </button>

          {/* Sort */}
          <div className="flex items-center gap-1 rounded-md border border-[#30363d] bg-[#0d1117] px-1.5 py-1 text-xs">
            <span className="text-[#8b949e]">{lang === "ru" ? "Сорт:" : "Sort:"}</span>
            {(["stars", "updated", "name"] as Sort[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`rounded px-1.5 py-0.5 transition ${
                  sort === s ? "bg-[#1f6feb33] text-[#58a6ff]" : "text-[#c9d1d9] hover:bg-[#21262d]"
                }`}
              >
                {s === "stars" ? "⭐" : s === "updated" ? "🕐" : "🔤"} {s}
              </button>
            ))}
          </div>
        </div>

        {/* Owner pills */}
        <div className="mb-4 flex flex-wrap gap-2">
          <OwnerPill active={filter === "all"} onClick={() => setFilter("all")} count={repos.length}>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#30363d] text-[10px]">
              👥
            </span>
            {lang === "ru" ? "Все" : "All"}
          </OwnerPill>

          {team.map((m) => {
            const count = repos.filter((r) => r.owner === m.username).length;
            return (
              <OwnerPill
                key={m.username}
                active={filter === m.username}
                onClick={() => setFilter(m.username as Filter)}
                count={count}
                color={m.color}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}aa)` }}
                >
                  {m.initials}
                </span>
                @{m.username}
              </OwnerPill>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-8 text-center">
            <div className="text-3xl">🔍</div>
            <p className="mt-2 text-sm text-[#8b949e]">
              {lang === "ru" ? "Репозитории не найдены" : "No repositories found"}
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((r) => (
              <RepoCard key={r.name} repo={r} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-[#8b949e]">
          {lang === "ru"
            ? `Показано ${filtered.length} из ${repos.length} репозиториев`
            : `Showing ${filtered.length} of ${repos.length} repositories`}
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label, color }: { icon: string; value: string | number; label: string; color: string }) {
  return (
    <div className="rounded-md border border-[#30363d] bg-[#161b22] p-3">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="font-mono text-xl font-bold" style={{ color }}>{value}</span>
      </div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-[#8b949e]">{label}</div>
    </div>
  );
}

function OwnerPill({
  active, onClick, count, color = "#8b949e", children,
}: {
  active: boolean; onClick: () => void; count: number; color?: string; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition ${
        active ? "border-transparent" : "border-[#30363d] hover:border-[#58a6ff66]"
      }`}
      style={active ? { background: color + "22", color, borderColor: color + "66" } : { color: "var(--c-fg)" }}
    >
      {children}
      <span className="font-mono text-[10px] opacity-70">{count}</span>
    </button>
  );
}
