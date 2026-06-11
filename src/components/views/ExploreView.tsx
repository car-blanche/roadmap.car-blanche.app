import { exploreRepos, trendingTopics } from "../../data/extra";
import { COMPANY_LINKS } from "../../context/ViewContext";
import { Sitemap } from "../gh/Sitemap";
import { AnalyticsChart } from "../gh/AnalyticsChart";
import { BusinessNewsFeed } from "../gh/BusinessNewsFeed";
import { QuoteCarousel } from "../gh/QuoteCarousel";
import { useLang } from "../../context/LangContext";

export function ExploreView() {
  const { lang } = useLang();

  return (
    <div>
      {/* HERO */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-[#30363d] bg-[#0d1117] p-8 lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1f6feb33] via-transparent to-[#a371f733]" />
        <div className="pointer-events-none absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-[#58a6ff] opacity-15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 h-56 w-56 rounded-full bg-[#a371f7] opacity-15 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#58a6ff66] bg-[#58a6ff11] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#58a6ff]">
            <span className="text-base">🌐</span>
            {lang === "ru" ? "Explore · обзор и open-source" : "Explore · overview and open-source"}
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#e6edf3] sm:text-5xl">
            {lang === "ru" ? "Обзор Car Blanche" : "Car Blanche overview"}
            <span className="block bg-gradient-to-r from-[#58a6ff] via-[#a371f7] to-[#3fb950] bg-clip-text text-transparent">
              {lang === "ru" ? "и открытая часть экосистемы" : "and open ecosystem"}
            </span>
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#c9d1d9]">
            {lang === "ru"
              ? "Здесь — главное о компании одним взглядом: аналитика поездок, последние новости, наша философия. Плюс открытая часть для разработчиков: SDK на Flutter/Dart, расширения для Yii2, дизайн-система, методологии расчёта CO₂."
              : "Here is the company at a glance: ride analytics, latest news, our philosophy. Plus the open-source part for developers: Flutter/Dart SDKs, Yii2 extensions, design system, CO₂ methodologies."}
          </p>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat value="6"     label={lang === "ru" ? "новостей"     : "news posts"}      color="#f0883e" />
            <Stat value="+125%" label={lang === "ru" ? "рост поездок" : "rides growth"}    color="#3fb950" />
            <Stat value="6"     label={lang === "ru" ? "open-source"  : "open-source"}     color="#58a6ff" />
            <Stat value="9.4k+" label={lang === "ru" ? "GitHub stars" : "GitHub stars"}    color="#e3b341" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={COMPANY_LINKS.github}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#238636] to-[#2ea043] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#23863633]"
            >
              🐙 github.com/car-blanche
            </a>
            <a
              href={COMPANY_LINKS.net}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-5 py-2.5 text-sm font-semibold text-[#e6edf3] hover:bg-[#30363d]"
            >
              🌐 car-blanche.net
            </a>
            <a
              href={COMPANY_LINKS.app}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-5 py-2.5 text-sm font-semibold text-[#e6edf3] hover:bg-[#30363d]"
            >
              📱 car-blanche.app
            </a>
          </div>
        </div>
      </div>

      {/* ╔══════════════════════════════════════════════════╗
          ║  ОТКРЫТЫЕ БЛОКИ — Аналитика / Новости / Цитаты  ║
          ║  (вынесены из Code — для прозрачности компании) ║
          ╚══════════════════════════════════════════════════╝ */}

      {/* Section divider */}
      <div className="mb-6 mt-2 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
        <span className="rounded-full border border-[#58a6ff44] bg-[#58a6ff11] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#58a6ff]">
          🔍 {lang === "ru" ? "Обзор компании" : "Company overview"}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
      </div>

      {/* 📈 Аналитика — открытый блок */}
      <div className="mb-8">
        <AnalyticsChart />
      </div>

      {/* 📰 Новости и обновления */}
      <div className="mb-8">
        <BusinessNewsFeed />
      </div>

      {/* 💭 Наша философия */}
      <div className="mb-8">
        <QuoteCarousel />
      </div>

      {/* Section divider — переход к репозиториям */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
        <span className="rounded-full border border-[#3fb95044] bg-[#3fb95011] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3fb950]">
          🐙 {lang === "ru" ? "Open Source" : "Open Source"}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
      </div>

      {/* SITEMAP — визуальная карта всего сайта */}
      <div className="mb-8">
        <Sitemap />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Repos */}
        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-[#e6edf3]">
              📦 Открытые репозитории
              <span className="ml-2 text-sm font-normal text-[#8b949e]">{exploreRepos.length} проектов</span>
            </h2>
            <a
              href={COMPANY_LINKS.github}
              target="_blank" rel="noopener noreferrer"
              className="text-xs text-[#2f81f7] hover:underline"
            >
              Все на GitHub →
            </a>
          </div>
          <ul className="space-y-3">
            {exploreRepos.map((r) => (
              <li key={r.name} className="rounded-md border border-[#30363d] bg-[#161b22] p-4 hover:border-[#58a6ff66] hover:bg-[#1c2128]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-base">
                      <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#8b949e]" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Z" /></svg>
                      <a href={COMPANY_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-[#2f81f7] hover:underline">{r.org}</a>
                      <span className="text-[#8b949e]">/</span>
                      <a href={COMPANY_LINKS.github} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#2f81f7] hover:underline">{r.name}</a>
                      <span className="rounded-full border border-[#30363d] px-2 py-0.5 text-[10px] text-[#8b949e]">Public</span>
                    </div>
                    <p className="mt-2 text-sm text-[#c9d1d9]">{r.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {r.topics.map((t) => (
                        <button key={t} className="rounded-full bg-[#388bfd1a] px-2 py-0.5 text-[11px] font-medium text-[#2f81f7] hover:bg-[#388bfd33]">
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1 text-xs font-semibold text-[#e6edf3] hover:bg-[#30363d]">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#e3b341]" fill="currentColor">
                      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                    </svg>
                    Star
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#8b949e]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.languageColor }} />
                    {r.language}
                  </span>
                  <span>⭐ {r.stars}</span>
                  <span>обновлено сегодня</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Trending topics */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-[#e6edf3]">🔥 Trending topics</h3>
            <ul className="space-y-1">
              {trendingTopics.map((t) => (
                <li key={t.name}>
                  <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-[#1f6feb1f]">
                    <span className="text-[#2f81f7]">#{t.name}</span>
                    <span className="text-xs text-[#8b949e]">{t.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About company */}
          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4">
            <h3 className="mb-2 text-sm font-semibold text-[#e6edf3]">О компании</h3>
            <p className="text-xs leading-5 text-[#8b949e]">
              Car Blanche — премиум-сервис персонализированного мобильного транспорта.
              Профессиональные шофёры, App как центр управления, рекомендации на основе ИИ.
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={COMPANY_LINKS.github}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#2f81f7] hover:underline"
                >
                  <span>🐙 github.com/car-blanche</span>
                  <span className="text-xs text-[#8b949e]">org</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_LINKS.net}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#2f81f7] hover:underline"
                >
                  <span>🌐 car-blanche.net</span>
                  <span className="text-xs text-[#8b949e]">сайт</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_LINKS.app}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between text-[#2f81f7] hover:underline"
                >
                  <span>📱 car-blanche.app</span>
                  <span className="text-xs text-[#8b949e]">приложение</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4">
            <h3 className="mb-3 text-sm font-semibold text-[#e6edf3]">Цифры</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-[#8b949e]">Репозиториев</span><span className="font-mono text-[#e6edf3]">24</span></li>
              <li className="flex justify-between"><span className="text-[#8b949e]">⭐ Stars</span><span className="font-mono text-[#e6edf3]">9.4k</span></li>
              <li className="flex justify-between"><span className="text-[#8b949e]">Контрибьюторов</span><span className="font-mono text-[#e6edf3]">128</span></li>
              <li className="flex justify-between"><span className="text-[#8b949e]">Шофёров (сейчас → цель)</span><span className="font-mono text-[#3fb950]">~50 → 340</span></li>
              <li className="flex justify-between"><span className="text-[#8b949e]">EV в парке</span><span className="font-mono text-[#3fb950]">28%</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="rounded-md border border-[#30363d] bg-[#0d1117]/60 px-3 py-2 backdrop-blur">
      <div className="font-mono text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-[#8b949e]">{label}</div>
    </div>
  );
}
