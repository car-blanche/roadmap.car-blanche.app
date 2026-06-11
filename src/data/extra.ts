/* =========================================================
   Данные для расширенных разделов: PRs, Actions, Marketplace,
   Explore, Wiki, Security, Insights.
   ========================================================= */

export type PullRequest = {
  id: number;
  title: string;
  status: "open" | "merged" | "draft" | "review";
  author: string;
  branchFrom: string;
  branchTo: string;
  updated: string;
  comments: number;
  reviews: number;
  checks: { passed: number; failed: number };
  labels: { name: string; color: string }[];
  description: string;
};

export const pulls: PullRequest[] = [
  {
    id: 248,
    title: "feat(app): единый интерфейс — финальная сборка App 1.0",
    status: "review",
    author: "ivan.k",
    branchFrom: "phase-1/app-core",
    branchTo: "main",
    updated: "обновлено 2 часа назад",
    comments: 34,
    reviews: 6,
    checks: { passed: 12, failed: 0 },
    labels: [
      { name: "phase-1", color: "#58a6ff" },
      { name: "ready-for-review", color: "#3fb950" },
      { name: "P0", color: "#f85149" },
    ],
    description:
      "Объединение iOS / Android / Web под единый продуктовый слой. Закрывает milestone «Q2 2026 · Релиз App 1.0».",
  },
  {
    id: 251,
    title: "feat(profile): схема профиля клиента · 40+ параметров",
    status: "open",
    author: "platform-lead",
    branchFrom: "phase-2/ecosystem",
    branchTo: "main",
    updated: "обновлено 8 часов назад",
    comments: 18,
    reviews: 3,
    checks: { passed: 10, failed: 2 },
    labels: [
      { name: "phase-2", color: "#a371f7" },
      { name: "architecture", color: "#bf8700" },
      { name: "needs-review", color: "#d29922" },
    ],
    description:
      "Feature Store как источник истины для профиля. RFC согласован с приватность-офицером.",
  },
  {
    id: 252,
    title: "feat(ops): академия шофёров · 120-часовая программа",
    status: "review",
    author: "ops-director",
    branchFrom: "ops/chauffeur-academy",
    branchTo: "main",
    updated: "обновлено вчера",
    comments: 22,
    reviews: 4,
    checks: { passed: 8, failed: 0 },
    labels: [
      { name: "ops", color: "#e3b341" },
      { name: "chauffeur", color: "#9333ea" },
      { name: "client-experience", color: "#2f81f7" },
    ],
    description:
      "Курсы этикета, иностранных языков, безопасного вождения. Сертификация каждые 6 месяцев.",
  },
  {
    id: 245,
    title: "feat(billing): корпоративные счета и сплит-платежи",
    status: "merged",
    author: "billing-team",
    branchFrom: "billing/v2",
    branchTo: "main",
    updated: "merged 3 дня назад",
    comments: 41,
    reviews: 8,
    checks: { passed: 24, failed: 0 },
    labels: [
      { name: "phase-1", color: "#58a6ff" },
      { name: "billing", color: "#1f6feb" },
      { name: "B2B", color: "#3fb950" },
    ],
    description:
      "Авансовые депозиты, мультивалютность, токенизация карт. Прошли PCI DSS L1 аудит.",
  },
  {
    id: 240,
    title: "fix(api): p95 latency бронирования снижен до 180мс",
    status: "merged",
    author: "platform-bot",
    branchFrom: "perf/booking",
    branchTo: "main",
    updated: "merged 5 дней назад",
    comments: 7,
    reviews: 2,
    checks: { passed: 18, failed: 0 },
    labels: [
      { name: "performance", color: "#3fb950" },
      { name: "P1", color: "#d29922" },
    ],
    description:
      "Оптимизация графа запросов, кеширование тарифов. SLA 99.9% выдержан.",
  },
  {
    id: 254,
    title: "draft(privacy): политика предиктивных сценариев · RFC",
    status: "draft",
    author: "privacy-officer",
    branchFrom: "phase-3/predictive",
    branchTo: "main",
    updated: "обновлено 3 дня назад",
    comments: 9,
    reviews: 0,
    checks: { passed: 0, failed: 0 },
    labels: [
      { name: "phase-3", color: "#f0883e" },
      { name: "privacy", color: "#f85149" },
      { name: "RFC", color: "#8957e5" },
      { name: "draft", color: "#6e7681" },
    ],
    description:
      "Opt-in по умолчанию, прозрачное объяснение «почему рекомендовано», отключение одним тапом.",
  },
  {
    id: 256,
    title: "feat(marketplace): черновик каталога интеграций",
    status: "open",
    author: "ecosystem-pm",
    branchFrom: "phase-3/predictive",
    branchTo: "main",
    updated: "обновлено 5 дней назад",
    comments: 12,
    reviews: 1,
    checks: { passed: 6, failed: 1 },
    labels: [
      { name: "phase-3", color: "#f0883e" },
      { name: "platform", color: "#1f6feb" },
      { name: "marketplace", color: "#a371f7" },
    ],
    description:
      "Каталог сторонних расширений с revenue share. Песочница и публичная документация SDK.",
  },
];

/* ===================== ACTIONS / WORKFLOWS ===================== */

export type Workflow = {
  name: string;
  file: string;
  branch: string;
  status: "success" | "running" | "failed" | "queued";
  duration: string;
  triggered: string;
  author: string;
  commitMessage: string;
};

export const workflows: Workflow[] = [
  {
    name: "CI · App 1.0 build & tests",
    file: ".github/workflows/app-ci.yml",
    branch: "phase-1/app-core",
    status: "success",
    duration: "4 мин 12 с",
    triggered: "5 минут назад",
    author: "ivan.k",
    commitMessage: "feat(app): пресеты салона и тишины",
  },
  {
    name: "E2E · сценарии бронирования",
    file: ".github/workflows/e2e.yml",
    branch: "phase-1/app-core",
    status: "running",
    duration: "идёт · 2 мин",
    triggered: "только что",
    author: "platform-bot",
    commitMessage: "test: добавлен сценарий «В аэропорт»",
  },
  {
    name: "Security scan · PCI DSS readiness",
    file: ".github/workflows/security.yml",
    branch: "main",
    status: "success",
    duration: "8 мин 03 с",
    triggered: "1 час назад",
    author: "compliance-bot",
    commitMessage: "chore: ежедневный security-аудит",
  },
  {
    name: "Deploy · staging.car-blanche.app",
    file: ".github/workflows/deploy-staging.yml",
    branch: "main",
    status: "success",
    duration: "2 мин 45 с",
    triggered: "3 часа назад",
    author: "platform-bot",
    commitMessage: "release: v0.9.0-rc.2",
  },
  {
    name: "Lighthouse · App performance budget",
    file: ".github/workflows/lighthouse.yml",
    branch: "phase-1/app-core",
    status: "failed",
    duration: "1 мин 12 с",
    triggered: "4 часа назад",
    author: "ivan.k",
    commitMessage: "ui: новый онбординг",
  },
  {
    name: "ML pipeline · обучение модели рекомендаций",
    file: ".github/workflows/ml-train.yml",
    branch: "phase-2/ecosystem",
    status: "queued",
    duration: "—",
    triggered: "ожидание slot · 1 мин",
    author: "ml-team",
    commitMessage: "model: feature engineering v3",
  },
  {
    name: "Chauffeur certification · sync",
    file: ".github/workflows/chauffeur-sync.yml",
    branch: "ops/chauffeur-academy",
    status: "success",
    duration: "32 с",
    triggered: "вчера",
    author: "ops-director",
    commitMessage: "data: обновлены результаты экзаменов",
  },
];

/* ===================== MARKETPLACE ===================== */

export type MarketplaceItem = {
  name: string;
  category: "Integration" | "Action" | "App" | "Tool";
  description: string;
  publisher: string;
  verified: boolean;
  rating: number;       // 0..5
  installs: string;
  price: "Free" | "Paid" | "Free trial";
  icon: string;         // emoji
  color: string;
};

export const marketplaceItems: MarketplaceItem[] = [
  /* ===== Транспортные опции и сценарии ===== */
  {
    name: "Детское кресло",
    category: "Tool",
    description: "Безопасные кресла 3 возрастных групп: 0-3, 3-7, 7-12 лет. Устанавливаются и проверяются шофёром.",
    publisher: "Car Blanche",
    verified: true,
    rating: 5.0,
    installs: "9.4k",
    price: "Free",
    icon: "👶",
    color: "#3fb950",
  },
  {
    name: "Трансфер из аэропорта",
    category: "App",
    description: "Авто-трекинг рейса по номеру. Подача авто к выходу. Бесплатное ожидание 60 минут с момента посадки.",
    publisher: "Car Blanche",
    verified: true,
    rating: 4.9,
    installs: "14.2k",
    price: "Free",
    icon: "✈️",
    color: "#58a6ff",
  },
  {
    name: "Calendar Sync · Google/Outlook",
    category: "Integration",
    description: "Подсказка машины за 30 минут до встречи в календаре. Авто-бронирование под расписание.",
    publisher: "Car Blanche",
    verified: true,
    rating: 4.9,
    installs: "8.1k",
    price: "Free",
    icon: "📅",
    color: "#a371f7",
  },
  {
    name: "Расширенная страховка KASKO+",
    category: "Tool",
    description: "Дополнительное покрытие на каждую поездку. Защита от любых рисков, без франшизы для клиента.",
    publisher: "Car Blanche × Ингосстрах",
    verified: true,
    rating: 4.8,
    installs: "5.6k",
    price: "Paid",
    icon: "🛡️",
    color: "#3fb950",
  },
  {
    name: "Wi-Fi и зарядки в салоне",
    category: "Tool",
    description: "Бесплатный Wi-Fi 4G/5G и беспроводные зарядки для iOS / Android в каждом авто тарифов Elegance+.",
    publisher: "Car Blanche",
    verified: true,
    rating: 4.7,
    installs: "11.3k",
    price: "Free",
    icon: "📶",
    color: "#58a6ff",
  },
  {
    name: "Concierge Service",
    category: "App",
    description: "Личный шофёр для вашего автомобиля. Сертифицированный, обученный, любое время суток. От 1000 ₽.",
    publisher: "Car Blanche",
    verified: true,
    rating: 4.9,
    installs: "6.8k",
    price: "Paid",
    icon: "🎩",
    color: "#1f6feb",
  },

  /* ===== Корпоративные ===== */
  {
    name: "B2B · корпоративные тарифы",
    category: "App",
    description: "Закрытые контракты, выделенный account-менеджер, SLA 5 минут, ежемесячные акты в 1С / SAP.",
    publisher: "Car Blanche",
    verified: true,
    rating: 4.9,
    installs: "2.4k",
    price: "Paid",
    icon: "💼",
    color: "#d29922",
  },
  {
    name: "SAP Concur · авто-отчёты",
    category: "Integration",
    description: "Автоматическая выгрузка поездок в SAP Concur. Для команд от 50 человек.",
    publisher: "SAP · verified partner",
    verified: true,
    rating: 4.7,
    installs: "1.2k",
    price: "Paid",
    icon: "📊",
    color: "#0073BB",
  },
  {
    name: "1С: Бухгалтерия — интеграция",
    category: "Integration",
    description: "Авто-выгрузка актов и счетов-фактур в 1С. Соответствие ФЗ-54. Удобно бухгалтерии.",
    publisher: "Car Blanche × 1С",
    verified: true,
    rating: 4.6,
    installs: "3.4k",
    price: "Free",
    icon: "🧾",
    color: "#FFD500",
  },
  {
    name: "Семейный тариф · Family Wallet",
    category: "App",
    description: "Общий лимит на семью. Утверждение поездок детей и пожилых родителей. Геофенсы безопасности.",
    publisher: "Car Blanche",
    verified: true,
    rating: 4.8,
    installs: "4.2k",
    price: "Free",
    icon: "👨‍👩‍👧",
    color: "#3fb950",
  },

  /* ===== Спецсобытия ===== */
  {
    name: "Свадебный пакет · декор",
    category: "Tool",
    description: "Цветочное оформление авто, лента «молодожёны», шампанское в салоне, шофёр в смокинге.",
    publisher: "Car Blanche · Events",
    verified: true,
    rating: 5.0,
    installs: "1.1k",
    price: "Paid",
    icon: "💍",
    color: "#f0883e",
  },
  {
    name: "VIP-сопровождение мероприятий",
    category: "App",
    description: "Подача к red carpet, знание back-entrances, ожидание без счётчика, связь с PR-командой.",
    publisher: "Car Blanche",
    verified: true,
    rating: 4.9,
    installs: "640",
    price: "Paid",
    icon: "🎬",
    color: "#db61a2",
  },
  {
    name: "Driving Experience · Top Car",
    category: "App",
    description: "Час за рулём Ferrari или McLaren (или с шофёром). Фото-видео в подарок. Маршрут на выбор.",
    publisher: "Car Blanche",
    verified: true,
    rating: 5.0,
    installs: "320",
    price: "Paid",
    icon: "🏎️",
    color: "#f85149",
  },

  /* ===== Технологии и сервисы ===== */
  {
    name: "Поддержка 24/7 в один тап",
    category: "App",
    description: "Гибридная поддержка: ИИ-ассистент за секунды + живой консьерж в сложных случаях. Среднее время ответа — 30 сек.",
    publisher: "Car Blanche",
    verified: true,
    rating: 4.9,
    installs: "22.1k",
    price: "Free",
    icon: "💬",
    color: "#58a6ff",
  },
  {
    name: "Любимый шофёр · закрепление",
    category: "Tool",
    description: "Сохраните понравившегося шофёра. При следующем заказе — приедет именно он. Учитываются предпочтения.",
    publisher: "Car Blanche",
    verified: true,
    rating: 4.9,
    installs: "5.8k",
    price: "Free",
    icon: "🤝",
    color: "#e3b341",
  },
  {
    name: "Smart City API · Уфа / Москва",
    category: "Integration",
    description: "Данные о светофорах, парковках и перекрытиях в реальном времени. Уменьшает время в пробках на 12%.",
    publisher: "DIT Moscow · DIT Ufa",
    verified: true,
    rating: 4.6,
    installs: "2.1k",
    price: "Free",
    icon: "🏙️",
    color: "#a371f7",
  },
  {
    name: "Trip Concierge · мониторинг поездки",
    category: "App",
    description: "Реальное время: ETA, статус, маршрут, связь с шофёром. Подходит для встречающих и ассистентов.",
    publisher: "Car Blanche",
    verified: true,
    rating: 4.8,
    installs: "8.4k",
    price: "Free",
    icon: "📍",
    color: "#3fb950",
  },
  {
    name: "Голосовой ассистент",
    category: "App",
    description: "Голосом: «Машину Elegance к 18:40 в Шереметьево, шофёра со знанием английского». Без открытия экрана.",
    publisher: "Car Blanche Labs",
    verified: true,
    rating: 4.5,
    installs: "1.9k",
    price: "Free",
    icon: "🎙️",
    color: "#db61a2",
  },

  /* ===== Партнёры ===== */
  {
    name: "Aeroflot Bonus · мили",
    category: "Integration",
    description: "Начисление миль за каждую поездку в/из аэропорта. Премиум-клиентам — двойные мили.",
    publisher: "Aeroflot",
    verified: true,
    rating: 4.8,
    installs: "5.6k",
    price: "Free",
    icon: "✈️",
    color: "#f0883e",
  },
  {
    name: "Отельный консьерж · LHW",
    category: "Integration",
    description: "Гость 5* отеля не звонит — авто Car Blanche уже у дверей. Прямая интеграция с consierge-системами.",
    publisher: "LHW · partner",
    verified: true,
    rating: 4.7,
    installs: "850",
    price: "Paid",
    icon: "🏨",
    color: "#f85149",
  },
  {
    name: "ESG-отчёты · CO₂ след",
    category: "Tool",
    description: "Готовые отчёты GRI / ESRS по CO₂ для каждого корпоративного клиента. Аудиторские пакеты.",
    publisher: "Car Blanche",
    verified: true,
    rating: 5.0,
    installs: "1.4k",
    price: "Free trial",
    icon: "🌿",
    color: "#3fb950",
  },
];

/* ===================== EXPLORE ===================== */

export type ExploreRepo = {
  org: string;
  name: string;
  description: string;
  stars: string;
  language: string;
  languageColor: string;
  topics: string[];
};

export const exploreRepos: ExploreRepo[] = [
  {
    org: "car-blanche",
    name: "chauffeur-academy-curriculum",
    description: "Открытая часть курса для шофёров: 120 часов программы — этикет, безопасное вождение, иностранные языки, работа с VIP-клиентами.",
    stars: "1.2k",
    language: "Markdown",
    languageColor: "#083fa1",
    topics: ["chauffeur", "training", "service-design", "academy"],
  },
  {
    org: "car-blanche",
    name: "flutter-mobility-sdk",
    description: "Открытый SDK на Dart/Flutter для интеграции премиум-транспорта в сторонние приложения: бронирование, оплата, трекинг.",
    stars: "3.8k",
    language: "Dart",
    languageColor: "#00B4AB",
    topics: ["flutter", "dart", "sdk", "mobility"],
  },
  {
    org: "car-blanche",
    name: "esg-reporter",
    description: "Open-source библиотека на PHP для расчёта CO₂-следа поездок по стандартам GRI и ESRS. Используется в корпоративных отчётах.",
    stars: "642",
    language: "PHP",
    languageColor: "#4F5D95",
    topics: ["esg", "co2", "compliance", "php"],
  },
  {
    org: "car-blanche",
    name: "yii2-mobility-extensions",
    description: "Набор Yii2-расширений для биллинга, RBAC шофёров и интеграций с платёжными провайдерами (Тинькофф, Сбер, СБП).",
    stars: "927",
    language: "PHP",
    languageColor: "#4F5D95",
    topics: ["yii2", "php", "billing", "rbac"],
  },
  {
    org: "car-blanche",
    name: "design-system",
    description: "Дизайн-система Car Blanche: 240 цветовых токенов, 56 типографических, компоненты Flutter и Web. Темы Light / Dark / Dim.",
    stars: "2.4k",
    language: "Dart",
    languageColor: "#00B4AB",
    topics: ["design-system", "flutter", "tokens", "ui"],
  },
  {
    org: "car-blanche",
    name: "tariffs-spec",
    description: "Открытая спецификация 8 тарифов: Business, Elegance, Luxury, Premium, Exclusive, Top Car, XXL, Concierge. JSON + Markdown.",
    stars: "478",
    language: "Markdown",
    languageColor: "#083fa1",
    topics: ["tariffs", "spec", "open-data"],
  },
];

export const trendingTopics = [
  { name: "premium-mobility",    count: "1.2k repos" },
  { name: "chauffeur-service",   count: "318 repos" },
  { name: "flutter-mobility",    count: "2.4k repos" },
  { name: "yii2-extensions",     count: "1.1k repos" },
  { name: "esg-transport",       count: "247 repos" },
  { name: "concierge-service",   count: "180 repos" },
  { name: "b2b-mobility",        count: "640 repos" },
];

/* ===================== INSIGHTS ===================== */

export const insightStats = [
  { label: "Контрибьюторов", value: "48", delta: "+6 за месяц", positive: true },
  { label: "Pull requests", value: "264", delta: "+38 за неделю", positive: true },
  { label: "Issues закрыто", value: "1,124", delta: "92% за квартал", positive: true },
  { label: "Среднее время review", value: "6.4 ч", delta: "−1.2 ч", positive: true },
  { label: "Deploy frequency", value: "12 / нед.", delta: "+3", positive: true },
  { label: "MTTR", value: "18 мин", delta: "−5 мин", positive: true },
];

// 12-недельный массив активности коммитов
export const commitActivity = [
  4, 12, 8, 18, 22, 15, 28, 34, 26, 31, 42, 38,
];

/* ===================== WIKI ===================== */

export type WikiPage = {
  slug: string;
  title: string;
  desc: string;
  group: string;
};

export const wikiPages: WikiPage[] = [
  { group: "Начало", slug: "home", title: "Home · обзор дорожной карты", desc: "Главная страница вики с навигацией." },
  { group: "Начало", slug: "principles", title: "Принципы", desc: "4 принципа: прозрачность, этика ИИ, инклюзивность, экологичность." },
  { group: "Начало", slug: "glossary", title: "Глоссарий", desc: "Термины: шофёр, концьерж, сценарий, профиль, экослед." },

  { group: "Продукт", slug: "app-architecture", title: "Архитектура App", desc: "Слои: UI, бизнес-логика, API-gateway, фичефлаги." },
  { group: "Продукт", slug: "personalization", title: "Модель персонализации", desc: "40+ параметров профиля, граф интересов, сценарии." },
  { group: "Продукт", slug: "trip-concierge", title: "Trip Concierge", desc: "Опыт от двери до двери — pre / during / after." },

  { group: "Операции", slug: "chauffeur-standard", title: "Стандарт шофёра", desc: "Регламент, дресс-код, протоколы встречи, словарь обращения." },
  { group: "Операции", slug: "academy", title: "Академия Car Blanche", desc: "120 часов обучения, сертификация каждые 6 месяцев." },
  { group: "Операции", slug: "qa-rides", title: "QA-поездки", desc: "Тайные пассажиры, 200+ проверок в месяц." },

  { group: "Compliance", slug: "privacy-center", title: "Privacy Center", desc: "Контроль данных клиентом, экспорт, удаление, GDPR/152-ФЗ." },
  { group: "Compliance", slug: "pci-iso", title: "PCI DSS L1 / ISO 27001", desc: "Сертификация платёжной инфраструктуры." },
  { group: "Compliance", slug: "esg", title: "ESG-методология", desc: "Расчёт CO₂, отчёты GRI/ESRS, цели до 2029." },

  { group: "Разработка", slug: "ci-cd", title: "CI/CD pipeline", desc: "Монорепо, feature flags, релизы каждые 2 недели." },
  { group: "Разработка", slug: "api", title: "Public API & SDK", desc: "GraphQL gateway, webhooks, песочница." },
  { group: "Разработка", slug: "ml-platform", title: "ML Platform", desc: "Feature Store, обучение и деплой моделей рекомендаций." },
];
