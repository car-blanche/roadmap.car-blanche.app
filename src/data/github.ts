/* =========================================================
   Дополнительные данные в стиле GitHub-репозитория:
   issues, commits, branches, releases, contributors.
   ========================================================= */

export type Branch = {
  name: string;            // "phase-1-app", "phase-2-ecosystem"
  label: string;           // "Фаза 1 · App"
  color: string;           // hex для git-графа
  updated: string;         // "сегодня", "2 дня назад"
  ahead: number;           // коммитов впереди main
  behind: number;
  pr?: number;             // номер открытого PR
};

export const branches: Branch[] = [
  {
    name: "main",
    label: "main",
    color: "#3fb950",
    updated: "сегодня",
    ahead: 0,
    behind: 0,
  },
  {
    name: "phase-1/app-core",
    label: "Фаза 1 · App как центр управления",
    color: "#58a6ff",
    updated: "сегодня",
    ahead: 142,
    behind: 0,
    pr: 248,
  },
  {
    name: "phase-2/ecosystem",
    label: "Фаза 2 · Экосистема и рекомендации",
    color: "#a371f7",
    updated: "8 часов назад",
    ahead: 64,
    behind: 12,
    pr: 251,
  },
  {
    name: "phase-3/predictive",
    label: "Фаза 3 · Прогноз и интеграции",
    color: "#f0883e",
    updated: "вчера",
    ahead: 21,
    behind: 38,
  },
  {
    name: "research/smart-city",
    label: "research · интеграция умного города",
    color: "#db61a2",
    updated: "3 дня назад",
    ahead: 9,
    behind: 56,
  },
  {
    name: "ops/chauffeur-academy",
    label: "ops · академия шофёров",
    color: "#e3b341",
    updated: "сегодня",
    ahead: 18,
    behind: 4,
    pr: 252,
  },
];

export type Issue = {
  id: number;
  type: "decision" | "risk" | "feature" | "discussion";
  title: string;
  body: string;
  status: "open" | "closed" | "in-progress";
  labels: { name: string; color: string }[];
  author: string;
  comments: number;
  updated: string;
  milestone?: string;
};

export const issues: Issue[] = [
  {
    id: 248,
    type: "feature",
    title: "App 1.0 — единый интерфейс для всех каналов",
    body: "Объединяем web/iOS/Android в один продукт. Цель — 100% бронирований через App к концу Q2 2026. Поддержка 24/7 встроена в приложение, не отдельным каналом.",
    status: "in-progress",
    labels: [
      { name: "phase-1", color: "#58a6ff" },
      { name: "frontend", color: "#3fb950" },
      { name: "P0", color: "#f85149" },
    ],
    author: "product-lead",
    comments: 34,
    updated: "обновлено 2 часа назад",
    milestone: "Q2 2026 · Релиз App 1.0",
  },
  {
    id: 251,
    type: "decision",
    title: "Архитектура профиля клиента: 40+ параметров",
    body: "Принимаем решение по схеме данных. Профиль = граф интересов: маршруты, время, класс авто, любимые шофёры, музыка, температура, диета. Источник истины — Feature Store, не реляционка.",
    status: "open",
    labels: [
      { name: "phase-2", color: "#a371f7" },
      { name: "architecture", color: "#bf8700" },
      { name: "needs-review", color: "#d29922" },
    ],
    author: "platform-lead",
    comments: 18,
    updated: "обновлено 8 часов назад",
    milestone: "Q1 2027 · Платформа данных",
  },
  {
    id: 252,
    type: "feature",
    title: "Академия Car Blanche · 120 часов обучения шофёров",
    body: "Программа подготовки: этикет, безопасное вождение, иностранные языки, работа с VIP, протоколы встречи. Сертификация каждые 6 месяцев. Низкая текучка = стабильный сервис для клиента.",
    status: "in-progress",
    labels: [
      { name: "ops", color: "#e3b341" },
      { name: "chauffeur", color: "#9333ea" },
      { name: "client-experience", color: "#2f81f7" },
    ],
    author: "ops-director",
    comments: 22,
    updated: "обновлено вчера",
    milestone: "Q3 2026 · Стандарт сервиса",
  },
  {
    id: 254,
    type: "risk",
    title: "RFC: предиктивные сценарии и приватность",
    body: "Риск: предсказание поездки до её заказа может восприниматься как «слежка». Решение — opt-in по умолчанию, прозрачное объяснение «почему рекомендовано», возможность отключить одним тапом.",
    status: "open",
    labels: [
      { name: "phase-3", color: "#f0883e" },
      { name: "privacy", color: "#f85149" },
      { name: "RFC", color: "#8957e5" },
    ],
    author: "privacy-officer",
    comments: 41,
    updated: "обновлено 3 дня назад",
    milestone: "Q4 2027 · Прогноз",
  },
  {
    id: 256,
    type: "feature",
    title: "Marketplace интеграций · Open API + revenue share",
    body: "Каталог сторонних расширений: HR, расходы, travel, кейтеринг, отельный консьерж. Партнёры получают долю с поездок, инициированных через их интеграцию.",
    status: "open",
    labels: [
      { name: "phase-3", color: "#f0883e" },
      { name: "platform", color: "#1f6feb" },
      { name: "B2B", color: "#3fb950" },
    ],
    author: "ecosystem-pm",
    comments: 12,
    updated: "обновлено 5 дней назад",
    milestone: "2029 · Зрелость платформы",
  },
  {
    id: 259,
    type: "decision",
    title: "ESG-отчёты для корпоративных клиентов",
    body: "Автоматическая выгрузка CO₂-следа поездок в форматах, готовых для аудита (GRI, ESRS). Должна быть доступна с первого месяца использования.",
    status: "open",
    labels: [
      { name: "compliance", color: "#bf8700" },
      { name: "client-experience", color: "#2f81f7" },
      { name: "phase-3", color: "#f0883e" },
    ],
    author: "compliance-lead",
    comments: 9,
    updated: "обновлено неделю назад",
  },
  {
    id: 261,
    type: "discussion",
    title: "Шофёр-партнёр: модель сертификации независимых исполнителей",
    body: "Открываем платформу для сертифицированных независимых шофёров. Стандарт качества, обучение и обратная связь — те же. Обсуждаем модель: процент от поездки, фиксированный взнос или гибрид.",
    status: "open",
    labels: [
      { name: "ops", color: "#e3b341" },
      { name: "chauffeur", color: "#9333ea" },
      { name: "discussion", color: "#8b949e" },
    ],
    author: "marketplace-pm",
    comments: 27,
    updated: "обновлено 2 недели назад",
  },
];

export type Commit = {
  hash: string;
  message: string;
  author: string;
  date: string;
  branch: string;
  changes: { add: number; del: number; files: number };
};

export const commits: Commit[] = [
  {
    hash: "a3f72e1",
    message: "feat(app): добавлены пресеты салона и тишины",
    author: "ivan.k",
    date: "14 минут назад",
    branch: "phase-1/app-core",
    changes: { add: 432, del: 87, files: 12 },
  },
  {
    hash: "b81c904",
    message: "feat(ops): протокол встречи клиента в аэропорту",
    author: "anna.r",
    date: "2 часа назад",
    branch: "ops/chauffeur-academy",
    changes: { add: 156, del: 4, files: 3 },
  },
  {
    hash: "c52e0a7",
    message: "fix(api): p95 latency бронирования снижен до 180мс",
    author: "platform-bot",
    date: "5 часов назад",
    branch: "phase-1/app-core",
    changes: { add: 89, del: 142, files: 7 },
  },
  {
    hash: "d12b3f9",
    message: "rfc(privacy): черновик политики предиктивных сценариев",
    author: "privacy-officer",
    date: "вчера",
    branch: "phase-3/predictive",
    changes: { add: 312, del: 0, files: 1 },
  },
  {
    hash: "e9a4c20",
    message: "docs(roadmap): обновлены KPI для Q2 2027",
    author: "product-lead",
    date: "2 дня назад",
    branch: "phase-2/ecosystem",
    changes: { add: 48, del: 22, files: 2 },
  },
  {
    hash: "f071e8b",
    message: "feat(billing): корпоративные счета и сплит-платежи",
    author: "billing-team",
    date: "3 дня назад",
    branch: "phase-1/app-core",
    changes: { add: 921, del: 134, files: 24 },
  },
  {
    hash: "g4c8a91",
    message: "research: интеграция с городскими светофорами Москвы",
    author: "smart-city-team",
    date: "5 дней назад",
    branch: "research/smart-city",
    changes: { add: 215, del: 8, files: 6 },
  },
];

export type Release = {
  tag: string;
  title: string;
  date: string;
  highlights: string[];
  latest?: boolean;
};

export const releases: Release[] = [
  {
    tag: "v0.9.0-rc.2",
    title: "App 1.0 Release Candidate",
    date: "март 2026",
    latest: true,
    highlights: [
      "Единый интерфейс бронирования",
      "Опции в один клик · пресеты",
      "Поддержка 24/7 встроена в App",
    ],
  },
  {
    tag: "v0.8.0",
    title: "Closed beta · 500 клиентов",
    date: "февраль 2026",
    highlights: [
      "Apple Pay / Google Pay",
      "История поездок + экспорт",
      "Первый релиз концьерж-чата",
    ],
  },
  {
    tag: "v0.7.0",
    title: "Internal alpha",
    date: "январь 2026",
    highlights: [
      "Каркас приложения",
      "Базовое бронирование",
      "Интеграция с парком автомобилей",
    ],
  },
];

export type FileNode = {
  name: string;
  type: "folder" | "file";
  desc?: string;
  children?: FileNode[];
};

export const fileTree: FileNode[] = [
  {
    name: "01-app-as-control-center",
    type: "folder",
    desc: "Фаза 1 · 2026 февраль–октябрь",
    children: [
      { name: "unified-interface.md", type: "file", desc: "Единый интерфейс — все каналы в одном App" },
      { name: "one-tap-options.md", type: "file", desc: "Опции в один клик: пресеты салона и тишины" },
      { name: "support-24-7.md", type: "file", desc: "Гибридная поддержка: ИИ + живой консьерж" },
      { name: "chauffeur-academy.md", type: "file", desc: "120-часовая программа подготовки шофёров" },
      { name: "billing-2.0.md", type: "file", desc: "Корпоративные счета, PCI DSS L1" },
    ],
  },
  {
    name: "02-ecosystem-and-recommendations",
    type: "folder",
    desc: "Фаза 2 · 2027",
    children: [
      { name: "preference-profile.md", type: "file", desc: "Граф интересов клиента · 40+ параметров" },
      { name: "tracking-analytics.md", type: "file", desc: "Дашборд поездок и CO₂-след" },
      { name: "scenario-personalization.md", type: "file", desc: "12 готовых клиентских сценариев" },
      { name: "client-chauffeur-matching.md", type: "file", desc: "Алгоритм матчинга и закрепление любимого шофёра" },
      { name: "trip-concierge.md", type: "file", desc: "Управляемый опыт от двери до двери" },
    ],
  },
  {
    name: "03-prediction-and-integrations",
    type: "folder",
    desc: "Фаза 3 · 2027–2029",
    children: [
      { name: "predictive-scenarios.md", type: "file", desc: "Прогноз поездки за 8 минут до выхода" },
      { name: "smart-city-data.md", type: "file", desc: "Интеграция с API умного города" },
      { name: "eco-footprint-choice.md", type: "file", desc: "Выбор автомобиля по CO₂-следу" },
      { name: "marketplace.md", type: "file", desc: "Open API и каталог партнёрских интеграций" },
      { name: "chauffeur-partner.md", type: "file", desc: "Сертификация независимых шофёров" },
    ],
  },
  {
    name: "principles",
    type: "folder",
    desc: "Принципы, которым следуем",
    children: [
      { name: "data-transparency.md", type: "file", desc: "Прозрачность данных · клиент владеет профилем" },
      { name: "ethical-ai.md", type: "file", desc: "Этика ИИ · открытость алгоритмов" },
      { name: "inclusivity.md", type: "file", desc: "Инклюзивность · сценарии для всех" },
      { name: "sustainability.md", type: "file", desc: "Экологичность · 60% EV к 2029" },
    ],
  },
  { name: "README.md", type: "file", desc: "Обзор дорожной карты" },
  { name: "CHANGELOG.md", type: "file", desc: "История релизов" },
  { name: "CONTRIBUTING.md", type: "file", desc: "Как предложить улучшение" },
  { name: "LICENSE", type: "file", desc: "© Car Blanche, 2026" },
];

export const contributors = [
  {
    initials: "AK",
    name: "Forumbit",
    fullName: "Amir Kharisov",
    role: "Frontend · Flutter",
    badge: "Owner",
    color: "#3fb950",
  },
  {
    initials: "AF",
    name: "freesorgo",
    fullName: "Andrey",
    role: "Backend · YII2 / PHP",
    badge: "Maintainer",
    color: "#58a6ff",
  },
  {
    initials: "KB",
    name: "ookami-kb",
    fullName: "Kirill Bubochkin",
    role: "Collaborator",
    badge: "Collaborator",
    color: "#a371f7",
  },
];

export const topics = [
  "mobility",
  "premium-transport",
  "personalization",
  "chauffeur-service",
  "flutter",
  "yii2",
  "php",
  "mysql",
  "smart-city",
  "esg",
  "ufa",
  "roadmap-2029",
];

// Languages — только релевантные для продукта (mobile + backend)
export const languages = [
  { name: "Dart",   pct: 45,  color: "#00B4AB" },
  { name: "PHP",    pct: 28,  color: "#4F5D95" },
  { name: "Swift",  pct: 15,  color: "#F05138" },
  { name: "Kotlin", pct: 12,  color: "#A97BFF" },
];
