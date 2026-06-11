import { type TeamMember } from "../../data/team";
import { useLang } from "../../context/LangContext";
import { COMPANY_LINKS, githubUser } from "../../context/ViewContext";

/* Цвета бейджа аккаунта */
const badgeColor: Record<TeamMember["badge"], string> = {
  Owner:        "#d29922",
  Maintainer:   "#3fb950",
  Collaborator: "#a371f7",
};

export function GitHubProfileCard({ member }: { member: TeamMember }) {
  const { lang } = useLang();
  const bColor = badgeColor[member.badge];

  return (
    <article className="overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117]">
      <div className="grid gap-0 lg:grid-cols-[280px_1fr]">

        {/* ===== LEFT — GitHub profile sidebar ===== */}
        <aside className="border-b border-[#30363d] p-5 lg:border-b-0 lg:border-r">
          {/* Avatar */}
          <a
            href={githubUser(member.username)}
            target="_blank" rel="noopener noreferrer"
            className="block"
            title={`github.com/${member.username}`}
          >
            <div
              className="relative mx-auto h-44 w-44 rounded-full border-4 border-[#0d1117] shadow-2xl transition-transform hover:scale-105 sm:h-52 sm:w-52"
              style={{
                background: `linear-gradient(135deg, ${member.color}, ${member.color}aa)`,
                boxShadow: `0 8px 24px ${member.color}44`,
              }}
            >
              <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-white">
                {member.initials}
              </div>
              {/* Online status */}
              <span className="absolute bottom-3 right-3 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#0d1117] bg-[#3fb950]" />
            </div>
          </a>

          {/* Name */}
          <div className="mt-4 text-center lg:text-left">
            <a
              href={githubUser(member.username)}
              target="_blank" rel="noopener noreferrer"
              className="block text-xl font-bold text-[#e6edf3] hover:text-[#2f81f7]"
            >
              {member.fullName}
            </a>
            <a
              href={githubUser(member.username)}
              target="_blank" rel="noopener noreferrer"
              className="inline-block text-base text-[#8b949e] hover:text-[#2f81f7]"
            >
              @{member.username}
            </a>
            <div className="mt-2">
              <span
                className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  borderColor: bColor + "66",
                  background: bColor + "22",
                  color: bColor,
                }}
              >
                {member.badge}
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-4 text-sm leading-5 text-[#c9d1d9]">{member.bio}</p>

          {/* Follow / Sponsor buttons */}
          <div className="mt-4 flex gap-2">
            <a
              href={githubUser(member.username)}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-center text-xs font-semibold text-[#e6edf3] hover:bg-[#30363d]"
            >
              Follow
            </a>
            <button
              className="rounded-md border border-[#db61a266] bg-[#db61a222] px-3 py-1.5 text-xs font-semibold text-[#db61a2] hover:bg-[#db61a233]"
              onClick={() => window.open(githubUser(member.username), "_blank")}
              title="Sponsor"
            >
              💖 Sponsor
            </button>
          </div>

          {/* GitHub stats */}
          <div className="mt-5 space-y-2 text-xs">
            {/* Followers / Following */}
            <a
              href={githubUser(member.username)}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#c9d1d9] hover:text-[#2f81f7]"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor">
                <path d="M5.5 3.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0ZM8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-1.224 8.815a4.5 4.5 0 0 0-3.943 4.279c-.018.345.257.656.616.656h9.102c.36 0 .634-.31.616-.656a4.5 4.5 0 0 0-3.943-4.28A4.969 4.969 0 0 1 8 10.5a4.969 4.969 0 0 1-1.224-.685Z" />
              </svg>
              <span><strong className="text-[#e6edf3]">{member.ghFollowers.toLocaleString("ru-RU")}</strong> followers</span>
              <span className="text-[#6e7681]">·</span>
              <span><strong className="text-[#e6edf3]">{member.ghFollowing}</strong> following</span>
            </a>

            {/* Location */}
            <div className="flex items-center gap-3 text-[#c9d1d9]">
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor">
                <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193ZM4.5 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" transform="translate(3 1)" />
              </svg>
              <span>{member.location}</span>
            </div>

            {/* Email */}
            <a
              href={COMPANY_LINKS.email}
              className="flex items-center gap-3 text-[#c9d1d9] hover:text-[#2f81f7]"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor">
                <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.249.25.249h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z" />
              </svg>
              <span className="truncate">{COMPANY_LINKS.emailRaw}</span>
            </a>

            {/* GitHub join date — REAL */}
            <div className="flex items-center gap-3 text-[#c9d1d9]">
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor">
                <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Z" />
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm.75 3.25v3.043l2.224 1.483-.832 1.248L7.25 8.75V4.75h1.5Z" fill="currentColor"/>
              </svg>
              <span>{member.ghJoined}</span>
            </div>
          </div>

          {/* Achievements */}
          {member.ghAchievements.length > 0 && (
            <div className="mt-5 border-t border-[#30363d] pt-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
                  🏆 Achievements
                </div>
                <span className="font-mono text-[10px] text-[#8b949e]">
                  {member.ghAchievements.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {member.ghAchievements.map((a) => (
                  <div
                    key={a.key}
                    title={`${a.name} — ${a.description}`}
                    className="group/ach relative flex h-12 w-12 items-center justify-center rounded-full border bg-[#161b22] text-2xl transition hover:scale-110"
                    style={{
                      borderColor:
                        a.tier === "gold"   ? "#eab30866" :
                        a.tier === "silver" ? "#a1a1aa66" :
                        a.tier === "bronze" ? "#a1620766" : "#30363d",
                      background:
                        a.tier === "gold"   ? "#eab30811" :
                        a.tier === "silver" ? "#a1a1aa11" :
                        a.tier === "bronze" ? "#a1620711" : "#161b22",
                    }}
                  >
                    {a.icon}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* ===== RIGHT — Contributions + activity ===== */}
        <div className="space-y-4 p-5">
          {/* Mini-stats grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <MiniStat icon="📂" value={member.ghPublicRepos.toString()} label="Public repos" color={member.color} />
            <MiniStat icon="📝" value={member.stats.commits.toLocaleString()} label="Commits" color="#58a6ff" />
            <MiniStat icon="🔀" value={member.stats.prs.toString()} label="Pull requests" color="#3fb950" />
            <MiniStat icon="👁" value={member.stats.reviews.toString()} label="Reviews" color="#a371f7" />
            <MiniStat icon="🐛" value={member.stats.issues.toString()} label="Issues" color="#d29922" />
            <MiniStat icon="💬" value={member.stats.discussions.toString()} label="Discussions" color="#f0883e" />
          </div>

          {/* Stack */}
          <div>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
              {lang === "ru" ? "Стек технологий" : "Tech stack"}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {member.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[#388bfd33] bg-[#388bfd1a] px-2.5 py-0.5 text-[11px] font-medium text-[#2f81f7]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Contribution graph (heatmap) */}
          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-3">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#e6edf3]">
                {member.heatmap.reduce((a, b) => a + b, 0)} {lang === "ru" ? "contributions за 4 месяца" : "contributions in the last 4 months"}
              </span>
              <div className="hidden items-center gap-1 text-[#8b949e] sm:flex">
                <span className="text-[10px]">Less</span>
                {[0, 1, 2, 3, 4].map((v) => (
                  <span key={v} className="h-2 w-2 rounded-sm" style={{ background: heatColor(v) }} />
                ))}
                <span className="text-[10px]">More</span>
              </div>
            </div>
            <div
              className="grid gap-[2px]"
              style={{
                gridTemplateColumns: `repeat(17, minmax(0, 1fr))`,
                gridAutoFlow: "column",
                gridTemplateRows: "repeat(7, minmax(0, 1fr))",
              }}
            >
              {member.heatmap.map((v, i) => (
                <div
                  key={i}
                  className="aspect-square w-full rounded-[2px]"
                  style={{ background: heatColor(v) }}
                  title={`${v} contributions`}
                />
              ))}
            </div>
          </div>

          {/* Achievement details (text list) */}
          {member.ghAchievements.length > 0 && (
            <div className="rounded-md border border-[#30363d] bg-[#161b22] p-3">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
                🏆 {lang === "ru" ? "GitHub achievements · детали" : "GitHub achievements · details"}
              </div>
              <ul className="space-y-1.5">
                {member.ghAchievements.map((a) => (
                  <li key={a.key} className="flex items-start gap-2 text-xs">
                    <span className="text-base leading-none">{a.icon}</span>
                    <div>
                      <span className="font-semibold text-[#e6edf3]">{a.name}</span>
                      {a.tier && a.tier !== "default" && (
                        <span
                          className="ml-1.5 rounded-full px-1.5 py-0 text-[9px] font-semibold uppercase"
                          style={{
                            background:
                              a.tier === "gold"   ? "#eab30822" :
                              a.tier === "silver" ? "#a1a1aa22" : "#a1620722",
                            color:
                              a.tier === "gold"   ? "#eab308" :
                              a.tier === "silver" ? "#a1a1aa" : "#a16207",
                          }}
                        >
                          {a.tier}
                        </span>
                      )}
                      <div className="text-[#8b949e]">{a.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function MiniStat({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  return (
    <div className="rounded-md border border-[#30363d] bg-[#161b22] p-2.5">
      <div className="flex items-center gap-1.5">
        <span className="text-sm">{icon}</span>
        <span className="font-mono text-base font-bold" style={{ color }}>{value}</span>
      </div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-[#8b949e]">{label}</div>
    </div>
  );
}

function heatColor(v: number) {
  switch (v) {
    case 0: return "#161b22";
    case 1: return "#0e4429";
    case 2: return "#006d32";
    case 3: return "#26a641";
    case 4: return "#39d353";
    default: return "#161b22";
  }
}
