import { useState } from "react";
import { stages, trackMeta, type Track, type Stage } from "../../data/roadmap";

const filters: { key: Track | "all"; label: string }[] = [
  { key: "all", label: "All tracks" },
  { key: "product", label: "Product" },
  { key: "engineering", label: "Engineering" },
  { key: "client", label: "Client service" },
  { key: "ops", label: "Ops · Chauffeurs" },
];

const statusBadge = {
  "in-progress": { label: "in progress", bg: "#bf870033", color: "#d29922", border: "#d2992266" },
  planned: { label: "planned", bg: "#1f6feb33", color: "#58a6ff", border: "#58a6ff66" },
  research: { label: "research", bg: "#21262d", color: "#8b949e", border: "#30363d" },
};

const phaseTag = {
  1: { name: "phase-1", color: "#58a6ff" },
  2: { name: "phase-2", color: "#a371f7" },
  3: { name: "phase-3", color: "#f0883e" },
};

export function PlanBGH() {
  const [active, setActive] = useState<Track | "all">("all");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([stages[0].id, stages[1].id]));

  const filtered = stages.map((s) => ({
    ...s,
    deliverables:
      active === "all" ? s.deliverables : s.deliverables.filter((d) => d.track === active),
  }));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const openAll = () => setOpenIds(new Set(stages.map((s) => s.id)));
  const closeAll = () => setOpenIds(new Set());

  return (
    <section id="plan-b" className="scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[#e6edf3]">
            <svg viewBox="0 0 16 16" className="h-5 w-5 text-[#a371f7]" fill="currentColor">
              <path d="M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0Z" />
            </svg>
            Projects · вариант B · 36 месяцев
          </h2>
          <p className="mt-1 text-sm text-[#8b949e]">
            Поэтапный план разработки <span className="gh-code">май 2026 → апрель 2029</span>.
            9 спринт-релизов, 4 параллельных трека, конкретные KPI.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={openAll} className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
            Развернуть всё
          </button>
          <button onClick={closeAll} className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
            Свернуть всё
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-[#30363d]">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-3 py-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                active === f.key
                  ? "bg-[#388bfd1a] text-[#2f81f7]"
                  : "text-[#c9d1d9] hover:bg-[#21262d]"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-[#8b949e]">
            {filtered.length} milestones · {filtered.reduce((a, s) => a + s.deliverables.length, 0)} tasks
          </span>
        </div>

        <ul className="divide-y divide-[#21262d]">
          {filtered.map((stage) => (
            <StageItem
              key={stage.id}
              stage={stage}
              open={openIds.has(stage.id)}
              onToggle={() => toggle(stage.id)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function StageItem({ stage, open, onToggle }: { stage: Stage; open: boolean; onToggle: () => void }) {
  const status = statusBadge[stage.status];
  const phase = phaseTag[stage.phase];

  return (
    <li>
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-[#1f6feb0d]"
      >
        {/* chevron */}
        <svg
          viewBox="0 0 16 16"
          className={`mt-1 h-4 w-4 shrink-0 text-[#8b949e] transition-transform ${open ? "rotate-90" : ""}`}
          fill="currentColor"
        >
          <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
        </svg>
        {/* milestone icon */}
        <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-[#a371f7]" fill="currentColor">
          <path d="M7.75 0a.75.75 0 0 1 .75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 0 1 0 2.672l-2.07 1.75a1.75 1.75 0 0 1-1.13.414H8.5v5.25a.75.75 0 0 1-1.5 0V10H2.75A1.75 1.75 0 0 1 1 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 0 1 7.75 0Z" />
        </svg>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[#e6edf3] hover:text-[#2f81f7]">
              {stage.title}
            </span>
            <span
              className="rounded-full border px-2 py-0.5 text-[10px] font-medium"
              style={{ borderColor: phase.color + "66", background: phase.color + "1a", color: phase.color }}
            >
              {phase.name}
            </span>
            <span
              className="rounded-full border px-2 py-0.5 text-[10px] font-medium"
              style={{ borderColor: status.border, background: status.bg, color: status.color }}
            >
              {status.label}
            </span>
          </div>
          <div className="mt-1 text-xs text-[#8b949e]">
            <span className="gh-code">{stage.quarter}</span> · {stage.period} ·{" "}
            <span className="text-[#c9d1d9]">{stage.deliverables.length} tasks</span>
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-[#21262d] bg-[#0d1117] px-4 py-4">
          <p className="mb-4 text-sm text-[#c9d1d9]">
            <span className="font-semibold text-[#e6edf3]">Цель: </span>
            {stage.goal}
          </p>

          {stage.deliverables.length > 0 && (
            <>
              <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-[#8b949e]">
                ## Tasks ({stage.deliverables.length})
              </div>
              <ul className="space-y-2">
                {stage.deliverables.map((d, i) => {
                  const m = trackMeta[d.track];
                  return (
                    <li
                      key={d.label + i}
                      className="flex items-start gap-3 rounded-md border border-[#30363d] bg-[#161b22] p-3 hover:bg-[#1c2128]"
                    >
                      <input type="checkbox" defaultChecked={stage.status !== "research"} className="mt-1 h-4 w-4 accent-[#3fb950]" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-[#e6edf3]">{d.label}</span>
                          <span
                            className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium"
                            style={{
                              borderColor: "currentColor",
                              opacity: 0.9,
                            }}
                          >
                            <span className={m.color.split(" ").find((c) => c.startsWith("text-"))}>
                              {m.icon} {m.name}
                            </span>
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#8b949e]">{d.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {/* KPI */}
          <div className="mt-4">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-[#8b949e]">
              ## KPI
            </div>
            <div className="grid grid-cols-3 gap-2">
              {stage.kpi.map((k) => (
                <div key={k.label} className="rounded-md border border-[#30363d] bg-[#010409] p-3">
                  <div className="font-mono text-lg font-semibold text-[#3fb950]">{k.value}</div>
                  <div className="text-[11px] text-[#8b949e]">{k.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-[#30363d] pt-3">
            <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
              Open milestone →
            </button>
            <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
              Связанные issues
            </button>
            <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
              Roadmap PDF ↓
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
