import { phases } from "../../data/roadmap";
import { BranchGraph } from "./BranchGraph";

export function Readme() {
  return (
    <article className="overflow-hidden rounded-md border border-[#30363d]">
      {/* tabs */}
      <div className="flex items-center justify-between border-b border-[#30363d] bg-[#0d1117] px-4 py-2">
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-2 rounded-md bg-[#21262d] px-3 py-1.5 text-sm font-semibold text-[#e6edf3]">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
              <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Z" />
            </svg>
            README.md
          </button>
          <button className="rounded-md px-3 py-1.5 text-sm text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3]">
            Preview
          </button>
        </div>
        <div className="flex items-center gap-2 text-[#8b949e]">
          <button className="rounded-md p-1.5 hover:bg-[#21262d] hover:text-[#e6edf3]" aria-label="Edit">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
              <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Z" />
            </svg>
          </button>
          <button className="rounded-md p-1.5 hover:bg-[#21262d] hover:text-[#e6edf3]" aria-label="Raw">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
              <path d="M3.75 1.5a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 8 4.25V1.5Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-8 px-6 py-8 lg:px-10">
        {/* H1 with project name + badges */}
        <header className="border-b border-[#30363d] pb-4">
          <h1 className="flex items-center gap-3 text-3xl font-semibold text-[#e6edf3]">
            <span>🚗</span>
            Car Blanche · Roadmap 2026 → 2029
          </h1>
          <p className="mt-3 text-base text-[#8b949e]">
            Дорожная карта развития сервисной модели. От приложения-пульта до предиктивной
            экосистемы, интегрированной с умным городом. Профессиональные шофёры и прозрачные
            данные клиента — на каждом этапе.
          </p>

          {/* badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Badge label="version" value="0.9.0-rc.2" left="#484f58" right="#3fb950" />
            <Badge label="phase" value="1 of 3" left="#484f58" right="#58a6ff" />
            <Badge label="build" value="passing" left="#484f58" right="#3fb950" />
            <Badge label="coverage" value="92%" left="#484f58" right="#a371f7" />
            <Badge label="ESG" value="ready" left="#484f58" right="#3fb950" />
            <Badge label="license" value="proprietary" left="#484f58" right="#d29922" />
          </div>
        </header>

        {/* TOC */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-[#e6edf3]">
            <span className="text-[#8b949e]">#</span> Оглавление
          </h2>
          <ol className="space-y-1.5 pl-5 text-sm text-[#2f81f7]">
            <li><a href="#phase-2026" className="hover:underline">Phase 1 · App как центр управления (2026)</a></li>
            <li><a href="#phase-2027" className="hover:underline">Phase 2 · Экосистема и рекомендации (2027)</a></li>
            <li><a href="#phase-2029" className="hover:underline">Phase 3 · Прогноз и интеграции (2027–2029)</a></li>
            <li><a href="#branch-graph" className="hover:underline">Branch graph · визуальная схема разработки</a></li>
            <li><a href="#plan-b" className="hover:underline">Вариант B · поэтапный план 36 месяцев</a></li>
            <li><a href="#issues" className="hover:underline">Issues · открытые решения и риски</a></li>
            <li><a href="#commits" className="hover:underline">Recent commits</a></li>
          </ol>
        </section>

        {/* H2 — overview */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-[#e6edf3]">
            <span className="text-[#8b949e]">#</span> Куда движется сервисная модель
          </h2>
          <p className="text-sm leading-7 text-[#c9d1d9]">
            Сервис проходит через три горизонта развития. Каждый горизонт = ветка
            (<span className="gh-code">phase-N</span>), которая мержится в <span className="gh-code">main</span> по
            мере поставки. Под каждым этапом — конкретные поставки, KPI и ответственные команды.
          </p>

          {/* Three phase cards, expandable */}
          <div className="mt-5 space-y-3">
            {phases.map((p) => (
              <PhaseDetails key={p.id} phase={p} />
            ))}
          </div>
        </section>

        {/* H2 — branch graph */}
        <section id="branch-graph">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-[#e6edf3]">
            <span className="text-[#8b949e]">#</span> Branch graph
          </h2>
          <p className="mb-4 text-sm text-[#c9d1d9]">
            Визуальная схема: <span className="gh-code">main</span> + три фазы как параллельные
            ветки + research-ветки для исследований. Mерж — это публичный релиз для клиентов.
          </p>
          <BranchGraph />
        </section>
      </div>
    </article>
  );
}

function Badge({ label, value, left, right }: { label: string; value: string; left: string; right: string }) {
  return (
    <span className="inline-flex overflow-hidden rounded text-[11px] font-semibold text-white">
      <span className="px-2 py-0.5" style={{ background: left }}>{label}</span>
      <span className="px-2 py-0.5" style={{ background: right }}>{value}</span>
    </span>
  );
}

function PhaseDetails({ phase }: { phase: typeof phases[number] }) {
  return (
    <details
      id={`phase-${phase.year}`}
      className="scroll-mt-24 overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117] open:bg-[#161b22]"
    >
      <summary className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-[#161b22]">
        <svg viewBox="0 0 16 16" className="chev h-4 w-4 text-[#8b949e]" fill="currentColor">
          <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
        </svg>
        <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor">
          <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Z" />
        </svg>
        <span className="font-mono text-sm text-[#e6edf3]">phase-{phase.year}/{phase.title.split(" ")[0].toLowerCase()}</span>
        <span className="rounded-full border border-[#30363d] px-2 py-0.5 text-[11px] text-[#8b949e]">
          {phase.period}
        </span>
        <span className="ml-auto text-sm font-medium text-[#e6edf3]">{phase.title}</span>
      </summary>
      <div className="border-t border-[#30363d] px-5 py-5">
        <p className="text-sm leading-6 text-[#c9d1d9]">{phase.description}</p>

        <h4 className="mt-5 mb-2 text-sm font-semibold text-[#e6edf3]">
          ## Поставки
        </h4>
        <ul className="space-y-2 pl-5">
          {phase.items.map((it, i) => (
            <li key={it.label} className="list-disc text-sm text-[#c9d1d9] marker:text-[#8b949e]">
              <strong className="text-[#e6edf3]">{i + 1}. {it.label}.</strong>{" "}
              <span className="text-[#8b949e]">{it.detail}</span>
            </li>
          ))}
        </ul>

        {phase.metrics && (
          <>
            <h4 className="mt-5 mb-2 text-sm font-semibold text-[#e6edf3]">## KPI</h4>
            <div className="grid grid-cols-3 gap-2">
              {phase.metrics.map((m) => (
                <div key={m.label} className="rounded-md border border-[#30363d] bg-[#010409] p-3">
                  <div className="font-mono text-lg font-semibold text-[#3fb950]">{m.value}</div>
                  <div className="text-[11px] text-[#8b949e]">{m.label}</div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-5 flex flex-wrap gap-2 border-t border-[#30363d] pt-4">
          <a href="#plan-b" className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
            → Подробный план разработки
          </a>
          <a href="#issues" className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
            🐛 Открытые issues
          </a>
        </div>
      </div>
    </details>
  );
}
