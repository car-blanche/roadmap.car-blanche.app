import { useEffect, useMemo, useRef, useState } from "react";
import { useView, COMPANY_LINKS, type ViewKey } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";
import { issues, branches, fileTree, contributors } from "../../data/github";
import { pulls, marketplaceItems, wikiPages, workflows } from "../../data/extra";
import { stages, phases } from "../../data/roadmap";
import { discussions, team, achievements } from "../../data/team";

type ResultKind =
  | "view"
  | "issue"
  | "pr"
  | "discussion"
  | "wiki"
  | "marketplace"
  | "branch"
  | "file"
  | "person"
  | "achievement"
  | "phase"
  | "milestone"
  | "workflow"
  | "external";

type Result = {
  kind: ResultKind;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  target: ViewKey | { href: string };
  haystack: string; // для поиска
};

function flattenFiles(): { path: string; desc?: string }[] {
  const out: { path: string; desc?: string }[] = [];
  const walk = (nodes: typeof fileTree, prefix: string) => {
    for (const n of nodes) {
      const p = prefix + n.name;
      if (n.type === "file") out.push({ path: p, desc: n.desc });
      if (n.children) walk(n.children, p + "/");
    }
  };
  walk(fileTree, "");
  return out;
}

function buildIndex(): Result[] {
  const items: Result[] = [];

  // Top-level views
  const views: { key: ViewKey; title: string; subtitle: string; badge: string; color: string }[] = [
    { key: "code",          title: "Code",          subtitle: "Файлы, README, ветки, коммиты", badge: "View", color: "#58a6ff" },
    { key: "issues",        title: "Issues",        subtitle: "Решения, риски, обсуждения",     badge: "View", color: "#3fb950" },
    { key: "pulls",         title: "Pull requests", subtitle: "Открытые PR и ревью",            badge: "View", color: "#3fb950" },
    { key: "discussions",   title: "Discussions",   subtitle: "Объявления, Q&A, идеи, голосования", badge: "View", color: "#58a6ff" },
    { key: "actions",       title: "Actions",       subtitle: "CI/CD, workflows, deploys",       badge: "View", color: "#2f81f7" },
    { key: "projects",      title: "Projects",      subtitle: "План разработки на 36 месяцев",  badge: "View", color: "#a371f7" },
    { key: "wiki",          title: "Wiki",          subtitle: "База знаний команды",            badge: "View", color: "#a371f7" },
    { key: "security",      title: "Security",      subtitle: "PCI DSS, ISO, GDPR, политика",   badge: "View", color: "#3fb950" },
    { key: "insights",      title: "Insights",      subtitle: "Метрики команды и продукта",     badge: "View", color: "#a371f7" },
    { key: "team",          title: "Team",          subtitle: "Профили, достижения, heatmap",   badge: "View", color: "#db61a2" },
    { key: "resources",     title: "Resources",     subtitle: "Документация, API, бренд, кейсы, 3D Showroom", badge: "View", color: "#a371f7" },
    { key: "marketplace",   title: "Marketplace",   subtitle: "Интеграции и расширения",        badge: "View", color: "#d29922" },
    { key: "explore",       title: "Explore",       subtitle: "Обзор: аналитика, новости, философия + open-source", badge: "View", color: "#58a6ff" },
    { key: "notifications", title: "Inbox",         subtitle: "Уведомления и события",           badge: "View", color: "#f0883e" },
  ];
  views.forEach((v) =>
    items.push({
      kind: "view",
      title: v.title,
      subtitle: v.subtitle,
      badge: v.badge,
      badgeColor: v.color,
      target: v.key,
      haystack: `${v.title} ${v.subtitle}`.toLowerCase(),
    })
  );

  // Issues
  issues.forEach((i) =>
    items.push({
      kind: "issue",
      title: i.title,
      subtitle: `#${i.id} · ${i.author} · ${i.updated}`,
      badge: i.status === "in-progress" ? "В работе" : "Open",
      badgeColor: i.status === "in-progress" ? "#d29922" : "#3fb950",
      target: "issues",
      haystack: `${i.title} ${i.body} ${i.author} ${i.labels.map((l) => l.name).join(" ")}`.toLowerCase(),
    })
  );

  // PRs
  pulls.forEach((p) =>
    items.push({
      kind: "pr",
      title: p.title,
      subtitle: `#${p.id} · ${p.author} · ${p.branchFrom} → ${p.branchTo}`,
      badge: p.status,
      badgeColor:
        p.status === "merged" ? "#a371f7" :
        p.status === "draft"  ? "#8b949e" :
        p.status === "review" ? "#d29922" : "#3fb950",
      target: "pulls",
      haystack: `${p.title} ${p.description} ${p.author} ${p.branchFrom} ${p.branchTo} ${p.labels.map((l) => l.name).join(" ")}`.toLowerCase(),
    })
  );

  // Wiki pages
  wikiPages.forEach((w) =>
    items.push({
      kind: "wiki",
      title: w.title,
      subtitle: `${w.group} · ${w.slug}.md`,
      badge: "Wiki",
      badgeColor: "#a371f7",
      target: "wiki",
      haystack: `${w.title} ${w.desc} ${w.group} ${w.slug}`.toLowerCase(),
    })
  );

  // Marketplace
  marketplaceItems.forEach((m) =>
    items.push({
      kind: "marketplace",
      title: m.name,
      subtitle: `${m.category} · ${m.publisher} · ${m.installs} установок`,
      badge: m.price,
      badgeColor:
        m.price === "Free" ? "#3fb950" :
        m.price === "Paid" ? "#d29922" : "#58a6ff",
      target: "marketplace",
      haystack: `${m.name} ${m.description} ${m.publisher} ${m.category}`.toLowerCase(),
    })
  );

  // Branches
  branches.forEach((b) =>
    items.push({
      kind: "branch",
      title: b.name,
      subtitle: `${b.label} · обновлено ${b.updated}${b.pr ? ` · PR #${b.pr}` : ""}`,
      badge: "Branch",
      badgeColor: b.color,
      target: "code",
      haystack: `${b.name} ${b.label}`.toLowerCase(),
    })
  );

  // Files
  flattenFiles().forEach((f) =>
    items.push({
      kind: "file",
      title: f.path,
      subtitle: f.desc,
      badge: "File",
      badgeColor: "#58a6ff",
      target: "code",
      haystack: `${f.path} ${f.desc ?? ""}`.toLowerCase(),
    })
  );

  // Contributors (расширенные профили из team.ts + базовые из github.ts)
  team.forEach((c) =>
    items.push({
      kind: "person",
      title: `@${c.username}`,
      subtitle: `${c.fullName} · ${c.bio.slice(0, 80)}…`,
      badge: c.badge,
      badgeColor:
        c.badge === "Owner" ? "#d29922" :
        c.badge === "Maintainer" ? "#3fb950" : "#a371f7",
      target: "team",
      haystack: `${c.username} ${c.fullName} ${c.bio} ${c.location} ${c.stack.join(" ")} ${c.badge}`.toLowerCase(),
    })
  );
  // fallback индекс на старые контрибьюторы (если кто-то ещё в github.ts)
  contributors.forEach((c) => {
    if (team.find((t) => t.username === c.name)) return;
    items.push({
      kind: "person",
      title: `@${c.name}`,
      subtitle: `${c.fullName} · ${c.role}`,
      badge: c.badge,
      badgeColor:
        c.badge === "Owner" ? "#d29922" :
        c.badge === "Maintainer" ? "#3fb950" : "#a371f7",
      target: "team",
      haystack: `${c.name} ${c.fullName} ${c.role} ${c.badge}`.toLowerCase(),
    });
  });

  // Discussions
  discussions.forEach((d) =>
    items.push({
      kind: "discussion",
      title: d.title,
      subtitle: `#${d.id} · ${d.category} · @${d.author} · ${d.updated}`,
      badge: d.pinned ? "📌 Pinned" : d.answered ? "✓ Answered" : d.category,
      badgeColor: d.pinned ? "#3fb950" : d.answered ? "#a371f7" : "#58a6ff",
      target: "discussions",
      haystack: `${d.title} ${d.body} ${d.author} ${d.category} ${d.labels.map((l) => l.name).join(" ")}`.toLowerCase(),
    })
  );

  // Achievements
  achievements.forEach((a) =>
    items.push({
      kind: "achievement",
      title: `${a.icon} ${a.name}`,
      subtitle: `${a.desc} · разблокировали: ${a.unlockedBy.map((u) => "@" + u).join(", ")}`,
      badge: a.tier,
      badgeColor:
        a.tier === "platinum" ? "#22d3ee" :
        a.tier === "gold"     ? "#eab308" :
        a.tier === "silver"   ? "#a1a1aa" : "#a16207",
      target: "team",
      haystack: `${a.name} ${a.desc} ${a.tier} ${a.unlockedBy.join(" ")}`.toLowerCase(),
    })
  );

  // Phases
  phases.forEach((p) =>
    items.push({
      kind: "phase",
      title: p.title,
      subtitle: `${p.period} · фаза ${p.year}`,
      badge: `Phase ${p.year}`,
      badgeColor: "#a371f7",
      target: "code",
      haystack: `${p.title} ${p.description} ${p.items.map((i) => i.label + " " + i.detail).join(" ")} ${p.period}`.toLowerCase(),
    })
  );

  // Milestones / stages from Plan B
  stages.forEach((s) =>
    items.push({
      kind: "milestone",
      title: s.title,
      subtitle: `${s.quarter} · ${s.period}`,
      badge: "Milestone",
      badgeColor: "#a371f7",
      target: "projects",
      haystack: `${s.title} ${s.goal} ${s.quarter} ${s.period} ${s.deliverables.map((d) => d.label + " " + d.desc).join(" ")}`.toLowerCase(),
    })
  );

  // Workflows
  workflows.forEach((w) =>
    items.push({
      kind: "workflow",
      title: w.name,
      subtitle: `${w.file} · ${w.branch} · ${w.triggered}`,
      badge: w.status,
      badgeColor:
        w.status === "success" ? "#3fb950" :
        w.status === "failed"  ? "#f85149" :
        w.status === "running" ? "#58a6ff" : "#8b949e",
      target: "actions",
      haystack: `${w.name} ${w.file} ${w.branch} ${w.commitMessage}`.toLowerCase(),
    })
  );

  // External links
  items.push(
    {
      kind: "external",
      title: "github.com/car-blanche",
      subtitle: "Официальный GitHub-аккаунт компании · открыть в новой вкладке",
      badge: "GitHub",
      badgeColor: "#a371f7",
      target: { href: COMPANY_LINKS.github },
      haystack: "github гитхаб car-blanche org open-source организация репозитории",
    },
    {
      kind: "external",
      title: "car-blanche.net",
      subtitle: "Корпоративный сайт компании",
      badge: "External",
      badgeColor: "#58a6ff",
      target: { href: COMPANY_LINKS.net },
      haystack: "car-blanche.net корпоративный сайт компания о компании",
    },
    {
      kind: "external",
      title: "car-blanche.app",
      subtitle: "Открыть приложение Car Blanche",
      badge: "External",
      badgeColor: "#58a6ff",
      target: { href: COMPANY_LINKS.app },
      haystack: "car-blanche.app приложение app мобильное",
    },
    {
      kind: "external",
      title: "3D Showroom Experience",
      subtitle: "Featured · WebGL-витрина автопарка · Flutter Web + Three.js",
      badge: "Showcase",
      badgeColor: "#a371f7",
      target: { href: COMPANY_LINKS.showroom3d },
      haystack: "3d showroom experience webgl flutter three.js витрина автопарк кейс showcase featured",
    },
    {
      kind: "external",
      title: "Персонализация как новая норма (2026)",
      subtitle: "Главная статья · BMW 5 G30 · McKinsey 80% · сценарии бизнес/семья/трансфер",
      badge: "Article",
      badgeColor: "#58a6ff",
      target: { href: COMPANY_LINKS.article2026 },
      haystack: "статья 2026 mckinsey bmw 5 g30 семейная бизнес трансфер сценарий персонализация premium",
    },
    {
      kind: "external",
      title: "Business News · car-blanche.net",
      subtitle: "Лента бизнес-новостей: парк, B2B, академия шофёров, расширение, технологии",
      badge: "News",
      badgeColor: "#f0883e",
      target: { href: COMPANY_LINKS.businessNews },
      haystack: "news новости businessnews бмв mercedes lexus toyota audi land cruiser шофёр парк b2b корпоратив",
    }
  );

  return items;
}

const groupLabels: Record<ResultKind, string> = {
  view: "Разделы",
  issue: "Issues",
  pr: "Pull requests",
  discussion: "Discussions",
  wiki: "Wiki",
  marketplace: "Marketplace",
  branch: "Branches",
  file: "Files",
  person: "Команда",
  achievement: "Достижения",
  phase: "Фазы roadmap",
  milestone: "Milestones · Plan B",
  workflow: "Workflows",
  external: "Внешние ссылки",
};

const groupOrder: ResultKind[] = [
  "view",
  "discussion",
  "issue",
  "pr",
  "milestone",
  "phase",
  "wiki",
  "marketplace",
  "branch",
  "file",
  "person",
  "achievement",
  "workflow",
  "external",
];

function iconForKind(k: ResultKind) {
  const cls = "h-4 w-4 text-[#8b949e]";
  switch (k) {
    case "issue":       return <svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z" /></svg>;
    case "pr":          return <svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Z" /></svg>;
    case "wiki":        return <svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Z" /></svg>;
    case "marketplace": return <svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.75 0A1.75 1.75 0 0 0 0 1.75v2.5a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .25-.25h12.5a.25.25 0 0 1 .25.25v2.5a.75.75 0 0 0 1.5 0v-2.5A1.75 1.75 0 0 0 14.25 0Z" /><path d="M3 8a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0Zm4 0a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0Zm4 0a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0Z" /></svg>;
    case "branch":      return <svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Z" /></svg>;
    case "file":        return <svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Z" /></svg>;
    case "person":      return <svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" /></svg>;
    case "phase":
    case "milestone":   return <svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M7.75 0a.75.75 0 0 1 .75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 0 1 0 2.672l-2.07 1.75a1.75 1.75 0 0 1-1.13.414H8.5v5.25a.75.75 0 0 1-1.5 0V10H2.75A1.75 1.75 0 0 1 1 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 0 1 7.75 0Z" /></svg>;
    case "workflow":    return <svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Z" /></svg>;
    case "external":    return <svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" /></svg>;
    case "discussion":  return <svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1Z" /></svg>;
    case "achievement": return <span className="text-base">🏆</span>;
    case "view":
    default:            return <svg viewBox="0 0 16 16" className={cls} fill="currentColor"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z" /></svg>;
  }
}

const QUICK_SUGGESTIONS = [
  "BMW",
  "fleet",
  "businessnews",
  "Уфа",
  "шофёр",
  "Flutter",
  "PHP",
  "github",
  "team",
  "wiki",
  "3D Showroom",
];

export function SearchPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { setView } = useView();
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default: show all top-level views
      return index.filter((r) => r.kind === "view").slice(0, 11);
    }
    const tokens = q.split(/\s+/);
    const scored: { r: Result; score: number }[] = [];
    for (const r of index) {
      let score = 0;
      let allFound = true;
      for (const t of tokens) {
        if (r.haystack.includes(t)) {
          score += 1;
          if (r.title.toLowerCase().includes(t)) score += 2;
          if (r.title.toLowerCase().startsWith(t)) score += 3;
        } else {
          allFound = false;
          break;
        }
      }
      if (allFound) scored.push({ r, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 60).map((s) => s.r);
  }, [index, query]);

  // group results
  const grouped = useMemo(() => {
    const map: Partial<Record<ResultKind, Result[]>> = {};
    for (const r of results) {
      (map[r.kind] ||= []).push(r);
    }
    const order: { kind: ResultKind; items: Result[] }[] = [];
    for (const k of groupOrder) {
      if (map[k]?.length) order.push({ kind: k, items: map[k]! });
    }
    return order;
  }, [results]);

  // flat list for keyboard nav
  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  // reset active index on query change
  useEffect(() => setActive(0), [query]);

  // focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  // ensure active is visible
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-active="true"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  // global keyboard: open with `/`, close with Escape, navigate with arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, flat.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const r = flat[active];
        if (r) selectResult(r);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flat, active, onClose]);

  const selectResult = (r: Result) => {
    if (typeof r.target === "string") {
      setView(r.target);
    } else {
      window.open(r.target.href, "_blank", "noopener,noreferrer");
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Поиск по сайту">
      {/* backdrop */}
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Закрыть"
      />

      {/* palette */}
      <div className="relative mx-auto mt-[8vh] w-[92vw] max-w-2xl overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl">
        {/* search input */}
        <div className="flex items-center gap-3 border-b border-[#30363d] px-4 py-3">
          <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-[#8b949e]" fill="currentColor">
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            className="flex-1 bg-transparent text-base text-[#e6edf3] outline-none placeholder:text-[#6e7681]"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="rounded-md px-2 py-0.5 text-xs text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3]"
            >
              {t("search.clear")}
            </button>
          )}
          <kbd className="hidden rounded border border-[#30363d] bg-[#161b22] px-1.5 font-mono text-[10px] text-[#8b949e] sm:inline">
            Esc
          </kbd>
        </div>

        {/* quick suggestions when empty */}
        {!query && (
          <div className="border-b border-[#30363d] px-4 py-2.5">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
              {t("search.popular")}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); inputRef.current?.focus(); }}
                  className="rounded-full border border-[#30363d] bg-[#161b22] px-2.5 py-0.5 text-xs text-[#c9d1d9] hover:border-[#58a6ff66] hover:bg-[#1f6feb1f] hover:text-[#58a6ff]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* results */}
        <div ref={listRef} className="max-h-[60vh] overflow-auto">
          {flat.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <div className="text-3xl">🔍</div>
              <div className="mt-2 text-sm text-[#e6edf3]">
                {t("search.empty")} <span className="gh-code">{query}</span>
              </div>
              <div className="mt-1 text-xs text-[#8b949e]">
                {t("search.try")} <button className="text-[#2f81f7] hover:underline" onClick={() => setQuery("шофёр")}>шофёр</button>, <button className="text-[#2f81f7] hover:underline" onClick={() => setQuery("flutter")}>flutter</button>, <button className="text-[#2f81f7] hover:underline" onClick={() => setQuery("github")}>github</button>
              </div>
            </div>
          ) : (
            grouped.map((g) => {
              let runningIdx = 0;
              // compute absolute index for each item
              const startIdx = flat.indexOf(g.items[0]);
              return (
                <div key={g.kind}>
                  <div className="sticky top-0 z-10 bg-[#0d1117]/95 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#8b949e] backdrop-blur">
                    {groupLabels[g.kind]} · {g.items.length}
                  </div>
                  <ul>
                    {g.items.map((r) => {
                      const absIdx = startIdx + runningIdx++;
                      const isActive = absIdx === active;
                      return (
                        <li key={`${r.kind}-${r.title}-${absIdx}`}>
                          <button
                            data-active={isActive}
                            onMouseEnter={() => setActive(absIdx)}
                            onClick={() => selectResult(r)}
                            className={`flex w-full items-start gap-3 px-4 py-2.5 text-left ${
                              isActive ? "bg-[#1f6feb33]" : "hover:bg-[#1f6feb1a]"
                            }`}
                          >
                            <span className="mt-0.5 shrink-0">{iconForKind(r.kind)}</span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`truncate text-sm font-medium ${isActive ? "text-white" : "text-[#e6edf3]"}`}>
                                  <Highlight text={r.title} query={query} />
                                </span>
                                {r.badge && (
                                  <span
                                    className="rounded-full border px-1.5 py-0 text-[10px] font-medium"
                                    style={{
                                      borderColor: (r.badgeColor || "#8b949e") + "66",
                                      background: (r.badgeColor || "#8b949e") + "1a",
                                      color: r.badgeColor || "#8b949e",
                                    }}
                                  >
                                    {r.badge}
                                  </span>
                                )}
                              </div>
                              {r.subtitle && (
                                <div className="mt-0.5 truncate text-xs text-[#8b949e]">
                                  <Highlight text={r.subtitle} query={query} muted />
                                </div>
                              )}
                            </div>
                            <svg viewBox="0 0 16 16" className={`mt-1 h-3 w-3 shrink-0 ${isActive ? "text-[#e6edf3]" : "text-[#6e7681]"}`} fill="currentColor">
                              <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
                            </svg>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          )}
        </div>

        {/* footer hints */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#30363d] bg-[#161b22] px-4 py-2 text-[11px] text-[#8b949e]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Kbd>↑</Kbd><Kbd>↓</Kbd> {t("search.nav")}
            </span>
            <span className="flex items-center gap-1"><Kbd>⏎</Kbd> {t("search.open")}</span>
            <span className="flex items-center gap-1"><Kbd>Esc</Kbd> {t("search.close")}</span>
          </div>
          <span className="font-mono">{flat.length} {t("search.results")}</span>
        </div>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-[#30363d] bg-[#0d1117] px-1.5 py-0 font-mono text-[10px] text-[#e6edf3]">{children}</kbd>;
}

function Highlight({ text, query, muted }: { text: string; query: string; muted?: boolean }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const tokens = q.split(/\s+/).filter(Boolean).map(escapeReg);
  if (!tokens.length) return <>{text}</>;
  const re = new RegExp(`(${tokens.join("|")})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        re.test(p) ? (
          <mark
            key={i}
            className={`rounded-sm px-0.5 ${muted ? "bg-[#bf870044] text-[#d29922]" : "bg-[#bf870066] text-[#fde68a]"}`}
            style={{ background: undefined }}
          >
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

function escapeReg(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
