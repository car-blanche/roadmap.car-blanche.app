/* =========================================================
   Данные с основного сайта car-blanche.app и расширение
   по городам России и зарубежных стран до 2029.
   ========================================================= */

/* ---- Headquarters & expansion ---- */

export type CityStatus = "hq" | "active" | "soon-2026" | "soon-2027" | "soon-2028" | "soon-2029";

export type City = {
  name: { ru: string; en: string };
  country: { ru: string; en: string };
  countryCode: string; // ISO
  flag: string;        // Используется как короткий маркер (📍 для всех — без флагов стран)
  status: CityStatus;
  since?: string;
  population?: string;
  fleet?: string;
};

export const headquarters = {
  city:    { ru: "Уфа",  en: "Ufa" },
  country: { ru: "Россия", en: "Russia" },
  flag:    "📍",
  since:   "2018",
  team:    "3 разработчика + операционная команда",
};

const PIN = "📍";

export const cities: City[] = [
  // HQ + ЕДИНСТВЕННЫЙ работающий город сейчас (Уфа)
  { name: { ru: "Уфа", en: "Ufa" }, country: { ru: "Россия", en: "Russia" }, countryCode: "RU", flag: PIN,
    status: "hq", since: "2018", population: "1.13M", fleet: "48 авто" },

  // 2026 — следующие города-миллионники России
  { name: { ru: "Москва", en: "Moscow" }, country: { ru: "Россия", en: "Russia" }, countryCode: "RU", flag: PIN,
    status: "soon-2026", population: "13M" },
  { name: { ru: "Санкт-Петербург", en: "Saint Petersburg" }, country: { ru: "Россия", en: "Russia" }, countryCode: "RU", flag: PIN,
    status: "soon-2026", population: "5.4M" },
  { name: { ru: "Казань", en: "Kazan" }, country: { ru: "Россия", en: "Russia" }, countryCode: "RU", flag: PIN,
    status: "soon-2026", population: "1.3M" },
  { name: { ru: "Екатеринбург", en: "Ekaterinburg" }, country: { ru: "Россия", en: "Russia" }, countryCode: "RU", flag: PIN,
    status: "soon-2026", population: "1.5M" },

  // 2027 — расширение по России
  { name: { ru: "Краснодар", en: "Krasnodar" }, country: { ru: "Россия", en: "Russia" }, countryCode: "RU", flag: PIN,
    status: "soon-2027", population: "1.1M" },
  { name: { ru: "Нижний Новгород", en: "Nizhny Novgorod" }, country: { ru: "Россия", en: "Russia" }, countryCode: "RU", flag: PIN,
    status: "soon-2027", population: "1.2M" },
  { name: { ru: "Сочи", en: "Sochi" }, country: { ru: "Россия", en: "Russia" }, countryCode: "RU", flag: PIN,
    status: "soon-2027", population: "0.4M" },
  { name: { ru: "Новосибирск", en: "Novosibirsk" }, country: { ru: "Россия", en: "Russia" }, countryCode: "RU", flag: PIN,
    status: "soon-2027", population: "1.6M" },
  { name: { ru: "Самара", en: "Samara" }, country: { ru: "Россия", en: "Russia" }, countryCode: "RU", flag: PIN,
    status: "soon-2027", population: "1.1M" },

  // 2028 — оставшаяся Россия + ближнее зарубежье
  { name: { ru: "Челябинск", en: "Chelyabinsk" }, country: { ru: "Россия", en: "Russia" }, countryCode: "RU", flag: PIN,
    status: "soon-2028", population: "1.2M" },
  { name: { ru: "Минск", en: "Minsk" }, country: { ru: "Беларусь", en: "Belarus" }, countryCode: "BY", flag: PIN,
    status: "soon-2028", population: "1.9M" },
  { name: { ru: "Алматы", en: "Almaty" }, country: { ru: "Казахстан", en: "Kazakhstan" }, countryCode: "KZ", flag: PIN,
    status: "soon-2028", population: "2.0M" },
  { name: { ru: "Ташкент", en: "Tashkent" }, country: { ru: "Узбекистан", en: "Uzbekistan" }, countryCode: "UZ", flag: PIN,
    status: "soon-2028", population: "2.9M" },
  { name: { ru: "Ереван", en: "Yerevan" }, country: { ru: "Армения", en: "Armenia" }, countryCode: "AM", flag: PIN,
    status: "soon-2028", population: "1.1M" },

  // 2029 — дальнее зарубежье
  { name: { ru: "Дубай", en: "Dubai" }, country: { ru: "ОАЭ", en: "UAE" }, countryCode: "AE", flag: PIN,
    status: "soon-2029", population: "3.6M" },
  { name: { ru: "Абу-Даби", en: "Abu Dhabi" }, country: { ru: "ОАЭ", en: "UAE" }, countryCode: "AE", flag: PIN,
    status: "soon-2029", population: "1.5M" },
  { name: { ru: "Стамбул", en: "Istanbul" }, country: { ru: "Турция", en: "Turkey" }, countryCode: "TR", flag: PIN,
    status: "soon-2029", population: "15.6M" },
  { name: { ru: "Белград", en: "Belgrade" }, country: { ru: "Сербия", en: "Serbia" }, countryCode: "RS", flag: PIN,
    status: "soon-2029", population: "1.4M" },
  { name: { ru: "Бангкок", en: "Bangkok" }, country: { ru: "Таиланд", en: "Thailand" }, countryCode: "TH", flag: PIN,
    status: "soon-2029", population: "10.5M" },
  { name: { ru: "Бали (Денпасар)", en: "Bali (Denpasar)" }, country: { ru: "Индонезия", en: "Indonesia" }, countryCode: "ID", flag: PIN,
    status: "soon-2029", population: "0.95M" },
];

export const statusMeta: Record<CityStatus, { ru: string; en: string; color: string }> = {
  "hq":         { ru: "Штаб-квартира",   en: "Headquarters",      color: "#3fb950" },
  "active":     { ru: "Работаем сейчас", en: "Currently active",  color: "#58a6ff" },
  "soon-2026":  { ru: "Запуск 2026",     en: "Launch 2026",       color: "#a371f7" },
  "soon-2027":  { ru: "Запуск 2027",     en: "Launch 2027",       color: "#d29922" },
  "soon-2028":  { ru: "Запуск 2028",     en: "Launch 2028",       color: "#f0883e" },
  "soon-2029":  { ru: "Запуск 2029",     en: "Launch 2029",       color: "#db61a2" },
};

/* ---- Источник: McKinsey + цитаты с основного сайта ---- */

export const insights = {
  mckinsey: {
    source: "McKinsey Mobility Report 2026",
    valuePct: 80,
    ru: "80%+ пользователей премиум-сегмента ожидают, что аренда автомобиля будет сопровождаться интеллектуальной экосистемой.",
    en: "80%+ of premium segment users expect car rental to come with an intelligent ecosystem.",
  },
  mainQuote: {
    ru: "«Не просто поездка. Решение, адаптированное под тебя.»",
    en: '"Not just a ride. A solution tailored to you."',
  },
  shiftQuote: {
    ru: "Не «какая машина свободна», а «какая машина подходит именно под мою задачу».",
    en: 'Not "which car is available", but "which car fits my task".',
  },
};

/* ---- Сценарии персонализации (с основного сайта) ---- */

export type Scenario = {
  key: string;
  icon: string;
  title: { ru: string; en: string };
  desc: { ru: string; en: string };
  car: string;
  options: { ru: string; en: string }[];
  color: string;
};

export type ScenarioCarOption = {
  model: string;
  tariff: string;
  badge?: string;
};

export const scenarios: Scenario[] = [
  {
    key: "business",
    icon: "💼",
    title: { ru: "Бизнес-встреча в центре", en: "Business meeting downtown" },
    desc:  {
      ru: "Приоритет — пунктуальность и тишина. Шофёр в строгом дресс-коде, маршрут с обходом пробок, тонированные окна для конфиденциальности.",
      en: "Priority — punctuality and quietness. Chauffeur in formal attire, traffic-aware route, tinted windows for privacy."
    },
    car: "BMW 5 G30 · тариф Elegance",
    options: [
      { ru: "Премиальный интерьер", en: "Premium interior" },
      { ru: "Тихий шофёр",          en: "Silent chauffeur" },
      { ru: "Wi-Fi и зарядки",      en: "Wi-Fi & chargers" },
      { ru: "Приоритет времени",    en: "Time priority" },
      { ru: "Тонировка окон",       en: "Tinted windows" },
    ],
    color: "#58a6ff",
  },
  {
    key: "family",
    icon: "👨‍👩‍👧",
    title: { ru: "Семейная поездка с ребёнком", en: "Family trip with child" },
    desc:  {
      ru: "Детское кресло в один клик, расширенная страховка, спокойный стиль вождения, климат-контроль для задних мест.",
      en: "Child seat in one click, extended insurance, calm driving style, climate control for rear passengers."
    },
    car: "Mercedes V-250 · тариф XXL",
    options: [
      { ru: "Детское кресло",        en: "Child seat" },
      { ru: "Расширенная страховка", en: "Extended insurance" },
      { ru: "Климат-зоны",           en: "Climate zones" },
      { ru: "Детское меню напитков", en: "Kids' drinks menu" },
      { ru: "Просторный салон",      en: "Spacious cabin" },
    ],
    color: "#3fb950",
  },
  {
    key: "airport",
    icon: "✈️",
    title: { ru: "Трансфер с учётом времени прилёта", en: "Airport transfer with flight tracking" },
    desc:  {
      ru: "Система мониторит рейс и автоматически подаёт авто к моменту выхода. Шофёр встречает у выхода, помогает с багажом.",
      en: "System tracks the flight and dispatches the car when you land. Chauffeur meets at the exit, assists with luggage."
    },
    car: "Mercedes W213 · тариф Luxury",
    options: [
      { ru: "Трекинг рейса",       en: "Flight tracking" },
      { ru: "Встреча у выхода",    en: "Meet & greet" },
      { ru: "Помощь с багажом",    en: "Baggage assistance" },
      { ru: "Вода / Wi-Fi",        en: "Water / Wi-Fi" },
      { ru: "Табличка с именем",   en: "Name sign" },
    ],
    color: "#a371f7",
  },
  {
    key: "wedding",
    icon: "💍",
    title: { ru: "Свадьба и торжества", en: "Wedding & special occasions" },
    desc:  {
      ru: "Тариф Exclusive — Rolls-Royce и Maybach для самого важного дня. Декор по запросу, цветочное оформление, шофёр в смокинге.",
      en: "Exclusive tariff — Rolls-Royce and Maybach for the most important day. Custom decor, floral arrangements, chauffeur in tuxedo."
    },
    car: "Rolls-Royce Phantom · тариф Exclusive",
    options: [
      { ru: "Декор по запросу",     en: "Custom decor" },
      { ru: "Цветочное оформление", en: "Floral arrangements" },
      { ru: "Шофёр в смокинге",     en: "Chauffeur in tuxedo" },
      { ru: "Шампанское в салоне",  en: "Champagne in cabin" },
      { ru: "Видео-съёмка по запросу", en: "Video on request" },
    ],
    color: "#f0883e",
  },
  {
    key: "vip-event",
    icon: "🎬",
    title: { ru: "VIP-мероприятие или премьера", en: "VIP event or premiere" },
    desc:  {
      ru: "Подача авто к красной дорожке. Mercedes W222 или Bentley — выбор тех, кто привык к вниманию. Шофёр знает все back-entrances.",
      en: "Red-carpet drop-off. Mercedes W222 or Bentley — for those used to attention. Chauffeur knows all back entrances."
    },
    car: "Bentley Bentayga · тариф Premium",
    options: [
      { ru: "Подача к red carpet",   en: "Red carpet drop-off" },
      { ru: "Шофёр в смокинге",      en: "Chauffeur in tuxedo" },
      { ru: "Знание back-entrances", en: "Back entrance knowledge" },
      { ru: "Ожидание без счётчика", en: "Free waiting time" },
      { ru: "Connect с PR-командой", en: "Connect with PR team" },
    ],
    color: "#db61a2",
  },
  {
    key: "dream-drive",
    icon: "🏎️",
    title: { ru: "Поездка мечты на суперкаре", en: "Dream supercar ride" },
    desc:  {
      ru: "Тариф Top Car — Ferrari, McLaren, Bugatti. Подарите себе или близкому час за рулём легенды (опционально с шофёром).",
      en: "Top Car tariff — Ferrari, McLaren, Bugatti. Gift yourself or a loved one an hour with a legend (chauffeur optional)."
    },
    car: "Ferrari · тариф Top Car",
    options: [
      { ru: "Маршрут по выбору",   en: "Custom route" },
      { ru: "Опционально без шофёра", en: "Self-drive optional" },
      { ru: "Полный бак",           en: "Full fuel" },
      { ru: "Профессиональное фото", en: "Professional photo" },
      { ru: "Видео-ролик в подарок", en: "Video clip as gift" },
    ],
    color: "#f85149",
  },
  {
    key: "long-trip",
    icon: "🏔️",
    title: { ru: "Дальний маршрут или горы", en: "Long route or mountains" },
    desc:  {
      ru: "Land Cruiser Prado или 200 — настоящий внедорожник для дальних поездок и горных серпантинов. Полный привод, простор для багажа.",
      en: "Land Cruiser Prado or 200 — true SUV for long trips and mountain roads. AWD, plenty of luggage space."
    },
    car: "Toyota Land Cruiser 200 · тариф Elegance",
    options: [
      { ru: "Полный привод",       en: "AWD" },
      { ru: "Простор для багажа",  en: "Spacious cargo" },
      { ru: "Off-road системы",    en: "Off-road systems" },
      { ru: "Дополнительный шофёр", en: "Backup chauffeur" },
      { ru: "GPS-трекер маршрута", en: "GPS route tracker" },
    ],
    color: "#e3b341",
  },
  {
    key: "concierge",
    icon: "🎩",
    title: { ru: "Шофёр для вашего автомобиля", en: "Chauffeur for your own car" },
    desc:  {
      ru: "Concierge Service — сертифицированный шофёр приедет к вам и сядет за руль вашего авто. Идеально для вечеринок и встреч с алкоголем.",
      en: "Concierge Service — certified chauffeur arrives and drives your car. Perfect for parties or events with alcohol."
    },
    car: "Ваш автомобиль · тариф Concierge",
    options: [
      { ru: "Ваш автомобиль",       en: "Your own car" },
      { ru: "Шофёр приедет к вам",  en: "Chauffeur comes to you" },
      { ru: "Страховка KASKO",      en: "CASCO insurance" },
      { ru: "Любое время суток",    en: "Any time of day" },
      { ru: "Конфиденциальность",   en: "Confidentiality" },
    ],
    color: "#1f6feb",
  },
];

/* ---- Источник статьи ---- */

export const articleSource = {
  title:   { ru: "Персонализация как новая норма (2026)",
             en: "Personalization as the new normal (2026)" },
  url:     "https://mobile-tech-transport-personalization.car-blanche.app/",
  excerpt: { ru: "Полный текст исследования о роли мобильных решений в современной транспортной экосистеме.",
             en: "Full text of the research on mobile solutions in the modern transport ecosystem." },
};
