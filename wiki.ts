/* =========================================================
   Расширенный контент Wiki — за 8 лет разработки Car Blanche.
   ========================================================= */

export type WikiPage = {
  slug: string;
  title: { ru: string; en: string };
  desc: { ru: string; en: string };
  group: { ru: string; en: string };
  author: string;
  updated: string;
  reading: number; // минут
  body: { ru: string; en: string }; // markdown-like
};

export const wikiGroups = [
  { key: "start",    ru: "🚀 Начало",            en: "🚀 Getting started" },
  { key: "history",  ru: "📜 История компании",  en: "📜 Company history" },
  { key: "product",  ru: "✨ Продукт",           en: "✨ Product" },
  { key: "ops",      ru: "🚘 Операции",          en: "🚘 Operations" },
  { key: "comp",     ru: "🛡️ Compliance",        en: "🛡️ Compliance" },
  { key: "dev",      ru: "⚙️ Разработка",        en: "⚙️ Engineering" },
  { key: "design",   ru: "🎨 Дизайн",            en: "🎨 Design" },
  { key: "research", ru: "🔬 Исследования",      en: "🔬 Research" },
];

export const wikiPages: WikiPage[] = [
  /* ====== START ====== */
  {
    slug: "home", group: { ru: "🚀 Начало", en: "🚀 Getting started" },
    title: { ru: "Главная · обзор базы знаний", en: "Home · knowledge base overview" },
    desc:  { ru: "Точка входа в вики. Что здесь есть и с чего начать.", en: "Entry point to the wiki. What's here and where to start." },
    author: "Forumbit", updated: "сегодня", reading: 3,
    body: {
      ru: "Эта вики собирает знания команды Car Blanche за 8 лет разработки. От первой поездки в Уфе (март 2018) до парка в Уфе и плана выхода в 20+ городов к 2029 году.",
      en: "This wiki collects 8 years of Car Blanche team knowledge. From the first ride in Ufa (March 2018) to today's Ufa fleet and the plan to reach 20+ cities by 2029.",
    },
  },
  {
    slug: "principles", group: { ru: "🚀 Начало", en: "🚀 Getting started" },
    title: { ru: "Принципы компании", en: "Company principles" },
    desc:  { ru: "4 принципа: прозрачность, этика ИИ, инклюзивность, экологичность.", en: "4 principles: transparency, AI ethics, inclusivity, sustainability." },
    author: "Forumbit", updated: "вчера", reading: 5,
    body: {
      ru: "Принципы определяют каждое решение в продукте — от дизайна экранов до выбора партнёров.",
      en: "Principles drive every decision in the product — from screen design to partner selection.",
    },
  },
  {
    slug: "glossary", group: { ru: "🚀 Начало", en: "🚀 Getting started" },
    title: { ru: "Глоссарий терминов", en: "Glossary" },
    desc:  { ru: "Шофёр, концьерж, сценарий, профиль, экослед — что значит каждый термин.", en: "Chauffeur, concierge, scenario, profile, eco-footprint — what each term means." },
    author: "ookami-kb", updated: "3 дня назад", reading: 6,
    body: {
      ru: "Единый словарь команды. Если вы новый человек — начните отсюда.",
      en: "Unified team vocabulary. New to the team? Start here.",
    },
  },

  /* ====== HISTORY ====== */
  {
    slug: "history-overview", group: { ru: "📜 История компании", en: "📜 Company history" },
    title: { ru: "8 лет Car Blanche · обзор", en: "8 years of Car Blanche · overview" },
    desc:  { ru: "Хронология компании от 2018 до 2026. Все ключевые вехи.", en: "Company timeline from 2018 to 2026. All key milestones." },
    author: "freesorgo", updated: "сегодня", reading: 12,
    body: {
      ru: "Car Blanche — это путь от двух предпринимателей и одного автомобиля до сервиса с командой ~50 шофёров и приложением для iOS / Android / Web. Цель к 2029 — 340+ шофёров в 20+ городах.",
      en: "Car Blanche is a journey from two founders with one car to a service with ~50 chauffeurs and an iOS / Android / Web app. Goal by 2029 — 340+ chauffeurs across 20+ cities.",
    },
  },
  {
    slug: "founding-2018", group: { ru: "📜 История компании", en: "📜 Company history" },
    title: { ru: "2018 · основание", en: "2018 · founding" },
    desc:  { ru: "Первая поездка в Уфе, два основателя, один автомобиль.", en: "First ride in Ufa, two founders, one car." },
    author: "Forumbit", updated: "месяц назад", reading: 8,
    body: {
      ru: "Март 2018: первая поездка состоялась в Уфе. Идея — премиум-такси с прозрачным ценообразованием и обученными шофёрами. Команда осознанно начала с родного города, чтобы отточить сервис до выхода в Москву и СПб.",
      en: "March 2018: first ride in Ufa. The idea — premium taxi with transparent pricing and trained chauffeurs. The team intentionally started in their hometown to perfect the service before expanding to Moscow and St. Petersburg.",
    },
  },
  {
    slug: "growth-2019-2022", group: { ru: "📜 История компании", en: "📜 Company history" },
    title: { ru: "2019–2022 · рост и автоматизация", en: "2019–2022 · growth and automation" },
    desc:  { ru: "От 10 до 50 шофёров в Уфе, первое мобильное приложение, отработка сервиса.", en: "From 10 to 50 chauffeurs in Ufa, first mobile app, polishing the service." },
    author: "Forumbit", updated: "2 месяца назад", reading: 10,
    body: {
      ru: "2019: первое iOS-приложение для клиентов Уфы. 2020: пандемия — резкий рост корпоративных клиентов. 2021: запуск собственной академии шофёров. 2022: переход на Yii2 для бэкенда, чтобы выдержать масштабирование.",
      en: "2019: first iOS app for Ufa clients. 2020: pandemic — rapid growth in corporate clients. 2021: own chauffeur academy launched. 2022: backend migration to Yii2 to support scaling.",
    },
  },
  {
    slug: "transformation-2023-2025", group: { ru: "📜 История компании", en: "📜 Company history" },
    title: { ru: "2023–2025 · трансформация платформы", en: "2023–2025 · platform transformation" },
    desc:  { ru: "Переход на Flutter, единое приложение для всех платформ, разработка плана масштабирования.", en: "Migration to Flutter, single app for all platforms, scaling plan." },
    author: "freesorgo", updated: "месяц назад", reading: 14,
    body: {
      ru: "2023: переход на Flutter для всех клиентов (iOS / Android / Web). 2024: запуск академии шофёров в Уфе на 120 часов. 2025: разработка дорожной карты до 2029 — выход в Москву, СПб, Казань, Екатеринбург.",
      en: "2023: Flutter migration for all clients (iOS / Android / Web). 2024: 120-hour chauffeur academy launched in Ufa. 2025: 2029 roadmap development — expansion to Moscow, St. Petersburg, Kazan, Ekaterinburg.",
    },
  },
  {
    slug: "today-2026", group: { ru: "📜 История компании", en: "📜 Company history" },
    title: { ru: "2026 · сегодня", en: "2026 · today" },
    desc:  { ru: "App 1.0 RC2, работаем в Уфе, готовимся к запуску в Москве, СПб, Казани и Екатеринбурге.", en: "App 1.0 RC2, operating in Ufa, preparing to launch in Moscow, St. Petersburg, Kazan and Ekaterinburg." },
    author: "Forumbit", updated: "сегодня", reading: 7,
    body: {
      ru: "Сегодня Car Blanche — это команда в Уфе из 3 разработчиков и операционной команды, парк из 48 авто, тысячи поездок и публичный roadmap до 2029. Готовимся к первому географическому расширению.",
      en: "Today Car Blanche is a Ufa team of 3 developers + operations, a fleet of 48 cars, thousands of rides, and a public roadmap to 2029. Preparing for our first geographic expansion.",
    },
  },

  /* ====== PRODUCT ====== */
  {
    slug: "app-architecture", group: { ru: "✨ Продукт", en: "✨ Product" },
    title: { ru: "Архитектура приложения", en: "App architecture" },
    desc:  { ru: "Слои: UI на Flutter, бизнес-логика, API-gateway на GraphQL, feature flags.", en: "Layers: Flutter UI, business logic, GraphQL API gateway, feature flags." },
    author: "Forumbit", updated: "неделю назад", reading: 18,
    body: {
      ru: "Архитектура построена вокруг трёх слоёв: UI (Flutter), Domain (Dart), Data (gRPC/REST).",
      en: "Architecture is built around three layers: UI (Flutter), Domain (Dart), Data (gRPC/REST).",
    },
  },
  {
    slug: "personalization", group: { ru: "✨ Продукт", en: "✨ Product" },
    title: { ru: "Модель персонализации", en: "Personalization model" },
    desc:  { ru: "Граф интересов клиента из 40+ параметров. Как формируется профиль.", en: "Client interest graph of 40+ parameters. How the profile is formed." },
    author: "ookami-kb", updated: "2 недели назад", reading: 11,
    body: {
      ru: "Профиль клиента — это live-граф: маршруты, время суток, любимые шофёры, музыка, температура, голос.",
      en: "Client profile is a live graph: routes, time of day, favorite chauffeurs, music, temperature, voice.",
    },
  },
  {
    slug: "trip-concierge", group: { ru: "✨ Продукт", en: "✨ Product" },
    title: { ru: "Trip Concierge · от двери до двери", en: "Trip Concierge · door-to-door" },
    desc:  { ru: "Опыт поездки от подготовки до отчёта.", en: "Trip experience from preparation to report." },
    author: "Forumbit", updated: "месяц назад", reading: 9,
    body: {
      ru: "Pre-trip: чек-лист, выезд за 8 минут до встречи. In-trip: связь с шофёром, изменения маршрута. Post-trip: автоматический отчёт.",
      en: "Pre-trip: checklist, departure 8 minutes before meeting. In-trip: chauffeur contact, route changes. Post-trip: automatic report.",
    },
  },

  /* ====== OPS ====== */
  {
    slug: "chauffeur-standard", group: { ru: "🚘 Операции", en: "🚘 Operations" },
    title: { ru: "Стандарт шофёра Car Blanche", en: "Car Blanche chauffeur standard" },
    desc:  { ru: "Регламент сервиса, дресс-код, протоколы встречи, словарь обращения.", en: "Service protocol, dress code, meeting protocols, vocabulary." },
    author: "car-blanche", updated: "сегодня", reading: 22,
    body: {
      ru: "Шофёр Car Blanche — не водитель. Это профессионал сервиса: проактивный, тактичный, многоязычный.",
      en: "A Car Blanche chauffeur is not a driver. It's a service professional: proactive, tactful, multilingual.",
    },
  },
  {
    slug: "academy", group: { ru: "🚘 Операции", en: "🚘 Operations" },
    title: { ru: "Академия Car Blanche · 120 часов", en: "Car Blanche Academy · 120 hours" },
    desc:  { ru: "Программа подготовки шофёров: этикет, языки, безопасность, VIP-протоколы.", en: "Chauffeur training program: etiquette, languages, safety, VIP protocols." },
    author: "car-blanche", updated: "вчера", reading: 16,
    body: {
      ru: "Программа: 40 ч этикет · 30 ч языки · 20 ч безопасное вождение · 20 ч VIP · 10 ч экзамены. Сертификация каждые 6 месяцев.",
      en: "Program: 40h etiquette · 30h languages · 20h safe driving · 20h VIP · 10h exams. Re-certification every 6 months.",
    },
  },
  {
    slug: "qa-rides", group: { ru: "🚘 Операции", en: "🚘 Operations" },
    title: { ru: "QA-поездки · контроль качества", en: "QA rides · quality control" },
    desc:  { ru: "Тайные пассажиры, 200+ проверок в месяц, обратная связь шофёру за 24 часа.", en: "Mystery riders, 200+ checks/month, chauffeur feedback within 24 hours." },
    author: "car-blanche", updated: "3 дня назад", reading: 7,
    body: {
      ru: "Команда QA проводит 200+ контрольных поездок в месяц. Шофёр получает детальную обратную связь.",
      en: "QA team runs 200+ control rides per month. Each chauffeur receives detailed feedback.",
    },
  },

  /* ====== COMPLIANCE ====== */
  {
    slug: "privacy-center", group: { ru: "🛡️ Compliance", en: "🛡️ Compliance" },
    title: { ru: "Privacy Center · данные клиента", en: "Privacy Center · client data" },
    desc:  { ru: "GDPR / 152-ФЗ. Экспорт, удаление, гранулярные разрешения.", en: "GDPR / Russian FZ-152. Export, deletion, granular permissions." },
    author: "car-blanche", updated: "неделю назад", reading: 13,
    body: {
      ru: "Клиент — владелец своих данных. Один экран показывает, что мы знаем и кто видит.",
      en: "Client owns their data. One screen shows what we know and who sees it.",
    },
  },
  {
    slug: "pci-iso", group: { ru: "🛡️ Compliance", en: "🛡️ Compliance" },
    title: { ru: "PCI DSS L1 / ISO 27001", en: "PCI DSS L1 / ISO 27001" },
    desc:  { ru: "Сертификация платёжной инфраструктуры и систем безопасности.", en: "Certification of payment infrastructure and security systems." },
    author: "car-blanche", updated: "месяц назад", reading: 19,
    body: {
      ru: "Платёжная инфраструктура прошла PCI DSS L1 в Q4 2026. ISO 27001 — параллельно.",
      en: "Payment infrastructure passed PCI DSS L1 in Q4 2026. ISO 27001 — in parallel.",
    },
  },
  {
    slug: "esg", group: { ru: "🛡️ Compliance", en: "🛡️ Compliance" },
    title: { ru: "ESG-методология", en: "ESG methodology" },
    desc:  { ru: "Расчёт CO₂, отчёты GRI/ESRS, цели до 2029.", en: "CO₂ calculation, GRI/ESRS reports, 2029 goals." },
    author: "car-blanche", updated: "2 недели назад", reading: 15,
    body: {
      ru: "Методология учитывает прямые и косвенные выбросы. К 2029 — 60% поездок на EV.",
      en: "Methodology accounts for direct and indirect emissions. By 2029 — 60% rides on EVs.",
    },
  },

  /* ====== DEV ====== */
  {
    slug: "ci-cd", group: { ru: "⚙️ Разработка", en: "⚙️ Engineering" },
    title: { ru: "CI/CD pipeline", en: "CI/CD pipeline" },
    desc:  { ru: "Монорепо, feature flags, релизы каждые 2 недели.", en: "Monorepo, feature flags, biweekly releases." },
    author: "Forumbit", updated: "вчера", reading: 11,
    body: {
      ru: "GitHub Actions + ArgoCD. Каждый PR проходит 24 проверки: lint, unit, integration, e2e, security.",
      en: "GitHub Actions + ArgoCD. Every PR runs 24 checks: lint, unit, integration, e2e, security.",
    },
  },
  {
    slug: "api", group: { ru: "⚙️ Разработка", en: "⚙️ Engineering" },
    title: { ru: "Public API & SDK", en: "Public API & SDK" },
    desc:  { ru: "GraphQL gateway, webhooks, песочница для партнёров.", en: "GraphQL gateway, webhooks, partner sandbox." },
    author: "freesorgo", updated: "неделю назад", reading: 17,
    body: {
      ru: "REST + GraphQL API на Yii2 с авторизацией через OAuth 2. SDK для PHP (Composer) и Dart/Flutter.",
      en: "REST + GraphQL API on Yii2 with OAuth 2 authorization. SDKs for PHP (Composer) and Dart/Flutter.",
    },
  },
  {
    slug: "ml-platform", group: { ru: "⚙️ Разработка", en: "⚙️ Engineering" },
    title: { ru: "ML Platform · обучение моделей", en: "ML Platform · model training" },
    desc:  { ru: "Feature Store, обучение и деплой моделей рекомендаций.", en: "Feature Store, training and deployment of recommendation models." },
    author: "car-blanche", updated: "3 дня назад", reading: 14,
    body: {
      ru: "Feature Store на основе Feast. Обучение в Airflow. Деплой через Seldon. A/B-тестирование на каждом релизе.",
      en: "Feast-based Feature Store. Training via Airflow. Deployment via Seldon. A/B testing on every release.",
    },
  },

  /* ====== DESIGN ====== */
  {
    slug: "design-system", group: { ru: "🎨 Дизайн", en: "🎨 Design" },
    title: { ru: "Дизайн-система Car Blanche", en: "Car Blanche design system" },
    desc:  { ru: "Токены, компоненты, гайдлайны для всех клиентских поверхностей.", en: "Tokens, components, guidelines for all client surfaces." },
    author: "Forumbit", updated: "сегодня", reading: 12,
    body: {
      ru: "DS построена на токенах: 240 цветовых, 56 типографических, 12 spacing. Темы — Light / Dark / Dim.",
      en: "DS is built on tokens: 240 color, 56 typography, 12 spacing. Themes — Light / Dark / Dim.",
    },
  },
  {
    slug: "3d-showroom", group: { ru: "🎨 Дизайн", en: "🎨 Design" },
    title: { ru: "3D Showroom · кейс визуализации", en: "3D Showroom · visualization case" },
    desc:  { ru: "Интерактивная WebGL-витрина автопарка. Flutter Web + Three.js.", en: "Interactive WebGL showroom of the fleet. Flutter Web + Three.js." },
    author: "Forumbit", updated: "сегодня", reading: 6,
    body: {
      ru: "Кейс реализован на Flutter Web с интеграцией Three.js через JS interop. 60 FPS даже на мобильных. Demo доступна по ссылке.",
      en: "Built on Flutter Web with Three.js integration via JS interop. 60 FPS even on mobile. Demo available at the link.",
    },
  },

  /* ====== BUSINESS NEWS · с car-blanche.net/businessnews ====== */
  {
    slug: "fleet-curation", group: { ru: "✨ Продукт", en: "✨ Product" },
    title: { ru: "Курация парка: почему именно эти 8 моделей", en: "Fleet curation: why exactly these 8 models" },
    desc:  { ru: "Принципы подбора автомобилей: BMW, Mercedes, Lexus, Toyota, Audi. От Camry до 7-Series.",
             en: "Car selection principles: BMW, Mercedes, Lexus, Toyota, Audi. From Camry to 7-Series." },
    author: "Forumbit", updated: "март 2026", reading: 12,
    body: {
      ru: "Парк Car Blanche — это не «что попало доступно», а намеренно подобранные 8 моделей под все клиентские сценарии. BMW 5 Series G30 — бизнес-встречи. Mercedes GL X166 — семьи и делегации. Lexus ES — VIP-комфорт. Toyota Camry XV50/XV70 — ежедневная надёжность. Audi A6 C7 — деловые встречи. Land Cruiser 200 — горные и дальние маршруты. BMW 7 Series G11 — флагман для топ-менеджмента и торжеств. Каждая модель прошла внутренний тест-драйв команды и шофёров.",
      en: "Car Blanche fleet is not whatever is available — it's intentionally curated 8 models for all client scenarios. BMW 5 G30 — business meetings. Mercedes GL X166 — families and delegations. Lexus ES — VIP comfort. Toyota Camry XV50/XV70 — daily reliability. Audi A6 C7 — business meetings. Land Cruiser 200 — mountain and long routes. BMW 7 G11 — flagship for C-level and special occasions. Each model passed internal test-drives by team and chauffeurs.",
    },
  },
  {
    slug: "b2b-corporate-segment", group: { ru: "✨ Продукт", en: "✨ Product" },
    title: { ru: "B2B-сегмент: такси для корпоративных клиентов", en: "B2B segment: corporate taxi" },
    desc:  { ru: "Закрытые контракты, выделенный менеджер, SLA 5 минут на эскалацию, авто-отчётность.",
             en: "Closed contracts, dedicated manager, 5-min escalation SLA, auto-reporting." },
    author: "freesorgo", updated: "январь 2026", reading: 9,
    body: {
      ru: "Корпоративный сегмент — приоритет 2026. Каждый B2B-клиент получает: личный кабинет с дашбордом расходов, выделенного account-менеджера с прямым телефоном, индивидуальные закрытые тарифы, автоматические ежемесячные акты и счета-фактуры, экспорт в 1С / SAP / Concur. SLA на эскалацию любого вопроса — 5 минут. Источник конкурентного преимущества: премиум-сервис + предсказуемость + прозрачность.",
      en: "Corporate segment is the 2026 priority. Each B2B client gets: personal dashboard with spend analytics, dedicated account manager with direct phone, custom private rates, monthly invoices auto-generated, exports to 1C / SAP / Concur. 5-minute escalation SLA on any question. Competitive edge: premium service + predictability + transparency.",
    },
  },
  {
    slug: "philosophy-travel", group: { ru: "🚀 Начало", en: "🚀 Getting started" },
    title: { ru: "Философия путешествий Car Blanche", en: "Car Blanche travel philosophy" },
    desc:  { ru: "«Путешествия полезны, они тренируют воображение. Все остальное — разочарование и усталость.»",
             en: '"Travel is useful — it trains the imagination. The rest is disappointment and fatigue."' },
    author: "Forumbit", updated: "октябрь 2025", reading: 5,
    body: {
      ru: "Эта цитата — наш девиз. Мы делаем сервис, который превращает поездку из «разочарования и усталости» в полезный опыт. Каждый шофёр обучен этикету и поддерживает спокойный, профессиональный диалог. Каждый автомобиль — чистый, тихий, с правильным климатом. Каждое бронирование — без сюрпризов в цене и времени. Это и есть «адаптированное под тебя решение».",
      en: 'This quote is our motto. We build a service that turns a trip from "disappointment and fatigue" into a useful experience. Every chauffeur is trained in etiquette and maintains calm, professional dialogue. Every car is clean, quiet, with right climate. Every booking — no surprises in price or time. This is what "solution tailored to you" means.',
    },
  },

  /* ====== RESEARCH ====== */
  {
    slug: "predictive-models", group: { ru: "🔬 Исследования", en: "🔬 Research" },
    title: { ru: "Прогноз спроса · графовые нейросети", en: "Demand prediction · graph neural networks" },
    desc:  { ru: "Модели предсказания: календарь, погода, события города.", en: "Prediction models: calendar, weather, city events." },
    author: "car-blanche", updated: "неделю назад", reading: 21,
    body: {
      ru: "Графовая модель учитывает связи между точками города. Точность 85% на горизонте 8 минут.",
      en: "Graph model accounts for connections between city points. 85% accuracy at 8-minute horizon.",
    },
  },
  {
    slug: "smart-city", group: { ru: "🔬 Исследования", en: "🔬 Research" },
    title: { ru: "Smart City · интеграция с городом", en: "Smart City · city integration" },
    desc:  { ru: "Открытые API городов: светофоры, парковки, перекрытия.", en: "Open city APIs: traffic lights, parking, road closures." },
    author: "car-blanche", updated: "3 дня назад", reading: 16,
    body: {
      ru: "Интеграция с DIT Москвы и аналогами. Сокращает время в пробках на 12%.",
      en: "Integration with Moscow DIT and analogs. Reduces traffic time by 12%.",
    },
  },
];

/* ===================== TIMELINE компании ===================== */

export type TimelineEvent = {
  year: string;
  quarter?: string;
  title: { ru: string; en: string };
  desc:  { ru: string; en: string };
  kind: "founding" | "product" | "growth" | "tech" | "milestone";
  color: string;
};

export const timeline: TimelineEvent[] = [
  {
    year: "2018", quarter: "Q1",
    title: { ru: "🌱 Основание", en: "🌱 Founded" },
    desc:  { ru: "Первая поездка в Уфе. Два основателя, один автомобиль.", en: "First ride in Ufa. Two founders, one car." },
    kind: "founding", color: "#3fb950",
  },
  {
    year: "2019",
    title: { ru: "📱 Первое iOS-приложение", en: "📱 First iOS app" },
    desc:  { ru: "Запущен MVP — бронирование, оплата картой, история.", en: "MVP launched — booking, card payment, history." },
    kind: "product", color: "#58a6ff",
  },
  {
    year: "2020",
    title: { ru: "🏢 Прорыв в B2B", en: "🏢 B2B breakthrough" },
    desc:  { ru: "Пандемия → резкий рост корпоративных клиентов. Запуск корпоративных счетов.", en: "Pandemic → rapid growth in corporate clients. Corporate accounts launched." },
    kind: "growth", color: "#a371f7",
  },
  {
    year: "2021", quarter: "Q2",
    title: { ru: "🎓 Академия шофёров", en: "🎓 Chauffeur academy" },
    desc:  { ru: "Собственная программа подготовки шофёров в Уфе. 40+ часов обучения.", en: "Own chauffeur training program in Ufa. 40+ hours of training." },
    kind: "growth", color: "#a371f7",
  },
  {
    year: "2022",
    title: { ru: "⚙️ Миграция на Yii2", en: "⚙️ Migration to Yii2" },
    desc:  { ru: "Полностью переписан backend для масштабирования.", en: "Backend completely rewritten for scaling." },
    kind: "tech", color: "#d29922",
  },
  {
    year: "2023",
    title: { ru: "🎯 Переход на Flutter", en: "🎯 Flutter migration" },
    desc:  { ru: "Единое приложение для iOS / Android / Web. Сокращение времени релиза в 3×.", en: "Single app for iOS / Android / Web. 3× faster release cycle." },
    kind: "tech", color: "#d29922",
  },
  {
    year: "2024", quarter: "Q3",
    title: { ru: "🎓 Академия шофёров", en: "🎓 Chauffeur academy" },
    desc:  { ru: "120-часовая программа, сертификация каждые 6 месяцев.", en: "120-hour program, recertification every 6 months." },
    kind: "milestone", color: "#f0883e" ,
  },
  {
    year: "2025",
    title: { ru: "🗺️ Roadmap 2029", en: "🗺️ 2029 Roadmap" },
    desc:  { ru: "Опубликована публичная дорожная карта на 36 месяцев.", en: "Public 36-month roadmap published." },
    kind: "milestone", color: "#f0883e" ,
  },
  {
    year: "2026", quarter: "сегодня · today",
    title: { ru: "🚀 App 1.0 RC2", en: "🚀 App 1.0 RC2" },
    desc:  { ru: "Уфа · 48 авто · publicly opened roadmap до 2029.", en: "Ufa · 48 cars · publicly opened roadmap to 2029." },
    kind: "milestone", color: "#3fb950",
  },
];

/* ===================== RESOURCES ===================== */

export type ResourceCard = {
  category: "docs" | "api" | "brand" | "research" | "cases" | "video" | "tools" | "legal";
  title: { ru: string; en: string };
  desc:  { ru: string; en: string };
  format: string;     // PDF / Figma / GitHub / Video
  size?: string;      // "2.4 MB"
  badge?: string;     // "NEW" | "Featured" | "Updated"
  badgeColor?: string;
  href?: string;
  downloads?: string; // "1.2k"
  pdfKey?: string;    // ключ из pdfTemplates для генерации PDF
};

export const resources: ResourceCard[] = [
  // Cases
  {
    category: "cases", format: "Web demo", badge: "Featured", badgeColor: "#a371f7",
    title: { ru: "3D Showroom Experience", en: "3D Showroom Experience" },
    desc:  { ru: "Интерактивная 3D-витрина автопарка. WebGL · Flutter Web · 60 FPS на мобильных.",
             en: "Interactive 3D showroom of the fleet. WebGL · Flutter Web · 60 FPS on mobile." },
    href: "https://car-blanche-3d-showroom-experience.car-blanche.app/", downloads: "8.4k",
  },
  {
    category: "cases", format: "Web article", badge: "Source", badgeColor: "#58a6ff",
    title: { ru: "Персонализация как новая норма (2026)",
             en: "Personalization as the new normal (2026)" },
    desc:  { ru: "Основная статья с интерактивным конфигуратором: BMW 5 G30, сценарии бизнес-встреча / семья / трансфер. Данные McKinsey: 80%+ ждут умную экосистему.",
             en: "Main article with interactive configurator: BMW 5 G30, scenarios business / family / transfer. McKinsey data: 80%+ expect a smart ecosystem." },
    href: "https://mobile-tech-transport-personalization.car-blanche.app/", downloads: "12.8k",
  },
  {
    category: "cases", format: "Web demo", badge: "NEW", badgeColor: "#3fb950",
    title: { ru: "Roadmap 2029 · этот сайт", en: "Roadmap 2029 · this site" },
    desc:  { ru: "Документ-дорожная карта в GitHub-стиле с переводом, темами и поиском.",
             en: "GitHub-style roadmap document with translations, themes and search." },
    downloads: "3.4k",
  },

  // Docs
  {
    category: "docs", format: "PDF", size: "1 page", badge: "Download", badgeColor: "#3fb950",
    title: { ru: "Руководство клиента · App 1.0", en: "Client manual · App 1.0" },
    desc:  { ru: "Одностраничная презентация: как начать пользоваться, забронировать первую поездку, опции, поддержка.",
             en: "One-page presentation: how to start, book your first ride, options, support." },
    downloads: "12.1k",
    pdfKey: "client-manual-app",
  },
  {
    category: "docs", format: "PDF", size: "1 page", badge: "Download", badgeColor: "#3fb950",
    title: { ru: "Onboarding нового шофёра", en: "New chauffeur onboarding" },
    desc:  { ru: "Первая неделя в Академии Car Blanche: документы, обучение, первые поездки, контакты.",
             en: "First week at Car Blanche Academy: documents, training, first rides, contacts." },
    downloads: "486",
    pdfKey: "chauffeur-onboarding",
  },
  {
    category: "docs", format: "PDF", size: "1 page", badge: "Download", badgeColor: "#3fb950",
    title: { ru: "FAQ корпоративного клиента", en: "Corporate client FAQ" },
    desc:  { ru: "Ответы на 50+ вопросов B2B: цены, контракты, отчётность для бухгалтерии, account-менеджмент.",
             en: "50+ B2B Q&As: pricing, contracts, accounting reports, account management." },
    downloads: "2.7k",
    pdfKey: "corporate-faq",
  },
  {
    category: "docs", format: "PDF", size: "1 page", badge: "NEW", badgeColor: "#3fb950",
    title: { ru: "Обзор тарифов Car Blanche", en: "Car Blanche tariffs overview" },
    desc:  { ru: "Все 8 тарифов на одной странице: Business → Top Car с Ferrari. Цены, модели, для каких задач.",
             en: "All 8 tariffs on one page: Business → Top Car with Ferrari. Pricing, models, use cases." },
    downloads: "4.8k",
    pdfKey: "tariffs-overview",
  },
  {
    category: "docs", format: "PDF", size: "1 page", badge: "Download", badgeColor: "#3fb950",
    title: { ru: "Академия шофёров · 120 часов", en: "Chauffeur Academy · 120 hours" },
    desc:  { ru: "Программа подготовки шофёра: 5 модулей, этикет, языки, безопасное вождение, VIP, сертификация.",
             en: "Chauffeur training program: 5 modules, etiquette, languages, safe driving, VIP, certification." },
    downloads: "1.3k",
    pdfKey: "academy-program",
  },

  // API
  {
    category: "api", format: "GitHub", badge: "v2.4",
    title: { ru: "REST API Reference", en: "REST API Reference" },
    desc:  { ru: "Полная документация REST API с примерами запросов.", en: "Complete REST API documentation with request examples." },
    href: "https://github.com/car-blanche", downloads: "5.6k",
  },
  {
    category: "api", format: "GitHub",
    title: { ru: "GraphQL Schema", en: "GraphQL Schema" },
    desc:  { ru: "Полная GraphQL-схема с подписками и mutations.", en: "Complete GraphQL schema with subscriptions and mutations." },
    href: "https://github.com/car-blanche", downloads: "3.2k",
  },
  {
    category: "api", format: "npm",
    title: { ru: "SDK для Node.js / TypeScript", en: "Node.js / TypeScript SDK" },
    desc:  { ru: "Официальный SDK с типизацией и автодополнением.", en: "Official SDK with types and autocomplete." },
    href: "https://github.com/car-blanche", downloads: "9.8k",
  },
  {
    category: "api", format: "Composer",
    title: { ru: "SDK для PHP (Composer)", en: "PHP SDK (Composer)" },
    desc:  { ru: "PHP-клиент для backend-интеграций. Совместим с Yii2 / Laravel / Symfony.",
             en: "PHP client for backend integrations. Compatible with Yii2 / Laravel / Symfony." },
    href: "https://github.com/car-blanche", downloads: "4.1k",
  },
  {
    category: "api", format: "pub.dev",
    title: { ru: "SDK для Dart / Flutter", en: "Dart / Flutter SDK" },
    desc:  { ru: "Dart-клиент с поддержкой async/await и null-safety.",
             en: "Dart client with async/await and null-safety support." },
    href: "https://github.com/car-blanche", downloads: "2.6k",
  },

  // Brand
  {
    category: "brand", format: "Figma",
    title: { ru: "Бренд-гайдлайн 2026", en: "Brand guidelines 2026" },
    desc:  { ru: "Логотипы, цвета, типографика, тон голоса.", en: "Logos, colors, typography, tone of voice." },
    downloads: "1.4k",
  },
  {
    category: "brand", format: "ZIP", size: "184 MB",
    title: { ru: "Лого-пакет (SVG / PNG / EPS)", en: "Logo pack (SVG / PNG / EPS)" },
    desc:  { ru: "Все варианты логотипа во всех форматах.", en: "All logo variations in all formats." },
    downloads: "2.9k",
  },
  {
    category: "brand", format: "Figma", badge: "Updated", badgeColor: "#d29922",
    title: { ru: "Design System · UI Kit", en: "Design System · UI Kit" },
    desc:  { ru: "Компоненты, токены, темы.", en: "Components, tokens, themes." },
    downloads: "892",
  },

  // Research
  {
    category: "research", format: "PDF", size: "8.6 MB",
    title: { ru: "Премиум-мобильность 2030: исследование", en: "Premium mobility 2030: research" },
    desc:  { ru: "Анализ тенденций рынка и потребительских предпочтений.", en: "Market trends and consumer preferences analysis." },
    downloads: "684",
  },
  {
    category: "research", format: "PDF", size: "3.1 MB",
    title: { ru: "ESG в транспорте · whitepaper", en: "ESG in transport · whitepaper" },
    desc:  { ru: "Как считать CO₂ в премиум-сервисе. Методология GRI.", en: "How to measure CO₂ in premium service. GRI methodology." },
    downloads: "412",
  },

  // Video
  {
    category: "video", format: "YouTube",
    title: { ru: "Презентация App 1.0", en: "App 1.0 demo" },
    desc:  { ru: "8-минутное видео — все ключевые сценарии.", en: "8-minute video — all key scenarios." },
    downloads: "24k views",
  },
  {
    category: "video", format: "YouTube",
    title: { ru: "Академия шофёра · промо", en: "Chauffeur academy · promo" },
    desc:  { ru: "Изнутри 120-часовой программы.", en: "Inside the 120-hour program." },
    downloads: "11k views",
  },

  // Tools
  {
    category: "tools", format: "Web",
    title: { ru: "Калькулятор CO₂", en: "CO₂ calculator" },
    desc:  { ru: "Рассчитайте экослед поездки до бронирования.", en: "Calculate trip eco-footprint before booking." },
    downloads: "2.1k",
  },
  {
    category: "tools", format: "Web",
    title: { ru: "Симулятор подбора шофёра", en: "Chauffeur matching simulator" },
    desc:  { ru: "Покажите свои предпочтения — увидите подобранного шофёра.", en: "Set your preferences — see the matched chauffeur." },
    downloads: "738",
  },

  // Legal
  {
    category: "legal", format: "PDF",
    title: { ru: "Условия использования", en: "Terms of service" },
    desc:  { ru: "Юридические условия использования сервиса.", en: "Legal terms of service usage." },
    downloads: "—",
  },
  {
    category: "legal", format: "PDF",
    title: { ru: "Политика приватности (GDPR + 152-ФЗ)", en: "Privacy policy (GDPR + RU FZ-152)" },
    desc:  { ru: "Как мы храним и защищаем данные клиентов.", en: "How we store and protect client data." },
    downloads: "—",
  },
];
