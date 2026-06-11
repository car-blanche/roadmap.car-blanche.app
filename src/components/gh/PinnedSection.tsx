import { pinnedItems } from "../../data/team";
import { useView, type ViewKey } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";

export function PinnedSection() {
  const { setView } = useView();
  const { t } = useLang();
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-semibold text-[#e6edf3]">
          <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor">
            <path d="m11.294.984 3.722 3.722a1.75 1.75 0 0 1-.504 2.826l-1.327.613a3.089 3.089 0 0 1-.851.247l-.66.09-1.082 5.41a1 1 0 0 1-.69.766L9.81 14.7a.75.75 0 0 1-.762-.184L6.034 11.5l-3.27 3.27a.749.749 0 1 1-1.06-1.06l3.27-3.27-3.016-3.014a.75.75 0 0 1-.18-.763l.04-.092a1 1 0 0 1 .764-.69l5.41-1.082.09-.66c.067-.486.152-.766.247-.851l.613-1.327A1.75 1.75 0 0 1 8.47.488Z" />
          </svg>
          {t("pinned.title")}
        </h3>
        <button className="text-xs text-[#8b949e] hover:text-[#2f81f7] hover:underline">
          {t("pinned.customize")}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pinnedItems.map((p) => (
          <button
            key={p.title}
            onClick={() => setView(p.target as ViewKey)}
            className="group flex flex-col rounded-md border border-[#30363d] bg-[#0d1117] p-4 text-left transition hover:border-[#58a6ff66] hover:bg-[#161b22]"
          >
            <div className="flex items-start gap-2">
              <span
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: p.iconColor, boxShadow: `0 0 8px ${p.iconColor}88` }}
              />
              <span className="text-sm font-semibold text-[#e6edf3] group-hover:text-[#2f81f7]">
                {p.title}
              </span>
            </div>
            <p className="mt-2 flex-1 text-xs leading-5 text-[#8b949e] line-clamp-2">{p.desc}</p>
            <div className="mt-3 truncate font-mono text-[10px] text-[#6e7681]">{p.meta}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
