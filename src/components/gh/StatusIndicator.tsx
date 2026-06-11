import { useState, useEffect, useRef } from "react";
import { useLang } from "../../context/LangContext";

type SystemStatus = "operational" | "degraded" | "outage" | "maintenance";

const services = [
  { key: "app",         icon: "📱", status: "operational" as SystemStatus, uptime: "99.98%" },
  { key: "api",         icon: "⚙️", status: "operational" as SystemStatus, uptime: "99.99%" },
  { key: "billing",     icon: "💳", status: "operational" as SystemStatus, uptime: "99.97%" },
  { key: "support",     icon: "💬", status: "operational" as SystemStatus, uptime: "100%" },
  { key: "concierge",   icon: "🚗", status: "operational" as SystemStatus, uptime: "99.95%" },
  { key: "chauffeur",   icon: "🎩", status: "operational" as SystemStatus, uptime: "100%" },
];

const labels = {
  app:       { ru: "Приложение",      en: "App" },
  api:       { ru: "API Gateway",     en: "API Gateway" },
  billing:   { ru: "Платежи",         en: "Billing" },
  support:   { ru: "Поддержка 24/7",  en: "Support 24/7" },
  concierge: { ru: "Бронирование",    en: "Booking" },
  chauffeur: { ru: "Сеть шофёров",    en: "Chauffeur network" },
};

export function StatusIndicator() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const allUp = services.every((s) => s.status === "operational");
  const overallStatus: SystemStatus = allUp ? "operational" : "degraded";

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const statusColor: Record<SystemStatus, string> = {
    operational: "#3fb950",
    degraded:    "#d29922",
    outage:      "#f85149",
    maintenance: "#58a6ff",
  };

  const statusLabel: Record<SystemStatus, { ru: string; en: string }> = {
    operational: { ru: "Все системы работают",       en: "All systems operational" },
    degraded:    { ru: "Замедленная работа",          en: "Degraded performance" },
    outage:      { ru: "Серьёзный сбой",              en: "Major outage" },
    maintenance: { ru: "Плановые работы",             en: "Scheduled maintenance" },
  };

  const color = statusColor[overallStatus];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="hidden items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d] sm:inline-flex"
        title={statusLabel[overallStatus][lang]}
        aria-label="System status"
      >
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ background: color }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: color }}
          />
        </span>
        <span className="hidden font-mono lg:inline">99.97%</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-80 overflow-hidden rounded-md border border-[#30363d] bg-[#161b22] shadow-2xl">
          {/* Header */}
          <div className="border-b border-[#30363d] px-4 py-3">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: color, boxShadow: `0 0 10px ${color}` }}
              />
              <div>
                <div className="text-sm font-semibold text-[#e6edf3]">
                  {statusLabel[overallStatus][lang]}
                </div>
                <div className="text-[11px] text-[#8b949e]">
                  {lang === "ru" ? "Проверено только что" : "Checked just now"}
                </div>
              </div>
            </div>
          </div>

          {/* Services list */}
          <ul className="max-h-72 overflow-auto">
            {services.map((s) => {
              const sColor = statusColor[s.status];
              return (
                <li
                  key={s.key}
                  className="flex items-center gap-3 border-b border-[#21262d] px-4 py-2.5 last:border-b-0"
                >
                  <span className="text-base">{s.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-[#e6edf3]">
                      {labels[s.key as keyof typeof labels][lang]}
                    </div>
                    <div className="text-[11px] text-[#8b949e]">
                      {lang === "ru" ? "Uptime 90 дней" : "90-day uptime"} ·{" "}
                      <span className="font-mono text-[#3fb950]">{s.uptime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: sColor }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: sColor }} />
                    {s.status}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Footer */}
          <div className="border-t border-[#30363d] bg-[#0d1117] px-4 py-2.5 text-[11px] text-[#8b949e]">
            📍 {lang === "ru"
              ? "HQ Уфа · 24/7 мониторинг · SLA 99.9%"
              : "Ufa HQ · 24/7 monitoring · SLA 99.9%"}
          </div>
        </div>
      )}
    </div>
  );
}
