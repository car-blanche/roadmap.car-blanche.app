import { useState } from "react";
import { fileTree, type FileNode } from "../../data/github";

export function FileTree() {
  return (
    <div className="overflow-hidden rounded-md border border-[#30363d]">
      {/* commit header */}
      <div className="flex items-center justify-between gap-3 border-b border-[#30363d] bg-[#161b22] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#58a6ff] to-[#a371f7] text-[10px] font-semibold text-white">
            PL
          </div>
          <a href="#" className="text-sm font-semibold text-[#e6edf3] hover:text-[#2f81f7]">
            product-lead
          </a>
          <span className="truncate text-sm text-[#8b949e]">
            docs: обновлены KPI и протоколы шофёров
          </span>
        </div>
        <div className="hidden items-center gap-3 text-xs text-[#8b949e] sm:flex">
          <a href="#" className="font-mono text-[#2f81f7] hover:underline">
            a3f72e1
          </a>
          <span>2 часа назад</span>
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Z" />
            </svg>
            <strong className="text-[#e6edf3]">1,284</strong> commits
          </span>
        </div>
      </div>

      {/* tree */}
      <ul className="divide-y divide-[#21262d]">
        {fileTree.map((node) => (
          <TreeRow key={node.name} node={node} depth={0} />
        ))}
      </ul>
    </div>
  );
}

function TreeRow({ node, depth }: { node: FileNode; depth: number }) {
  const [open, setOpen] = useState(depth === 0 && node.name.startsWith("01"));
  const isFolder = node.type === "folder";

  return (
    <>
      <li>
        <button
          onClick={() => isFolder && setOpen(!open)}
          className={`group flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-[#1f6feb1f] ${
            isFolder ? "cursor-pointer" : "cursor-default"
          }`}
          style={{ paddingLeft: 16 + depth * 20 }}
        >
          {isFolder ? (
            <svg
              viewBox="0 0 16 16"
              className={`h-4 w-4 text-[#8b949e] transition-transform ${open ? "rotate-90" : ""}`}
              fill="currentColor"
            >
              <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
            </svg>
          ) : (
            <span className="w-4" />
          )}

          {isFolder ? (
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#58a6ff]" fill="currentColor">
              <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor">
              <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
            </svg>
          )}

          <span className={`truncate ${isFolder ? "font-semibold text-[#e6edf3]" : "text-[#e6edf3]"}`}>
            {node.name}
          </span>
          {node.desc && (
            <span className="ml-auto hidden truncate text-xs text-[#8b949e] sm:inline">
              {node.desc}
            </span>
          )}
        </button>
      </li>

      {open &&
        node.children?.map((child) => <TreeRow key={child.name} node={child} depth={depth + 1} />)}
    </>
  );
}
