import { type ReactNode } from "react";
import { useLang } from "../../context/LangContext";

export type Audience = "clients" | "investors" | "developers" | "partners" | "press";

export const AUDIENCE_META: Record<Audience, { ru: string; en: string; icon: string; color: string }> = {
  clients:    { ru: "Клиентам",     en: "Clients",    icon: "👥", color: "#3fb950" },
  investors:  { ru: "Инвесторам",   en: "Investors",  icon: "📊", color: "#e3b341" },
  developers: { ru: "Разработчикам", en: "Developers", icon: "⚙️", color: "#58a6ff" },
  partners:   { ru: "Партнёрам",    en: "Partners",   icon: "🤝", color: "#a371f7" },
  press:      { ru: "Прессе",       en: "Press",      icon: "📰", color: "#f0883e" },
};

type Props = {
  icon: string;
  kicker: { ru: string; en: string };
  kickerColor?: string;
  title: { ru: string; en: string };
  subtitle: { ru: string; en: string };
  audiences?: Audience[];
  stats?: { value: string; label: { ru: string; en: string }; color: string }[];
  actions?: ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
};

export function ViewHero({
  icon,
  kicker,
  kickerColor = "#58a6ff",
  title,
  subtitle,
  audiences,
  stats,
  actions,
  gradientFrom = "#58a6ff",
  gradientTo = "#a371f7",
}: Props) {
  const { lang } = useLang();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-10">
      {/* Backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}1f 0%, transparent 50%, ${gradientTo}1f 100%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: gradientFrom }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-1/4 h-56 w-56 rounded-full opacity-15 blur-3xl"
        style={{ background: gradientTo }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative">
        {/* Kicker */}
        <div
          className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
          style={{
            borderColor: kickerColor + "55",
            background: kickerColor + "11",
            color: kickerColor,
          }}
        >
          <span className="text-base">{icon}</span>
          {kicker[lang]}
        </div>

        {/* Title */}
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[#e6edf3] sm:text-5xl">
          {title[lang]}
        </h1>

        {/* Subtitle */}
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#c9d1d9] sm:text-lg">
          {subtitle[lang]}
        </p>

        {/* Audiences */}
        {audiences && audiences.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
              {lang === "ru" ? "Для кого" : "For whom"}:
            </span>
            {audiences.map((a) => {
              const m = AUDIENCE_META[a];
              return (
                <span
                  key={a}
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
                  style={{
                    borderColor: m.color + "55",
                    background: m.color + "11",
                    color: m.color,
                  }}
                >
                  <span>{m.icon}</span>
                  {m[lang]}
                </span>
              );
            })}
          </div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-md border border-[#30363d] bg-[#0d1117]/60 px-3 py-2 backdrop-blur"
              >
                <div className="font-mono text-2xl font-bold" style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#8b949e]">
                  {s.label[lang]}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {actions && <div className="mt-6 flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}
