import { team, achievements, tierColors } from "../../data/team";
import { COMPANY_LINKS, githubUser } from "../../context/ViewContext";
import { TeamRepositories } from "../gh/TeamRepositories";
import { GitHubProfileCard } from "../gh/GitHubProfileCard";

export function TeamView() {
  return (
    <div className="space-y-8">
      {/* HERO — намного красивее */}
      <div className="relative overflow-hidden rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-12">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#a371f722] via-transparent to-[#58a6ff22]" />
        <div className="pointer-events-none absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-[#a371f7] opacity-15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 h-56 w-56 rounded-full bg-[#3fb950] opacity-10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#a371f766] bg-[#a371f711] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#a371f7]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a371f7] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#a371f7]" />
            </span>
            👥 Team · Уфа · since 2018
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#e6edf3] sm:text-5xl">
            Знакомьтесь —
            <span className="block bg-gradient-to-r from-[#58a6ff] via-[#a371f7] to-[#f0883e] bg-clip-text text-transparent">
              команда, которая строит Car Blanche
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#c9d1d9]">
            Маленькая сильная команда из Уфы. С 2018 года строим премиум-сервис мобильного транспорта.
            Фронт на <span className="font-mono text-[#00B4AB]">Flutter</span>, бэк на{" "}
            <span className="font-mono text-[#4F5D95]">Yii2 / PHP</span>. К 2029 — выход в 8 стран.
          </p>

          {/* Big avatars row */}
          <div className="mt-8 flex flex-wrap items-end gap-6">
            {team.map((m) => (
              <a
                key={m.username}
                href={githubUser(m.username)}
                target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center"
                title={`${m.fullName} · github.com/car-blanche`}
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 -m-1 rounded-full opacity-0 blur-xl transition-opacity group-hover:opacity-60"
                    style={{ background: m.color }}
                  />
                  <div
                    className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#0d1117] text-lg font-bold text-white shadow-2xl transition-transform group-hover:scale-110 sm:h-24 sm:w-24 sm:text-xl"
                    style={{
                      background: `linear-gradient(135deg, ${m.color}, ${m.color}aa)`,
                      boxShadow: `0 8px 24px ${m.color}33`,
                    }}
                  >
                    {m.initials}
                  </div>
                  <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#0d1117] bg-[#3fb950]" />
                </div>

                <div className="mt-3 text-center">
                  <div className="text-sm font-semibold text-[#e6edf3]">{m.fullName}</div>
                  <div className="font-mono text-xs text-[#8b949e] group-hover:text-[#2f81f7] group-hover:underline">
                    @{m.username}
                  </div>
                  <div
                    className="mt-1 inline-block rounded-full border px-1.5 py-0 text-[9px] font-semibold uppercase"
                    style={{
                      borderColor: m.color + "66",
                      background: m.color + "22",
                      color: m.color,
                    }}
                  >
                    {m.badge}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-[#30363d] pt-6">
            <a
              href={COMPANY_LINKS.github}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#238636] to-[#2ea043] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#23863633]"
            >
              🐙 github.com/car-blanche
            </a>
            <a
              href={COMPANY_LINKS.email}
              className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-5 py-2.5 text-sm font-semibold text-[#e6edf3] hover:bg-[#30363d]"
            >
              ✉️ {COMPANY_LINKS.emailRaw}
            </a>
            <a
              href={COMPANY_LINKS.net}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-5 py-2.5 text-sm font-semibold text-[#e6edf3] hover:bg-[#30363d]"
            >
              🌐 car-blanche.net
            </a>
            <a
              href={COMPANY_LINKS.app}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-5 py-2.5 text-sm font-semibold text-[#e6edf3] hover:bg-[#30363d]"
            >
              📱 Open App
            </a>
          </div>
        </div>
      </div>

      {/* Team aggregate stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <StatBox label="Commits"       value={team.reduce((a, m) => a + m.stats.commits, 0).toLocaleString()} color="#58a6ff" icon="📝" />
        <StatBox label="Pull requests" value={team.reduce((a, m) => a + m.stats.prs, 0).toString()}            color="#3fb950" icon="🔀" />
        <StatBox label="Reviews"       value={team.reduce((a, m) => a + m.stats.reviews, 0).toString()}        color="#a371f7" icon="👁" />
        <StatBox label="Issues"        value={team.reduce((a, m) => a + m.stats.issues, 0).toString()}         color="#d29922" icon="🐛" />
        <StatBox label="Discussions"   value={team.reduce((a, m) => a + m.stats.discussions, 0).toString()}    color="#f0883e" icon="💬" />
      </div>

      {/* Team profiles · GitHub-style */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e6edf3]">
          👥 Профили команды
          <span className="ml-2 text-sm font-normal text-[#8b949e]">{team.length} участника</span>
        </h2>
        {team.map((m) => <GitHubProfileCard key={m.username} member={m} />)}
      </div>

      {/* Repositories — как на GitHub */}
      <TeamRepositories />

      {/* Achievements gallery (project-level, не GitHub) */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-[#e6edf3]">
          🏆 Project achievements
          <span className="ml-2 text-xs font-normal text-[#8b949e]">{achievements.length} разблокировано</span>
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {achievements.map((a) => (
            <div
              key={a.key}
              className="group relative overflow-hidden rounded-md border border-[#30363d] bg-[#161b22] p-3 transition hover:border-[#58a6ff66]"
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
                  style={{
                    background: tierColors[a.tier] + "22",
                    border: `2px solid ${tierColors[a.tier]}88`,
                  }}
                >
                  {a.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-[#e6edf3]">{a.name}</span>
                  </div>
                  <span
                    className="mt-0.5 inline-block rounded-full px-1.5 py-0 text-[9px] font-semibold uppercase"
                    style={{ background: tierColors[a.tier] + "22", color: tierColors[a.tier] }}
                  >
                    {a.tier}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#8b949e]">{a.desc}</p>
              <div className="mt-2 flex -space-x-1">
                {a.unlockedBy.map((u) => {
                  const m = team.find((t) => t.username === u);
                  if (!m) return null;
                  return (
                    <div
                      key={u}
                      className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#161b22] text-[8px] font-semibold text-white"
                      style={{ background: m.color }}
                      title={`${m.fullName} (@${u})`}
                    >
                      {m.initials}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join CTA */}
      <div className="overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] p-6 lg:p-8">
        <div className="grid gap-4 items-center lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-xl font-semibold text-[#e6edf3]">Хочешь в команду?</h2>
            <p className="mt-2 text-sm text-[#8b949e]">
              Мы ищем сильных Flutter / Backend инженеров и шофёров уровня премиум.
              Удалённая работа, прозрачная зарплата, опционы, обучение в Академии Car Blanche.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={COMPANY_LINKS.net} target="_blank" rel="noopener noreferrer"
               className="rounded-md bg-[#238636] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2ea043]">
              Открытые вакансии →
            </a>
            <a href="mailto:b2b.car.blanche@gmail.com"
               className="rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm text-[#e6edf3] hover:bg-[#30363d]">
              b2b.car.blanche@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color, icon }: { label: string; value: string; color: string; icon?: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] p-4 transition hover:border-[#58a6ff66]">
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-30"
        style={{ background: color }}
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          {icon && (
            <div
              className="flex h-8 w-8 items-center justify-center rounded-md text-base"
              style={{ background: color + "22", border: `1px solid ${color}55` }}
            >
              {icon}
            </div>
          )}
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">{label}</div>
        </div>
        <div className="mt-2 font-mono text-2xl font-bold" style={{ color }}>
          {value}
        </div>
      </div>
    </div>
  );
}
