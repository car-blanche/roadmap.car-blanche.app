/* =========================================================
   Репозитории команды Car Blanche — как на GitHub.
   Каждый репо привязан к контрибьютору.
   ========================================================= */

export type Repo = {
  name: string;
  owner: string;            // username (контрибьютор)
  description: { ru: string; en: string };
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  pulls?: number;
  topics: string[];
  updated: string;          // "2 hours ago"
  isPinned?: boolean;       // показывать на Pinned secции профиля
  visibility: "Public" | "Private";
  isArchive?: boolean;
};

export const repos: Repo[] = [
  /* ============ Forumbit (Amir Kharisov) — Frontend lead ============ */
  {
    name: "car-blanche-app",
    owner: "Forumbit",
    description: {
      ru: "Основное приложение Car Blanche на Flutter. iOS · Android · Web. Единая кодовая база, hot reload в проде.",
      en: "Main Car Blanche app on Flutter. iOS · Android · Web. Single codebase, hot reload in production.",
    },
    language: "Dart", languageColor: "#00B4AB",
    stars: 1284, forks: 142, pulls: 18,
    topics: ["flutter", "dart", "mobility", "ios", "android"],
    updated: "2 hours ago", isPinned: true, visibility: "Public",
  },
  {
    name: "design-system",
    owner: "Forumbit",
    description: {
      ru: "Дизайн-система Car Blanche: 240 цветовых токенов, 56 типографических, Flutter и Web компоненты, темы Light/Dark/Dim.",
      en: "Car Blanche design system: 240 color tokens, 56 typography, Flutter and Web components, Light/Dark/Dim themes.",
    },
    language: "Dart", languageColor: "#00B4AB",
    stars: 2412, forks: 318, pulls: 7,
    topics: ["design-system", "flutter", "tokens", "ui"],
    updated: "yesterday", isPinned: true, visibility: "Public",
  },
  {
    name: "3d-showroom-experience",
    owner: "Forumbit",
    description: {
      ru: "Интерактивная WebGL-витрина автопарка. Flutter Web + Three.js. 60 FPS на мобильных.",
      en: "Interactive WebGL fleet showroom. Flutter Web + Three.js. 60 FPS on mobile.",
    },
    language: "Dart", languageColor: "#00B4AB",
    stars: 847, forks: 94, pulls: 3,
    topics: ["webgl", "three-js", "flutter", "showcase"],
    updated: "3 days ago", isPinned: true, visibility: "Public",
  },
  {
    name: "ios-native-modules",
    owner: "Forumbit",
    description: {
      ru: "Нативные iOS-модули: Apple Pay, CallKit, Live Activities, Dynamic Island.",
      en: "Native iOS modules: Apple Pay, CallKit, Live Activities, Dynamic Island.",
    },
    language: "Swift", languageColor: "#F05138",
    stars: 312, forks: 28, pulls: 0,
    topics: ["swift", "ios", "apple-pay"],
    updated: "1 week ago", visibility: "Public",
  },
  {
    name: "android-native-modules",
    owner: "Forumbit",
    description: {
      ru: "Нативные Android-модули: Wear OS виджеты, Quick Settings, Google Pay.",
      en: "Native Android modules: Wear OS widgets, Quick Settings, Google Pay.",
    },
    language: "Kotlin", languageColor: "#A97BFF",
    stars: 256, forks: 19, pulls: 0,
    topics: ["kotlin", "android", "wear-os"],
    updated: "2 weeks ago", visibility: "Public",
  },
  {
    name: "tariffs-spec",
    owner: "Forumbit",
    description: {
      ru: "Открытая спецификация 8 тарифов: Business, Elegance, Luxury, Premium, Exclusive, Top Car, XXL, Concierge. JSON + Markdown.",
      en: "Open spec of 8 tariffs. JSON + Markdown for partners and integrators.",
    },
    language: "Markdown", languageColor: "#083fa1",
    stars: 478, forks: 56, pulls: 2,
    topics: ["tariffs", "spec", "open-data"],
    updated: "1 month ago", isPinned: true, visibility: "Public",
  },

  /* ============ freesorgo (Andrey) — Backend lead ============ */
  {
    name: "yii2-mobility-extensions",
    owner: "freesorgo",
    description: {
      ru: "Набор Yii2-расширений: биллинг, RBAC шофёров, интеграции с Тинькофф / Сбер / СБП.",
      en: "Yii2 extensions: billing, chauffeur RBAC, integrations with Tinkoff / Sber / SBP.",
    },
    language: "PHP", languageColor: "#4F5D95",
    stars: 927, forks: 87, pulls: 12,
    topics: ["yii2", "php", "billing", "rbac"],
    updated: "5 hours ago", isPinned: true, visibility: "Public",
  },
  {
    name: "esg-reporter",
    owner: "freesorgo",
    description: {
      ru: "Open-source библиотека на PHP для расчёта CO₂-следа поездок по стандартам GRI и ESRS.",
      en: "Open-source PHP library for calculating ride CO₂ footprint per GRI / ESRS standards.",
    },
    language: "PHP", languageColor: "#4F5D95",
    stars: 642, forks: 73, pulls: 4,
    topics: ["esg", "co2", "compliance", "php"],
    updated: "4 days ago", isPinned: true, visibility: "Public",
  },
  {
    name: "api-gateway",
    owner: "freesorgo",
    description: {
      ru: "REST + GraphQL API на Yii2 с OAuth 2. SDK для PHP (Composer) и Dart/Flutter. SLA 99.9%.",
      en: "REST + GraphQL API on Yii2 with OAuth 2. SDKs for PHP (Composer) and Dart/Flutter. SLA 99.9%.",
    },
    language: "PHP", languageColor: "#4F5D95",
    stars: 521, forks: 41, pulls: 6,
    topics: ["graphql", "rest", "oauth2", "api"],
    updated: "yesterday", isPinned: true, visibility: "Public",
  },
  {
    name: "billing-microservice",
    owner: "freesorgo",
    description: {
      ru: "Микросервис биллинга: PCI DSS L1, корпоративные счета, сплит-платежи, токенизация карт.",
      en: "Billing microservice: PCI DSS L1, corporate accounts, split payments, card tokenization.",
    },
    language: "PHP", languageColor: "#4F5D95",
    stars: 198, forks: 12, pulls: 3,
    topics: ["billing", "pci-dss", "payments"],
    updated: "2 days ago", visibility: "Private",
  },

  /* ============ ookami-kb (Kirill Bubochkin) — Collaborator ============ */
  {
    name: "flutter-architecture-templates",
    owner: "ookami-kb",
    description: {
      ru: "Шаблоны архитектуры Flutter: DDD, Clean Architecture, BLoC, Riverpod. Используется в Car Blanche.",
      en: "Flutter architecture templates: DDD, Clean Architecture, BLoC, Riverpod. Used in Car Blanche.",
    },
    language: "Dart", languageColor: "#00B4AB",
    stars: 1841, forks: 224, pulls: 8,
    topics: ["flutter", "architecture", "ddd", "clean-architecture"],
    updated: "1 day ago", isPinned: true, visibility: "Public",
  },
  {
    name: "chauffeur-academy-curriculum",
    owner: "ookami-kb",
    description: {
      ru: "Открытая часть курса для шофёров: 120 часов программы — этикет, безопасное вождение, иностранные языки, работа с VIP-клиентами.",
      en: "Open curriculum for chauffeurs: 120-hour program — etiquette, safe driving, foreign languages, VIP service.",
    },
    language: "Markdown", languageColor: "#083fa1",
    stars: 1208, forks: 188, pulls: 5,
    topics: ["chauffeur", "training", "service-design", "academy"],
    updated: "3 days ago", isPinned: true, visibility: "Public",
  },
  {
    name: "code-review-checklist",
    owner: "ookami-kb",
    description: {
      ru: "Открытый чек-лист code-review для Flutter / Dart проектов. Используется в нашей команде.",
      en: "Open code-review checklist for Flutter / Dart projects. Used by our team.",
    },
    language: "Markdown", languageColor: "#083fa1",
    stars: 392, forks: 47, pulls: 1,
    topics: ["code-review", "best-practices", "flutter"],
    updated: "2 weeks ago", visibility: "Public",
  },
];

/* По автору */
export function reposByOwner(owner: string) {
  return repos.filter((r) => r.owner === owner);
}

/* Pinned по автору */
export function pinnedByOwner(owner: string) {
  return repos.filter((r) => r.owner === owner && r.isPinned);
}
