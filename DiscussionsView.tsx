import { discussions } from "../../data/team";
import { ViewHero } from "../gh/ViewHero";
import { CollapseSection, CollapsePreview } from "../gh/CollapseSection";
import { DiscussionsList } from "../gh/DiscussionsList";
import { useLang } from "../../context/LangContext";

export function DiscussionsView() {
  const { lang } = useLang();

  const tasks = discussions.filter((d) => d.task);
  const counts = {
    total: discussions.length,
    pinned: discussions.filter((d) => d.pinned).length,
    answered: discussions.filter((d) => d.answered).length,
    qa: discussions.filter((d) => d.category === "qa").length,
    tasks: tasks.length,
  };

  // Колонки канбан-доски
  const columnCounts = {
    "To do":       tasks.filter((d) => d.task?.column === "To do").length,
    "In progress": tasks.filter((d) => d.task?.column === "In progress").length,
    "Review":      tasks.filter((d) => d.task?.column === "Review").length,
    "Backlog":     tasks.filter((d) => d.task?.column === "Backlog").length,
  };

  // Приоритетные задачи (P0/P1)
  const priorityTasks = tasks
    .filter((d) => d.task?.priority === "P0" || d.task?.priority === "P1")
    .sort((a) => (a.task!.priority === "P0" ? -1 : 1));

  // Featured: pinned discussions без задач (обычные обсуждения)
  const pinnedRegular = discussions.filter((d) => d.pinned && !d.task).slice(0, 2);

  return (
    <section className="space-y-6">
      {/* HERO */}
      <ViewHero
        icon="💬"
        kicker={{ ru: "Discussions", en: "Discussions" }}
        kickerColor="#58a6ff"
        gradientFrom="#58a6ff"
        gradientTo="#a371f7"
        title={{
          ru: "О чём думает и говорит наша команда",
          en: "What our team thinks and talks about",
        }}
        subtitle={{
          ru: "Открытые обсуждения, идеи, объявления и Q&A команды Car Blanche. Прозрачность мышления — для клиентов, инвесторов и будущих сотрудников.",
          en: "Open discussions, ideas, announcements, and Q&A from the Car Blanche team. Transparency of thought — for clients, investors, and future hires.",
        }}
        audiences={["clients", "investors", "developers", "partners"]}
        stats={[
          { value: counts.tasks.toString(),    label: { ru: "Задач в работе", en: "Active tasks" }, color: "#f85149" },
          { value: counts.total.toString(),    label: { ru: "Всего тем",       en: "Discussions" }, color: "#58a6ff" },
          { value: counts.qa.toString(),       label: { ru: "Q&A",             en: "Q&A" },         color: "#a371f7" },
          { value: counts.answered.toString(), label: { ru: "С ответом",      en: "Answered" },    color: "#d29922" },
        ]}
      />

      {/* PRIORITY TASKS — главное для команды и стейкхолдеров */}
      <section className="relative overflow-hidden rounded-xl border border-[#f8514955] bg-[#0d1117] p-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f8514911] via-transparent to-[#d2992211]" />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#e6edf3]">
              <span className="text-xl">🎯</span>
              {lang === "ru" ? "Приоритетные задачи команды" : "Team priority tasks"}
            </h2>
            <span className="text-xs text-[#8b949e]">
              {lang === "ru" ? "P0 и P1 · обновлено сегодня" : "P0 and P1 · updated today"}
            </span>
          </div>
          <p className="mb-4 text-sm text-[#8b949e]">
            {lang === "ru"
              ? "Что мы делаем для клиентов прямо сейчас — фичи, баги, улучшения. Полная карточка каждой задачи: проект, доска, исполнитель, оценка."
              : "What we're shipping right now — features, bugs, improvements. Full task card per item: project, board, assignee, estimate."}
          </p>

          {/* Канбан-summary */}
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <KanbanStat label={lang === "ru" ? "К выполнению" : "To do"}     value={columnCounts["To do"]}       color="#58a6ff" />
            <KanbanStat label={lang === "ru" ? "В работе"     : "In progress"} value={columnCounts["In progress"]} color="#d29922" />
            <KanbanStat label={lang === "ru" ? "На ревью"     : "Review"}    value={columnCounts["Review"]}      color="#a371f7" />
            <KanbanStat label={lang === "ru" ? "Бэклог"        : "Backlog"}   value={columnCounts["Backlog"]}     color="#8b949e" />
          </div>

          {/* Топ-3 приоритетные задачи */}
          <div className="grid gap-3">
            {priorityTasks.slice(0, 3).map((d) => {
              const t = d.task!;
              const priColor = t.priority === "P0" ? "#f85149" : "#d29922";
              return (
                <article
                  key={d.id}
                  className="rounded-md border bg-[#161b22] p-3 transition hover:border-[#58a6ff66]"
                  style={{ borderColor: priColor + "55" }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-md border px-1.5 py-0 font-mono text-[10px] font-bold"
                      style={{ borderColor: priColor + "66", background: priColor + "11", color: priColor }}
                    >
                      {t.code}
                    </span>
                    <span
                      className="rounded-full border px-1.5 py-0 text-[9px] font-bold uppercase"
                      style={{ borderColor: priColor + "55", background: priColor + "11", color: priColor }}
                    >
                      {t.priority}
                    </span>
                    <span className="text-sm font-semibold text-[#e6edf3]">{d.title}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#8b949e]">
                    <span>📁 {t.project}</span>
                    <span>·</span>
                    <span>📊 {t.column}</span>
                    <span>·</span>
                    <span>👤 @{t.assignee}</span>
                    <span>·</span>
                    <span>📅 {t.dueDate}</span>
                    <span>·</span>
                    <span>⏱ {t.estimateHours}ч</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PINNED REGULAR — обсуждения (без задач) */}
      {pinnedRegular.length > 0 && (
        <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3fb95011] via-transparent to-[#58a6ff11]" />
          <div className="relative">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">📌</span>
              <h2 className="text-lg font-semibold text-[#e6edf3]">
                {lang === "ru" ? "Закреплённые обсуждения" : "Pinned discussions"}
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {pinnedRegular.map((d) => (
                <article
                  key={d.id}
                  className="rounded-md border border-[#3fb95066] bg-[#3fb95011] p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-[#3fb95022] px-1.5 py-0 text-[10px] font-semibold uppercase text-[#3fb950]">
                      📌 Pinned
                    </span>
                    <span className="text-[10px] text-[#8b949e]">#{d.id}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#e6edf3]">{d.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-[#c9d1d9] line-clamp-2">{d.body}</p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-[#8b949e]">
                    <span>@{d.author}</span>
                    <span>⬆ {d.upvotes}</span>
                    <span>💬 {d.comments}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DEVELOPER DETAIL */}
      <CollapseSection
        icon="⚙️"
        iconBg="#58a6ff33"
        badge="All discussions"
        badgeColor="#58a6ff"
        title={{
          ru: "Все обсуждения команды",
          en: "All team discussions",
        }}
        subtitle={{
          ru: "Полный список с фильтрами по категориям и раскрытием каждой темы.",
          en: "Full list with category filters and topic expansion.",
        }}
        preview={
          <CollapsePreview
            items={[
              { value: counts.total.toString(),  label: "topics", color: "#58a6ff" },
              { value: counts.pinned.toString(), label: "pinned", color: "#3fb950" },
            ]}
          />
        }
      >
        <DiscussionsList />
      </CollapseSection>
    </section>
  );
}

function KanbanStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      className="rounded-md border bg-[#0d1117] px-3 py-2 transition hover:scale-[1.02]"
      style={{ borderColor: color + "44" }}
    >
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
        {label}
      </div>
      <div className="mt-1 font-mono text-xl font-bold" style={{ color }}>{value}</div>
    </div>
  );
}
