import { type Discussion } from "../../data/team";
import { useLang } from "../../context/LangContext";
import { githubUser } from "../../context/ViewContext";

const COLUMN_META: Record<NonNullable<Discussion["task"]>["column"], { color: string; ru: string; en: string }> = {
  Backlog:       { color: "#8b949e", ru: "Бэклог",      en: "Backlog" },
  "To do":       { color: "#58a6ff", ru: "К выполнению", en: "To do" },
  "In progress": { color: "#d29922", ru: "В работе",    en: "In progress" },
  Review:        { color: "#a371f7", ru: "На ревью",    en: "Review" },
  Done:          { color: "#3fb950", ru: "Готово",      en: "Done" },
};

const PRIORITY_META: Record<NonNullable<Discussion["task"]>["priority"], { color: string; label: string }> = {
  P0: { color: "#f85149", label: "P0 · Critical" },
  P1: { color: "#d29922", label: "P1 · High" },
  P2: { color: "#58a6ff", label: "P2 · Medium" },
  P3: { color: "#8b949e", label: "P3 · Low" },
};

const TYPE_META: Record<NonNullable<Discussion["task"]>["type"], { icon: string; color: string; ru: string; en: string }> = {
  feature:      { icon: "✨", color: "#3fb950", ru: "Фича",        en: "Feature" },
  bug:          { icon: "🐛", color: "#f85149", ru: "Баг",          en: "Bug" },
  improvement:  { icon: "🔧", color: "#58a6ff", ru: "Улучшение",   en: "Improvement" },
  "tech-debt":  { icon: "📚", color: "#a371f7", ru: "Тех-долг",    en: "Tech debt" },
};

export function TaskCard({ discussion, open, onToggle }: {
  discussion: Discussion;
  open: boolean;
  onToggle: () => void;
}) {
  const { lang } = useLang();
  const t = discussion.task!;
  const colMeta = COLUMN_META[t.column];
  const priMeta = PRIORITY_META[t.priority];
  const typMeta = TYPE_META[t.type];

  return (
    <article
      className="overflow-hidden rounded-md border bg-[#0d1117] transition"
      style={{ borderColor: open ? priMeta.color + "66" : "#30363d" }}
    >
      {/* HEADER ROW */}
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-[#1f6feb0d]"
      >
        {/* Priority bar */}
        <div className="mt-1 h-6 w-1 shrink-0 rounded-full" style={{ background: priMeta.color }} />

        {/* Code + type icon */}
        <div className="hidden flex-col items-center gap-0.5 sm:flex">
          <span
            className="rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-bold"
            style={{ borderColor: typMeta.color + "55", background: typMeta.color + "11", color: typMeta.color }}
          >
            {t.code}
          </span>
          <span className="text-base leading-none" title={typMeta[lang]}>{typMeta.icon}</span>
        </div>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* mobile code */}
            <span
              className="rounded-md border px-1.5 py-0 font-mono text-[10px] font-bold sm:hidden"
              style={{ borderColor: typMeta.color + "55", background: typMeta.color + "11", color: typMeta.color }}
            >
              {t.code}
            </span>
            <span className="text-sm font-semibold text-[#e6edf3] sm:text-base">
              {discussion.title}
            </span>
            <span
              className="rounded-full border px-1.5 py-0 text-[9px] font-bold uppercase"
              style={{ borderColor: priMeta.color + "55", background: priMeta.color + "11", color: priMeta.color }}
              title={priMeta.label}
            >
              {t.priority}
            </span>
            <span
              className="rounded-full border px-1.5 py-0 text-[10px] font-semibold uppercase"
              style={{ borderColor: colMeta.color + "55", background: colMeta.color + "22", color: colMeta.color }}
            >
              {lang === "ru" ? colMeta.ru : colMeta.en}
            </span>
          </div>

          {/* TRACKER FIELDS — все требуемые */}
          <div className="mt-2 grid gap-x-3 gap-y-1 text-[11px] sm:grid-cols-2 lg:grid-cols-4">
            <Field icon="📁" label={lang === "ru" ? "Проект" : "Project"}    value={t.project} />
            <Field icon="🗂️" label={lang === "ru" ? "Доска"  : "Board"}      value={t.board} />
            <Field icon="📊" label={lang === "ru" ? "Колонка" : "Column"}    value={lang === "ru" ? colMeta.ru : colMeta.en} valueColor={colMeta.color} />
            <Field icon="👤" label={lang === "ru" ? "Исполнитель" : "Assignee"}>
              <a
                href={githubUser(t.assignee)}
                target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-semibold text-[#c9d1d9] hover:text-[#2f81f7] hover:underline"
              >
                @{t.assignee}
              </a>
            </Field>
            <Field icon="📅" label={lang === "ru" ? "Дата" : "Due date"}    value={t.dueDate} />
            <Field icon="⏱" label={lang === "ru" ? "Оценка" : "Estimate"}  value={`${t.estimateHours} ${lang === "ru" ? "ч" : "h"}`} />
            <Field icon={typMeta.icon} label={lang === "ru" ? "Тип" : "Type"} value={lang === "ru" ? typMeta.ru : typMeta.en} valueColor={typMeta.color} />
            <Field icon="🏷️" label={lang === "ru" ? "Теги" : "Tags"}        value={t.tags.length.toString() + (lang === "ru" ? " шт." : "")} />
          </div>

          {/* Tags row */}
          {t.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {t.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#388bfd1a] px-1.5 py-0 text-[10px] font-medium text-[#2f81f7]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right meta */}
        <div className="hidden shrink-0 flex-col items-end gap-1 text-xs text-[#8b949e] sm:flex">
          <span>⬆ {discussion.upvotes}</span>
          <span>💬 {discussion.comments}</span>
        </div>
      </button>

      {/* EXPANDED — описание задачи */}
      {open && (
        <div className="border-t border-[#30363d] bg-[#161b22] px-4 py-4">
          {/* Описание */}
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
            📝 {lang === "ru" ? "Описание задачи" : "Task description"}
          </div>
          <p className="text-sm leading-6 text-[#c9d1d9]">{discussion.body}</p>

          {/* Полная карточка трекера */}
          <div className="mt-4 rounded-md border border-[#30363d] bg-[#0d1117] p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
                {lang === "ru" ? "Карточка задачи" : "Task card"}
              </div>
              <span className="font-mono text-[10px] text-[#8b949e]">{t.code}</span>
            </div>
            <dl className="grid gap-y-2 text-xs sm:grid-cols-2">
              <DetailRow label={lang === "ru" ? "Проект"      : "Project"}   value={t.project} />
              <DetailRow label={lang === "ru" ? "Доска"       : "Board"}     value={t.board} />
              <DetailRow label={lang === "ru" ? "Колонка"     : "Column"}    value={lang === "ru" ? colMeta.ru : colMeta.en} color={colMeta.color} />
              <DetailRow label={lang === "ru" ? "Исполнитель" : "Assignee"}  value={`@${t.assignee}`} />
              <DetailRow label={lang === "ru" ? "Дата"        : "Due date"}  value={t.dueDate} />
              <DetailRow label={lang === "ru" ? "Оценка времени" : "Estimate"} value={`${t.estimateHours} ${lang === "ru" ? "часов" : "hours"}`} />
              <DetailRow label={lang === "ru" ? "Тип"         : "Type"}      value={`${typMeta.icon} ${lang === "ru" ? typMeta.ru : typMeta.en}`} color={typMeta.color} />
              <DetailRow label={lang === "ru" ? "Приоритет"   : "Priority"}  value={priMeta.label} color={priMeta.color} />
            </dl>

            {/* Tags full */}
            {t.tags.length > 0 && (
              <div className="mt-3 border-t border-[#30363d] pt-2">
                <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
                  🏷️ {lang === "ru" ? "Теги" : "Tags"}
                </div>
                <div className="flex flex-wrap gap-1">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#388bfd1a] px-2 py-0.5 text-[11px] font-medium text-[#2f81f7]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="rounded-md bg-[#238636] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2ea043]">
              ✓ {lang === "ru" ? "Изменить статус" : "Change status"}
            </button>
            <button className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs text-[#e6edf3] hover:bg-[#30363d]">
              👤 {lang === "ru" ? "Переназначить" : "Reassign"}
            </button>
            <button className="rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs text-[#e6edf3] hover:bg-[#30363d]">
              💬 {lang === "ru" ? "Комментировать" : "Comment"}
            </button>
            <a
              href={`https://github.com/car-blanche`}
              target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ml-auto inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs text-[#e6edf3] hover:bg-[#30363d]"
            >
              🐙 GitHub
            </a>
          </div>
        </div>
      )}
    </article>
  );
}

function Field({
  icon, label, value, valueColor, children,
}: {
  icon: string;
  label: string;
  value?: string;
  valueColor?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[#8b949e] min-w-0">
      <span className="shrink-0 text-xs leading-none opacity-80">{icon}</span>
      <span className="shrink-0 font-semibold uppercase tracking-wider text-[9px]">{label}:</span>
      <span
        className="truncate font-medium"
        style={valueColor ? { color: valueColor } : { color: "#c9d1d9" }}
      >
        {children ?? value}
      </span>
    </div>
  );
}

function DetailRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="w-32 shrink-0 text-[#8b949e]">{label}</dt>
      <dd className="font-medium" style={color ? { color } : { color: "#e6edf3" }}>
        {value}
      </dd>
    </div>
  );
}
