import { issues } from "../../data/github";
import { ViewHero } from "../gh/ViewHero";
import { CollapseSection, CollapsePreview } from "../gh/CollapseSection";
import { IssuesPanel } from "../gh/IssuesPanel";
import { useLang } from "../../context/LangContext";

export function IssuesView() {
  const { lang } = useLang();

  const counts = {
    total: issues.length,
    open: issues.filter((i) => i.status === "open").length,
    inProgress: issues.filter((i) => i.status === "in-progress").length,
    risks: issues.filter((i) => i.type === "risk").length,
    decisions: issues.filter((i) => i.type === "decision").length,
  };

  // Featured: in-progress задачи — это то, что улучшается прямо сейчас
  const featured = issues.filter((i) => i.status === "in-progress").slice(0, 3);

  return (
    <section className="space-y-6">
      {/* HERO */}
      <ViewHero
        icon="🐛"
        kicker={{ ru: "Issues", en: "Issues" }}
        kickerColor="#3fb950"
        gradientFrom="#3fb950"
        gradientTo="#d29922"
        title={{
          ru: "Что мы улучшаем по запросу клиентов",
          en: "What we improve based on client requests",
        }}
        subtitle={{
          ru: "Открытые решения, риски и обсуждения. Прозрачность процесса — каждое улучшение видно публично с обоснованием.",
          en: "Open decisions, risks, and discussions. Process transparency — each improvement is publicly visible with rationale.",
        }}
        audiences={["clients", "investors", "developers"]}
        stats={[
          { value: counts.total.toString(),      label: { ru: "Всего задач", en: "Total" },       color: "#58a6ff" },
          { value: counts.inProgress.toString(), label: { ru: "В работе",     en: "In progress" }, color: "#d29922" },
          { value: counts.open.toString(),       label: { ru: "Открыто",      en: "Open" },        color: "#3fb950" },
          { value: counts.risks.toString(),      label: { ru: "Рисков",       en: "Risks" },       color: "#f85149" },
        ]}
      />

      {/* CLIENT OVERVIEW — в работе прямо сейчас */}
      <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#d2992211] via-transparent to-[#58a6ff11]" />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h2 className="text-lg font-semibold text-[#e6edf3]">
              {lang === "ru" ? "В работе прямо сейчас" : "In progress right now"}
            </h2>
          </div>
          <p className="mb-4 text-sm text-[#8b949e]">
            {lang === "ru"
              ? "Конкретные задачи и улучшения, над которыми команда работает в эту минуту."
              : "Concrete tasks and improvements the team is working on right now."}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {featured.map((iss) => (
              <article
                key={iss.id}
                className="rounded-md border border-[#d2992266] bg-[#d2992211] p-3"
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#d29922]">
                    🔄 in progress · #{iss.id}
                  </span>
                  <span className="text-[10px] text-[#8b949e]">{iss.updated.slice(0, 20)}</span>
                </div>
                <div className="text-sm font-semibold text-[#e6edf3] line-clamp-2">
                  {iss.title}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {iss.labels.slice(0, 2).map((l) => (
                    <span
                      key={l.name}
                      className="rounded-full px-1.5 py-0 text-[9px] font-semibold uppercase"
                      style={{ background: l.color + "22", color: l.color }}
                    >
                      {l.name}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Decision/risk callout */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-[#a371f766] bg-[#a371f711] p-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">💡</span>
                <div className="text-sm font-semibold text-[#a371f7]">
                  {counts.decisions} {lang === "ru" ? "открытых решений" : "open decisions"}
                </div>
              </div>
              <p className="mt-1 text-xs text-[#8b949e]">
                {lang === "ru"
                  ? "Архитектурные и продуктовые решения, которые команда принимает публично."
                  : "Architecture and product decisions made publicly."}
              </p>
            </div>
            <div className="rounded-md border border-[#f8514966] bg-[#f8514911] p-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                <div className="text-sm font-semibold text-[#f85149]">
                  {counts.risks} {lang === "ru" ? "идентифицированных рисков" : "identified risks"}
                </div>
              </div>
              <p className="mt-1 text-xs text-[#8b949e]">
                {lang === "ru"
                  ? "Команда отслеживает риски и работает над их снижением."
                  : "Team tracks risks and works on mitigation."}
              </p>
            </div>
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
          ru: "Полный список Issues",
          en: "Full Issues list",
        }}
        subtitle={{
          ru: "Технический вид: фильтры, лейблы, milestones, привязка к авторам.",
          en: "Technical view: filters, labels, milestones, author binding.",
        }}
        preview={
          <CollapsePreview
            items={[
              { value: counts.open.toString(),       label: "open",     color: "#3fb950" },
              { value: counts.inProgress.toString(), label: "progress", color: "#d29922" },
            ]}
          />
        }
      >
        <IssuesPanel />
      </CollapseSection>
    </section>
  );
}
