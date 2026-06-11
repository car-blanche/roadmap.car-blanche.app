import { type Repo } from "../../data/repos";
import { useLang } from "../../context/LangContext";
import { COMPANY_LINKS } from "../../context/ViewContext";

export function RepoCard({ repo }: { repo: Repo }) {
  const { lang } = useLang();

  return (
    <article className="group flex h-full flex-col rounded-md border border-[#30363d] bg-[#161b22] p-4 transition hover:border-[#58a6ff66] hover:bg-[#1c2128]">
      {/* Header: repo + visibility + pinned */}
      <div className="flex items-start gap-2">
        {/* Repo icon */}
        <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-[#8b949e]" fill="currentColor">
          <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
        </svg>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <a
              href={COMPANY_LINKS.github}
              target="_blank" rel="noopener noreferrer"
              className="truncate text-sm font-semibold text-[#58a6ff] hover:underline"
            >
              {repo.name}
            </a>
            <span className="rounded-full border border-[#30363d] px-2 py-0 text-[10px] font-medium text-[#8b949e]">
              {repo.visibility}
            </span>
            {repo.isPinned && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-[#e3b34122] px-1.5 py-0 text-[9px] font-semibold uppercase text-[#e3b341]">
                📌 pinned
              </span>
            )}
          </div>
          <div className="mt-0.5 text-[10px] text-[#8b949e]">
            <a href={COMPANY_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#2f81f7]">
              @{repo.owner}
            </a>
          </div>
        </div>

        {/* Star button (decorative) */}
        <a
          href={COMPANY_LINKS.github}
          target="_blank" rel="noopener noreferrer"
          className="hidden items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-0.5 text-xs text-[#e6edf3] hover:bg-[#30363d] sm:inline-flex"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3 text-[#e3b341]" fill="currentColor">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
          </svg>
          Star
        </a>
      </div>

      {/* Description */}
      <p className="mt-3 flex-1 text-xs leading-5 text-[#c9d1d9]">
        {repo.description[lang]}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {repo.topics.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full bg-[#388bfd1a] px-2 py-0.5 text-[10px] font-medium text-[#2f81f7]"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer: language + stars + forks + updated */}
      <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-[#30363d] pt-2.5 text-[11px] text-[#8b949e]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: repo.languageColor }} />
          {repo.language}
        </span>
        <span className="inline-flex items-center gap-1">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
          </svg>
          {repo.stars >= 1000 ? `${(repo.stars / 1000).toFixed(1)}k` : repo.stars}
        </span>
        <span className="inline-flex items-center gap-1">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0Z" />
          </svg>
          {repo.forks}
        </span>
        <span className="ml-auto">Updated {repo.updated}</span>
      </div>
    </article>
  );
}
