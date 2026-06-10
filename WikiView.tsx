import { useState, useMemo, useEffect, useRef } from "react";
import { wikiPages, wikiGroups, timeline } from "../../data/wiki";
import { COMPANY_LINKS, githubUser } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";
import { useToast } from "../../context/ToastContext";

export function WikiView() {
  const { lang, t } = useLang();
  const [active, setActive] = useState("home");
  const [query, setQuery] = useState("");

  const groups = wikiGroups;

  const filteredPages = useMemo(() => {
    if (!query.trim()) return wikiPages;
    const q = query.toLowerCase();
    return wikiPages.filter((p) =>
      p.title[lang].toLowerCase().includes(q) ||
      p.desc[lang].toLowerCase().includes(q) ||
      p.slug.includes(q)
    );
  }, [query, lang]);

  const page = wikiPages.find((p) => p.slug === active);

  return (
    <section className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#a371f71f] via-transparent to-[#58a6ff1f]" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#a371f7] opacity-10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a371f7]">
            <span>📚</span> Wiki · Car Blanche
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-[#e6edf3] sm:text-3xl">
            {t("wiki.title")}
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-[#8b949e] sm:text-base">
            {t("wiki.subtitle")}
          </p>

          {/* Quick stats */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Stat value={t("wiki.home.stat1.v")} label={t("wiki.home.stat1.l")} color="#3fb950" />
            <Stat value={t("wiki.home.stat2.v")} label={t("wiki.home.stat2.l")} color="#58a6ff" />
            <Stat value={t("wiki.home.stat3.v")} label={t("wiki.home.stat3.l")} color="#a371f7" />
            <Stat value={t("wiki.home.stat4.v")} label={t("wiki.home.stat4.l")} color="#f0883e" />
            <Stat value={t("wiki.home.stat5.v")} label={t("wiki.home.stat5.l")} color="#e3b341" />
            <Stat value={t("wiki.home.stat6.v")} label={t("wiki.home.stat6.l")} color="#db61a2" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Search */}
          <div className="overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
            <div className="flex items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-3 py-2 text-xs">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#8b949e]" fill="currentColor">
                <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
              </svg>
              <span className="text-[#8b949e]">{t("wiki.pages")} · {wikiPages.length}</span>
            </div>
            <div className="p-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("wiki.searchPages")}
                className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-sm text-[#e6edf3] outline-none focus:border-[#58a6ff]"
              />
            </div>
          </div>

          {/* Pages by group */}
          <nav className="max-h-[680px] overflow-auto rounded-md border border-[#30363d] bg-[#0d1117] p-2">
            {groups.map((g) => {
              const pages = filteredPages.filter((p) => p.group.en === g.en);
              if (pages.length === 0) return null;
              return (
                <div key={g.key} className="mb-3">
                  <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#8b949e]">
                    {lang === "ru" ? g.ru : g.en}
                  </div>
                  {pages.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => setActive(p.slug)}
                      className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm ${
                        p.slug === active
                          ? "bg-[#1f6feb33] text-[#58a6ff]"
                          : "text-[#c9d1d9] hover:bg-[#1f6feb1f]"
                      }`}
                    >
                      <span className="text-[#8b949e]">▸</span>
                      <span className="truncate">{p.title[lang]}</span>
                    </button>
                  ))}
                </div>
              );
            })}
          </nav>

          {/* Bookmarks */}
          <BookmarksBlock onOpen={setActive} />

          {/* External quick links */}
          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-3">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#8b949e]">
              {t("wiki.relatedLinks")}
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><a href={COMPANY_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-[#2f81f7] hover:underline">🐙 github.com/car-blanche</a></li>
              <li><a href={COMPANY_LINKS.net} target="_blank" rel="noopener noreferrer" className="text-[#2f81f7] hover:underline">🌐 car-blanche.net</a></li>
              <li><a href={COMPANY_LINKS.app} target="_blank" rel="noopener noreferrer" className="text-[#2f81f7] hover:underline">📱 car-blanche.app</a></li>
              <li><a href={COMPANY_LINKS.showroom3d} target="_blank" rel="noopener noreferrer" className="text-[#a371f7] hover:underline">🎨 3D Showroom →</a></li>
            </ul>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 space-y-6">
          {/* If "home" — show timeline + popular */}
          {active === "home" && <WikiHome onOpen={setActive} />}
          {active !== "home" && page && <WikiPageView page={page} onOpen={setActive} />}
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="rounded-md border border-[#30363d] bg-[#0d1117]/60 px-3 py-2 backdrop-blur">
      <div className="font-mono text-lg font-semibold" style={{ color }}>{value}</div>
      <div className="text-[11px] text-[#8b949e]">{label}</div>
    </div>
  );
}

function BookmarksBlock({ onOpen }: { onOpen: (slug: string) => void }) {
  const { lang } = useLang();
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const update = () => {
      const bms = JSON.parse(localStorage.getItem("cb-wiki-bookmarks") || "[]") as string[];
      setBookmarks(bms);
    };
    update();
    // Слушаем изменения (опционально)
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (bookmarks.length === 0) return null;

  const pages = wikiPages.filter((p) => bookmarks.includes(p.slug));

  return (
    <div className="rounded-md border border-[#e3b34155] bg-[#e3b34111] p-3">
      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider">
        <span className="text-[#e3b341]">⭐ {lang === "ru" ? "Закладки" : "Bookmarks"}</span>
        <span className="font-mono text-[#8b949e]">{pages.length}</span>
      </div>
      <ul className="space-y-0.5 text-xs">
        {pages.map((p) => (
          <li key={p.slug}>
            <button
              onClick={() => onOpen(p.slug)}
              className="flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left text-[#c9d1d9] hover:bg-[#e3b34122] hover:text-[#e6edf3]"
            >
              <span className="text-[#e3b341]">★</span>
              <span className="truncate">{p.title[lang]}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WikiHome({ onOpen }: { onOpen: (slug: string) => void }) {
  const { lang, t } = useLang();

  return (
    <>
      {/* Welcome card */}
      <article className="overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
        <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3 text-xs text-[#8b949e]">
          <span className="font-mono">README.md</span>
        </div>
        <div className="space-y-4 p-6">
          <h1 className="text-3xl font-semibold text-[#e6edf3]">
            {t("wiki.home.title")}
          </h1>
          <p className="text-base leading-7 text-[#c9d1d9]">
            {t("wiki.home.intro")}
          </p>

          <div className="rounded-md border border-[#3fb95066] bg-[#3fb95011] p-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <div>
                <div className="text-sm font-semibold text-[#3fb950]">{t("wiki.home.foundedIn")}</div>
                <div className="text-xs text-[#8b949e]">{t("wiki.home.foundedDesc")}</div>
              </div>
            </div>
          </div>

          {/* Quick starting points */}
          <div>
            <h3 className="mb-2 mt-4 text-sm font-semibold text-[#e6edf3]">
              # {t("wiki.home.start")}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              <QuickLink onOpen={() => onOpen("principles")} icon="🎯" title={lang === "ru" ? "Принципы компании" : "Company principles"} />
              <QuickLink onOpen={() => onOpen("glossary")} icon="📖" title={lang === "ru" ? "Глоссарий терминов" : "Glossary"} />
              <QuickLink onOpen={() => onOpen("chauffeur-standard")} icon="🚘" title={lang === "ru" ? "Стандарт шофёра" : "Chauffeur standard"} />
              <QuickLink onOpen={() => onOpen("app-architecture")} icon="⚙️" title={lang === "ru" ? "Архитектура приложения" : "App architecture"} />
            </div>
          </div>
        </div>
      </article>

      {/* Timeline */}
      <article className="overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
        <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
          <h3 className="text-sm font-semibold text-[#e6edf3]">
            {t("wiki.home.timeline")}
          </h3>
        </div>
        <div className="p-6">
          <ol className="relative space-y-5 border-l-2 border-[#30363d] pl-6">
            {timeline.map((ev, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[33px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[#0d1117] text-[10px] font-semibold text-white"
                  style={{ background: ev.color }}
                >
                  {ev.year.slice(-2)}
                </span>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-mono text-xs font-semibold" style={{ color: ev.color }}>
                    {ev.year}{ev.quarter ? ` · ${ev.quarter}` : ""}
                  </span>
                  <span className="text-sm font-semibold text-[#e6edf3]">{ev.title[lang]}</span>
                </div>
                <p className="mt-1 text-xs leading-5 text-[#8b949e]">{ev.desc[lang]}</p>
              </li>
            ))}
          </ol>
        </div>
      </article>

      {/* Two columns: Popular + Recently updated */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Popular pages */}
        <article className="overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
          <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[#e6edf3]">
              <span>🔥</span> {t("wiki.home.popular")}
            </h3>
          </div>
          <ul className="divide-y divide-[#21262d]">
            {wikiPages.slice(0, 6).filter((p) => p.slug !== "home").map((p) => (
              <li key={p.slug}>
                <button
                  onClick={() => onOpen(p.slug)}
                  className="group flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-[#1f6feb0d]"
                >
                  <span className="text-lg">📄</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#e6edf3] group-hover:text-[#2f81f7]">
                      {p.title[lang]}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-[#8b949e]">{p.desc[lang]}</div>
                  </div>
                  <span className="hidden shrink-0 text-xs text-[#8b949e] sm:inline">
                    ⏱ {p.reading}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </article>

        {/* Recently updated */}
        <article className="overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
          <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[#e6edf3]">
              <span>✨</span> {lang === "ru" ? "Недавно обновлено" : "Recently updated"}
            </h3>
          </div>
          <ul className="divide-y divide-[#21262d]">
            {wikiPages
              .filter((p) => p.slug !== "home")
              .filter((p) => p.updated.includes("сегодня") || p.updated.includes("вчера") || p.updated.includes("дн") || p.updated.includes("today") || p.updated.includes("yesterday"))
              .slice(0, 6)
              .map((p) => (
                <li key={p.slug}>
                  <button
                    onClick={() => onOpen(p.slug)}
                    className="group flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-[#1f6feb0d]"
                  >
                    <span className="relative flex h-2 w-2 mt-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fb950] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3fb950]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-[#e6edf3] group-hover:text-[#2f81f7]">
                        {p.title[lang]}
                      </div>
                      <div className="mt-0.5 truncate text-xs text-[#8b949e]">
                        @{p.author} · {p.updated}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
          </ul>
        </article>
      </div>

      {/* Categories overview */}
      <article className="overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
        <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-[#e6edf3]">
            <span>📚</span> {lang === "ru" ? "Все категории" : "All categories"}
          </h3>
        </div>
        <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {wikiGroups.map((g) => {
            const count = wikiPages.filter((p) => p.group.en === g.en).length;
            const firstPage = wikiPages.find((p) => p.group.en === g.en);
            return (
              <button
                key={g.key}
                onClick={() => firstPage && onOpen(firstPage.slug)}
                className="group rounded-md border border-[#30363d] bg-[#161b22] p-3 text-left transition hover:border-[#58a6ff66]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#e6edf3] group-hover:text-[#2f81f7]">
                    {lang === "ru" ? g.ru : g.en}
                  </span>
                  <span className="font-mono text-xs text-[#8b949e]">{count}</span>
                </div>
                <div className="mt-1 text-[11px] text-[#8b949e]">
                  {lang === "ru" ? "Открыть раздел →" : "Browse section →"}
                </div>
              </button>
            );
          })}
        </div>
      </article>
    </>
  );
}

function QuickLink({ onOpen, icon, title }: { onOpen: () => void; icon: string; title: string }) {
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-left text-sm text-[#e6edf3] transition hover:border-[#58a6ff66] hover:bg-[#1c2128]"
    >
      <span className="text-lg">{icon}</span>
      <span className="truncate">{title}</span>
    </button>
  );
}

function WikiPageView({ page, onOpen }: { page: typeof wikiPages[number]; onOpen?: (slug: string) => void }) {
  const { lang, t } = useLang();
  const { showToast } = useToast();
  const storageKey = `cb-wiki-${page.slug}-${lang}`;
  const bookmarkKey = "cb-wiki-bookmarks";

  const initialBody = useMemo(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved) return saved;
    }
    return page.body[lang];
  }, [storageKey, page.body, lang]);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialBody);
  const [savedBody, setSavedBody] = useState(initialBody);
  const [bookmarked, setBookmarked] = useState(false);
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLElement | null>(null);

  // Initial load — bookmarks
  useEffect(() => {
    if (typeof window === "undefined") return;
    const bms = JSON.parse(localStorage.getItem(bookmarkKey) || "[]") as string[];
    setBookmarked(bms.includes(page.slug));
  }, [page.slug]);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
    const initial = saved || page.body[lang];
    setSavedBody(initial);
    setDraft(initial);
    setEditing(false);
  }, [page.slug, lang, page.body, storageKey]);

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.max(0, Math.min(100, (scrolled / total) * 100)) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [page.slug]);

  const toggleBookmark = () => {
    const bms = JSON.parse(localStorage.getItem(bookmarkKey) || "[]") as string[];
    const next = bookmarked ? bms.filter((s) => s !== page.slug) : [...bms, page.slug];
    localStorage.setItem(bookmarkKey, JSON.stringify(next));
    setBookmarked(!bookmarked);
    showToast({
      kind: "info",
      icon: bookmarked ? "🤍" : "⭐",
      title: bookmarked
        ? (lang === "ru" ? "Удалено из закладок" : "Removed from bookmarks")
        : (lang === "ru" ? "Добавлено в закладки" : "Bookmarked"),
      desc: page.title[lang],
    });
  };

  const handlePrint = () => window.print();

  // Word count + estimated reading time
  const wordCount = savedBody.trim().split(/\s+/).filter(Boolean).length;
  const estReadMin = Math.max(1, Math.round(wordCount / 200));

  // Related pages — те же группы, исключая текущую
  const relatedPages = wikiPages.filter(
    (p) => p.group.en === page.group.en && p.slug !== page.slug
  ).slice(0, 4);

  const handleSave = () => {
    localStorage.setItem(storageKey, draft);
    setSavedBody(draft);
    setEditing(false);
    showToast({
      kind: "success", icon: "💾",
      title: lang === "ru" ? "Страница сохранена" : "Page saved",
      desc: `${page.slug}.md · localStorage`,
    });
  };

  const handleCancel = () => {
    setDraft(savedBody);
    setEditing(false);
  };

  const handleReset = () => {
    localStorage.removeItem(storageKey);
    setSavedBody(page.body[lang]);
    setDraft(page.body[lang]);
    setEditing(false);
    showToast({
      kind: "info", icon: "↺",
      title: lang === "ru" ? "Восстановлен оригинал" : "Reset to original",
    });
  };

  const handleCopyLink = async () => {
    try {
      const url = `${location.origin}${location.pathname}#wiki/${page.slug}`;
      await navigator.clipboard.writeText(url);
      showToast({ kind: "info", icon: "🔗",
        title: lang === "ru" ? "Ссылка скопирована" : "Link copied" });
    } catch {}
  };

  const isModified = savedBody !== page.body[lang];

  return (
    <article ref={articleRef} className="relative overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
      {/* READING PROGRESS BAR */}
      <div
        className="sticky top-0 z-10 h-1 bg-gradient-to-r from-[#58a6ff] to-[#a371f7] transition-[width] duration-150"
        style={{ width: `${progress}%`, transformOrigin: "left" }}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#30363d] bg-[#161b22] px-4 py-3">
        <div className="text-xs text-[#8b949e]">
          <span className="text-[#2f81f7]">{lang === "ru" ? page.group.ru : page.group.en}</span> /{" "}
          <span className="font-mono">{page.slug}.md</span>
          {isModified && !editing && (
            <span className="ml-2 rounded-full bg-[#d2992233] px-1.5 py-0 text-[10px] font-semibold text-[#d29922]">
              {lang === "ru" ? "Изменено" : "Modified"}
            </span>
          )}
          {editing && (
            <span className="ml-2 rounded-full bg-[#3fb95033] px-1.5 py-0 text-[10px] font-semibold text-[#3fb950]">
              {lang === "ru" ? "Редактирование" : "Editing"}
            </span>
          )}
          {bookmarked && !editing && (
            <span className="ml-2 rounded-full bg-[#e3b34133] px-1.5 py-0 text-[10px] font-semibold text-[#e3b341]">
              ⭐ {lang === "ru" ? "В закладках" : "Bookmarked"}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {!editing && (
            <>
              <button
                onClick={toggleBookmark}
                className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 transition ${
                  bookmarked
                    ? "border-[#e3b34166] bg-[#e3b34122] text-[#e3b341]"
                    : "border-[#30363d] bg-[#21262d] text-[#e6edf3] hover:bg-[#30363d]"
                }`}
                title={lang === "ru" ? "Закладка" : "Bookmark"}
              >
                {bookmarked ? "★" : "☆"} {lang === "ru" ? "Закладка" : "Bookmark"}
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[#e6edf3] hover:bg-[#30363d]"
                title={lang === "ru" ? "Печать" : "Print"}
              >
                🖨️ {lang === "ru" ? "Печать" : "Print"}
              </button>
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[#e6edf3] hover:bg-[#30363d]"
              >
                ✏️ {t("wiki.edit")}
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[#e6edf3] hover:bg-[#30363d]"
              >
                🔗 Link
              </button>
              {isModified && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 rounded-md border border-[#d2992266] bg-[#d2992222] px-2.5 py-1 text-[#d29922] hover:bg-[#d2992233]"
                >
                  ↺ {lang === "ru" ? "Сбросить" : "Reset"}
                </button>
              )}
            </>
          )}
          {editing && (
            <>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1 rounded-md bg-[#238636] px-3 py-1 font-semibold text-white hover:bg-[#2ea043]"
              >
                💾 {lang === "ru" ? "Сохранить" : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[#e6edf3] hover:bg-[#30363d]"
              >
                {lang === "ru" ? "Отмена" : "Cancel"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-5 px-6 py-6 text-sm leading-7 text-[#c9d1d9]">
        {/* Author profile bar — большая, с активным автором */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-[#30363d] bg-[#161b22] p-3">
          <div className="flex items-center gap-3">
            <a
              href={githubUser(page.author)}
              target="_blank" rel="noopener noreferrer"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#58a6ff] to-[#a371f7] text-xs font-bold text-white transition hover:scale-110"
              title="github.com/car-blanche"
            >
              {page.author.slice(0, 2).toUpperCase()}
            </a>
            <div>
              <div className="flex items-center gap-1.5">
                <a
                  href={githubUser(page.author)}
                  target="_blank" rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#e6edf3] hover:text-[#2f81f7] hover:underline"
                >
                  @{page.author}
                </a>
                <span className="rounded-full border border-[#58a6ff66] bg-[#58a6ff22] px-1.5 py-0 text-[9px] font-semibold uppercase text-[#58a6ff]">
                  car-blanche
                </span>
              </div>
              <div className="text-[11px] text-[#8b949e]">
                {t("wiki.lastUpdated")} · {page.updated} · ⏱ {estReadMin} {t("wiki.readingTime")} · 📝 {wordCount} {lang === "ru" ? "слов" : "words"}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <a
              href={COMPANY_LINKS.github}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[#e6edf3] hover:bg-[#30363d]"
            >
              🐙 GitHub
            </a>
            <a
              href={COMPANY_LINKS.email}
              className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[#e6edf3] hover:bg-[#30363d]"
            >
              ✉️ {COMPANY_LINKS.emailRaw}
            </a>
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-[#e6edf3]">{page.title[lang]}</h1>
        <p className="text-base text-[#8b949e]">{page.desc[lang]}</p>

        <hr className="border-t border-[#30363d]" />

        {/* TOC */}
        <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
            📋 {t("wiki.toc")}
          </div>
          <ul className="space-y-1 text-sm">
            <li>· <a href="#overview" className="text-[#2f81f7] hover:underline">{lang === "ru" ? "Обзор" : "Overview"}</a></li>
            <li>· <a href="#details" className="text-[#2f81f7] hover:underline">{lang === "ru" ? "Подробности" : "Details"}</a></li>
            <li>· <a href="#related" className="text-[#2f81f7] hover:underline">{lang === "ru" ? "Связанные ресурсы" : "Related resources"}</a></li>
            <li>· <a href="#contacts" className="text-[#2f81f7] hover:underline">{t("wiki.contacts")}</a></li>
          </ul>
        </div>

        <h2 id="overview" className="text-xl font-semibold text-[#e6edf3]">
          {lang === "ru" ? "Обзор" : "Overview"}
        </h2>

        {/* Body — редактируемый */}
        {editing ? (
          <div className="space-y-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={8}
              className="w-full rounded-md border border-[#58a6ff66] bg-[#0d1117] p-3 font-mono text-sm leading-6 text-[#e6edf3] outline-none focus:border-[#58a6ff]"
              autoFocus
            />
            <div className="text-[11px] text-[#8b949e]">
              {lang === "ru"
                ? "Поддерживается обычный текст. Изменения сохраняются локально в вашем браузере."
                : "Plain text supported. Changes are saved locally in your browser."}
            </div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{savedBody}</p>
        )}

        <h2 id="details" className="text-xl font-semibold text-[#e6edf3]">
          {lang === "ru" ? "Подробности" : "Details"}
        </h2>
        <p>
          {lang === "ru"
            ? "С 2018 года команда из Уфы накопила обширную экспертизу. Эта страница — часть базы знаний, которая помогает команде и партнёрам быстро находить нужную информацию."
            : "Since 2018 the team from Ufa has accumulated extensive expertise. This page is part of the knowledge base that helps the team and partners quickly find the right information."}
        </p>

        <ol className="list-decimal space-y-1 pl-5">
          <li>{lang === "ru" ? "Прозрачность для клиента — никаких «чёрных ящиков»." : "Transparency for the client — no black boxes."}</li>
          <li>{lang === "ru" ? "Профессионализм шофёра как стандарт." : "Chauffeur professionalism as the standard."}</li>
          <li>{lang === "ru" ? "Данные принадлежат клиенту." : "Data belongs to the client."}</li>
          <li>{lang === "ru" ? "Экологичность — измеряемый CO₂-след каждой поездки." : "Sustainability — measurable CO₂ footprint per trip."}</li>
        </ol>

        <h2 id="related" className="text-xl font-semibold text-[#e6edf3]">
          {lang === "ru" ? "Связанные ресурсы" : "Related resources"}
        </h2>
        <ul className="space-y-1.5">
          <li>🐙 <a href={COMPANY_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-[#2f81f7] hover:underline">github.com/car-blanche</a></li>
          <li>🌐 <a href={COMPANY_LINKS.net} target="_blank" rel="noopener noreferrer" className="text-[#2f81f7] hover:underline">car-blanche.net</a></li>
          <li>📱 <a href={COMPANY_LINKS.app} target="_blank" rel="noopener noreferrer" className="text-[#2f81f7] hover:underline">car-blanche.app</a></li>
          <li>🎨 <a href={COMPANY_LINKS.showroom3d} target="_blank" rel="noopener noreferrer" className="text-[#a371f7] hover:underline">3D Showroom Experience</a></li>
        </ul>

        {/* RELATED PAGES — те же группы */}
        {relatedPages.length > 0 && (
          <>
            <h2 id="related-pages" className="text-xl font-semibold text-[#e6edf3]">
              📚 {lang === "ru" ? "Похожие страницы" : "Related pages"}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {relatedPages.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => onOpen?.(p.slug)}
                  className="group flex items-start gap-3 rounded-md border border-[#30363d] bg-[#161b22] p-3 text-left transition hover:border-[#58a6ff66] hover:bg-[#1c2128]"
                >
                  <span className="mt-0.5 text-lg">📄</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#e6edf3] group-hover:text-[#2f81f7]">
                      {p.title[lang]}
                    </div>
                    <div className="mt-0.5 truncate text-[11px] text-[#8b949e]">{p.desc[lang]}</div>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-[#8b949e]">
                      <span>⏱ {p.reading} {t("wiki.readingTime")}</span>
                      <span>·</span>
                      <span>@{p.author}</span>
                    </div>
                  </div>
                  <span className="text-[#6e7681] transition group-hover:text-[#58a6ff] group-hover:translate-x-0.5">→</span>
                </button>
              ))}
            </div>
          </>
        )}

        <h2 id="contacts" className="text-xl font-semibold text-[#e6edf3]">
          📬 {t("wiki.contacts")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={COMPANY_LINKS.email}
            className="flex items-center gap-3 rounded-md border border-[#30363d] bg-[#161b22] p-3 hover:border-[#58a6ff66] hover:bg-[#1c2128]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#58a6ff22] text-xl">✉️</div>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">
                {lang === "ru" ? "Почта B2B" : "B2B Email"}
              </div>
              <div className="truncate text-sm font-semibold text-[#2f81f7]">
                {COMPANY_LINKS.emailRaw}
              </div>
            </div>
          </a>
          <a
            href={COMPANY_LINKS.github}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-md border border-[#30363d] bg-[#161b22] p-3 hover:border-[#58a6ff66] hover:bg-[#1c2128]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#a371f722] text-xl">🐙</div>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8b949e]">GitHub Org</div>
              <div className="truncate text-sm font-semibold text-[#2f81f7]">github.com/car-blanche</div>
            </div>
          </a>
        </div>

        <div className="mt-6 rounded-md border border-[#30363d] bg-[#161b22] p-4 text-xs text-[#8b949e]">
          <strong className="text-[#e6edf3]">ℹ️ Note.</strong>{" "}
          {lang === "ru"
            ? "Каждая страница вики редактируется командой — нажмите «✏️ Редактировать». Изменения сохраняются в вашем браузере. На проде — публикуются в репозитории через PR."
            : "Every wiki page is editable by the team — click '✏️ Edit'. Changes are saved in your browser. In production — published via PR in the repository."}
        </div>
      </div>
    </article>
  );
}
