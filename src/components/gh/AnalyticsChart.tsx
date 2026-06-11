import { useState, useEffect, useRef } from "react";
import { useLang } from "../../context/LangContext";

const ridesByCategory = [
  { key: "business",   label: { ru: "Бизнес",     en: "Business" },   value: 42, color: "#58a6ff" },
  { key: "airport",    label: { ru: "Аэропорт",   en: "Airport" },    value: 23, color: "#a371f7" },
  { key: "family",     label: { ru: "Семья",      en: "Family" },     value: 18, color: "#3fb950" },
  { key: "events",     label: { ru: "События",    en: "Events" },     value: 11, color: "#f0883e" },
  { key: "transfer",   label: { ru: "Трансфер",   en: "Transfer" },   value:  6, color: "#db61a2" },
];

// 12 точек активности (убавлено в 2 раза)
const activityData = [21, 26, 24, 34, 37, 43, 39, 46, 52, 59, 66, 74];

const monthLabels = [
  "Апр", "Май", "Июн", "Июл", "Авг", "Сен",
  "Окт", "Ноя", "Дек", "Янв", "Фев", "Мар",
];

export function AnalyticsChart() {
  const { lang } = useLang();
  const [animated, setAnimated] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setAnimated(true);
    }, { threshold: 0.2 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const total = ridesByCategory.reduce((s, x) => s + x.value, 0);
  const maxBar = Math.max(...activityData);

  // Donut math
  const R = 60;
  const C = 2 * Math.PI * R;
  let cumOffset = 0;
  const segments = ridesByCategory.map((cat) => {
    const pct = cat.value / total;
    const len = pct * C;
    const seg = {
      ...cat,
      pct,
      dashArray: `${len} ${C - len}`,
      dashOffset: -cumOffset,
    };
    cumOffset += len;
    return seg;
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#58a6ff1f] via-transparent to-[#3fb9501f]" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-[#58a6ff] opacity-10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#58a6ff]">
              <span>📈</span>
              {lang === "ru" ? "Аналитика поездок" : "Ride analytics"}
            </div>
            <h2 className="text-2xl font-semibold text-[#e6edf3] sm:text-3xl">
              {lang === "ru" ? "Как клиенты пользуются Car Blanche" : "How clients use Car Blanche"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#8b949e]">
              {lang === "ru"
                ? "Распределение по типам поездок и рост активности за последние 12 месяцев."
                : "Ride distribution by type and activity growth over the last 12 months."}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-md border border-[#3fb95066] bg-[#3fb95011] px-3 py-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fb950] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3fb950]" />
            </span>
            <span className="font-mono text-[#3fb950]">+125%</span>
            <span className="text-[#8b949e]">{lang === "ru" ? "за 12 мес" : "12-mo growth"}</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* DONUT chart */}
          <div className="relative flex flex-col items-center">
            <svg viewBox="-80 -80 160 160" className="h-56 w-56">
              {/* background ring */}
              <circle cx="0" cy="0" r={R} fill="none" stroke="#21262d" strokeWidth="22" />

              {/* segments */}
              {segments.map((seg, i) => (
                <circle
                  key={seg.key}
                  cx="0"
                  cy="0"
                  r={R}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={hoveredSegment === i ? "26" : "22"}
                  strokeDasharray={animated ? seg.dashArray : `0 ${C}`}
                  strokeDashoffset={seg.dashOffset}
                  transform="rotate(-90)"
                  style={{
                    transition: "stroke-dasharray 1.2s ease-out, stroke-width 0.2s ease",
                    cursor: "pointer",
                    filter: hoveredSegment === i ? `drop-shadow(0 0 8px ${seg.color})` : undefined,
                  }}
                  onMouseEnter={() => setHoveredSegment(i)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
              ))}

              {/* center text */}
              <text x="0" y="-8" textAnchor="middle" className="fill-[#e6edf3]" style={{ fontSize: 24, fontWeight: 700 }}>
                {hoveredSegment !== null
                  ? `${segments[hoveredSegment].value}%`
                  : "7,800+"}
              </text>
              <text x="0" y="12" textAnchor="middle" className="fill-[#8b949e]" style={{ fontSize: 8 }}>
                {hoveredSegment !== null
                  ? segments[hoveredSegment].label[lang].toUpperCase()
                  : (lang === "ru" ? "ВСЕГО ПОЕЗДОК" : "TOTAL RIDES")}
              </text>
            </svg>

            {/* legend */}
            <ul className="mt-4 grid w-full grid-cols-1 gap-1.5 text-xs">
              {segments.map((seg, i) => (
                <li
                  key={seg.key}
                  className="flex cursor-pointer items-center justify-between rounded px-2 py-1 transition hover:bg-[#161b22]"
                  onMouseEnter={() => setHoveredSegment(i)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{ background: hoveredSegment === i ? seg.color + "1a" : undefined }}
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: seg.color }} />
                    <span className={hoveredSegment === i ? "font-semibold text-[#e6edf3]" : "text-[#c9d1d9]"}>
                      {seg.label[lang]}
                    </span>
                  </span>
                  <span className="font-mono" style={{ color: seg.color }}>
                    {seg.value}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* BAR chart — activity over 12 months */}
          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-[#e6edf3]">
                📊 {lang === "ru" ? "Активность · последние 12 месяцев" : "Activity · last 12 months"}
              </h3>
              <span className="font-mono text-[10px] text-[#8b949e]">
                {hoveredBar !== null
                  ? `${monthLabels[hoveredBar]} · ${activityData[hoveredBar]} ${lang === "ru" ? "поездок/день" : "rides/day"}`
                  : `${lang === "ru" ? "максимум" : "peak"}: ${maxBar} ${lang === "ru" ? "пое��док/день" : "rides/day"}`}
              </span>
            </div>

            {/* SVG-based smooth area + bars */}
            <svg viewBox="0 0 600 200" className="w-full" preserveAspectRatio="none">
              {/* grid lines */}
              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1="0" x2="600"
                  y1={50 + i * 40}
                  y2={50 + i * 40}
                  stroke="#21262d"
                  strokeDasharray="3 4"
                  strokeWidth="0.5"
                />
              ))}

              {/* gradient under area */}
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#58a6ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#58a6ff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#58a6ff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#a371f7" stopOpacity="0.7" />
                </linearGradient>
              </defs>

              {/* smooth area curve */}
              {(() => {
                const pts = activityData.map((v, i) => {
                  const x = (i / (activityData.length - 1)) * 580 + 10;
                  const y = 180 - (v / maxBar) * 140;
                  return { x, y };
                });
                let pathArea = `M ${pts[0].x} 180 L ${pts[0].x} ${pts[0].y}`;
                let pathLine = `M ${pts[0].x} ${pts[0].y}`;
                for (let i = 1; i < pts.length; i++) {
                  const p0 = pts[i - 1];
                  const p1 = pts[i];
                  const cpx = (p0.x + p1.x) / 2;
                  pathArea += ` C ${cpx} ${p0.y}, ${cpx} ${p1.y}, ${p1.x} ${p1.y}`;
                  pathLine += ` C ${cpx} ${p0.y}, ${cpx} ${p1.y}, ${p1.x} ${p1.y}`;
                }
                pathArea += ` L ${pts[pts.length - 1].x} 180 Z`;
                return (
                  <g>
                    <path
                      d={pathArea}
                      fill="url(#areaGrad)"
                      style={{
                        transformOrigin: "bottom",
                        transition: "transform 1s ease",
                        transform: animated ? "scaleY(1)" : "scaleY(0)",
                      }}
                    />
                    <path
                      d={pathLine}
                      fill="none"
                      stroke="#58a6ff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray={animated ? "none" : "1000"}
                      style={{ transition: "stroke-dasharray 1.5s ease" }}
                    />
                    {/* dots */}
                    {pts.map((p, i) => (
                      <g key={i}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={hoveredBar === i ? 6 : 3.5}
                          fill="#58a6ff"
                          stroke="#0d1117"
                          strokeWidth="2"
                          style={{
                            transition: "r 0.18s ease",
                            cursor: "pointer",
                            opacity: animated ? 1 : 0,
                          }}
                          onMouseEnter={() => setHoveredBar(i)}
                          onMouseLeave={() => setHoveredBar(null)}
                        />
                        {hoveredBar === i && (
                          <g>
                            <line x1={p.x} y1={p.y} x2={p.x} y2={195} stroke="#58a6ff" strokeDasharray="3 3" opacity="0.4" />
                            <rect x={p.x - 22} y={p.y - 24} width="44" height="18" rx="3" fill="#161b22" stroke="#58a6ff" />
                            <text x={p.x} y={p.y - 12} textAnchor="middle" fill="#58a6ff" style={{ fontSize: 10, fontWeight: 600 }}>
                              {activityData[i]}
                            </text>
                          </g>
                        )}
                      </g>
                    ))}
                  </g>
                );
              })()}
            </svg>

            {/* x-axis labels */}
            <div className="mt-1 grid grid-cols-12 gap-0.5 px-2">
              {monthLabels.map((m, i) => (
                <span
                  key={i}
                  className={`text-center font-mono text-[9px] ${
                    hoveredBar === i ? "font-semibold text-[#58a6ff]" : "text-[#8b949e]"
                  }`}
                >
                  {m}
                </span>
              ))}
            </div>

            {/* footer stats */}
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#30363d] pt-3">
              <Stat label={lang === "ru" ? "Средний рост / мес" : "Avg growth / mo"} value="+6.2%" color="#3fb950" />
              <Stat label={lang === "ru" ? "Пик активности" : "Peak month"} value={`${maxBar}`} color="#58a6ff" />
              <Stat label={lang === "ru" ? "Средний рейтинг" : "Avg rating"} value="4.94 ★" color="#e3b341" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className="font-mono text-base font-semibold" style={{ color }}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-[#8b949e]">{label}</div>
    </div>
  );
}
