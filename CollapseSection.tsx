import { useState, type ReactNode } from "react";
import { useLang } from "../../context/LangContext";

type Props = {
  icon: string;
  iconBg?: string;
  title: { ru: string; en: string };
  subtitle?: { ru: string; en: string };
  badge?: string;
  badgeColor?: string;
  defaultOpen?: boolean;
  /** Превью-блок справа (например, мини-метрика «6 новостей · оранжевая точка») */
  preview?: ReactNode;
  children: ReactNode;
};

export function CollapseSection({
  icon,
  iconBg = "#1f6feb33",
  title,
  subtitle,
  badge,
  badgeColor = "#58a6ff",
  defaultOpen = false,
  preview,
  children,
}: Props) {
  const { lang } = useLang();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] transition-colors hover:border-[#58a6ff44]">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-3 bg-[#161b22] px-5 py-4 text-left transition hover:bg-[#1c2128]"
        style={open ? { borderBottom: "1px solid #30363d" } : undefined}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl shadow-sm transition-transform group-hover:scale-110"
            style={{ background: iconBg }}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-semibold text-[#e6edf3] sm:text-lg">
                {title[lang]}
              </span>
              {badge && (
                <span
                  className="rounded-full border px-2 py-0 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    borderColor: badgeColor + "55",
                    background: badgeColor + "1a",
                    color: badgeColor,
                  }}
                >
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="mt-0.5 max-w-2xl text-xs text-[#8b949e] sm:text-sm">
                {subtitle[lang]}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {/* Preview (виден только когда свёрнуто) */}
          {!open && preview && (
            <div className="hidden md:block">{preview}</div>
          )}

          {/* Состояние-подсказка */}
          <div className="flex items-center gap-1.5">
            <span
              className="hidden text-xs font-medium sm:inline"
              style={{ color: open ? "#8b949e" : badgeColor }}
            >
              {open
                ? (lang === "ru" ? "Свернуть" : "Collapse")
                : (lang === "ru" ? "Раскрыть" : "Expand")}
            </span>
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md border transition"
              style={{
                borderColor: open ? "#30363d" : badgeColor + "44",
                background: open ? "#21262d" : badgeColor + "11",
              }}
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform"
                style={{
                  transform: open ? "rotate(90deg)" : "rotate(0)",
                  color: open ? "#8b949e" : badgeColor,
                }}
                fill="currentColor"
              >
                <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </div>
          </div>
        </div>
      </button>

      {open && (
        <div
          className="space-y-4 p-3 sm:p-4"
          style={{ animation: "collapseIn 0.25s ease-out" }}
        >
          {children}
        </div>
      )}

      <style>{`
        @keyframes collapseIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

/* ============================================================
   Маленький helper для превью — статусные пиллы с цифрой
   ============================================================ */
export function CollapsePreview({
  items,
}: {
  items: { value: string; label: string; color: string }[];
}) {
  return (
    <div className="flex items-center gap-2">
      {items.map((it, i) => (
        <div
          key={i}
          className="flex items-baseline gap-1 rounded-md border bg-[#0d1117] px-2 py-1"
          style={{ borderColor: it.color + "44" }}
        >
          <span className="font-mono text-sm font-bold" style={{ color: it.color }}>
            {it.value}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#8b949e]">
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}
