import { useState } from "react";
import { branches } from "../../data/github";

export function BranchBar() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(branches[0].name);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-sm text-[#e6edf3] hover:bg-[#30363d]"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
            <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
          </svg>
          <span className="font-mono">{selected}</span>
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
            <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z" />
          </svg>
        </button>

        {open && (
          <div className="absolute left-0 top-full z-30 mt-1 w-[420px] max-w-[90vw] overflow-hidden rounded-md border border-[#30363d] bg-[#161b22] shadow-2xl">
            <div className="border-b border-[#30363d] px-3 py-2 text-xs font-semibold text-[#e6edf3]">
              Switch branches/tags
            </div>
            <div className="border-b border-[#30363d] p-2">
              <input
                className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-2 py-1 text-sm text-[#e6edf3] outline-none placeholder:text-[#6e7681] focus:border-[#2f81f7]"
                placeholder="Найти ветку или тег…"
              />
            </div>
            <div className="max-h-80 overflow-auto">
              {branches.map((b) => (
                <button
                  key={b.name}
                  onClick={() => {
                    setSelected(b.name);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-[#1f6feb1f] ${
                    b.name === selected ? "bg-[#1f6feb1f] text-[#e6edf3]" : "text-[#c9d1d9]"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: b.color }}
                    />
                    <span className="truncate font-mono">{b.name}</span>
                  </span>
                  <span className="shrink-0 text-xs text-[#8b949e]">{b.updated}</span>
                </button>
              ))}
            </div>
            <div className="border-t border-[#30363d] px-3 py-2 text-xs">
              <a href="#branches" className="text-[#2f81f7] hover:underline">
                View all branches →
              </a>
            </div>
          </div>
        )}
      </div>

      <a href="#branches" className="inline-flex items-center gap-1.5 px-2 py-1 text-sm text-[#e6edf3] hover:text-[#2f81f7]">
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
          <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Z" />
        </svg>
        <strong className="text-[#e6edf3]">{branches.length}</strong>
        <span className="text-[#8b949e]">Branches</span>
      </a>

      <a href="#releases" className="inline-flex items-center gap-1.5 px-2 py-1 text-sm text-[#e6edf3] hover:text-[#2f81f7]">
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
          <path d="M3.5 1.75a.25.25 0 0 1 .25-.25h3a.75.75 0 0 0 0-1.5h-3A1.75 1.75 0 0 0 2 1.75v11.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0 0 14 13.25V6H8.75A1.75 1.75 0 0 1 7 4.25V0h.25a.75.75 0 0 0 0-1.5H3.75A1.75 1.75 0 0 0 2 .25Z" />
        </svg>
        <strong className="text-[#e6edf3]">12</strong>
        <span className="text-[#8b949e]">Tags</span>
      </a>

      <div className="ml-auto flex gap-2">
        <button className="inline-flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1 text-sm text-[#e6edf3] hover:bg-[#30363d]">
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0Z" />
          </svg>
          Compare
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md bg-[#238636] px-3 py-1 text-sm font-semibold text-white hover:bg-[#2ea043]">
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
            <path d="M2.75 2.5h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5ZM2 6.75A.75.75 0 0 1 2.75 6h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 6.75Zm0 4a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" />
          </svg>
          Code
        </button>
      </div>
    </div>
  );
}
