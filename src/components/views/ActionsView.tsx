import { workflows } from "../../data/extra";
import { ViewHero } from "../gh/ViewHero";
import { CollapseSection, CollapsePreview } from "../gh/CollapseSection";
import { useLang } from "../../context/LangContext";

const statusColor = {
  success: "#3fb950",
  running: "#58a6ff",
  failed:  "#f85149",
  queued:  "#8b949e",
};

const statusIcon = (s: keyof typeof statusColor) => {
  if (s === "running") {
    return (
      <span className="relative flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#58a6ff] opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-[#58a6ff]" />
      </span>
    );
  }
  if (s === "queued") {
    return <span className="block h-4 w-4 rounded-full border-2 border-dashed border-[#8b949e]" />;
  }
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill={statusColor[s]}>
      {s === "success" ? (
        <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm3.78-9.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018L6.75 9.19 5.28 7.72a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l2 2a.75.75 0 0 0 1.06 0Z" />
      ) : (
        <path d="M2.343 13.657A8 8 0 1 1 13.658 2.343 8 8 0 0 1 2.343 13.657Z" />
      )}
    </svg>
  );
};

export function ActionsView() {
  const { lang } = useLang();

  const stats = {
    total:   workflows.length,
    success: workflows.filter((w) => w.status === "success").length,
    running: workflows.filter((w) => w.status === "running").length,
    failed:  workflows.filter((w) => w.status === "failed").length,
  };

  const uptime = ((stats.success / stats.total) * 100).toFixed(1);
  const successRuns = workflows.filter((w) => w.status === "success").slice(0, 3);

  return (
    <section className="space-y-6">
      {/* HERO */}
      <ViewHero
        icon="⚡"
        kicker={{ ru: "Actions", en: "Actions" }}
        kickerColor="#2f81f7"
        gradientFrom="#2f81f7"
        gradientTo="#3fb950"
        title={{
          ru: "Что работает за кулисами Car Blanche",
          en: "What runs behind the scenes at Car Blanche",
        }}
        subtitle={{
          ru: "Автоматизация: каждый коммит проходит тесты, сборку и проверки качества. Это то, что обеспечивает стабильность сервиса для клиента.",
          en: "Automation: every commit goes through tests, build, and quality checks. This is what ensures service stability for the client.",
        }}
        audiences={["clients", "investors", "developers"]}
        stats={[
          { value: `${uptime}%`,             label: { ru: "Успешных запусков", en: "Success rate" }, color: "#3fb950" },
          { value: stats.total.toString(),   label: { ru: "Workflows",         en: "Workflows" },     color: "#58a6ff" },
          { value: stats.running.toString(), label: { ru: "Запущено сейчас",   en: "Running now" },   color: "#58a6ff" },
          { value: stats.failed.toString(),  label: { ru: "Требует внимания", en: "Need attention" }, color: stats.failed > 0 ? "#f85149" : "#3fb950" },
        ]}
      />

      {/* CLIENT OVERVIEW — что недавно прошло без сбоев */}
      <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3fb95011] via-transparent to-[#58a6ff11]" />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">✅</span>
            <h2 className="text-lg font-semibold text-[#e6edf3]">
              {lang === "ru" ? "Последние успешные проверки" : "Latest successful runs"}
            </h2>
          </div>
          <p className="mb-4 text-sm text-[#8b949e]">
            {lang === "ru"
              ? "Каждый код, попавший в приложение, проходит через эти проверки автоматически."
              : "Every piece of code shipped to the app passes these checks automatically."}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {successRuns.map((w, i) => (
              <article
                key={i}
                className="rounded-md border border-[#3fb95066] bg-[#3fb95011] p-3"
              >
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="text-[#3fb950]">✓</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#3fb950]">
                    {w.status} · {w.duration}
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#e6edf3] line-clamp-2">
                  {w.name}
                </div>
                <div className="mt-1 text-[11px] text-[#8b949e]">
                  @{w.author} · {w.triggered}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPER DETAIL */}
      <CollapseSection
        icon="⚙️"
        iconBg="#58a6ff33"
        badge="For developers"
        badgeColor="#58a6ff"
        title={{
          ru: "Все workflow runs",
          en: "All workflow runs",
        }}
        subtitle={{
          ru: "Полный технический список: CI, E2E, security scans, deploys, ML pipelines.",
          en: "Full technical list: CI, E2E, security scans, deploys, ML pipelines.",
        }}
        preview={
          <CollapsePreview
            items={[
              { value: stats.success.toString(), label: "success", color: "#3fb950" },
              { value: stats.running.toString(), label: "running", color: "#58a6ff" },
            ]}
          />
        }
      >
        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          {/* Workflows list */}
          <aside>
            <div className="overflow-hidden rounded-md border border-[#30363d]">
              <div className="border-b border-[#30363d] bg-[#161b22] px-3 py-2 text-sm font-semibold text-[#e6edf3]">
                Workflows
              </div>
              <ul className="divide-y divide-[#21262d] text-sm">
                <li className="bg-[#1f6feb1f] px-3 py-2 font-semibold text-[#e6edf3]">All workflows</li>
                {Array.from(new Set(workflows.map((w) => w.name))).map((n) => (
                  <li key={n} className="px-3 py-2 text-[#c9d1d9] hover:bg-[#1f6feb1f]">
                    <div className="truncate">{n}</div>
                    <div className="truncate font-mono text-[10px] text-[#8b949e]">
                      {workflows.find((w) => w.name === n)?.file}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Runs */}
          <div className="overflow-hidden rounded-md border border-[#30363d]">
            <div className="flex items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4 py-3">
              <span className="text-sm font-semibold text-[#e6edf3]">
                {workflows.length} workflow runs
              </span>
              <div className="flex gap-2 text-xs">
                <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2 py-1 text-[#e6edf3] hover:bg-[#30363d]">Event ▾</button>
                <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2 py-1 text-[#e6edf3] hover:bg-[#30363d]">Status ▾</button>
              </div>
            </div>
            <ul className="divide-y divide-[#21262d]">
              {workflows.map((w, i) => (
                <li key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-[#1f6feb0d]">
                  <span className="mt-1 shrink-0">{statusIcon(w.status)}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-sm font-semibold text-[#e6edf3]">{w.commitMessage}</span>
                    </div>
                    <div className="mt-0.5 truncate text-xs text-[#8b949e]">
                      <span className="text-[#c9d1d9]">{w.name}</span> #{1480 - i} · {w.author} ·{" "}
                      <span className="gh-code">{w.branch}</span> · {w.triggered}
                    </div>
                  </div>
                  <div className="hidden shrink-0 text-xs text-[#8b949e] sm:block">{w.duration}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CollapseSection>
    </section>
  );
}
