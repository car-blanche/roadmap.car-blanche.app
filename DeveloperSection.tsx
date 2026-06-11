import { useState } from "react";
import { BranchBar } from "./BranchBar";
import { FileTree } from "./FileTree";
import { BranchesList } from "./BranchesList";
import { useLang } from "../../context/LangContext";

const TABS: { key: "files" | "branches"; ru: string; en: string; icon: string }[] = [
  { key: "files",    ru: "Файлы и ветки",     en: "Files & branches",   icon: "📁" },
  { key: "branches", ru: "Список веток",      en: "All branches",       icon: "🌿" },
];

export function DeveloperSection() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"files" | "branches">("files");

  return (
    <section className="overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 border-b border-[#30363d] bg-[#161b22] px-5 py-4 text-left transition hover:bg-[#1c2128]"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#1f6feb33]">
            <span className="text-xl">⚙️</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-[#e6edf3]">
                {lang === "ru" ? "Для разработчиков" : "For developers"}
              </span>
              <span className="rounded-full bg-[#1f6feb33] px-1.5 py-0 text-[9px] font-semibold uppercase text-[#58a6ff]">
                Technical
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#8b949e]">
              {lang === "ru"
                ? "Файлы репозитория, ветки разработки, git-граф. Полезно команде, можно скрыть клиенту."
                : "Repository files, dev branches, git graph. Useful for the team, can be hidden from clients."}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {!open && (
            <span className="hidden text-xs text-[#58a6ff] sm:inline">
              {lang === "ru" ? "Раскрыть" : "Expand"}
            </span>
          )}
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 text-[#8b949e] transition-transform"
            style={{ transform: open ? "rotate(90deg)" : "rotate(0)" }}
            fill="currentColor"
          >
            <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="space-y-4 p-5">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1 border-b border-[#30363d] pb-3">
            {TABS.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-[#1f6feb33] text-[#58a6ff]"
                      : "text-[#c9d1d9] hover:bg-[#21262d]"
                  }`}
                >
                  <span>{t.icon}</span>
                  {lang === "ru" ? t.ru : t.en}
                </button>
              );
            })}
          </div>

          {/* Content */}
          {tab === "files" && (
            <div className="space-y-4">
              <BranchBar />
              <FileTree />
            </div>
          )}
          {tab === "branches" && <BranchesList />}
        </div>
      )}
    </section>
  );
}
