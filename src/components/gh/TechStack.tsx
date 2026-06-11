import { languages, contributors } from "../../data/github";

const backend = [
  {
    name: "Yii2 Framework",
    role: "Основной серверный фреймворк",
    desc: "MVC-архитектура, ActiveRecord, миграции, RBAC-роли для шофёров и клиентов. Все REST/GraphQL-эндпоинты бронирования.",
    color: "#0073BB",
    icon: "Y",
  },
  {
    name: "PHP 8.x",
    role: "Серверный язык",
    desc: "Бизнес-логика, биллинг, интеграции с платёжными провайдерами, обработка вебхуков партнёров.",
    color: "#4F5D95",
    icon: "🐘",
  },
];

const frontend = [
  {
    name: "Dart",
    role: "Язык клиентских приложений",
    desc: "Типобезопасный, асинхронный, sound null safety. Общий код для iOS / Android / Web.",
    color: "#00B4AB",
    icon: "🎯",
  },
  {
    name: "Flutter",
    role: "Кроссплатформенная разработка",
    desc: "Единая кодовая база для iOS, Android и Web. Material 3 + кастомная дизайн-система Car Blanche. Hot reload в проде через CodePush.",
    color: "#02569B",
    icon: "💙",
  },
];

const native = [
  { name: "MySQL",   desc: "Основная СУБД: профили, поездки, биллинг, история. Репликация master-slave.", color: "#00758F", icon: "🐬" },
  { name: "Redis",   desc: "Кеш сессий, очереди задач, real-time подписки на статус поездки.",            color: "#DC382D", icon: "⚡" },
  { name: "Docker",  desc: "Контейнеризация всех сервисов. Единая dev/prod-среда.",                       color: "#2496ED", icon: "🐳" },
  { name: "Nginx",   desc: "Reverse proxy, балансировка нагрузки, SSL-терминация, статика.",              color: "#009639", icon: "🌐" },
  { name: "Swift",   desc: "Нативные модули для iOS (Apple Pay, CallKit, Live Activities).",              color: "#F05138", icon: "🍎" },
  { name: "Kotlin",  desc: "Нативные модули для Android (Wear OS, Quick Settings).",                       color: "#A97BFF", icon: "🤖" },
];

export function TechStack() {
  return (
    <section id="tech-stack" className="scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[#e6edf3]">
            <svg viewBox="0 0 16 16" className="h-5 w-5 text-[#58a6ff]" fill="currentColor">
              <path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z" />
            </svg>
            Tech Stack
          </h2>
          <p className="mt-1 text-sm text-[#8b949e]">
            Технологии, на которых строится Car Blanche. Backend на <span className="gh-code">Yii2 / PHP</span>,
            кроссплатформенный клиент на <span className="gh-code">Dart / Flutter</span> с нативными модулями.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.slice(0, 4).map((l) => (
            <span
              key={l.name}
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs"
              style={{
                borderColor: l.color + "66",
                background: l.color + "1a",
                color: l.color,
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
              {l.name} · {l.pct}%
            </span>
          ))}
        </div>
      </div>

      {/* Two-column: Backend & Frontend */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* BACKEND */}
        <StackColumn
          title="Backend"
          subtitle="Серверная часть"
          tag="server"
          tagColor="#4F5D95"
          owner={contributors.find((c) => c.name === "freesorgo")}
          items={backend}
        />

        {/* FRONTEND */}
        <StackColumn
          title="Front · Mobile · Web"
          subtitle="Кроссплатформенный клиент"
          tag="client"
          tagColor="#02569B"
          owner={contributors.find((c) => c.name === "Forumbit")}
          items={frontend}
        />
      </div>

      {/* Native + tooling */}
      <div className="mt-4 overflow-hidden rounded-md border border-[#30363d]">
        <div className="flex items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4 py-3">
          <div>
            <div className="text-sm font-semibold text-[#e6edf3]">Infrastructure & native modules</div>
            <div className="text-xs text-[#8b949e]">
              MySQL · Redis · Docker · Nginx · Swift · Kotlin
            </div>
          </div>
          <span className="hidden font-mono text-xs text-[#8b949e] sm:block">
            {native.length} технологий
          </span>
        </div>
        <div className="grid divide-y divide-[#21262d] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
          {native.map((n, i) => (
            <div
              key={n.name}
              className={`flex items-start gap-3 p-4 hover:bg-[#1f6feb0d] ${
                i >= 2 ? "lg:border-t lg:border-[#21262d]" : ""
              }`}
            >
              <span
                className="mt-1 h-3 w-3 shrink-0 rounded-full"
                style={{ background: n.color, boxShadow: `0 0 8px ${n.color}88` }}
              />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#e6edf3]">{n.name}</div>
                <div className="mt-0.5 text-xs leading-5 text-[#8b949e]">{n.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Команда — компактные карточки */}
      <div className="mt-4 overflow-hidden rounded-md border border-[#30363d]">
        <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
          <div className="text-sm font-semibold text-[#e6edf3]">Команда стека</div>
          <div className="text-xs text-[#8b949e]">Кто отвечает за каждый слой технологий</div>
        </div>
        <ul className="divide-y divide-[#21262d]">
          {contributors.map((c) => (
            <li key={c.name} className="flex items-center gap-4 px-4 py-3 hover:bg-[#1f6feb0d]">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white shadow-sm"
                style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}aa)` }}
              >
                {c.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <a href="#" className="text-sm font-semibold text-[#e6edf3] hover:text-[#2f81f7] hover:underline">
                    {c.fullName}
                  </a>
                  <a href="#" className="text-xs text-[#8b949e] hover:text-[#2f81f7] hover:underline">
                    @{c.name}
                  </a>
                  <Badge label={c.badge} color={
                    c.badge === "Owner" ? "#d29922" :
                    c.badge === "Maintainer" ? "#3fb950" : "#a371f7"
                  } />
                </div>
                <div className="mt-0.5 text-xs text-[#c9d1d9]">{c.role}</div>
              </div>
              <div className="hidden gap-2 sm:flex">
                <button className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
                  Follow
                </button>
                <button className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
                  Message
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StackColumn({
  title,
  subtitle,
  tag,
  tagColor,
  owner,
  items,
}: {
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  owner?: { initials: string; fullName: string; name: string; color: string; role: string };
  items: { name: string; role: string; desc: string; color: string; icon: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-md border border-[#30363d]">
      <div className="flex items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#e6edf3]">{title}</span>
            <span
              className="rounded-full border px-2 py-0.5 text-[10px] font-medium"
              style={{ borderColor: tagColor + "66", background: tagColor + "1a", color: tagColor }}
            >
              {tag}
            </span>
          </div>
          <div className="text-xs text-[#8b949e]">{subtitle}</div>
        </div>
        {owner && (
          <div className="flex items-center gap-2" title={`${owner.fullName} · ${owner.role}`}>
            <div className="text-right">
              <div className="text-[11px] text-[#8b949e]">Maintainer</div>
              <div className="text-xs font-semibold text-[#e6edf3]">@{owner.name}</div>
            </div>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${owner.color}, ${owner.color}aa)` }}
            >
              {owner.initials}
            </div>
          </div>
        )}
      </div>
      <ul className="divide-y divide-[#21262d]">
        {items.map((it) => (
          <li key={it.name} className="px-4 py-4 hover:bg-[#1f6feb0d]">
            <div className="flex items-start gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base font-semibold"
                style={{
                  background: it.color + "1a",
                  border: `1px solid ${it.color}66`,
                  color: it.color,
                }}
              >
                {it.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-[#e6edf3]">{it.name}</span>
                  <span className="text-[11px] text-[#8b949e]">· {it.role}</span>
                </div>
                <p className="mt-1 text-xs leading-5 text-[#c9d1d9]">{it.desc}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="rounded-full border px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wider"
      style={{ borderColor: color + "66", background: color + "22", color }}
    >
      {label}
    </span>
  );
}
