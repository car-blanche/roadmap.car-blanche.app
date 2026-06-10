import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ru" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
};

const LangCtx = createContext<Ctx | null>(null);

/* =========================================================
   Словарь переводов. Только ключевая UI-обвязка.
   Контент (issues, PR descriptions, wiki) — на исходном языке.
   ========================================================= */

export const translations = {
  // Top navigation
  "nav.pulls":         { ru: "Pull requests",   en: "Pull requests" },
  "nav.issues":        { ru: "Issues",          en: "Issues" },
  "nav.discussions":   { ru: "Обсуждения",      en: "Discussions" },
  "nav.team":          { ru: "Команда",         en: "Team" },
  "nav.marketplace":   { ru: "Маркетплейс",     en: "Marketplace" },
  "nav.explore":       { ru: "Обзор",           en: "Explore" },

  // Tabs
  "tab.code":          { ru: "Code",            en: "Code" },
  "tab.issues":        { ru: "Issues",          en: "Issues" },
  "tab.pulls":         { ru: "Pull requests",   en: "Pull requests" },
  "tab.discussions":   { ru: "Discussions",     en: "Discussions" },
  "tab.actions":       { ru: "Actions",         en: "Actions" },
  "tab.projects":      { ru: "Projects",        en: "Projects" },
  "tab.wiki":          { ru: "Wiki",            en: "Wiki" },
  "tab.security":      { ru: "Security",        en: "Security" },
  "tab.insights":      { ru: "Insights",        en: "Insights" },

  // Repo header
  "repo.public":       { ru: "Public",          en: "Public" },
  "repo.watch":        { ru: "Watch",           en: "Watch" },
  "repo.fork":         { ru: "Fork",            en: "Fork" },
  "repo.star":         { ru: "Star",            en: "Star" },
  "repo.description":  {
    ru: "Дорожная карта Car Blanche — премиум-сервиса персонализированного мобильного транспорта. Работаем из Уфы с 2018. К 2029 — план расширения до 20+ городов в 9 странах. Профессиональные шофёры, прозрачные данные, экологичный парк.",
    en: "Roadmap of Car Blanche — premium personalized mobile transport service. Working from Ufa since 2018. By 2029 — expansion plan to 20+ cities across 9 countries. Professional chauffeurs, transparent data, eco-friendly fleet."
  },

  // Header
  "header.search":     { ru: "Поиск по сайту",  en: "Search the docs" },
  "header.signedAs":   { ru: "Вы вошли как",    en: "Signed in as" },
  "header.yourProfile":{ ru: "Ваш профиль",     en: "Your profile" },
  "header.yourRepos":  { ru: "Ваши репозитории",en: "Your repositories" },
  "header.yourProjects": { ru: "Ваши проекты",  en: "Your projects" },
  "header.yourStars":  { ru: "Звёзды",          en: "Your stars" },
  "header.settings":   { ru: "Настройки",       en: "Settings" },
  "header.signOut":    { ru: "Выйти",           en: "Sign out" },
  "header.newRepo":    { ru: "Новый репозиторий", en: "New repository" },
  "header.importRepo": { ru: "Импорт репозитория", en: "Import repository" },
  "header.newIssue":   { ru: "Новая issue",     en: "New issue" },
  "header.newPR":      { ru: "Новый pull request", en: "New pull request" },
  "header.newProject": { ru: "Новый проект",    en: "New project" },
  "header.newGist":    { ru: "Новый gist",      en: "New gist" },
  "header.newWorkflow":{ ru: "Новый workflow",  en: "New workflow" },

  // Welcome banner
  "welcome.kicker":    { ru: "Добро пожаловать в Car Blanche", en: "Welcome to Car Blanche" },
  "welcome.title1":    { ru: "Сервис, которым приятно пользоваться —", en: "A service great to use —" },
  "welcome.title2":    { ru: "и который видно изнутри",          en: "and transparent from the inside" },
  "welcome.body":      {
    ru: "С 2018 года команда работает из Уфы — нашего единственного города на сегодня. К 2029 планируем масштабироваться до 20+ городов в 9 странах. Эта документация открыто показывает план: что строим, как и когда.",
    en: "Since 2018 the team works from Ufa — our only city today. By 2029 we plan to scale to 20+ cities across 9 countries. This documentation openly shows the plan: what we build, how and when."
  },
  "welcome.cta.plan":  { ru: "🎯 План разработки на 36 месяцев", en: "🎯 36-month development plan" },
  "welcome.cta.team":  { ru: "👥 Команда и достижения",       en: "👥 Team & achievements" },
  "welcome.cta.gh":    { ru: "🐙 github.com/car-blanche",     en: "🐙 github.com/car-blanche" },
  "welcome.cta.app":   { ru: "📱 Открыть приложение",         en: "📱 Open the app" },
  "welcome.stat1.v":   { ru: "3",                              en: "3" },
  "welcome.stat1.l":   { ru: "Фазы развития",                  en: "Roadmap phases" },
  "welcome.stat2.v":   { ru: "36 мес.",                        en: "36 mo" },
  "welcome.stat2.l":   { ru: "Горизонт планирования",          en: "Planning horizon" },
  "welcome.stat3.v":   { ru: "9",                              en: "9" },
  "welcome.stat3.l":   { ru: "Релизов",                        en: "Releases" },
  "welcome.stat4.v":   { ru: "100%",                           en: "100%" },
  "welcome.stat4.l":   { ru: "Прозрачность данных",            en: "Data transparency" },
  "welcome.close":     { ru: "Скрыть",                         en: "Hide" },

  // Sidebar
  "side.about":         { ru: "О репозитории",         en: "About" },
  "side.releases":      { ru: "Релизы",                en: "Releases" },
  "side.contributors":  { ru: "Контрибьюторы",         en: "Contributors" },
  "side.viewTeam":      { ru: "Открыть команду →",     en: "View team →" },
  "side.languages":     { ru: "Языки",                 en: "Languages" },
  "side.invite":        { ru: "+ Пригласить",          en: "+ Invite a collaborator" },
  "side.sponsor":       { ru: "Поддержать команду",    en: "Sponsor the team" },
  "side.teamActivity":  { ru: "Активность команды",    en: "Team activity" },
  "side.viewAllActivity": { ru: "Вся активность →",    en: "View all activity →" },

  // Pinned
  "pinned.title":       { ru: "Закреплено · 6 элементов", en: "Pinned · 6 items" },
  "pinned.customize":   { ru: "Настроить",                en: "Customize your pins" },

  // Search palette
  "search.placeholder": { ru: "Поиск разделов, issues, PR, wiki, marketplace…", en: "Search views, issues, PRs, wiki, marketplace…" },
  "search.popular":     { ru: "Популярные запросы",      en: "Popular queries" },
  "search.empty":       { ru: "Ничего не найдено по запросу", en: "No results found for" },
  "search.try":         { ru: "Попробуйте:",             en: "Try:" },
  "search.nav":         { ru: "навигация",               en: "navigate" },
  "search.open":        { ru: "открыть",                 en: "open" },
  "search.close":       { ru: "закрыть",                 en: "close" },
  "search.results":     { ru: "результатов",             en: "results" },
  "search.clear":       { ru: "очистить",                en: "clear" },

  // Theme toggle
  "theme.label":        { ru: "Внешний вид",             en: "Appearance" },
  "theme.dark":         { ru: "Тёмная",                  en: "Dark" },
  "theme.dim":          { ru: "Приглушённая",            en: "Dim" },
  "theme.light":        { ru: "Светлая",                 en: "Light" },
  "theme.darkDesc":     { ru: "GitHub dark high-contrast", en: "GitHub dark high-contrast" },
  "theme.dimDesc":      { ru: "Мягкий сине-серый",       en: "Soft blue-gray" },
  "theme.lightDesc":    { ru: "Светлая, GitHub-like",    en: "Light, GitHub-like" },
  "theme.note":         { ru: "Тема сохраняется в этом браузере.", en: "Theme is saved in this browser." },

  // Lang toggle
  "lang.label":         { ru: "Язык",                    en: "Language" },
  "lang.ru":            { ru: "Русский",                 en: "Russian" },
  "lang.en":            { ru: "Английский",              en: "English" },
  "lang.note":          { ru: "Язык интерфейса.",        en: "Interface language." },

  // Common labels / sections
  "common.open":        { ru: "Открыть",                 en: "Open" },
  "common.close":       { ru: "Закрыть",                 en: "Close" },
  "common.viewAll":     { ru: "Смотреть всё",            en: "View all" },
  "common.loading":     { ru: "Загрузка…",               en: "Loading…" },
  "common.openOnGH":    { ru: "Открыть на GitHub",       en: "Open on GitHub" },
  "common.copy":        { ru: "Копировать",              en: "Copy" },
  "common.docs":        { ru: "Документация",            en: "Documentation" },
  "common.faq":         { ru: "FAQ",                     en: "FAQ" },

  // Tech stack
  "tech.title":         { ru: "Стек технологий",         en: "Tech Stack" },
  "tech.subtitle":      { ru: "На каких технологиях построен Car Blanche.", en: "Technologies powering Car Blanche." },
  "tech.backend":       { ru: "Бэкенд",                  en: "Backend" },
  "tech.backendSub":    { ru: "Серверная часть",         en: "Server side" },
  "tech.frontend":      { ru: "Фронт · Mobile · Web",    en: "Front · Mobile · Web" },
  "tech.frontendSub":   { ru: "Кроссплатформенный клиент", en: "Cross-platform client" },
  "tech.native":        { ru: "Инфраструктура и нативные модули", en: "Infrastructure & native modules" },
  "tech.team":          { ru: "Команда стека",           en: "Tech stack team" },
  "tech.maintainer":    { ru: "Мэйнтейнер",              en: "Maintainer" },

  // Footer
  "footer.product":     { ru: "Продукт",                 en: "Product" },
  "footer.platform":    { ru: "Платформа",               en: "Platform" },
  "footer.resources":   { ru: "Ресурсы",                 en: "Resources" },
  "footer.status":      { ru: "Все системы работают",    en: "All systems operational" },

  // Footer · Product колонка
  "footer.codeRepo":    { ru: "Репозиторий кода",        en: "Code repository" },
  "footer.roadmap":     { ru: "Дорожная карта",          en: "Roadmap" },
  "footer.tasks":       { ru: "Задачи и обсуждения",     en: "Issues & tracking" },
  "footer.pulls":       { ru: "Pull-requests",           en: "Pull requests" },
  "footer.cicd":        { ru: "CI/CD автоматизация",     en: "CI/CD pipelines" },

  // Footer · Platform колонка
  "footer.wiki":        { ru: "База знаний (Wiki)",      en: "Knowledge base (Wiki)" },
  "footer.security":    { ru: "Безопасность",            en: "Security" },
  "footer.insights":    { ru: "Аналитика и метрики",     en: "Insights & metrics" },
  "footer.marketplace": { ru: "Маркетплейс интеграций",  en: "Integrations marketplace" },
  "footer.explore":     { ru: "Обзор и open-source",     en: "Overview & open-source" },

  // Footer · Resources колонка (новые)
  "footer.docs":        { ru: "Документация",            en: "Documentation" },
  "footer.api":         { ru: "API и SDK",               en: "API & SDK" },
  "footer.brand":       { ru: "Бренд-материалы",         en: "Brand assets" },
  "footer.cases":       { ru: "Кейсы и шоурум",          en: "Showcase & cases" },
  "footer.changelog":   { ru: "История изменений",       en: "Changelog" },
  "footer.support":     { ru: "Поддержка 24/7",          en: "Support 24/7" },

  // Nav · Resources
  "nav.resources":      { ru: "Ресурсы",                 en: "Resources" },

  /* ===================== WIKI · большая база ===================== */

  "wiki.title":         { ru: "Wiki · база знаний Car Blanche", en: "Wiki · Car Blanche knowledge base" },
  "wiki.subtitle":      { ru: "Документация команды за 8 лет разработки сервиса. История, архитектура, регламенты, гайды, исследования.",
                           en: "Eight years of team documentation. History, architecture, processes, guides, research." },
  "wiki.searchPages":   { ru: "Поиск страниц…",          en: "Search pages…" },
  "wiki.pages":         { ru: "Страниц",                  en: "Pages" },
  "wiki.edit":          { ru: "Редактировать",            en: "Edit" },
  "wiki.history":       { ru: "История",                  en: "History" },
  "wiki.toc":           { ru: "Оглавление",               en: "Table of contents" },
  "wiki.relatedLinks":  { ru: "Связанные ресурсы",        en: "Related resources" },
  "wiki.contacts":      { ru: "Контакты",                 en: "Contacts" },
  "wiki.lastUpdated":   { ru: "Обновлено",                en: "Updated" },
  "wiki.author":        { ru: "Автор",                    en: "Author" },
  "wiki.readingTime":   { ru: "минут чтения",             en: "min read" },

  // Wiki Home (главная страница вики)
  "wiki.home.title":    { ru: "Добро пожаловать в базу знаний Car Blanche",
                          en: "Welcome to Car Blanche knowledge base" },
  "wiki.home.intro":    {
    ru: "8 лет мы строим премиум-сервис персонализированного транспорта. Эта вики собирает всё, что важно знать команде и партнёрам: историю продукта, архитектурные решения, регламенты, исследования и гайды.",
    en: "For 8 years we have been building a premium personalized transport service. This wiki collects everything the team and partners should know: product history, architectural decisions, processes, research and guides."
  },
  "wiki.home.foundedIn":{ ru: "Основана в Уфе, 2018",     en: "Founded in Ufa, 2018" },
  "wiki.home.foundedDesc":{ ru: "Первая поездка состоялась в Уфе в марте 2018. С тех пор работаем только здесь, готовимся к запуску в других городах.",
                            en: "First ride took place in Ufa in March 2018. Since then we work only here, preparing to launch in other cities." },
  "wiki.home.statTitle":{ ru: "Цифры за 8 лет",           en: "8 years in numbers" },
  "wiki.home.stat1.v":  { ru: "8 лет",                     en: "8 years" },
  "wiki.home.stat1.l":  { ru: "В разработке сервиса",     en: "Building the service" },
  "wiki.home.stat2.v":  { ru: "~50 → 340",                 en: "~50 → 340" },
  "wiki.home.stat2.l":  { ru: "Шофёров: сейчас → цель",   en: "Chauffeurs: now → goal" },
  "wiki.home.stat3.v":  { ru: "~7,800",                    en: "~7,800" },
  "wiki.home.stat3.l":  { ru: "Поездок выполнено",        en: "Rides completed" },
  "wiki.home.stat4.v":  { ru: "1 → 20+",                   en: "1 → 20+" },
  "wiki.home.stat4.l":  { ru: "Уфа сейчас, цель к 2029",  en: "Ufa now, goal by 2029" },
  "wiki.home.stat5.v":  { ru: "4.94",                      en: "4.94" },
  "wiki.home.stat5.l":  { ru: "Средний рейтинг шофёра",   en: "Average chauffeur rating" },
  "wiki.home.stat6.v":  { ru: "98%",                       en: "98%" },
  "wiki.home.stat6.l":  { ru: "Клиентов рекомендуют",     en: "Of clients recommend us" },
  "wiki.home.timeline": { ru: "Хронология компании",      en: "Company timeline" },
  "wiki.home.popular":  { ru: "Популярные страницы",      en: "Popular pages" },
  "wiki.home.start":    { ru: "С чего начать",            en: "Start here" },

  /* ===================== RESOURCES · отдельная страница ===================== */

  "res.hero.kicker":    { ru: "Ресурсы и материалы",      en: "Resources & materials" },
  "res.hero.title":     { ru: "Всё, что нужно команде, партнёрам и клиентам", en: "Everything for team, partners and clients" },
  "res.hero.subtitle":  { ru: "Гайды, API, бренд-материалы, исследования и наш showroom-кейс с 3D-визуализацией автопарка.",
                          en: "Guides, APIs, brand assets, research and our showroom case with 3D fleet visualization." },
  "res.hero.cta.app":   { ru: "Открыть приложение",       en: "Open the app" },
  "res.hero.cta.gh":    { ru: "GitHub-аккаунт",           en: "GitHub org" },
  "res.hero.cta.3d":    { ru: "Открыть 3D Showroom →",    en: "Open 3D Showroom →" },

  "res.feat.title":     { ru: "Featured · 3D Showroom Experience", en: "Featured · 3D Showroom Experience" },
  "res.feat.subtitle":  { ru: "Интерактивная WebGL-витрина автопарка и салонов — пример работы Flutter Web + 3D-движка.",
                          en: "Interactive WebGL showroom of fleet and interiors — Flutter Web + 3D engine showcase." },
  "res.feat.b1":        { ru: "WebGL + Three.js",          en: "WebGL + Three.js" },
  "res.feat.b2":        { ru: "Flutter Web интеграция",    en: "Flutter Web integration" },
  "res.feat.b3":        { ru: "60 FPS на мобильных",       en: "60 FPS on mobile" },
  "res.feat.b4":        { ru: "Real-time материалы",       en: "Real-time materials" },
  "res.feat.open":      { ru: "Открыть кейс",              en: "Open case study" },

  "res.cat.docs":       { ru: "Документация",              en: "Documentation" },
  "res.cat.api":        { ru: "API и SDK",                 en: "APIs & SDKs" },
  "res.cat.brand":      { ru: "Бренд-материалы",           en: "Brand assets" },
  "res.cat.research":   { ru: "Исследования",              en: "Research" },
  "res.cat.cases":      { ru: "Кейсы и showcases",         en: "Cases & showcases" },
  "res.cat.video":      { ru: "Видео и тренинги",          en: "Video & training" },
  "res.cat.tools":      { ru: "Инструменты",               en: "Tools" },
  "res.cat.legal":      { ru: "Юридические документы",     en: "Legal" },

  "res.cards.count":    { ru: "ресурсов",                   en: "resources" },
  "res.popular":        { ru: "Самые скачиваемые",          en: "Most downloaded" },
  "res.newsletter.title":{ ru: "Подписка на дайджест",     en: "Newsletter" },
  "res.newsletter.desc":{ ru: "Раз в месяц — обновления roadmap, новые кейсы и инсайды команды.",
                          en: "Once a month — roadmap updates, new cases and team insights." },
  "res.newsletter.input":{ ru: "Ваш email",                en: "Your email" },
  "res.newsletter.btn": { ru: "Подписаться",                en: "Subscribe" },

  "res.support.title":  { ru: "Нужна помощь?",              en: "Need help?" },
  "res.support.desc":   { ru: "Команда поддержки отвечает 24/7. Среднее время первого ответа — 30 секунд.",
                          en: "Support team replies 24/7. Average first-response time — 30 seconds." },
  "res.support.chat":   { ru: "Открыть чат в App",          en: "Open chat in App" },
  "res.support.email":  { ru: "Написать на почту",          en: "Email us" },

  /* Showcase (главная) */
  "showcase.kicker":    { ru: "Featured · наш showcase",   en: "Featured · our showcase" },
  "showcase.title":     { ru: "3D Showroom Experience",    en: "3D Showroom Experience" },
  "showcase.desc":      { ru: "Откройте наш парк автомобилей в интерактивной 3D-витрине прямо в браузере.",
                          en: "Explore our fleet in an interactive 3D showroom right in your browser." },
  "showcase.open":      { ru: "Открыть демо →",             en: "Open demo →" },

  /* ===================== SETTINGS DRAWER ===================== */

  "set.title":          { ru: "Настройки",                  en: "Settings" },
  "set.subtitle":       { ru: "Внешний вид, язык, поведение интерфейса.", en: "Appearance, language, interface behavior." },
  "set.close":          { ru: "Закрыть",                    en: "Close" },

  "set.sec.appearance": { ru: "Внешний вид",                en: "Appearance" },
  "set.sec.lang":       { ru: "Язык",                       en: "Language" },
  "set.sec.density":    { ru: "Плотность интерфейса",       en: "Interface density" },
  "set.sec.interface":  { ru: "Поведение",                  en: "Behavior" },
  "set.sec.account":    { ru: "Аккаунт",                    en: "Account" },

  "set.theme.dark":     { ru: "Тёмная",                     en: "Dark" },
  "set.theme.dim":      { ru: "Приглушённая",               en: "Dim" },
  "set.theme.light":    { ru: "Светлая",                    en: "Light" },
  "set.theme.darkDesc": { ru: "Высокий контраст",           en: "High contrast" },
  "set.theme.dimDesc":  { ru: "Мягкий сине-серый",          en: "Soft blue-gray" },
  "set.theme.lightDesc":{ ru: "Светлая, GitHub-like",       en: "Light, GitHub-like" },

  "set.density.comfortable": { ru: "Просторная",            en: "Comfortable" },
  "set.density.compact":     { ru: "Компактная",            en: "Compact" },
  "set.density.comfDesc":    { ru: "Стандартные отступы",   en: "Standard spacing" },
  "set.density.compDesc":    { ru: "Уменьшенные отступы — больше информации на экране", en: "Tighter spacing — more on screen" },

  "set.welcome.show":   { ru: "Показать приветствие снова", en: "Show welcome again" },
  "set.welcome.desc":   { ru: "Вернуть приветственный блок на главной.", en: "Bring back the welcome banner on Code page." },
  "set.shortcuts":      { ru: "Горячие клавиши",            en: "Keyboard shortcuts" },
  "set.shortcuts.desc": { ru: "Список всех сочетаний клавиш.", en: "List of all keyboard shortcuts." },
  "set.shortcuts.open": { ru: "Открыть",                    en: "Open" },

  "set.account.profile":{ ru: "Профиль команды",            en: "Team profile" },
  "set.account.github": { ru: "Открыть GitHub",             en: "Open GitHub" },
  "set.account.site":   { ru: "Корпоративный сайт",         en: "Corporate website" },
  "set.account.app":    { ru: "Открыть приложение",         en: "Open the app" },

  "set.save.note":      { ru: "Все настройки сохраняются в этом браузере.", en: "All settings are saved in this browser." },

  /* ===================== KEYBOARD SHORTCUTS ===================== */

  "kb.title":           { ru: "Горячие клавиши",            en: "Keyboard shortcuts" },
  "kb.subtitle":        { ru: "Управляйте сайтом быстрее.", en: "Navigate faster." },
  "kb.section.search":  { ru: "Поиск и навигация",          en: "Search & navigation" },
  "kb.section.app":     { ru: "Приложение",                 en: "Application" },
  "kb.action.search":   { ru: "Открыть поиск",              en: "Open search" },
  "kb.action.cmdk":     { ru: "Поиск (альтернатива)",       en: "Search (alternative)" },
  "kb.action.settings": { ru: "Открыть настройки",          en: "Open settings" },
  "kb.action.shortcuts":{ ru: "Эта подсказка",              en: "This dialog" },
  "kb.action.close":    { ru: "Закрыть любое окно",         en: "Close any dialog" },
  "kb.action.gotoCode": { ru: "Перейти к коду",             en: "Go to Code" },
  "kb.action.gotoIssues": { ru: "Перейти к issues",         en: "Go to Issues" },
  "kb.action.gotoTeam": { ru: "Перейти к команде",          en: "Go to Team" },
  "kb.action.gotoWiki": { ru: "Перейти к wiki",             en: "Go to Wiki" },

  /* ===================== TOASTS ===================== */

  "toast.themeChanged": { ru: "Тема изменена",              en: "Theme changed" },
  "toast.themeDesc":    { ru: "Применено ко всему интерфейсу.", en: "Applied across the interface." },
  "toast.langChanged":  { ru: "Язык изменён",               en: "Language changed" },
  "toast.langDesc":     { ru: "Интерфейс переведён.",       en: "Interface translated." },
  "toast.densityChanged":{ ru: "Плотность изменена",        en: "Density changed" },
  "toast.linkCopied":   { ru: "Ссылка скопирована",         en: "Link copied" },
  "toast.welcomeReset": { ru: "Приветствие восстановлено",  en: "Welcome reset" },

  /* ===================== УФА · ШТАБ-КВАРТИРА и расширение ===================== */

  "hq.kicker":          { ru: "Штаб-квартира",                  en: "Headquarters" },
  "hq.title":           { ru: "Из Уфы — в города России и мира", en: "From Ufa — across Russia and the world" },
  "hq.subtitle":        {
    ru: "С 2018 года команда работает из Уфы. К 2029 планируем покрыть 20+ городов в России и 8 стран — премиум-сервис без географических ограничений.",
    en: "Since 2018 the team has been working from Ufa. By 2029 we plan to cover 20+ cities in Russia and 8 countries — premium service without geographic limits."
  },
  "hq.activeNow":       { ru: "Работаем сейчас",                en: "Currently active" },
  "hq.upcoming":        { ru: "Запланированные запуски",        en: "Upcoming launches" },
  "hq.legend":          { ru: "Условные обозначения",           en: "Legend" },
  "hq.cities":          { ru: "городов",                        en: "cities" },
  "hq.countries":       { ru: "стран",                          en: "countries" },
  "hq.stats.now":       { ru: "Сейчас",                         en: "Now" },
  "hq.stats.by2029":    { ru: "К 2029",                         en: "By 2029" },
  "hq.fleet":           { ru: "Парк",                           en: "Fleet" },
  "hq.population":      { ru: "Население",                      en: "Population" },
  "hq.since":           { ru: "С",                              en: "Since" },
  "hq.team":            { ru: "Команда",                        en: "Team" },

  /* ===================== СЦЕНАРИИ (с основного сайта) ===================== */

  "sc.kicker":          { ru: "Сценарии персонализации",         en: "Personalization scenarios" },
  "sc.title":           { ru: "Под каждую задачу — своя машина и шофёр", en: "Right car and chauffeur for every task" },
  "sc.subtitle":        {
    ru: "По данным McKinsey Mobility Report — 80%+ премиум-клиентов ждут интеллектуальную экосистему вместо «какая машина свободна».",
    en: "Per McKinsey Mobility Report — 80%+ of premium clients expect an intelligent ecosystem instead of 'which car is available'."
  },
  "sc.recommended":     { ru: "Рекомендуемое авто",              en: "Recommended car" },
  "sc.options":         { ru: "Опции в один клик",               en: "One-click options" },
  "sc.source":          { ru: "Источник",                        en: "Source" },
  "sc.readArticle":     { ru: "Читать статью →",                 en: "Read the article →" },

  /* ===================== ЦИТАТА ===================== */

  "quote.main":         { ru: "«Не просто поездка. Решение, адаптированное под тебя.»",
                          en: '"Not just a ride. A solution tailored to you."' },
  "quote.label":        { ru: "Ключевая мысль · car-blanche.app", en: "Key idea · car-blanche.app" },

  /* ===================== FLEET (парк) ===================== */

  "fleet.kicker":       { ru: "Тарифы",                  en: "Tariffs" },
  "fleet.title":        { ru: "8 тарифов — от Business до Top Car", en: "8 tariffs — from Business to Top Car" },
  "fleet.subtitle":     { ru: "Прозрачные цены от 1000 ₽. Фиксированный пул моделей в каждом тарифе.",
                          en: "Transparent pricing from ₽1000. Fixed model pool in each tariff." },
  "fleet.allCars":      { ru: "Все автомобили",          en: "All cars" },
  "fleet.bestFor":      { ru: "Идеально для",            en: "Best for" },
  "fleet.features":     { ru: "Особенности",             en: "Features" },
  "fleet.bookRide":     { ru: "Забронировать поездку",   en: "Book a ride" },
  "fleet.viewAll":      { ru: "Открыть на сайте →",      en: "View on website →" },
  "fleet.source":       { ru: "По данным car-blanche.net/businessnews", en: "Source: car-blanche.net/businessnews" },

  /* ===================== NEWS ===================== */

  "news.kicker":        { ru: "Новости и обновления",    en: "News & updates" },
  "news.title":         { ru: "Что нового у Car Blanche", en: "What's new at Car Blanche" },
  "news.subtitle":      { ru: "Лента бизнес-новостей: обновления сервиса, парка и плана развития.",
                          en: "Business news feed: service, fleet and roadmap updates." },
  "news.readMore":      { ru: "Читать полностью",        en: "Read full article" },
  "news.openSource":    { ru: "Источник на сайте",       en: "Source on website" },
  "news.allNews":       { ru: "Все категории",           en: "All categories" },
  "news.tag.fleet":     { ru: "Парк",                    en: "Fleet" },
  "news.tag.service":   { ru: "Сервис",                  en: "Service" },
  "news.tag.expansion": { ru: "Расширение",              en: "Expansion" },
  "news.tag.tech":      { ru: "Технологии",              en: "Tech" },
  "news.tag.client":    { ru: "Клиенты",                 en: "Clients" },

  /* ===================== LIVE COUNTERS ===================== */

  "counters.title":     { ru: "Car Blanche в цифрах",    en: "Car Blanche in numbers" },
  "counters.live":      { ru: "Обновляется в реальном времени", en: "Updated in real time" },

  /* ===================== QUOTE CAROUSEL ===================== */

  "qc.title":           { ru: "Наша философия",          en: "Our philosophy" },
  "qc.subtitle":        { ru: "Что мы говорим о сервисе и зачем мы это делаем.",
                          en: "What we say about the service and why we do it." },
} as const;

export type TKey = keyof typeof translations;

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ru";
    const saved = localStorage.getItem("cb-lang") as Lang | null;
    if (saved === "ru" || saved === "en") return saved;
    // Авто-определение: если браузер не русский — английский
    const nav = navigator.language.toLowerCase();
    return nav.startsWith("ru") ? "ru" : "en";
  });

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("cb-lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (key: TKey) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] ?? entry.ru;
  };

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang must be used within LangProvider");
  return c;
}
