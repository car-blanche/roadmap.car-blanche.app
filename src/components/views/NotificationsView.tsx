import { useView } from "../../context/ViewContext";

const notifications = [
  {
    id: 1,
    type: "pr",
    repo: "mobile-tech-transport-personalization",
    title: "PR #248 готов к ревью · feat(app): единый интерфейс App 1.0",
    actor: "ivan.k",
    time: "5 минут назад",
    unread: true,
    target: "pulls" as const,
  },
  {
    id: 2,
    type: "issue",
    repo: "mobile-tech-transport-personalization",
    title: "RFC #254 · политика предиктивных сценариев требует обсуждения",
    actor: "privacy-officer",
    time: "1 час назад",
    unread: true,
    target: "issues" as const,
  },
  {
    id: 3,
    type: "action",
    repo: "mobile-tech-transport-personalization",
    title: "Workflow «E2E · сценарии бронирования» запущен",
    actor: "platform-bot",
    time: "3 часа назад",
    unread: true,
    target: "actions" as const,
  },
  {
    id: 4,
    type: "milestone",
    repo: "mobile-tech-transport-personalization",
    title: "Milestone «Q2 2026 · Релиз App 1.0» закрыт на 87%",
    actor: "product-lead",
    time: "вчера",
    unread: false,
    target: "projects" as const,
  },
  {
    id: 5,
    type: "release",
    repo: "mobile-tech-transport-personalization",
    title: "Релиз v0.9.0-rc.2 опубликован",
    actor: "platform-bot",
    time: "2 дня назад",
    unread: false,
    target: "code" as const,
  },
  {
    id: 6,
    type: "security",
    repo: "mobile-tech-transport-personalization",
    title: "Dependabot обновил 3 зависимости (security patches)",
    actor: "dependabot",
    time: "3 дня назад",
    unread: false,
    target: "security" as const,
  },
];

const typeIcon = (t: string) => {
  const cls = "h-4 w-4";
  switch (t) {
    case "pr":
      return <svg viewBox="0 0 16 16" className={`${cls} text-[#3fb950]`} fill="currentColor"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Z" /></svg>;
    case "issue":
      return <svg viewBox="0 0 16 16" className={`${cls} text-[#3fb950]`} fill="currentColor"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z" /></svg>;
    case "action":
      return <svg viewBox="0 0 16 16" className={`${cls} text-[#58a6ff]`} fill="currentColor"><path d="M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Z" /></svg>;
    case "milestone":
      return <svg viewBox="0 0 16 16" className={`${cls} text-[#a371f7]`} fill="currentColor"><path d="M7.75 0a.75.75 0 0 1 .75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 0 1 0 2.672l-2.07 1.75a1.75 1.75 0 0 1-1.13.414H8.5v5.25a.75.75 0 0 1-1.5 0V10H2.75A1.75 1.75 0 0 1 1 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 0 1 7.75 0Z" /></svg>;
    case "release":
      return <svg viewBox="0 0 16 16" className={`${cls} text-[#e3b341]`} fill="currentColor"><path d="M1 7.775V2.75A1.75 1.75 0 0 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Z" /></svg>;
    case "security":
      return <svg viewBox="0 0 16 16" className={`${cls} text-[#f85149]`} fill="currentColor"><path d="M7.467.133a1.748 1.748 0 0 1 1.066 0l5.25 1.68A1.75 1.75 0 0 1 15 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 0 1-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 0 1 1.217-1.667Z" /></svg>;
    default: return null;
  }
};

export function NotificationsView() {
  const { setView } = useView();
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-[#e6edf3]">
          🔔 Inbox
          <span className="rounded-full bg-[#1f6feb] px-2 py-0.5 text-xs font-mono text-white">{unread}</span>
        </h1>
        <p className="mt-1 text-sm text-[#8b949e]">Обновления по дорожной карте, ревью и релизам.</p>
      </div>

      <div className="overflow-hidden rounded-md border border-[#30363d]">
        <div className="flex flex-wrap items-center gap-3 border-b border-[#30363d] bg-[#161b22] px-4 py-3 text-sm">
          <button className="font-semibold text-[#e6edf3]">Inbox <span className="font-mono text-xs text-[#8b949e]">{notifications.length}</span></button>
          <button className="text-[#8b949e] hover:text-[#e6edf3]">Saved</button>
          <button className="text-[#8b949e] hover:text-[#e6edf3]">Done</button>
          <div className="ml-auto flex gap-2">
            <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">Mark all as read</button>
            <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">⚙ Filter</button>
          </div>
        </div>

        <ul className="divide-y divide-[#21262d]">
          {notifications.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => setView(n.target)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#1f6feb0d] ${
                  n.unread ? "bg-[#1f6feb08]" : ""
                }`}
              >
                {n.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-[#1f6feb]" />}
                {!n.unread && <span className="h-2 w-2 shrink-0" />}
                <span className="shrink-0">{typeIcon(n.type)}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-[#e6edf3]">{n.title}</div>
                  <div className="truncate text-xs text-[#8b949e]">
                    <span className="font-mono">car-blanche/{n.repo}</span> · {n.actor} · {n.time}
                  </div>
                </div>
                <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0 text-[#8b949e]" fill="currentColor"><path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" /></svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
