/* Визуальный git-граф фаз — SVG */

type Node = {
  x: number;
  y: number;
  branch: string;
  color: string;
  label: string;
  date: string;
  isMerge?: boolean;
  isTag?: string;
};

const branches = [
  { name: "main",                    color: "#3fb950", y: 60 },
  { name: "phase-1/app-core",        color: "#58a6ff", y: 130 },
  { name: "phase-2/ecosystem",       color: "#a371f7", y: 200 },
  { name: "phase-3/predictive",      color: "#f0883e", y: 270 },
  { name: "research/smart-city",     color: "#db61a2", y: 340 },
];

// 11 commit ticks across the timeline (Feb 2026 → 2029)
const ticks = [
  "Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026",
  "Q1 2027", "Q2 2027", "Q3 2027", "Q4 2027",
  "H1 2028", "H2 2028", "Q1 2029",
];

const padX = 140;
const stepX = 90;
const tickX = (i: number) => padX + i * stepX;

const nodes: Node[] = [
  // main backbone — releases
  { x: tickX(0), y: 60, branch: "main", color: "#3fb950", label: "v0.7 alpha", date: "Q1 2026", isTag: "v0.7.0" },
  { x: tickX(1), y: 60, branch: "main", color: "#3fb950", label: "App 1.0 RC", date: "Q2 2026", isTag: "v1.0-rc", isMerge: true },
  { x: tickX(3), y: 60, branch: "main", color: "#3fb950", label: "Билинг 2.0 + PCI", date: "Q4 2026", isTag: "v1.2", isMerge: true },
  { x: tickX(4), y: 60, branch: "main", color: "#3fb950", label: "Data Platform", date: "Q1 2027", isTag: "v2.0", isMerge: true },
  { x: tickX(6), y: 60, branch: "main", color: "#3fb950", label: "Concierge", date: "Q3 2027", isTag: "v2.4", isMerge: true },
  { x: tickX(8), y: 60, branch: "main", color: "#3fb950", label: "Smart City", date: "H1 2028", isTag: "v3.0", isMerge: true },
  { x: tickX(10), y: 60, branch: "main", color: "#3fb950", label: "Marketplace", date: "Q1 2029", isTag: "v4.0", isMerge: true },

  // phase 1 — app core
  { x: tickX(0), y: 130, branch: "phase-1", color: "#58a6ff", label: "Единый интерфейс", date: "Q1 2026" },
  { x: tickX(1), y: 130, branch: "phase-1", color: "#58a6ff", label: "Опции в 1 клик", date: "Q2 2026" },
  { x: tickX(2), y: 130, branch: "phase-1", color: "#58a6ff", label: "Академия шофёров", date: "Q3 2026" },
  { x: tickX(3), y: 130, branch: "phase-1", color: "#58a6ff", label: "Биллинг + ISO 27001", date: "Q4 2026" },

  // phase 2 — ecosystem
  { x: tickX(3), y: 200, branch: "phase-2", color: "#a371f7", label: "Профиль 40+ параметров", date: "Q4 2026" },
  { x: tickX(4), y: 200, branch: "phase-2", color: "#a371f7", label: "Data Platform", date: "Q1 2027" },
  { x: tickX(5), y: 200, branch: "phase-2", color: "#a371f7", label: "ML-рекомендации", date: "Q2 2027" },
  { x: tickX(6), y: 200, branch: "phase-2", color: "#a371f7", label: "Trip Concierge", date: "Q3 2027" },

  // phase 3 — predictive
  { x: tickX(6), y: 270, branch: "phase-3", color: "#f0883e", label: "Smart Suggestions", date: "Q4 2027" },
  { x: tickX(7), y: 270, branch: "phase-3", color: "#f0883e", label: "Calendar Sync", date: "Q4 2027" },
  { x: tickX(8), y: 270, branch: "phase-3", color: "#f0883e", label: "Door-to-door", date: "H1 2028" },
  { x: tickX(9), y: 270, branch: "phase-3", color: "#f0883e", label: "EV-флот 40%", date: "H2 2028" },
  { x: tickX(10), y: 270, branch: "phase-3", color: "#f0883e", label: "Marketplace", date: "Q1 2029" },

  // research/smart-city
  { x: tickX(5), y: 340, branch: "research", color: "#db61a2", label: "City API PoC", date: "Q2 2027" },
  { x: tickX(7), y: 340, branch: "research", color: "#db61a2", label: "Светофоры РФ", date: "Q4 2027" },
  { x: tickX(8), y: 340, branch: "research", color: "#db61a2", label: "Merge → phase-3", date: "H1 2028", isMerge: true },
];

const totalWidth = padX + ticks.length * stepX;
const totalHeight = 400;

export function BranchGraph() {
  return (
    <div className="overflow-hidden rounded-md border border-[#30363d] bg-[#010409]">
      {/* legend */}
      <div className="flex flex-wrap items-center gap-4 border-b border-[#30363d] bg-[#0d1117] px-4 py-3 text-xs">
        {branches.map((b) => (
          <div key={b.name} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color }} />
            <span className="font-mono text-[#c9d1d9]">{b.name}</span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          className="block min-w-[900px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* vertical tick gridlines */}
          {ticks.map((t, i) => (
            <g key={t}>
              <line
                x1={tickX(i)} y1={20}
                x2={tickX(i)} y2={totalHeight - 30}
                stroke="#21262d" strokeWidth={1} strokeDasharray="3 4"
              />
              <text
                x={tickX(i)} y={totalHeight - 10}
                textAnchor="middle" fontFamily="ui-monospace, monospace"
                fontSize={11} fill="#8b949e"
              >
                {t}
              </text>
            </g>
          ))}

          {/* branch labels */}
          {branches.map((b) => (
            <text
              key={b.name}
              x={10} y={b.y + 4}
              fontFamily="ui-monospace, monospace"
              fontSize={11} fill={b.color}
            >
              {b.name}
            </text>
          ))}

          {/* horizontal branch lines */}
          {branches.map((b) => (
            <line
              key={b.name}
              x1={padX - 20} y1={b.y}
              x2={totalWidth - 20} y2={b.y}
              stroke={b.color} strokeOpacity={0.35} strokeWidth={2}
            />
          ))}

          {/* phase->main merges (curves) */}
          <MergeCurve from={[tickX(1), 130]} to={[tickX(1), 60]} color="#58a6ff" />
          <MergeCurve from={[tickX(3), 130]} to={[tickX(3), 60]} color="#58a6ff" />
          <MergeCurve from={[tickX(4), 200]} to={[tickX(4), 60]} color="#a371f7" />
          <MergeCurve from={[tickX(6), 200]} to={[tickX(6), 60]} color="#a371f7" />
          <MergeCurve from={[tickX(8), 270]} to={[tickX(8), 60]} color="#f0883e" />
          <MergeCurve from={[tickX(10), 270]} to={[tickX(10), 60]} color="#f0883e" />
          <MergeCurve from={[tickX(8), 340]} to={[tickX(8), 270]} color="#db61a2" />

          {/* nodes */}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle
                cx={n.x} cy={n.y}
                r={n.isMerge ? 7 : 5}
                fill={n.isMerge ? "#0d1117" : n.color}
                stroke={n.color} strokeWidth={2.5}
              />
              {n.isTag && (
                <g>
                  <rect
                    x={n.x - 28} y={n.y - 30} rx={3} ry={3}
                    width={56} height={16} fill="#1f6feb33" stroke="#1f6feb"
                  />
                  <text
                    x={n.x} y={n.y - 18} textAnchor="middle"
                    fontFamily="ui-monospace, monospace" fontSize={10} fill="#58a6ff"
                  >
                    {n.isTag}
                  </text>
                </g>
              )}
              <text
                x={n.x} y={n.y + 22}
                textAnchor="middle" fontSize={10} fill="#c9d1d9"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="border-t border-[#30363d] bg-[#0d1117] px-4 py-2 text-xs text-[#8b949e]">
        <span className="gh-code">●</span> commit · <span className="gh-code">◉</span> merge в main · <span className="gh-code">v.x.x</span> — публичный релиз для клиентов
      </div>
    </div>
  );
}

function MergeCurve({ from, to, color }: { from: [number, number]; to: [number, number]; color: string }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const d = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
  return <path d={d} stroke={color} strokeWidth={2.5} fill="none" strokeOpacity={0.6} />;
}
