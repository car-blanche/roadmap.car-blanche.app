/* =========================================================
   Данные команды: дискуссии, активность, достижения,
   pinned items, расширенные профили.
   ========================================================= */

/* ============== DISCUSSIONS (как GitHub Discussions) ============== */

export type DiscussionCategory = "announcement" | "qa" | "ideas" | "show" | "polls" | "general";

export type Discussion = {
  id: number;
  title: string;
  category: DiscussionCategory;
  body: string;
  author: string;
  authorRole: string;
  authorColor: string;
  comments: number;
  upvotes: number;
  pinned?: boolean;
  answered?: boolean;
  updated: string;
  labels: { name: string; color: string }[];
  /** Если задача — содержит поля трекера */
  task?: {
    code: string;          // "CB-127"
    project: string;       // "App 1.0"
    board: string;         // "Sprint 12"
    column: "Backlog" | "To do" | "In progress" | "Review" | "Done";
    assignee: string;      // username
    dueDate: string;       // "2026-04-15"
    tags: string[];
    estimateHours: number;
    type: "feature" | "bug" | "improvement" | "tech-debt";
    priority: "P0" | "P1" | "P2" | "P3";
  };
};

export const discussionCategories: { key: DiscussionCategory; label: string; icon: string; color: string; desc: string }[] = [
  { key: "announcement", label: "Announcements", icon: "📣", color: "#f0883e", desc: "Объявления команды и продукта" },
  { key: "qa",           label: "Q&A",           icon: "💡", color: "#a371f7", desc: "Вопросы и ответы. Можно отметить «Answered»" },
  { key: "ideas",        label: "Ideas",         icon: "💭", color: "#58a6ff", desc: "Идеи для дорожной карты и продукта" },
  { key: "show",         label: "Show & tell",   icon: "🚀", color: "#3fb950", desc: "Покажи, что сделал" },
  { key: "polls",        label: "Polls",         icon: "📊", color: "#d29922", desc: "Голосования внутри команды" },
  { key: "general",      label: "General",       icon: "💬", color: "#8b949e", desc: "Обо всём остальном" },
];

export const discussions: Discussion[] = [
  /* ===================== СТРАТЕГИЧЕСКИЕ ЗАДАЧИ ОСНОВАТЕЛЯ ===================== */
  {
    id: 100,
    title: "Запуск в Москве · открытие первого филиала вне Уфы",
    category: "announcement",
    body: "Стратегическая цель Q4 2026. Нужно: арендовать офис, набрать локального ops-менеджера, организовать парк из 15 авто (тарифы Business + Elegance), провести первую партию шофёров через выездную академию. Бюджет согласован с инвесторами. Контроль — лично у основателя, операционка — на нанятого ops-менеджера.",
    author: "car-blanche",
    authorRole: "Owner / Founder",
    authorColor: "#e3b341",
    comments: 32,
    upvotes: 84,
    pinned: true,
    updated: "обновлено сегодня",
    labels: [
      { name: "P0",         color: "#f85149" },
      { name: "expansion",  color: "#f0883e" },
      { name: "founder",    color: "#e3b341" },
      { name: "Q4-2026",    color: "#a371f7" },
    ],
    task: {
      code: "CB-100",
      project: "Expansion · Moscow",
      board: "Q4 2026 · Strategy",
      column: "In progress",
      assignee: "car-blanche",
      dueDate: "2026-12-31",
      tags: ["expansion", "moscow", "ops", "hiring"],
      estimateHours: 480,
      type: "feature",
      priority: "P0",
    },
  },
  {
    id: 101,
    title: "Найм Operations Director — масштабирование команды",
    category: "ideas",
    body: "Сейчас всю операционку (шофёры, парк, B2B-клиенты, академия) тянет основатель + 1 ops-помощник. Нужен сильный Operations Director уровня Senior, чтобы готовиться к выходу в Москву и СПб. Профиль: 5+ лет опыта в премиум-сервисах (Yandex Premium / Wheely / SIXT), знание Москвы. Бюджет согласован.",
    author: "car-blanche",
    authorRole: "Owner / Founder",
    authorColor: "#e3b341",
    comments: 18,
    upvotes: 54,
    pinned: true,
    updated: "обновлено вчера",
    labels: [
      { name: "P0",        color: "#f85149" },
      { name: "hiring",    color: "#3fb950" },
      { name: "ops",       color: "#e3b341" },
      { name: "founder",   color: "#e3b341" },
    ],
    task: {
      code: "CB-101",
      project: "People & Hiring",
      board: "Q2 2026 · Hiring",
      column: "To do",
      assignee: "car-blanche",
      dueDate: "2026-06-30",
      tags: ["hiring", "senior", "operations"],
      estimateHours: 120,
      type: "improvement",
      priority: "P0",
    },
  },
  {
    id: 102,
    title: "Партнёрство с премиум-отелями Уфы и Москвы (LHW)",
    category: "ideas",
    body: "Заключить эксклюзивные договоры с 5-звёздочными отелями: Hilton Garden Inn Ufa, Metropol Moscow, Four Seasons. Концьерж отеля одним кликом вызывает Car Blanche гостю. Revenue share: 10% с поездки. На основателе: первые встречи, согласование условий, юридика. После — передача в Operations.",
    author: "car-blanche",
    authorRole: "Owner / Founder",
    authorColor: "#e3b341",
    comments: 24,
    upvotes: 41,
    pinned: true,
    updated: "обновлено 3 дня назад",
    labels: [
      { name: "P1",            color: "#d29922" },
      { name: "partnerships",  color: "#a371f7" },
      { name: "B2B",           color: "#58a6ff" },
      { name: "founder",       color: "#e3b341" },
    ],
    task: {
      code: "CB-102",
      project: "Partnerships",
      board: "Q3 2026 · Partners",
      column: "In progress",
      assignee: "car-blanche",
      dueDate: "2026-09-30",
      tags: ["hotels", "lhw", "revenue-share"],
      estimateHours: 80,
      type: "feature",
      priority: "P1",
    },
  },
  {
    id: 103,
    title: "Раунд инвестиций Series A — план презентации инвесторам",
    category: "announcement",
    body: "Цель — привлечь $3-5M на масштабирование в 5 городов России к 2027. Подготовить: пакет для инвесторов (deck + financial model + customer metrics), список фондов (Sber Ventures, Tinkoff, AltaIR, foreign — Speedinvest, Index), календарь встреч на Q3 2026. Юридика — внешний партнёр.",
    author: "car-blanche",
    authorRole: "Owner / Founder",
    authorColor: "#e3b341",
    comments: 12,
    upvotes: 67,
    pinned: true,
    updated: "обновлено 5 дней назад",
    labels: [
      { name: "P0",            color: "#f85149" },
      { name: "investors",     color: "#e3b341" },
      { name: "Series A",      color: "#a371f7" },
      { name: "founder",       color: "#e3b341" },
    ],
    task: {
      code: "CB-103",
      project: "Fundraising · Series A",
      board: "Q3 2026 · Strategy",
      column: "Backlog",
      assignee: "car-blanche",
      dueDate: "2026-09-15",
      tags: ["investors", "series-a", "fundraising"],
      estimateHours: 200,
      type: "feature",
      priority: "P0",
    },
  },
  {
    id: 104,
    title: "Расширение парка: переговоры с автосалонами BMW и Mercedes",
    category: "ideas",
    body: "Для запуска в Москве (Q4 2026) нужно 15 новых авто Premium-класса. Условия лизинга: оптимальная ставка через корпоративные программы. Лично основатель ведёт переговоры с Авилон, Major Auto. Цель — снижение CapEx на 20% и доступ к новым моделям до публичного анонса.",
    author: "car-blanche",
    authorRole: "Owner / Founder",
    authorColor: "#e3b341",
    comments: 9,
    upvotes: 28,
    pinned: true,
    updated: "обновлено неделю назад",
    labels: [
      { name: "P1",          color: "#d29922" },
      { name: "fleet",       color: "#a371f7" },
      { name: "leasing",     color: "#3fb950" },
      { name: "founder",     color: "#e3b341" },
    ],
    task: {
      code: "CB-104",
      project: "Fleet expansion",
      board: "Q3 2026 · Operations",
      column: "In progress",
      assignee: "car-blanche",
      dueDate: "2026-10-15",
      tags: ["fleet", "leasing", "bmw", "mercedes"],
      estimateHours: 60,
      type: "improvement",
      priority: "P1",
    },
  },
  {
    id: 105,
    title: "Бренд-стратегия и PR на 2026-2027 (Forbes, РБК, VC.ru)",
    category: "ideas",
    body: "Цель — стать узнаваемым брендом премиум-такси в Москве к концу 2027. Договориться с Forbes (профиль основателя + кейс компании), РБК (B2B-кейс с корпоративным клиентом), VC.ru (история продукта). PR-агентство уже выбрано (PR Partner). Запуск медиа-плана — после релиза Москвы.",
    author: "car-blanche",
    authorRole: "Owner / Founder",
    authorColor: "#e3b341",
    comments: 14,
    upvotes: 33,
    updated: "обновлено 2 недели назад",
    labels: [
      { name: "P2",            color: "#8b949e" },
      { name: "brand",         color: "#db61a2" },
      { name: "PR",            color: "#f0883e" },
      { name: "founder",       color: "#e3b341" },
    ],
    task: {
      code: "CB-105",
      project: "Brand & PR",
      board: "2026-2027 · Marketing",
      column: "Backlog",
      assignee: "car-blanche",
      dueDate: "2027-03-31",
      tags: ["brand", "pr", "forbes", "rbk"],
      estimateHours: 120,
      type: "improvement",
      priority: "P2",
    },
  },
  {
    id: 106,
    title: "Корпоративная программа лояльности для постоянных клиентов",
    category: "ideas",
    body: "Разработать программу: статусы Silver / Gold / Platinum, кешбэк, приоритет подачи, бесплатные доп-опции, личный консьерж. Цель — удержать топ-100 клиентов B2B и создать стимул для роста. Основатель: концепция, экономика, согласование с командой. Реализация — команда продукта.",
    author: "car-blanche",
    authorRole: "Owner / Founder",
    authorColor: "#e3b341",
    comments: 21,
    upvotes: 48,
    updated: "обновлено 4 дня назад",
    labels: [
      { name: "P1",          color: "#d29922" },
      { name: "loyalty",     color: "#e3b341" },
      { name: "retention",   color: "#3fb950" },
      { name: "founder",     color: "#e3b341" },
    ],
    task: {
      code: "CB-106",
      project: "Customer Retention",
      board: "Q2 2026 · Strategy",
      column: "To do",
      assignee: "car-blanche",
      dueDate: "2026-05-31",
      tags: ["loyalty", "retention", "b2b"],
      estimateHours: 80,
      type: "feature",
      priority: "P1",
    },
  },
  {
    id: 107,
    title: "Партнёрство с Аэрофлот Bonus · мили за поездки",
    category: "ideas",
    body: "Финализировать договор с Аэрофлот: за поездки в/из аэропорта клиент получает мили на свой аккаунт. Премиум-клиенты — двойные мили. Это важный конкурентный плюс на Москве. Юридика 80% готова, осталось согласовать комиссию и техническую интеграцию (на стороне backend).",
    author: "car-blanche",
    authorRole: "Owner / Founder",
    authorColor: "#e3b341",
    comments: 7,
    upvotes: 22,
    updated: "обновлено вчера",
    labels: [
      { name: "P1",            color: "#d29922" },
      { name: "partnerships",  color: "#a371f7" },
      { name: "airport",       color: "#58a6ff" },
      { name: "founder",       color: "#e3b341" },
    ],
    task: {
      code: "CB-107",
      project: "Partnerships",
      board: "Q3 2026 · Partners",
      column: "Review",
      assignee: "car-blanche",
      dueDate: "2026-08-15",
      tags: ["aeroflot", "miles", "loyalty"],
      estimateHours: 40,
      type: "feature",
      priority: "P1",
    },
  },

  /* ===================== ПРИОРИТЕТНЫЕ ЗАДАЧИ КОМАНДЫ ===================== */
  {
    id: 201,
    title: "Отключение email-уведомлений в настройках клиента",
    category: "ideas",
    body: "Добавить в Profile → Notifications переключатель «Получать уведомления на почту». Сейчас email шлются всем по умолчанию — часть клиентов жалуется на шум. Дополнительно: гранулярные настройки по типам (бронь, статус поездки, чеки, маркетинг).",
    author: "Forumbit",
    authorRole: "Owner",
    authorColor: "#3fb950",
    comments: 8,
    upvotes: 24,
    pinned: true,
    updated: "обновлено сегодня",
    labels: [
      { name: "P1",          color: "#d29922" },
      { name: "frontend",    color: "#00B4AB" },
      { name: "backend",     color: "#4F5D95" },
      { name: "ux",          color: "#58a6ff" },
    ],
    task: {
      code: "CB-201",
      project: "App 1.0",
      board: "Sprint 12 · App",
      column: "To do",
      assignee: "Forumbit",
      dueDate: "2026-04-15",
      tags: ["notifications", "settings", "privacy"],
      estimateHours: 12,
      type: "feature",
      priority: "P1",
    },
  },
  {
    id: 202,
    title: "Фича «Повторить заказ» — заказ из истории в 1 тап",
    category: "ideas",
    body: "В разделе «История поездок» добавить кнопку «🔁 Повторить». Создаёт новый заказ с теми же: адресами, тарифом, опциями, любимым шофёром (если доступен). Цель — снизить трение для регулярных клиентов с одинаковыми маршрутами (дом ↔ офис, аэропорт).",
    author: "Forumbit",
    authorRole: "Owner",
    authorColor: "#3fb950",
    comments: 14,
    upvotes: 38,
    pinned: true,
    updated: "обновлено сегодня",
    labels: [
      { name: "P0",          color: "#f85149" },
      { name: "feature",     color: "#3fb950" },
      { name: "frontend",    color: "#00B4AB" },
      { name: "ux",          color: "#58a6ff" },
    ],
    task: {
      code: "CB-202",
      project: "App 1.0",
      board: "Sprint 12 · App",
      column: "In progress",
      assignee: "Forumbit",
      dueDate: "2026-04-08",
      tags: ["history", "one-tap", "retention"],
      estimateHours: 16,
      type: "feature",
      priority: "P0",
    },
  },
  {
    id: 203,
    title: "История поиска адресов с автоподсказками",
    category: "ideas",
    body: "Сохранять последние 20 введённых адресов локально + 50 на сервере. При вводе нового адреса — показывать список наверху подсказок (раньше всех Yandex/2GIS-вариантов). Особенно важно для частых аэропортов, отелей, офисов клиентов.",
    author: "ookami-kb",
    authorRole: "Collaborator",
    authorColor: "#a371f7",
    comments: 6,
    upvotes: 19,
    pinned: true,
    updated: "обновлено вчера",
    labels: [
      { name: "P1",          color: "#d29922" },
      { name: "frontend",    color: "#00B4AB" },
      { name: "ux",          color: "#58a6ff" },
      { name: "cache",       color: "#a371f7" },
    ],
    task: {
      code: "CB-203",
      project: "App 1.0",
      board: "Sprint 12 · App",
      column: "Backlog",
      assignee: "ookami-kb",
      dueDate: "2026-04-22",
      tags: ["search", "history", "autocomplete"],
      estimateHours: 10,
      type: "feature",
      priority: "P1",
    },
  },
  {
    id: 204,
    title: "Фича «Изменение заявки» — редактирование активного заказа",
    category: "ideas",
    body: "После создания заказа клиент может: изменить точку подачи (до прибытия шофёра), добавить/убрать опции (детское кресло, Wi-Fi), сменить тариф (с доплатой), сменить конечный адрес (даже во время поездки — с пересчётом цены). Уведомление шофёра автоматически.",
    author: "Forumbit",
    authorRole: "Owner",
    authorColor: "#3fb950",
    comments: 22,
    upvotes: 47,
    pinned: true,
    updated: "обновлено 2 дня назад",
    labels: [
      { name: "P0",          color: "#f85149" },
      { name: "feature",     color: "#3fb950" },
      { name: "frontend",    color: "#00B4AB" },
      { name: "backend",     color: "#4F5D95" },
      { name: "chauffeur",   color: "#9333ea" },
    ],
    task: {
      code: "CB-204",
      project: "App 1.0",
      board: "Sprint 13 · Order Flow",
      column: "Review",
      assignee: "freesorgo",
      dueDate: "2026-04-12",
      tags: ["order", "edit", "real-time"],
      estimateHours: 32,
      type: "feature",
      priority: "P0",
    },
  },
  {
    id: 205,
    title: "Bug: «данный автомобиль недоступен» при бронировании",
    category: "qa",
    body: "При выборе конкретного автомобиля в тарифе Premium иногда показывается «Этот автомобиль больше недоступен» сразу после подтверждения. Воспроизводится в 1 из 20 случаев. Логи показывают race condition между assignment и payment hold. Нужно: optimistic lock на car_id или сразу резервировать перед оплатой.",
    author: "freesorgo",
    authorRole: "Maintainer",
    authorColor: "#58a6ff",
    comments: 18,
    upvotes: 12,
    pinned: true,
    updated: "обновлено 3 часа назад",
    labels: [
      { name: "P0",          color: "#f85149" },
      { name: "bug",         color: "#f85149" },
      { name: "backend",     color: "#4F5D95" },
      { name: "race-condition", color: "#d29922" },
    ],
    task: {
      code: "CB-205",
      project: "Backend · Booking",
      board: "Hotfix",
      column: "In progress",
      assignee: "freesorgo",
      dueDate: "2026-04-05",
      tags: ["booking", "concurrency", "hotfix"],
      estimateHours: 8,
      type: "bug",
      priority: "P0",
    },
  },
  {
    id: 206,
    title: "Toggle: отключить push-уведомления из приложения",
    category: "ideas",
    body: "В дополнение к email — клиент должен иметь возможность отключить push-уведомления (или выбрать категории). Сейчас все нотификации показываются всем. Категории: бронирование, статус поездки, шофёр рядом, оплата, маркетинг.",
    author: "ookami-kb",
    authorRole: "Collaborator",
    authorColor: "#a371f7",
    comments: 4,
    upvotes: 16,
    pinned: true,
    updated: "обновлено 4 дня назад",
    labels: [
      { name: "P2",          color: "#8b949e" },
      { name: "frontend",    color: "#00B4AB" },
      { name: "ux",          color: "#58a6ff" },
      { name: "notifications", color: "#f0883e" },
    ],
    task: {
      code: "CB-206",
      project: "App 1.0",
      board: "Sprint 13 · Settings",
      column: "Backlog",
      assignee: "ookami-kb",
      dueDate: "2026-05-01",
      tags: ["push", "notifications", "settings"],
      estimateHours: 6,
      type: "improvement",
      priority: "P2",
    },
  },

  /* ===================== ОБСУЖДЕНИЯ КОМАНДЫ ===================== */
  {
    id: 142,
    title: "Welcome! Roadmap 2026 → 2029 опубликован",
    category: "announcement",
    body: "Команда! Дорожная карта на 36 месяцев теперь публична. Читайте README, оставляйте идеи в Ideas, вопросы — в Q&A. Каждый понедельник в 11:00 — sync по этапам.",
    author: "Forumbit",
    authorRole: "Owner",
    authorColor: "#3fb950",
    comments: 24,
    upvotes: 48,
    pinned: true,
    updated: "обновлено сегодня",
    labels: [{ name: "welcome", color: "#3fb950" }, { name: "important", color: "#f85149" }],
  },
  {
    id: 141,
    title: "Релиз App 1.0 RC2 — что вошло, что осталось до GA",
    category: "announcement",
    body: "Вошло: единый интерфейс, опции в один клик, поддержка 24/7. До GA доделываем: Apple Watch widget, Family plans MVP, A/B на онбординге.",
    author: "freesorgo",
    authorRole: "Maintainer",
    authorColor: "#58a6ff",
    comments: 18,
    upvotes: 32,
    pinned: true,
    updated: "обновлено 2 часа назад",
    labels: [{ name: "release", color: "#a371f7" }, { name: "phase-1", color: "#58a6ff" }],
  },
  {
    id: 139,
    title: "Как лучше реализовать матчинг «клиент ↔ шофёр»?",
    category: "qa",
    body: "Думаем между: (а) embedding-модель на истории поездок, (б) явные правила + ранкер, (в) гибрид. Что выбрали бы вы для MVP?",
    author: "ookami-kb",
    authorRole: "Collaborator",
    authorColor: "#a371f7",
    comments: 41,
    upvotes: 27,
    answered: true,
    updated: "обновлено вчера",
    labels: [{ name: "ml", color: "#a371f7" }, { name: "phase-2", color: "#a371f7" }],
  },
  {
    id: 138,
    title: "Идея: голосовая команда «Шофёр через 15 минут»",
    category: "ideas",
    body: "Сейчас голосовой ввод адреса есть, но клиенты часто говорят «нужна машина через 15 минут». Сделаем парсинг относительного времени?",
    author: "Forumbit",
    authorRole: "Owner",
    authorColor: "#3fb950",
    comments: 12,
    upvotes: 36,
    updated: "обновлено 3 дня назад",
    labels: [{ name: "voice", color: "#db61a2" }, { name: "ux", color: "#58a6ff" }],
  },
  {
    id: 137,
    title: "Show & tell: live dashboard загрузки парка в реальном времени",
    category: "show",
    body: "Собрал быстрый MVP-дашборд на наших данных. Видно загрузку по районам, простой и пиковые часы. Через две недели — в admin App.",
    author: "freesorgo",
    authorRole: "Maintainer",
    authorColor: "#58a6ff",
    comments: 9,
    upvotes: 21,
    updated: "обновлено 4 дня назад",
    labels: [{ name: "ops", color: "#e3b341" }, { name: "demo", color: "#3fb950" }],
  },
  {
    id: 136,
    title: "Голосование: дизайн нового онбординга",
    category: "polls",
    body: "Три варианта в Figma: минималистичный, иллюстративный, видео-онбординг. Голосуем до пятницы — лучший идёт в A/B.",
    author: "ookami-kb",
    authorRole: "Collaborator",
    authorColor: "#a371f7",
    comments: 28,
    upvotes: 19,
    updated: "обновлено 5 дней назад",
    labels: [{ name: "design", color: "#db61a2" }, { name: "poll", color: "#d29922" }],
  },
  {
    id: 134,
    title: "Q&A: почему мы выбрали Flutter, а не нативку?",
    category: "qa",
    body: "Частый вопрос на интервью. Кратко: single codebase, Hot Reload, нативная производительность, наша дизайн-система легко портируется.",
    author: "Forumbit",
    authorRole: "Owner",
    authorColor: "#3fb950",
    comments: 22,
    upvotes: 44,
    answered: true,
    updated: "обновлено неделю назад",
    labels: [{ name: "flutter", color: "#02569B" }, { name: "architecture", color: "#bf8700" }],
  },
];

/* ============== TEAM ACTIVITY FEED (правый сайдбар) ============== */

export type ActivityItem = {
  id: number;
  author: string;
  authorColor: string;
  action: string;
  target: string;
  targetKind: "issue" | "pr" | "commit" | "release" | "discussion" | "review";
  time: string;
};

export const teamActivity: ActivityItem[] = [
  { id: 1,  author: "Forumbit",  authorColor: "#3fb950", action: "merged",        target: "PR #245 · билинг 2.0",                          targetKind: "pr",         time: "14 минут назад" },
  { id: 2,  author: "freesorgo", authorColor: "#58a6ff", action: "опубликовал",   target: "release v0.9.0-rc.2",                            targetKind: "release",    time: "1 час назад" },
  { id: 3,  author: "ookami-kb", authorColor: "#a371f7", action: "ответил в",     target: "Q&A #139 · матчинг клиент ↔ шофёр",              targetKind: "discussion", time: "2 часа назад" },
  { id: 4,  author: "Forumbit",  authorColor: "#3fb950", action: "запушил",       target: "12 коммитов в phase-1/app-core",                 targetKind: "commit",     time: "3 часа назад" },
  { id: 5,  author: "freesorgo", authorColor: "#58a6ff", action: "одобрил",       target: "PR #251 · профиль клиента",                      targetKind: "review",     time: "5 часов назад" },
  { id: 6,  author: "ookami-kb", authorColor: "#a371f7", action: "открыл",        target: "issue #259 · ESG-отчёты",                        targetKind: "issue",      time: "вчера" },
  { id: 7,  author: "Forumbit",  authorColor: "#3fb950", action: "закрепил",      target: "discussion #142 · Welcome",                      targetKind: "discussion", time: "вчера" },
  { id: 8,  author: "freesorgo", authorColor: "#58a6ff", action: "запросил review", target: "PR #248 · единый интерфейс",                    targetKind: "pr",         time: "2 дня назад" },
  { id: 9,  author: "ookami-kb", authorColor: "#a371f7", action: "прокомментировал", target: "issue #254 · privacy RFC",                       targetKind: "issue",      time: "3 дня назад" },
  { id: 10, author: "Forumbit",  authorColor: "#3fb950", action: "создал ветку",  target: "phase-3/marketplace",                             targetKind: "commit",     time: "4 дня назад" },
];

/* ============== PINNED ITEMS (на главной странице Code) ============== */

export type PinnedItem = {
  kind: "discussion" | "pr" | "issue" | "milestone" | "release" | "doc";
  title: string;
  desc: string;
  meta: string;
  iconColor: string;
  target: "code" | "issues" | "pulls" | "projects" | "wiki" | "discussions";
};

export const pinnedItems: PinnedItem[] = [
  {
    kind: "discussion",
    title: "📣 Welcome! Roadmap 2026 → 2029",
    desc: "Команда, дорожная карта на 36 месяцев — публична. Читайте, комментируйте, голосуйте.",
    meta: "#142 · 24 комментария · 48 ⬆",
    iconColor: "#f0883e",
    target: "discussions",
  },
  {
    kind: "milestone",
    title: "🎯 Q2 2026 · Релиз App 1.0",
    desc: "Финальная сборка единого интерфейса. Прогресс — 87%, осталось 3 недели до RC.",
    meta: "5 поставок · 12 tasks · 87%",
    iconColor: "#3fb950",
    target: "projects",
  },
  {
    kind: "pr",
    title: "🟢 PR #248 · единый интерфейс App 1.0",
    desc: "Объединение iOS / Android / Web под единый продуктовый слой. На ревью.",
    meta: "phase-1/app-core → main · 34 💬 · ✓ CI",
    iconColor: "#3fb950",
    target: "pulls",
  },
  {
    kind: "issue",
    title: "🔴 RFC #254 · предиктивные сценарии и приватность",
    desc: "Open RFC. Обсуждаем opt-in модель, прозрачность объяснений, отключение в один тап.",
    meta: "P0 · 41 комментарий · privacy-officer",
    iconColor: "#f85149",
    target: "issues",
  },
  {
    kind: "doc",
    title: "📘 Wiki · Стандарт шофёра",
    desc: "Регламент сервиса, протоколы встречи, дресс-код, 120-часовая академия.",
    meta: "ops/chauffeur-standard · обновлено сегодня",
    iconColor: "#a371f7",
    target: "wiki",
  },
  {
    kind: "release",
    title: "🚀 Release v0.9.0-rc.2 · App 1.0 RC",
    desc: "Единый интерфейс бронирования, опции в один клик, поддержка 24/7 встроена в App.",
    meta: "март 2026 · Latest",
    iconColor: "#e3b341",
    target: "code",
  },
];

/* ============== ACHIEVEMENTS (бейджи команды) ============== */

export type Achievement = {
  key: string;
  icon: string;
  name: string;
  desc: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  unlockedBy: string[]; // usernames
};

export const achievements: Achievement[] = [
  { key: "pull-shark",      icon: "🦈", name: "Pull Shark",          desc: "Слили 16+ pull requests",                tier: "gold",     unlockedBy: ["Forumbit", "freesorgo"] },
  { key: "starstruck",      icon: "🌟", name: "Starstruck",          desc: "Репозиторий получил 1k+ звёзд",          tier: "platinum", unlockedBy: ["Forumbit"] },
  { key: "quickdraw",       icon: "🤠", name: "Quickdraw",           desc: "Закрыл issue / PR за 5 минут",            tier: "silver",   unlockedBy: ["Forumbit", "freesorgo", "ookami-kb"] },
  { key: "yolo",            icon: "🎲", name: "YOLO",                desc: "Смержил PR без ревью (с разрешения)",     tier: "bronze",   unlockedBy: ["freesorgo"] },
  { key: "pair-extra",      icon: "👯", name: "Pair Extraordinaire", desc: "Co-authored 10+ коммитов",                tier: "silver",   unlockedBy: ["Forumbit", "ookami-kb"] },
  { key: "galaxy-brain",    icon: "🧠", name: "Galaxy Brain",        desc: "Дал «Accepted answer» в Discussions",     tier: "gold",     unlockedBy: ["Forumbit", "freesorgo"] },
  { key: "public-sponsor",  icon: "💖", name: "Public Sponsor",      desc: "Поддержал Open-Source",                   tier: "bronze",   unlockedBy: ["Forumbit"] },
  { key: "chauffeur-guru",  icon: "🚘", name: "Chauffeur Guru",      desc: "Спроектировал стандарт сервиса шофёров",  tier: "gold",     unlockedBy: ["Forumbit"] },
  { key: "backend-titan",   icon: "🐘", name: "Backend Titan",       desc: "1k+ PHP/Yii2 коммитов",                   tier: "platinum", unlockedBy: ["freesorgo"] },
  { key: "flutter-master",  icon: "🎯", name: "Flutter Master",      desc: "Эксперт по Dart/Flutter архитектуре",     tier: "gold",     unlockedBy: ["Forumbit", "ookami-kb"] },
];

export const tierColors: Record<Achievement["tier"], string> = {
  bronze:   "#a16207",
  silver:   "#a1a1aa",
  gold:     "#eab308",
  platinum: "#22d3ee",
};

/* ============== TEAM EXTENDED PROFILES ============== */

export type GitHubAchievement = {
  key: string;
  name: string;
  icon: string;
  tier?: "default" | "bronze" | "silver" | "gold";
  description: string;
};

export type TeamMember = {
  username: string;
  fullName: string;
  initials: string;
  color: string;
  badge: "Owner" | "Maintainer" | "Collaborator";
  bio: string;
  location: string;
  joined: string;
  /** Real GitHub join date (e.g. "Joined Mar 2011") */
  ghJoined: string;
  ghFollowers: number;
  ghFollowing: number;
  ghPublicRepos: number;
  ghAchievements: GitHubAchievement[];
  stack: string[];
  stats: {
    commits: number;
    prs: number;
    issues: number;
    reviews: number;
    discussions: number;
  };
  // 7×17 = 119 ячеек (как мини-heatmap GitHub за ~4 месяца)
  heatmap: number[];
};

// генератор псевдо-случайного, но детерминированного heatmap
function gen(seed: number, bias = 1): number[] {
  const arr: number[] = [];
  let s = seed;
  for (let i = 0; i < 119; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    let v = 0;
    if (r > 0.65) v = 1;
    if (r > 0.78) v = 2;
    if (r > 0.88) v = 3;
    if (r > 0.95) v = 4;
    // weekends чуть тише
    if (i % 7 === 6 || i % 7 === 0) v = Math.max(0, v - 1);
    arr.push(Math.min(4, Math.round(v * bias)));
  }
  return arr;
}

export const team: TeamMember[] = [
  /* ===== ОСНОВАТЕЛЬ — Owner / Founder ===== */
  {
    username: "car-blanche",
    fullName: "Car Blanche · Founder",
    initials: "CB",
    color: "#e3b341",
    badge: "Owner",
    bio: "Основатель Car Blanche. Стратегия, операции, развитие парка, партнёрства, найм. Управляет ростом сервиса из Уфы — к 20+ городам и 9 странам к 2029.",
    location: "Уфа",
    joined: "founder · 2018",
    ghJoined: "Joined GitHub Aug 2024",
    ghFollowers: 18,
    ghFollowing: 5,
    ghPublicRepos: 4,
    ghAchievements: [
      { key: "starstruck",     name: "Starstruck",     icon: "🌟", tier: "gold",    description: "Organization repos reached 9.4k+ stars" },
      { key: "pull-shark",     name: "Pull Shark",     icon: "🦈", tier: "silver",  description: "Reviewed and approved 50+ PRs" },
      { key: "public-sponsor", name: "Public Sponsor", icon: "💖", tier: "default", description: "Sponsored open-source contributors" },
    ],
    stack: ["Strategy", "Operations", "Product", "Partnerships"],
    stats: { commits: 0, prs: 0, issues: 64, reviews: 142, discussions: 87 },
    heatmap: gen(11, 0.6),
  },

  {
    username: "Forumbit",
    fullName: "Amir Kharisov",
    initials: "AK",
    color: "#3fb950",
    badge: "Owner",
    bio: "Frontend lead. Архитектура Flutter-приложения Car Blanche. Дизайн-система, кроссплатформенный код, performance-бюджеты.",
    location: "Уфа",
    joined: "founder · 2018",
    ghJoined: "Joined GitHub Apr 2019",
    ghFollowers: 84,
    ghFollowing: 23,
    ghPublicRepos: 24,
    ghAchievements: [
      { key: "pull-shark",   name: "Pull Shark",          icon: "🦈", tier: "gold",   description: "Merged 16+ pull requests" },
      { key: "yolo",         name: "YOLO",                icon: "🎲", tier: "default", description: "Merged a PR without review" },
      { key: "quickdraw",    name: "Quickdraw",           icon: "🤠", tier: "default", description: "Closed an issue/PR within 5 minutes" },
      { key: "pair-extra",   name: "Pair Extraordinaire", icon: "👯", tier: "silver", description: "Coauthored merged PR" },
    ],
    stack: ["Dart", "Flutter", "Swift", "Kotlin"],
    stats: { commits: 1284, prs: 142, issues: 48, reviews: 312, discussions: 36 },
    heatmap: gen(42, 1.2),
  },
  {
    username: "freesorgo",
    fullName: "Andrey",
    initials: "AF",
    color: "#58a6ff",
    badge: "Maintainer",
    bio: "Backend lead. Серверная часть на Yii2 / PHP. Биллинг, интеграции с платёжными провайдерами, RBAC шофёров.",
    location: "Уфа",
    joined: "core team · 2019",
    ghJoined: "Joined GitHub Sep 2017",
    ghFollowers: 42,
    ghFollowing: 18,
    ghPublicRepos: 31,
    ghAchievements: [
      { key: "pull-shark",   name: "Pull Shark",          icon: "🦈", tier: "silver",  description: "Merged 16+ pull requests" },
      { key: "yolo",         name: "YOLO",                icon: "🎲", tier: "default", description: "Merged a PR without review" },
      { key: "quickdraw",    name: "Quickdraw",           icon: "🤠", tier: "default", description: "Closed an issue/PR within 5 minutes" },
    ],
    stack: ["PHP", "Yii2", "MySQL", "Redis", "Docker"],
    stats: { commits: 921, prs: 98, issues: 27, reviews: 184, discussions: 22 },
    heatmap: gen(108, 1.0),
  },
  {
    username: "ookami-kb",
    fullName: "Kirill Bubochkin",
    initials: "KB",
    color: "#a371f7",
    badge: "Collaborator",
    bio: "Collaborator. Архитектура клиентского кода, Flutter best practices, ревью и менторство команды. Open-source maintainer, Flutter community contributor.",
    location: "Krasnodar, Russia",
    joined: "collaborator · 2026",
    ghJoined: "Joined GitHub Mar 2011",
    ghFollowers: 1247,
    ghFollowing: 142,
    ghPublicRepos: 87,
    ghAchievements: [
      { key: "pull-shark",         name: "Pull Shark",          icon: "🦈", tier: "gold",   description: "Merged 16+ pull requests (×4)" },
      { key: "starstruck",         name: "Starstruck",          icon: "🌟", tier: "gold",   description: "Created a repository that has 128+ stars" },
      { key: "galaxy-brain",       name: "Galaxy Brain",        icon: "🧠", tier: "silver", description: "Answered discussions (×2)" },
      { key: "pair-extra",         name: "Pair Extraordinaire", icon: "👯", tier: "silver", description: "Coauthored merged PR" },
      { key: "yolo",               name: "YOLO",                icon: "🎲", tier: "default", description: "Merged a PR without review" },
      { key: "quickdraw",          name: "Quickdraw",           icon: "🤠", tier: "default", description: "Closed an issue/PR within 5 minutes" },
      { key: "public-sponsor",     name: "Public Sponsor",      icon: "💖", tier: "default", description: "Sponsored an open source contributor" },
    ],
    stack: ["Dart", "Flutter", "Architecture", "DDD"],
    stats: { commits: 312, prs: 41, issues: 14, reviews: 96, discussions: 18 },
    heatmap: gen(77, 0.8),
  },
];
