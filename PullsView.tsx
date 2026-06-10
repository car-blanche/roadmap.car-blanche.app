import { useState } from "react";
import { pulls, type PullRequest } from "../../data/extra";
import { ViewHero } from "../gh/ViewHero";
import { CollapseSection, CollapsePreview } from "../gh/CollapseSection";
import { useLang } from "../../context/LangContext";
import { COMPANY_LINKS } from "../../context/ViewContext";

const statusFilters = [
  { key: "all", label: { ru: "Все", en: "All" } },
  { key: "open", label: { ru: "Open", en: "Open" } },
  { key: "review", label: { ru: "В ревью", en: "In review" } },
  { key: "draft", label: { ru: "Draft", en: "Draft" } },
  { key: "merged", label: { ru: "Merged", en: "Merged" } },
] as const;

type Filter = typeof statusFilters[number]["key"];

export function PullsView() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  const list = pulls.filter((p) => (filter === "all" ? true : p.status === filter));

  const counts = {
    total: pulls.length,
    open: pulls.filter((p) => p.status === "open" || p.status === "review" || p.status === "draft").length,
    merged: pulls.filter((p) => p.status === "merged").length,
    review: pulls.filter((p) => p.status === "review").length,
  };

  // Recently merged for client overview
  const merged = pulls.filter((p) => p.status === "merged").slice(0, 3);

  return (
    <section className="space-y-6">
      {/* HERO — for everyone */}
      <ViewHero
        icon="🔀"
        kicker={{ ru: "Pull requests", en: "Pull requests" }}
        kickerColor="#3fb950"
        gradientFrom="#3fb950"
        gradientTo="#58a6ff"
        title={{
          ru: "Что мы выкатываем в продукт",
          en: "What we ship to production",
        }}
        subtitle={{
          ru: "Каждый Pull Request — это конкретное улучшение Car Blanche, прошедшее ревью команды. Открытость процесса — для клиентов, инвесторов и разработчиков.",
          en: "Each Pull Request is a concrete improvement to Car Blanche, reviewed by the team. Process openness — for clients, investors, and developers.",
        }}
        audiences={["clients", "investors", "developers"]}
        stats={[
          { value: counts.total.toString(), label: { ru: "PR всего",  en: "Total PRs" },    color: "#58a6ff" },
          { value: counts.open.toString(),  label: { ru: "Открыто",   en: "Open" },         color: "#3fb950" },
          { value: counts.review.toString(),label: { ru: "На ревью",  en: "In review" },    color: "#d29922" },
          { value: counts.merged.toString(),label: { ru: "Замержено", en: "Merged" },       color: "#a371f7" },
        ]}
      />

      {/* CLIENT OVERVIEW — recently shipped */}
      <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#a371f71f] via-transparent to-[#3fb9501f]" />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <h2 className="text-lg font-semibold text-[#e6edf3]">
              {lang === "ru" ? "Что недавно поставили клиентам" : "Recently shipped to clients"}
            </h2>
          </div>
          <p className="mb-4 text-sm text-[#8b949e]">
            {lang === "ru"
              ? "Последние мерж-релизы — конкретные улучшения, которые уже работают в приложении."
              : "Latest merged releases — concrete improvements already live in the app."}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {merged.map((pr) => (
              <article
                key={pr.id}
                className="rounded-md border border-[#a371f766] bg-[#a371f711] p-3"
              >
                <div className="mb-1 flex items-center gap-1">
                  <span className="text-[#a371f7]">✓</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#a371f7]">
                    merged · #{pr.id}
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#e6edf3] line-clamp-2">
                  {pr.title}
                </div>
                <div className="mt-1 text-[11px] text-[#8b949e]">
                  @{pr.author} · {pr.updated}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPER DETAIL — collapsed by default */}
      <CollapseSection
        icon="⚙️"
        iconBg="#58a6ff33"
        badge="For developers"
        badgeColor="#58a6ff"
        title={{
          ru: "Детальный список Pull Requests",
          en: "Detailed Pull Requests list",
        }}
        subtitle={{
          ru: "Технический вид: статусы, ревью, CI-проверки, ветки.",
          en: "Technical view: statuses, reviews, CI checks, branches.",
        }}
        preview={
          <CollapsePreview
            items={[
              { value: counts.open.toString(),   label: "open",   color: "#3fb950" },
              { value: counts.merged.toString(), label: "merged", color: "#a371f7" },
            ]}
          />
        }
      >
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {statusFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    filter === f.key
                      ? "bg-[#388bfd1a] text-[#2f81f7]"
                      : "border border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d]"
                  }`}
                >
                  {f.label[lang]}
                </button>
              ))}
            </div>
            <button className="ml-auto rounded-md bg-[#238636] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2ea043]">
              {lang === "ru" ? "Новый PR" : "New PR"}
            </button>
          </div>

          <ul className="space-y-2">
            {list.map((pr) => <PRRow key={pr.id} pr={pr} />)}
          </ul>
        </div>
      </CollapseSection>
    </section>
  );
}

function PRRow({ pr }: { pr: PullRequest }) {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  const statusColor = {
    open:   "#3fb950",
    review: "#d29922",
    draft:  "#8b949e",
    merged: "#a371f7",
  }[pr.status];

  return (
    <li className="overflow-hidden rounded-md border border-[#30363d] bg-[#161b22]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-[#1f6feb0d]"
      >
        <span
          className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{ background: statusColor }}
        >
          {pr.status === "merged" ? "✓" : "·"}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[#e6edf3]">{pr.title}</span>
            {pr.labels.map((l) => (
              <span
                key={l.name}
                className="rounded-full border px-1.5 py-0 text-[10px] font-medium"
                style={{ borderColor: l.color + "66", background: l.color + "1a", color: l.color }}
              >
                {l.name}
              </span>
            ))}
          </div>
          <div className="mt-0.5 truncate text-xs text-[#8b949e]">
            #{pr.id} · {pr.status} · @{pr.author} · {pr.updated}{" "}
            · <span className="gh-code">{pr.branchFrom}</span> → <span className="gh-code">{pr.branchTo}</span>
          </div>
        </div>
        <div className="hidden shrink-0 items-center gap-2 text-xs text-[#8b949e] sm:flex">
          {pr.checks.failed === 0 && pr.checks.passed > 0 ? (
            <span className="text-[#3fb950]">✓ {pr.checks.passed}</span>
          ) : pr.checks.failed > 0 ? (
            <span className="text-[#f85149]">✗ {pr.checks.failed}</span>
          ) : null}
          <span>💬 {pr.comments}</span>
        </div>
      </button>

      {open && (
        <div className="border-t border-[#30363d] bg-[#0d1117] px-4 py-4">
          <p className="text-sm leading-6 text-[#c9d1d9]">{pr.description}</p>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-[#30363d] pt-3">
            <button className="rounded-md bg-[#238636] px-3 py-1 text-xs font-semibold text-white hover:bg-[#2ea043]">
              {lang === "ru" ? "Squash and merge" : "Squash and merge"}
            </button>
            <a
              href={COMPANY_LINKS.github}
              target="_blank" rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]"
            >
              🐙 Open on GitHub
            </a>
          </div>
        </div>
      )}
    </li>
  );
}
