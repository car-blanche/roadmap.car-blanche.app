import { useMemo, useState } from "react";
import { discussions, discussionCategories, type DiscussionCategory } from "../../data/team";
import { githubUser } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";
import { TaskCard } from "./TaskCard";

export function DiscussionsList() {
  const { lang } = useLang();
  const [cat, setCat] = useState<DiscussionCategory | "all">("all");
  const [openId, setOpenId] = useState<number | null>(discussions[0].id);

  const list = useMemo(() => {
    const all = [...discussions].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned));
    return cat === "all" ? all : all.filter((d) => d.category === cat);
  }, [cat]);

  return (
    <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
      {/* Categories sidebar */}
      <aside className="space-y-1">
        <button
          onClick={() => setCat("all")}
          className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm ${
            cat === "all" ? "bg-[#1f6feb33] text-[#58a6ff]" : "text-[#c9d1d9] hover:bg-[#21262d]"
          }`}
        >
          <span className="flex items-center gap-2">📋 {lang === "ru" ? "Все" : "All"}</span>
          <span className="font-mono text-xs text-[#8b949e]">{discussions.length}</span>
        </button>
        {discussionCategories.map((c) => {
          const count = discussions.filter((d) => d.category === c.key).length;
          return (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm ${
                cat === c.key ? "bg-[#1f6feb33] text-[#58a6ff]" : "text-[#c9d1d9] hover:bg-[#21262d]"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </span>
              <span className="font-mono text-xs text-[#8b949e]">{count}</span>
            </button>
          );
        })}
      </aside>

      {/* List */}
      <ul className="space-y-2">
        {list.map((d) => {
          const meta = discussionCategories.find((c) => c.key === d.category)!;
          const open = d.id === openId;

          // ===== ЗАДАЧА ТРЕКЕРА — особое отображение =====
          if (d.task) {
            return (
              <li key={d.id}>
                <TaskCard
                  discussion={d}
                  open={open}
                  onToggle={() => setOpenId(open ? null : d.id)}
                />
              </li>
            );
          }

          // ===== ОБЫЧНОЕ ОБСУЖДЕНИЕ =====
          return (
            <li
              key={d.id}
              className="overflow-hidden rounded-md border border-[#30363d] bg-[#161b22]"
            >
              <button
                onClick={() => setOpenId(open ? null : d.id)}
                className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-[#1f6feb0d]"
              >
                <span className="mt-0.5 text-lg">{meta.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {d.pinned && (
                      <span className="rounded-full border border-[#3fb95066] bg-[#3fb95022] px-1.5 py-0 text-[10px] font-semibold uppercase text-[#3fb950]">
                        📌 Pinned
                      </span>
                    )}
                    {d.answered && (
                      <span className="rounded-full border border-[#a371f766] bg-[#a371f722] px-1.5 py-0 text-[10px] font-semibold uppercase text-[#a371f7]">
                        ✓ Answered
                      </span>
                    )}
                    <span className="text-sm font-semibold text-[#e6edf3]">{d.title}</span>
                  </div>
                  <div className="mt-1 text-xs text-[#8b949e]">
                    <span style={{ color: meta.color }}>{meta.label}</span> ·{" "}
                    <a
                      href={githubUser(d.author)}
                      target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#c9d1d9] hover:text-[#2f81f7] hover:underline"
                    >
                      @{d.author}
                    </a> ({d.authorRole}) · {d.updated}
                  </div>
                </div>
                <div className="hidden shrink-0 items-center gap-3 text-xs text-[#8b949e] sm:flex">
                  <span>⬆ {d.upvotes}</span>
                  <span>💬 {d.comments}</span>
                </div>
              </button>

              {open && (
                <div className="border-t border-[#30363d] bg-[#0d1117] px-4 py-4">
                  <p className="text-sm leading-6 text-[#c9d1d9]">{d.body}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
