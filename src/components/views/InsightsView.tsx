import { insightStats, commitActivity } from "../../data/extra";
import { contributors, languages } from "../../data/github";
import { githubUser } from "../../context/ViewContext";
import { ViewHero } from "../gh/ViewHero";
import { CollapseSection, CollapsePreview } from "../gh/CollapseSection";
import { useLang } from "../../context/LangContext";

export function InsightsView() {
  const { lang } = useLang();
  const max = Math.max(...commitActivity);

  return (
    <section className="space-y-6">
      {/* HERO */}
      <ViewHero
        icon="📊"
        kicker={{ ru: "Insights", en: "Insights" }}
        kickerColor="#a371f7"
        gradientFrom="#a371f7"
        gradientTo="#58a6ff"
        title={{
          ru: "Метрики команды и продукта — открыто",
          en: "Team and product metrics — open",
        }}
        subtitle={{
          ru: "Скорость доставки, качество ревью, активность контрибьюторов. Прозрачность работы — для инвесторов, партнёров и клиентов.",
          en: "Delivery speed, review quality, contributor activity. Work transparency — for investors, partners, and clients.",
        }}
        audiences={["clients", "investors", "developers", "partners"]}
        stats={insightStats.slice(0, 4).map((s) => ({
          value: s.value,
          label: { ru: s.label, en: s.label },
          color: s.positive ? "#3fb950" : "#f85149",
        }))}
      />

      {/* CLIENT OVERVIEW — главные числа */}
      <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#a371f711] via-transparent to-[#58a6ff11]" />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <h2 className="text-lg font-semibold text-[#e6edf3]">
              {lang === "ru" ? "Ключевые показатели команды" : "Key team indicators"}
            </h2>
          </div>
          <p className="mb-4 text-sm text-[#8b949e]">
            {lang === "ru"
              ? "Всё, что важно знать о темпе работы и качестве кода."
              : "Everything important about work pace and code quality."}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {insightStats.map((s) => (
              <div
                key={s.label}
                className="rounded-md border border-[#30363d] bg-[#161b22] p-4 transition hover:border-[#58a6ff66]"
              >
                <div className="text-xs text-[#8b949e]">{s.label}</div>
                <div className="mt-1 font-mono text-2xl font-semibold text-[#e6edf3]">{s.value}</div>
                <div className={`mt-0.5 text-xs ${s.positive ? "text-[#3fb950]" : "text-[#f85149]"}`}>
                  {s.positive ? "↑" : "↓"} {s.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Activity chart */}
          <div className="mt-4 overflow-hidden rounded-md border border-[#30363d] bg-[#161b22]">
            <div className="border-b border-[#30363d] px-4 py-3">
              <h3 className="text-sm font-semibold text-[#e6edf3]">
                {lang === "ru" ? "Коммиты за 12 недель" : "Commits per week · last 12 weeks"}
              </h3>
            </div>
            <div className="p-6">
              <div className="flex h-40 items-end justify-between gap-2">
                {commitActivity.map((v, i) => (
                  <div key={i} className="group relative flex flex-1 flex-col items-center gap-2">
                    <span className="text-[10px] font-mono text-[#8b949e] opacity-0 group-hover:opacity-100">{v}</span>
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-[#a371f7] to-[#58a6ff] transition hover:opacity-80"
                      style={{ height: `${(v / max) * 100}%` }}
                    />
                    <span className="text-[10px] text-[#8b949e]">W{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEVELOPER DETAIL */}
      <CollapseSection
        icon="⚙️"
        iconBg="#a371f733"
        badge="For developers"
        badgeColor="#a371f7"
        title={{
          ru: "Контрибьюторы, языки и pulse-метрики",
          en: "Contributors, languages, and pulse metrics",
        }}
        subtitle={{
          ru: "Топ-разработчики, распределение работы по трекам, активность за 30 дней.",
          en: "Top developers, work distribution by track, 30-day activity.",
        }}
        preview={
          <CollapsePreview
            items={[
              { value: contributors.length.toString(), label: "people", color: "#a371f7" },
              { value: languages.length.toString(),    label: "stacks", color: "#3fb950" },
            ]}
          />
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Contributors */}
            <div className="overflow-hidden rounded-md border border-[#30363d]">
              <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
                <h3 className="text-sm font-semibold text-[#e6edf3]">Top contributors</h3>
              </div>
              <ul className="divide-y divide-[#21262d]">
                {contributors.slice(0, 6).map((c, i) => {
                  const pct = 100 - i * 12;
                  return (
                    <li key={c.name} className="flex items-center gap-3 px-4 py-3 hover:bg-[#1f6feb0d]">
                      <a
                        href={githubUser(c.name)}
                        target="_blank" rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-semibold text-white transition hover:scale-110"
                        style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}aa)` }}
                        title="github.com/car-blanche"
                      >
                        {c.initials}
                      </a>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between">
                          <a
                            href={githubUser(c.name)}
                            target="_blank" rel="noopener noreferrer"
                            className="truncate text-sm font-semibold text-[#e6edf3] hover:text-[#2f81f7] hover:underline"
                          >
                            @{c.name}
                          </a>
                          <span className="font-mono text-xs text-[#8b949e]">{Math.round(pct * 1.8)} commits</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#21262d]">
                          <div className="h-full" style={{ width: `${pct}%`, background: c.color }} />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Languages */}
            <div className="overflow-hidden rounded-md border border-[#30363d]">
              <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
                <h3 className="text-sm font-semibold text-[#e6edf3]">
                  {lang === "ru" ? "Распределение работ по трекам" : "Work distribution"}
                </h3>
              </div>
              <div className="p-4">
                <div className="mb-3 flex h-3 w-full overflow-hidden rounded-full bg-[#21262d]">
                  {languages.map((l) => (
                    <div key={l.name} className="h-full" style={{ width: `${l.pct}%`, background: l.color }} />
                  ))}
                </div>
                <ul className="space-y-2">
                  {languages.map((l) => (
                    <li key={l.name} className="flex items-center gap-2 text-sm">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                      <span className="font-semibold text-[#e6edf3]">{l.name}</span>
                      <span className="ml-auto font-mono text-xs text-[#8b949e]">{l.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Pulse */}
          <div className="overflow-hidden rounded-md border border-[#30363d]">
            <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
              <h3 className="text-sm font-semibold text-[#e6edf3]">
                Pulse · {lang === "ru" ? "последние 30 дней" : "last 30 days"}
              </h3>
            </div>
            <div className="grid gap-px bg-[#30363d] sm:grid-cols-3">
              <PulseItem title="Pull requests"  main="48 merged" sub="14 open"  color="#a371f7" />
              <PulseItem title="Issues"          main="92 closed" sub="18 open"  color="#3fb950" />
              <PulseItem title="Active branches" main="11 active" sub="2 stale"  color="#58a6ff" />
            </div>
          </div>
        </div>
      </CollapseSection>
    </section>
  );
}

function PulseItem({ title, main, sub, color }: { title: string; main: string; sub: string; color: string }) {
  return (
    <div className="bg-[#0d1117] p-5">
      <div className="text-xs text-[#8b949e]">{title}</div>
      <div className="mt-1 font-mono text-xl font-semibold" style={{ color }}>{main}</div>
      <div className="mt-0.5 text-xs text-[#8b949e]">{sub}</div>
    </div>
  );
}
