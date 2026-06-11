import { useEffect } from "react";
import { useSettings } from "../../context/SettingsContext";
import { useLang } from "../../context/LangContext";

export function ShortcutsDialog() {
  const { shortcutsOpen, closeShortcuts } = useSettings();
  const { t } = useLang();

  useEffect(() => {
    if (!shortcutsOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeShortcuts(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcutsOpen, closeShortcuts]);

  if (!shortcutsOpen) return null;

  const sections: { title: string; rows: { keys: string[]; label: string }[] }[] = [
    {
      title: t("kb.section.search"),
      rows: [
        { keys: ["/"],         label: t("kb.action.search") },
        { keys: ["⌘", "K"],    label: t("kb.action.cmdk") },
        { keys: ["g", "c"],    label: t("kb.action.gotoCode") },
        { keys: ["g", "i"],    label: t("kb.action.gotoIssues") },
        { keys: ["g", "t"],    label: t("kb.action.gotoTeam") },
        { keys: ["g", "w"],    label: t("kb.action.gotoWiki") },
      ],
    },
    {
      title: t("kb.section.app"),
      rows: [
        { keys: [","],         label: t("kb.action.settings") },
        { keys: ["?"],         label: t("kb.action.shortcuts") },
        { keys: ["Esc"],       label: t("kb.action.close") },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      <button onClick={closeShortcuts} className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Close" />
      <div
        className="absolute left-1/2 top-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl"
        style={{ animation: "dialogIn 0.18s ease-out" }}
      >
        <div className="flex items-start justify-between border-b border-[#30363d] bg-[#161b22] px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⌨️</span>
              <h2 className="text-base font-semibold text-[#e6edf3]">{t("kb.title")}</h2>
            </div>
            <p className="mt-0.5 text-xs text-[#8b949e]">{t("kb.subtitle")}</p>
          </div>
          <button
            onClick={closeShortcuts}
            className="rounded-md border border-[#30363d] bg-[#21262d] p-1.5 text-[#e6edf3] hover:bg-[#30363d]"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor"><path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" /></svg>
          </button>
        </div>

        <div className="max-h-[60vh] space-y-5 overflow-auto p-5">
          {sections.map((sec) => (
            <section key={sec.title}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
                {sec.title}
              </h3>
              <ul className="space-y-1">
                {sec.rows.map((r) => (
                  <li
                    key={r.label}
                    className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-[#1f6feb1f]"
                  >
                    <span className="text-sm text-[#c9d1d9]">{r.label}</span>
                    <span className="flex items-center gap-1">
                      {r.keys.map((k, i) => (
                        <span key={i} className="inline-flex items-center gap-1">
                          {i > 0 && <span className="text-xs text-[#6e7681]">+</span>}
                          <kbd className="rounded border border-[#30363d] bg-[#21262d] px-2 py-0.5 font-mono text-xs text-[#e6edf3]">
                            {k}
                          </kbd>
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes dialogIn {
          from { transform: translate(-50%, -45%); opacity: 0; }
          to   { transform: translate(-50%, -50%); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
