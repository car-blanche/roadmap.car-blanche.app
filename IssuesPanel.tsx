import { useState } from "react";
import { issues, type Issue } from "../../data/github";

const filters = [
  { key: "all", label: "Все" },
  { key: "open", label: "Open" },
  { key: "in-progress", label: "В работе" },
  { key: "decision", label: "Решения" },
  { key: "risk", label: "Риски" },
  { key: "discussion", label: "Обсуждения" },
] as const;

type FilterKey = typeof filters[number]["key"];

export function IssuesPanel() {
  const [active, setActive] = useState<FilterKey>("all");
  const [openId, setOpenId] = useState<number | null>(issues[0].id);

  const list = issues.filter((i) => {
    if (active === "all") return true;
    if (active === "open") return i.status === "open";
    if (active === "in-progress") return i.status === "in-progress";
    return i.type === active;
  });

  return (
    <section id="issues" className="scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[#e6edf3]">
            <svg viewBox="0 0 16 16" className="h-5 w-5 text-[#3fb950]" fill="currentColor">
              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
            </svg>
            Issues, решения и риски
          </h2>
          <p className="mt-1 text-sm text-[#8b949e]">
            Открытые вопросы по продукту, архитектуре, операциям и приватности. Каждое решение
            принимается публично — с историей обсуждения.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1 text-sm text-[#e6edf3] hover:bg-[#30363d]">
            Labels <span className="ml-1 text-[#8b949e]">12</span>
          </button>
          <button className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1 text-sm text-[#e6edf3] hover:bg-[#30363d]">
            Milestones <span className="ml-1 text-[#8b949e]">9</span>
          </button>
          <button className="rounded-md bg-[#238636] px-3 py-1 text-sm font-semibold text-white hover:bg-[#2ea043]">
            New issue
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-[#30363d]">
        {/* filter bar */}
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
          <span className="ml-auto text-xs text-[#8b949e]">{list.length} issues</span>
        </div>

        <ul className="divide-y divide-[#21262d]">
          {list.map((iss) => (
            <IssueRow
              key={iss.id}
              issue={iss}
              open={openId === iss.id}
              onToggle={() => setOpenId(openId === iss.id ? null : iss.id)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

const typeIcon = (t: Issue["type"], status: Issue["status"]) => {
  if (status === "in-progress")
    return (
      <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#bf8700]" fill="currentColor">
        <path d="M5.029 2.217a6.5 6.5 0 0 1 9.437 5.11.75.75 0 1 1-1.492.149 5 5 0 1 0-8.391 4.15.75.75 0 0 1 .055 1.06l-1.292 1.355h2.78a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1-.75-.75V10.42a.75.75 0 0 1 1.5 0v2.572l1.367-1.436a6.5 6.5 0 0 1 1.162-9.34Zm3.071 3.034V8.5h2.25a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75v-4a.75.75 0 0 1 1.5 0Z" />
      </svg>
    );
  if (t === "decision")
    return (
      <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#a371f7]" fill="currentColor">
        <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Z" />
      </svg>
    );
  if (t === "risk")
    return (
      <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#f85149]" fill="currentColor">
        <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368ZM8 5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 8 5Zm1 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
      </svg>
    );
  if (t === "discussion")
    return (
      <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor">
        <path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1Z" />
        <path d="M14.5 4.75a.75.75 0 0 0-.75-.75h-.5a.75.75 0 0 1 0-1.5h.5c1.243 0 2.25 1.007 2.25 2.25v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.458 1.458 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h1a.25.25 0 0 0 .25-.25Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#3fb950]" fill="currentColor">
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z" />
    </svg>
  );
};

function IssueRow({
  issue,
  open,
  onToggle,
}: {
  issue: Issue;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li>
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-[#1f6feb0d]"
      >
        <span className="mt-0.5 shrink-0">{typeIcon(issue.type, issue.status)}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-sm font-semibold text-[#e6edf3] hover:text-[#2f81f7]">
              {issue.title}
            </span>
            {issue.labels.map((l) => (
              <span
                key={l.name}
                className="rounded-full border px-2 py-0.5 text-[10px] font-medium"
                style={{
                  borderColor: l.color + "66",
                  background: l.color + "1a",
                  color: l.color,
                }}
              >
                {l.name}
              </span>
            ))}
          </div>
          <div className="mt-1 text-xs text-[#8b949e]">
            #{issue.id} {issue.status === "in-progress" ? "в работе" : "открыто"} ·{" "}
            <span className="text-[#c9d1d9]">{issue.author}</span> · {issue.updated}
            {issue.milestone && (
              <>
                {" · "}
                <span className="inline-flex items-center gap-1 text-[#c9d1d9]">
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
                    <path d="M7.75 0a.75.75 0 0 1 .75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 0 1 0 2.672l-2.07 1.75a1.75 1.75 0 0 1-1.13.414H8.5v5.25a.75.75 0 0 1-1.5 0V10H2.75A1.75 1.75 0 0 1 1 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 0 1 7.75 0Z" />
                  </svg>
                  {issue.milestone}
                </span>
              </>
            )}
          </div>
        </div>
        <span className="hidden shrink-0 items-center gap-1 text-xs text-[#8b949e] sm:inline-flex">
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
            <path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1Z" />
          </svg>
          {issue.comments}
        </span>
      </button>

      {open && (
        <div className="border-t border-[#21262d] bg-[#0d1117] px-4 py-4">
          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-[#8b949e]">
              <span className="font-semibold text-[#e6edf3]">{issue.author}</span>
              <span>· {issue.updated}</span>
            </div>
            <p className="text-sm leading-6 text-[#c9d1d9]">{issue.body}</p>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-[#30363d] pt-3">
              <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
                👍 12
              </button>
              <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
                🚀 8
              </button>
              <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
                ❤️ 5
              </button>
              <a
                href="https://github.com/car-blanche"
                target="_blank" rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]"
              >
                🐙 Open on GitHub
              </a>
              <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-[#e6edf3] hover:bg-[#30363d]">
                Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
