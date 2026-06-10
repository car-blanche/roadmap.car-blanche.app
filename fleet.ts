/* =========================================================
   РЕАЛЬНЫЕ тарифы Car Blanche (8 классов).
   Источник: внутренние тарифы компании.
   ========================================================= */

export type Tariff = {
  rank: number;
  key: "business" | "elegance" | "luxury" | "premium" | "exclusive" | "topcar" | "xxl" | "concierge";
  name: string;
  priceFrom: number;       // от ₽
  models: string[];        // список конкретных моделей
  tagline: { ru: string; en: string };
  desc: { ru: string; en: string };
  color: string;
  bestFor: { ru: string; en: string };
};

export const tariffs: Tariff[] = [
  {
    rank: 1,
    key: "business",
    name: "Business",
    priceFrom: 1000,
    models: [
      "Mercedes-Benz C180/200",
      "Toyota Camry 50/70",
      "Volkswagen CC",
      "Nissan Teana",
      "BMW 3",
      "Audi A4",
      "Lexus RX/NX",
      "Honda Crosstour",
    ],
    tagline: { ru: "Чистое качество. Никаких компромиссов.",
               en: "Pure quality. No compromise." },
    desc: { ru: "Базовый тариф премиум-сегмента. Седаны и кроссоверы среднего класса.",
            en: "Entry premium tariff. Mid-class sedans and crossovers." },
    bestFor: { ru: "Ежедневные деловые поездки",
               en: "Daily business trips" },
    color: "#58a6ff",
  },
  {
    rank: 2,
    key: "elegance",
    name: "Elegance",
    priceFrom: 1500,
    models: [
      "Mercedes-Benz W212",
      "BMW 5",
      "Toyota Land Cruiser Prado/200",
      "BMW X5",
      "Porsche Cayenne",
      "Audi A6",
      "Mercedes-Benz ML",
    ],
    tagline: { ru: "На уровень выше. На класс лучше.",
               en: "One level above. One class better." },
    desc: { ru: "Бизнес-класс и премиум-кроссоверы. Идеально для важных встреч.",
            en: "Business class and premium SUVs. Ideal for important meetings." },
    bestFor: { ru: "Бизнес-встречи и деловые трансферы",
               en: "Business meetings and transfers" },
    color: "#3fb950",
  },
  {
    rank: 3,
    key: "luxury",
    name: "Luxury",
    priceFrom: 2000,
    models: [
      "Mercedes-Benz W213",
      "Audi A8",
      "Genesis G80",
      "KIA Quoris",
      "Lexus ES/GS",
      "Hyundai Equus",
      "BMW",
      "Infiniti QX70",
      "Mercedes-Benz W221",
    ],
    tagline: { ru: "Непревзойдённый. Исключительный.",
               en: "Unmatched. Exceptional." },
    desc: { ru: "Полноразмерные представительские седаны. Тишина, простор, статус.",
            en: "Full-size executive sedans. Silence, space, status." },
    bestFor: { ru: "VIP-клиенты и торжественные случаи",
               en: "VIP clients and special occasions" },
    color: "#a371f7",
  },
  {
    rank: 4,
    key: "premium",
    name: "Premium",
    priceFrom: 3000,
    models: [
      "Mercedes-Benz W222",
      "Audi A8",
      "Porsche Panamera",
      "Mercedes-Benz GLS AMG 350",
      "BMW 8",
      "Mercedes-Benz G63",
      "Bentley Bentayga",
    ],
    tagline: { ru: "Непревзойдённый. Исключительный.",
               en: "Unmatched. Exceptional." },
    desc: { ru: "Флагманы и спорт-версии. Когда статус — это часть протокола.",
            en: "Flagships and sport versions. When status is part of the protocol." },
    bestFor: { ru: "Топ-менеджмент и значимые мероприятия",
               en: "C-level and significant events" },
    color: "#d29922",
  },
  {
    rank: 5,
    key: "exclusive",
    name: "Exclusive",
    priceFrom: 5000,
    models: [
      "Mercedes-Benz Maybach",
      "Rolls-Royce Phantom",
      "Rolls-Royce Ghost",
    ],
    tagline: { ru: "Непревзойдённый. Исключительный.",
               en: "Unmatched. Exceptional." },
    desc: { ru: "Эксклюзив наивысшего класса. Лимузины, которые видят раз в жизни.",
            en: "Top-of-the-line exclusive. Limousines you see once in a lifetime." },
    bestFor: { ru: "Свадьбы, дипломатические встречи",
               en: "Weddings, diplomatic meetings" },
    color: "#f0883e",
  },
  {
    rank: 6,
    key: "topcar",
    name: "Top Car",
    priceFrom: 6000,
    models: [
      "Audi R8",
      "McLaren",
      "Aston Martin",
      "Ferrari",
      "Bugatti Veyron",
    ],
    tagline: { ru: "Непревзойдённый. Исключительный.",
               en: "Unmatched. Exceptional." },
    desc: { ru: "Суперкары и спортивные легенды. Эмоции, которые невозможно купить — кроме как на час.",
            en: "Supercars and sports legends. Emotions you can't buy — except by the hour." },
    bestFor: { ru: "Подарок мечты, эффектный трансфер",
               en: "Dream gift, spectacular transfer" },
    color: "#f85149",
  },
  {
    rank: 7,
    key: "xxl",
    name: "XXL",
    priceFrom: 3500,
    models: [
      "Mercedes-Benz V-250",
      "Volkswagen Multivan",
    ],
    tagline: { ru: "Такой же комфорт. Больше пространства.",
               en: "Same comfort. More space." },
    desc: { ru: "Минивэны для семей и групп. 7-8 мест без потери премиум-уровня.",
            en: "Minivans for families and groups. 7-8 seats with premium quality." },
    bestFor: { ru: "Семьи, делегации, групповые трансферы",
               en: "Families, delegations, group transfers" },
    color: "#db61a2",
  },
  {
    rank: 8,
    key: "concierge",
    name: "Concierge Service",
    priceFrom: 1000,
    models: [
      "Ваш личный автомобиль",
      "Профессиональный шофёр",
      "Любое время суток",
    ],
    tagline: { ru: "Доверьте свой автомобиль профессиональному шофёру.",
               en: "Entrust your car to a professional chauffeur." },
    desc: { ru: "Сервис личного шофёра для вашего автомобиля. Сертифицированный, обученный, проверенный.",
            en: "Personal chauffeur service for your own car. Certified, trained, vetted." },
    bestFor: { ru: "Владельцы личных авто, не желающие сами садиться за руль",
               en: "Car owners who prefer not to drive themselves" },
    color: "#1f6feb",
  },
];

/* ====== Цитаты и слоганы (с car-blanche.net) ====== */

export const quotes = [
  {
    text: {
      ru: "«Путешествия полезны, они тренируют воображение. Все остальное — разочарование и усталость.»",
      en: '"Travel is useful — it trains the imagination. The rest is disappointment and fatigue."',
    },
    author: { ru: "Девиз Car Blanche", en: "Car Blanche motto" },
  },
  {
    text: {
      ru: "«Не просто поездка. Решение, адаптированное под тебя.»",
      en: '"Not just a ride. A solution tailored to you."',
    },
    author: { ru: "car-blanche.app · 2026", en: "car-blanche.app · 2026" },
  },
  {
    text: {
      ru: "«Аренда автомобилей с профессиональными шофёрами для вашего удобства и безопасности.»",
      en: '"Car rental with professional chauffeurs for your comfort and safety."',
    },
    author: { ru: "car-blanche.net", en: "car-blanche.net" },
  },
  {
    text: {
      ru: "«Не „какая машина свободна“, а „какая машина подходит именно под мою задачу“.»",
      en: '"Not which car is available, but which car fits my task."',
    },
    author: { ru: "Сдвиг ожиданий, 2026", en: "Shift of expectations, 2026" },
  },
];

/* ====== Бизнес-новости (с car-blanche.net/businessnews) ====== */

export type BusinessNews = {
  id: string;
  date: string;
  category: "fleet" | "service" | "expansion" | "tech" | "client";
  title: { ru: string; en: string };
  excerpt: { ru: string; en: string };
  body: { ru: string; en: string };
  source: string;
  highlights?: string[];
};

export const businessNews: BusinessNews[] = [
  {
    id: "tariffs-2026",
    date: "март 2026",
    category: "fleet",
    title: {
      ru: "8 тарифов: от Business 1000₽ до Top Car с Ferrari",
      en: "8 tariffs: from Business ₽1000 to Top Car with Ferrari",
    },
    excerpt: {
      ru: "Полная линейка тарифов Car Blanche. Business · Elegance · Luxury · Premium · Exclusive · Top Car · XXL · Concierge.",
      en: "Full Car Blanche tariff lineup. Business · Elegance · Luxury · Premium · Exclusive · Top Car · XXL · Concierge.",
    },
    body: {
      ru: "Мы пересмотрели тарифную сетку: теперь 8 классов с прозрачным ценообразованием от 1000 ₽ до 6000+ ₽. Каждый тариф — фиксированный пул моделей. Business открывает линейку Camry / BMW 3 / Lexus NX, Top Car завершает Ferrari и Bugatti Veyron.",
      en: "We redesigned the pricing: now 8 classes with transparent pricing from ₽1000 to ₽6000+. Each tariff has a fixed model pool. Business opens the lineup with Camry / BMW 3 / Lexus NX, Top Car closes with Ferrari and Bugatti Veyron.",
    },
    source: "http://car-blanche.net/businessnews",
    highlights: ["8 тарифов", "От 1000 ₽", "Прозрачные цены"],
  },
  {
    id: "concierge-service",
    date: "февраль 2026",
    category: "service",
    title: {
      ru: "Concierge Service: ваш автомобиль + наш шофёр",
      en: "Concierge Service: your car + our chauffeur",
    },
    excerpt: {
      ru: "Новый сервис — личный шофёр для вашего автомобиля. От 1000 ₽. Сертификация, страховка, любое время суток.",
      en: "New service — personal chauffeur for your own car. From ₽1000. Certified, insured, any time of day.",
    },
    body: {
      ru: "Concierge Service — для тех, кто любит свою машину, но не хочет сидеть за рулём. Мы присылаем сертифицированного шофёра с пройденной академией Car Blanche, страхуем его время и берём на себя всю логистику. Подходит для бизнес-встреч, вечеринок, длительных поездок.",
      en: "Concierge Service — for those who love their car but don't want to drive. We send a certified chauffeur, insure their time, and handle all logistics. Perfect for business meetings, parties, long trips.",
    },
    source: "http://car-blanche.net/businessnews",
    highlights: ["Ваш автомобиль", "Сертифицированный шофёр", "От 1000 ₽"],
  },
  {
    id: "b2b-corporate",
    date: "январь 2026",
    category: "client",
    title: {
      ru: "Такси для корпоративных клиентов: быстро, удобно, с максимальным комфортом",
      en: "Taxi for corporate clients: fast, convenient, maximum comfort",
    },
    excerpt: {
      ru: "B2B-направление — основной фокус 2026. Закрытые контракты, выделенный менеджер, ежемесячные отчёты для бухгалтерии.",
      en: "B2B is our main focus in 2026. Closed contracts, dedicated manager, monthly accounting reports.",
    },
    body: {
      ru: "Корпоративные клиенты получают: личный кабинет с дашбордом, выделенного account-менеджера, закрытые тарифы, ежемесячные акты и закрывающие документы автоматически. SLA на эскалацию вопросов — 5 минут.",
      en: "Corporate clients get: personal dashboard, dedicated account manager, private rates, monthly invoices auto. Escalation SLA — 5 minutes.",
    },
    source: "http://car-blanche.net/businessnews",
    highlights: ["B2B контракты", "SLA 5 мин", "Авто-отчётность"],
  },
  {
    id: "chauffeur-pro",
    date: "декабрь 2025",
    category: "service",
    title: {
      ru: "Профессиональные шофёры: не водители, а специалисты сервиса",
      en: "Professional chauffeurs: not drivers but service specialists",
    },
    excerpt: {
      ru: "Каждый шофёр Car Blanche проходит 40+ часов обучения: этикет, безопасное вождение, иностранные языки, работа с VIP.",
      en: "Every Car Blanche chauffeur goes through 40+ hours of training: etiquette, safe driving, languages, VIP service.",
    },
    body: {
      ru: "Наша академия в Уфе готовит шофёров по 5 модулям: 40 ч этикет → 30 ч языки (англ/нем) → 20 ч безопасное вождение → 20 ч работа с VIP → 10 ч экзамены. Сертификация каждые 6 месяцев.",
      en: "Our Ufa academy trains chauffeurs in 5 modules: 40h etiquette → 30h languages → 20h safe driving → 20h VIP → 10h exams. Recertification every 6 months.",
    },
    source: "http://car-blanche.net/businessnews",
    highlights: ["120 ч обучения", "Сертификация 6 мес.", "Низкая текучка"],
  },
  {
    id: "ufa-expansion",
    date: "октябрь 2025",
    category: "expansion",
    title: {
      ru: "Из Уфы — в города-миллионники: план до 2029",
      en: "From Ufa to million-plus cities: plan to 2029",
    },
    excerpt: {
      ru: "8 лет в Уфе. Готовимся к первому географическому расширению: Москва, СПб, Казань, Екатеринбург — 2026.",
      en: "8 years in Ufa. Preparing for our first geographic expansion: Moscow, SPb, Kazan, Ekaterinburg — 2026.",
    },
    body: {
      ru: "Стратегия запуска в новом городе: 6 месяцев подготовки (аренда парка, локальная академия шофёров), затем soft launch для корпоративных клиентов (3 мес), затем публичный релиз. К 2029 — 20+ городов в 9 странах.",
      en: "New-city launch: 6 months prep, then soft launch B2B (3 mo), then public release. By 2029 — 20+ cities across 9 countries.",
    },
    source: "http://car-blanche.net/businessnews",
    highlights: ["6 мес подготовка", "Soft launch B2B", "20+ городов к 2029"],
  },
  {
    id: "tech-flutter",
    date: "август 2025",
    category: "tech",
    title: {
      ru: "Почему мы выбрали Flutter и Yii2",
      en: "Why we chose Flutter and Yii2",
    },
    excerpt: {
      ru: "Единая кодовая база Dart/Flutter для iOS / Android / Web. Зрелый PHP-backend на Yii2 для биллинга и RBAC.",
      en: "Single Dart/Flutter codebase for iOS / Android / Web. Mature PHP backend on Yii2 for billing and RBAC.",
    },
    body: {
      ru: "Flutter — единый код для всех платформ, hot reload в проде через CodePush. Yii2 — проверенный годами фреймворк с ActiveRecord, миграциями и RBAC из коробки. MySQL основная СУБД, Redis для кеша.",
      en: "Flutter — single codebase, hot reload in production. Yii2 — battle-tested framework. MySQL is the main DB, Redis for caching.",
    },
    source: "http://car-blanche.net/businessnews",
    highlights: ["Flutter · 1 codebase", "Yii2 · stable", "MySQL + Redis"],
  },
];

export const newsCategoriesMeta = {
  fleet:     { ru: "Парк автомобилей",  en: "Fleet",        color: "#a371f7", icon: "🚗" },
  service:   { ru: "Сервис",            en: "Service",      color: "#3fb950", icon: "✨" },
  expansion: { ru: "Расширение",        en: "Expansion",    color: "#f0883e", icon: "🌍" },
  tech:      { ru: "Технологии",        en: "Technology",   color: "#58a6ff", icon: "⚙️" },
  client:    { ru: "Клиенты",           en: "Clients",      color: "#d29922", icon: "👔" },
};

/* ====== Live counters — реальные данные ====== */

export const liveCounters = [
  { label: { ru: "Поездок выполнено",   en: "Rides completed" },   value: 7800,     suffix: "+", color: "#3fb950" },
  { label: { ru: "Тарифов в линейке",   en: "Tariffs available" }, value: 8,        suffix: "",  color: "#58a6ff" },
  { label: { ru: "Шофёров в команде",   en: "Chauffeurs on team" },value: 50,       suffix: "",  color: "#a371f7" },
  { label: { ru: "Лет с клиентами",     en: "Years with clients" },value: 8,        suffix: "",  color: "#f0883e" },
];
