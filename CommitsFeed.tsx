import { commits, branches } from "../../data/github";

export function CommitsFeed() {
  // group by date label
  return (
    <section id="commits" className="scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[#e6edf3]">
            <svg viewBox="0 0 16 16" className="h-5 w-5 text-[#8b949e]" fill="currentColor">
              <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
            </svg>
            Recent commits
          </h2>
          <p className="mt-1 text-sm text-[#8b949e]">
            История изменений в дорожной карте и продукте.
          </p>
        </div>
        <a href="#" className="text-sm text-[#2f81f7] hover:underline">View all commits →</a>
      </div>

      <div className="overflow-hidden rounded-md border border-[#30363d]">
        <ul className="divide-y divide-[#21262d]">
          {commits.map((c) => {
            const branch = branches.find((b) => b.name === c.branch);
            return (
              <li key={c.hash} className="px-4 py-3 hover:bg-[#1f6feb0d]">
                <div className="flex items-start gap-3">
                  <div
                    className="mt-1 h-8 w-8 shrink-0 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${branch?.color ?? "#58a6ff"}, #2f81f7)` }}
                  />
                  <div className="min-w-0 flex-1">
                    <a href="#" className="block truncate text-sm font-medium text-[#e6edf3] hover:text-[#2f81f7]">
                      {c.message}
                    </a>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[#8b949e]">
                      <strong className="text-[#c9d1d9]">{c.author}</strong>
                      <span>committed {c.date}</span>
                      <span
                        className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5"
                        style={{
                          borderColor: (branch?.color ?? "#58a6ff") + "66",
                          color: branch?.color ?? "#58a6ff",
                        }}
                      >
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
                          <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Z" />
                        </svg>
                        {c.branch}
                      </span>
                    </div>
                  </div>

                  <div className="hidden items-center gap-2 sm:flex">
                    <span className="font-mono text-xs text-[#3fb950]">+{c.changes.add}</span>
                    <span className="font-mono text-xs text-[#f85149]">-{c.changes.del}</span>
                    <a href="#" className="rounded-md border border-[#30363d] bg-[#21262d] px-2 py-0.5 font-mono text-xs text-[#e6edf3] hover:bg-[#30363d]">
                      {c.hash}
                    </a>
                    <button className="rounded-md border border-[#30363d] bg-[#21262d] p-1 text-[#8b949e] hover:bg-[#30363d] hover:text-[#e6edf3]" aria-label="Copy">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z" />
                        <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
