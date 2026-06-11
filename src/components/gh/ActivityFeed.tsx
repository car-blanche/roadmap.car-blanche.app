import { teamActivity, type ActivityItem } from "../../data/team";
import { useView, type ViewKey } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";

const targetMap: Record<ActivityItem["targetKind"], ViewKey> = {
  pr: "pulls",
  issue: "issues",
  commit: "code",
  release: "code",
  discussion: "discussions",
  review: "pulls",
};

const iconFor = (k: ActivityItem["targetKind"]) => {
  switch (k) {
    case "pr":         return "🔀";
    case "issue":      return "🐛";
    case "commit":     return "✏️";
    case "release":    return "🚀";
    case "discussion": return "💬";
    case "review":     return "👁";
  }
};

export function ActivityFeed() {
  const { setView } = useView();
  const { t } = useLang();
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-semibold text-[#e6edf3]">
          {t("side.teamActivity")}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fb950] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3fb950]" />
          </span>
        </h3>
        <button className="text-xs text-[#8b949e] hover:text-[#2f81f7]">filters</button>
      </div>

      <ul className="space-y-2">
        {teamActivity.slice(0, 6).map((a) => (
          <li key={a.id}>
            <button
              onClick={() => setView(targetMap[a.targetKind])}
              className="group flex w-full items-start gap-2 rounded-md p-1.5 text-left hover:bg-[#1f6feb1f]"
            >
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${a.authorColor}, ${a.authorColor}aa)` }}
                title={a.author}
              >
                {a.author.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1 text-xs">
                <div className="text-[#c9d1d9]">
                  <span className="font-semibold text-[#e6edf3]">@{a.author}</span>{" "}
                  <span className="text-[#8b949e]">{a.action}</span>{" "}
                  <span className="text-[#e6edf3] group-hover:text-[#2f81f7] group-hover:underline">
                    {iconFor(a.targetKind)} {a.target}
                  </span>
                </div>
                <div className="mt-0.5 text-[10px] text-[#6e7681]">{a.time}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setView("insights")}
        className="mt-2 text-xs text-[#2f81f7] hover:underline"
      >
        {t("side.viewAllActivity")}
      </button>
    </section>
  );
}
