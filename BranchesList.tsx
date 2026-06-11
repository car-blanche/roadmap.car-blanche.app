import { branches } from "../../data/github";

export function BranchesList() {
  return (
    <section id="branches" className="scroll-mt-24">
      <div className="mb-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-[#e6edf3]">
          <svg viewBox="0 0 16 16" className="h-5 w-5 text-[#a371f7]" fill="currentColor">
            <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Z" />
          </svg>
          Branches · {branches.length}
        </h2>
        <p className="mt-1 text-sm text-[#8b949e]">
          Активные направления развития. Каждая ветка = фаза или исследование. Мерж в{" "}
          <span className="gh-code">main</span> = публичный релиз.
        </p>
      </div>

      <div className="overflow-hidden rounded-md border border-[#30363d]">
        <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-2 text-sm font-semibold text-[#e6edf3]">
          Active branches
        </div>
        <ul className="divide-y divide-[#21262d]">
          {branches.map((b) => (
            <li
              key={b.name}
              className="flex flex-wrap items-center gap-3 px-4 py-3 hover:bg-[#1f6feb0d]"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: b.color }} />
              <a
                href="#"
                className="font-mono text-sm font-semibold text-[#2f81f7] hover:underline"
              >
                {b.name}
              </a>
              <span className="text-xs text-[#8b949e]">{b.label}</span>

              {/* ahead / behind bar */}
              <div className="ml-auto flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                  <div className="flex h-1.5 w-32 overflow-hidden rounded-full bg-[#21262d]">
                    {(b.ahead + b.behind) > 0 ? (
                      <>
                        <div
                          className="h-full bg-[#3fb950]"
                          style={{ width: `${(b.ahead / (b.ahead + b.behind)) * 100}%` }}
                        />
                        <div
                          className="h-full bg-[#f85149]"
                          style={{ width: `${(b.behind / (b.ahead + b.behind)) * 100}%` }}
                        />
                      </>
                    ) : (
                      <div className="h-full w-full bg-[#30363d]" />
                    )}
                  </div>
                  <span className="font-mono">
                    <span className="text-[#3fb950]">{b.ahead}</span>
                    <span className="text-[#6e7681]"> / </span>
                    <span className="text-[#f85149]">{b.behind}</span>
                  </span>
                </div>

                <span className="hidden text-xs text-[#8b949e] sm:inline">обновлено {b.updated}</span>

                {b.pr && (
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#3fb950]" fill="currentColor">
                      <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Z" />
                    </svg>
                    #{b.pr} open
                  </a>
                )}
                {b.name !== "main" && (
                  <button className="rounded-md border border-[#30363d] bg-[#21262d] p-1.5 text-[#8b949e] hover:bg-[#30363d] hover:text-[#e6edf3]" aria-label="more">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                      <path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    </svg>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
