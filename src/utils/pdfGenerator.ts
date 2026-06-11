import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export type PdfSection = {
  heading: string;
  bullets: string[];
};

export type PdfContent = {
  title: string;
  subtitle?: string;
  category: string;
  badge?: string;
  intro: string;
  sections: PdfSection[];
  /** Hex без # */
  accentColor?: string;
};

/* =========================================================
   Генерация PDF через рендеринг HTML в canvas.
   Кириллица гарантированно работает — используются системные шрифты браузера.
   ========================================================= */

export async function generatePdf(content: PdfContent): Promise<void> {
  const accent = content.accentColor || "0969da";

  // Создаём временный off-screen контейнер с HTML-документом
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-99999px";
  wrapper.style.top = "0";
  wrapper.style.width = "794px"; // A4 width @ 96 DPI
  wrapper.style.minHeight = "1123px"; // A4 height @ 96 DPI
  wrapper.style.background = "#ffffff";
  wrapper.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif";

  wrapper.innerHTML = buildHtml(content, accent);
  document.body.appendChild(wrapper);

  try {
    // Ждём один кадр чтобы браузер отрисовал
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const canvas = await html2canvas(wrapper, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
      useCORS: true,
    });

    // A4 в мм
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = 210;
    const pageHeight = 297;

    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    // Вписываем в страницу с сохранением пропорций
    const imgRatio = canvas.width / canvas.height;
    const pageRatio = pageWidth / pageHeight;

    let renderW = pageWidth;
    let renderH = pageWidth / imgRatio;
    if (imgRatio < pageRatio) {
      // изображение «выше» — масштабируем по высоте
      renderH = pageHeight;
      renderW = pageHeight * imgRatio;
    }
    const offsetX = (pageWidth - renderW) / 2;
    const offsetY = (pageHeight - renderH) / 2;

    pdf.addImage(imgData, "JPEG", offsetX, offsetY, renderW, renderH);

    const filename = content.title
      .replace(/[^a-zA-Zа-яА-ЯёЁ0-9\-_ ]/g, "")
      .replace(/\s+/g, "_")
      .slice(0, 60);
    pdf.save(`${filename}.pdf`);
  } finally {
    document.body.removeChild(wrapper);
  }
}

function buildHtml(c: PdfContent, accent: string): string {
  const accentRgb = hexToRgb(accent);
  const accentSoft = `rgba(${accentRgb}, 0.06)`;
  const accentLine = `rgba(${accentRgb}, 0.15)`;

  return `
    <div style="
      width: 794px;
      height: 1123px;
      padding: 0;
      box-sizing: border-box;
      background: #ffffff;
      color: #1f2328;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
      position: relative;
      display: flex;
      flex-direction: column;
    ">
      <!-- HEADER -->
      <div style="
        background: #${accent};
        color: #ffffff;
        padding: 24px 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      ">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #ffffff;
            color: #${accent};
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 16px;
            letter-spacing: 0.5px;
          ">CB</div>
          <div>
            <div style="font-size: 18px; font-weight: 800; letter-spacing: 1px;">CAR BLANCHE</div>
            <div style="font-size: 11px; opacity: 0.9; margin-top: 2px;">
              Премиум-сервис персонализированного транспорта · Уфа, с 2018
            </div>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
            ${escapeHtml(c.category)}
          </div>
          ${c.badge ? `<div style="font-size: 10px; opacity: 0.85; margin-top: 4px;">${escapeHtml(c.badge)}</div>` : ""}
        </div>
      </div>

      <!-- BODY -->
      <div style="
        padding: 36px 40px 24px;
        flex: 1;
        display: flex;
        flex-direction: column;
      ">
        <!-- TITLE -->
        <h1 style="
          font-size: 32px;
          line-height: 1.15;
          font-weight: 800;
          color: #1f2328;
          margin: 0 0 8px;
        ">${escapeHtml(c.title)}</h1>

        ${c.subtitle ? `
          <p style="
            font-size: 14px;
            line-height: 1.45;
            color: #59636e;
            margin: 0 0 16px;
          ">${escapeHtml(c.subtitle)}</p>
        ` : ""}

        <div style="border-top: 1px solid #d1d9e0; margin: 8px 0 18px;"></div>

        <!-- INTRO -->
        <div style="
          background: ${accentSoft};
          border-left: 4px solid #${accent};
          padding: 14px 18px;
          border-radius: 4px;
          margin-bottom: 22px;
          font-size: 13px;
          line-height: 1.5;
          color: #1f2328;
          font-style: italic;
        ">${escapeHtml(c.intro)}</div>

        <!-- SECTIONS -->
        ${c.sections.map((s) => `
          <div style="margin-bottom: 18px;">
            <div style="
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 10px;
            ">
              <div style="
                width: 6px;
                height: 18px;
                background: #${accent};
                border-radius: 2px;
              "></div>
              <h3 style="
                font-size: 15px;
                font-weight: 700;
                color: #${accent};
                margin: 0;
              ">${escapeHtml(s.heading)}</h3>
            </div>
            <ul style="
              margin: 0;
              padding: 0;
              list-style: none;
            ">
              ${s.bullets.map((b) => `
                <li style="
                  font-size: 12.5px;
                  line-height: 1.5;
                  color: #1f2328;
                  padding-left: 22px;
                  position: relative;
                  margin-bottom: 6px;
                ">
                  <span style="
                    position: absolute;
                    left: 6px;
                    top: 0;
                    color: #${accent};
                    font-weight: 700;
                  ">•</span>
                  ${escapeHtml(b)}
                </li>
              `).join("")}
            </ul>
          </div>
        `).join("")}
      </div>

      <!-- FOOTER -->
      <div style="
        border-top: 1px solid ${accentLine};
        padding: 16px 40px;
        background: #fafbfc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 11px;
        color: #1f2328;
      ">
        <div>
          <div style="font-weight: 700;">car-blanche.net</div>
          <div style="color: #59636e; margin-top: 2px;">car-blanche.app</div>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 700;">b2b.car.blanche@gmail.com</div>
          <div style="color: #59636e; margin-top: 2px;">github.com/car-blanche</div>
        </div>
      </div>

      <!-- BRAND STRIP -->
      <div style="
        background: #${accent};
        color: #ffffff;
        padding: 8px 40px;
        font-size: 10px;
        text-align: center;
        opacity: 0.95;
      ">
        © ${new Date().getFullYear()} Car Blanche · Уфа, Россия · Премиум-сервис персонализированного транспорта
      </div>
    </div>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

/* =========================================================
   Шаблоны — только русский
   ========================================================= */

export const pdfTemplates: Record<string, PdfContent> = {
  "client-manual-app": {
    title: "Руководство клиента · Car Blanche App 1.0",
    subtitle: "Премиум-сервис персонализированного транспорта — бронирование в один клик, прозрачные цены, профессиональные шофёры.",
    category: "Руководство клиента",
    badge: "App 1.0",
    accentColor: "0969da",
    intro: "Добро пожаловать в Car Blanche! Эта одностраничная инструкция поможет начать пользоваться приложением и забронировать первую поездку менее чем за 60 секунд.",
    sections: [
      {
        heading: "Начало работы",
        bullets: [
          "Скачайте Car Blanche из App Store или Google Play (car-blanche.app)",
          "Зарегистрируйтесь по номеру телефона — SMS-подтверждение за 5 секунд",
          "Добавьте способ оплаты — банковскую карту или Apple Pay / Google Pay",
          "Сохраните любимые адреса: дом, офис, аэропорт",
        ],
      },
      {
        heading: "Бронирование первой поездки",
        bullets: [
          "Выберите сценарий: бизнес-встреча, семейная поездка, аэропорт, VIP-мероприятие",
          "Выберите тариф: от Business (от 1000 ₽) до Top Car с Ferrari (от 6000 ₽)",
          "Добавьте опции: детское кресло, Wi-Fi, шофёр со знанием английского, расширенная страховка",
          "Подтвердите — шофёр прибудет за 8-12 минут (город) или 15 минут (час пик)",
        ],
      },
      {
        heading: "Во время поездки",
        bullets: [
          "Отслеживайте шофёра в реальном времени на главном экране (ETA)",
          "Настройте климат, музыку, маршрут — прямо через приложение",
          "Поддержка 24/7 в один тап: ИИ-ассистент или живой консьерж",
          "Оцените поездку — любимого шофёра можно закрепить",
        ],
      },
      {
        heading: "Нужна помощь?",
        bullets: [
          "Чат в приложении — среднее время ответа 30 секунд",
          "Email: b2b.car.blanche@gmail.com (ответ в течение 2 часов)",
          "Полная документация: car-blanche.net",
        ],
      },
    ],
  },

  "chauffeur-onboarding": {
    title: "Onboarding нового шофёра",
    subtitle: "Ваша первая неделя в Академии Car Blanche — чек-лист, контакты, стандарты.",
    category: "Операции",
    badge: "Программа 120 часов",
    accentColor: "1a7f37",
    intro: "Добро пожаловать в команду Car Blanche. Этот документ описывает вашу первую неделю — от документов до первой поездки.",
    sections: [
      {
        heading: "День 1-2 · Документы и подготовка",
        bullets: [
          "Подайте документы: водительские права (стаж 5+ лет), паспорт, справка об отсутствии судимости",
          "Пройдите медосмотр в нашей сертифицированной клинике (мы оплачиваем)",
          "Психологический тест (60 минут)",
          "Получите идентификатор шофёра Car Blanche и форму (костюм, белая рубашка, перчатки)",
        ],
      },
      {
        heading: "День 3-5 · Модули академии",
        bullets: [
          "40 ч · Этикет сервиса и протоколы встречи клиента",
          "30 ч · Иностранные языки: английский (обязательно), немецкий или китайский (по выбору)",
          "20 ч · Безопасное и экономичное вождение в городе и на трассе",
          "20 ч · VIP-сервис: конфиденциальность, язык тела, упреждение нужд клиента",
          "10 ч · Финальный экзамен и сертификация",
        ],
      },
      {
        heading: "Неделя 1 · Реальные поездки под наблюдением",
        bullets: [
          "Первые 10 поездок — с наставником (старшим шофёром)",
          "После каждой поездки — обратная связь от пассажира и наставника",
          "Пересертификация каждые 6 месяцев",
          "Зарплата растёт с рейтингом: 4.5★ → базовая, 4.8★ → +15%, 4.9★+ → +30%",
        ],
      },
      {
        heading: "Ключевые контакты",
        bullets: [
          "Операции: b2b.car.blanche@gmail.com",
          "Экстренная поддержка на дороге: кнопка SOS в приложении",
          "Расписание академии и материалы: ops-портал (логин выдаётся в День 1)",
        ],
      },
    ],
  },

  "corporate-faq": {
    title: "FAQ корпоративного клиента",
    subtitle: "Ответы на 50+ вопросов: цены, контракты, отчётность для B2B.",
    category: "B2B Руководство",
    badge: "Corporate",
    accentColor: "8250df",
    intro: "Всё, что нужно знать корпоративным клиентам о работе с Car Blanche — от контракта до ежемесячной отчётности.",
    sections: [
      {
        heading: "Цены и контракты",
        bullets: [
          "Минимальная команда: 5 человек. Минимального оборота нет.",
          "Закрытые тарифы на 10-15% ниже розничных",
          "Бесплатный контракт — платите только за реальные поездки",
          "Объёмные скидки: 50+ сотрудников → −20%, 200+ → −30%",
        ],
      },
      {
        heading: "Account-менеджмент",
        bullets: [
          "Выделенный аккаунт-менеджер с прямым телефоном",
          "SLA на любую эскалацию: 5 минут",
          "Ежеквартальные business reviews",
          "Кастомные отчёты по запросу",
        ],
      },
      {
        heading: "Биллинг и отчётность",
        bullets: [
          "Единый счёт на всю компанию",
          "Ежемесячные авто-акты в 1С / SAP Concur",
          "Каждый сотрудник бронирует под своим именем — биллинг идёт компании",
          "Экспорт в JSON / Excel / 1С / SAP — в любой момент",
        ],
      },
      {
        heading: "Как начать работу",
        bullets: [
          "Напишите на b2b.car.blanche@gmail.com: название компании, размер команды, ожидаемый месячный объём",
          "Демо-звонок в течение 24 часов",
          "Контракт подписывается электронно — обычно за 3 рабочих дня",
          "Первые поездки на следующий день после онбординга",
        ],
      },
    ],
  },

  "tariffs-overview": {
    title: "Обзор тарифов Car Blanche",
    subtitle: "8 классов сервиса: от Business до Top Car с Ferrari и Bugatti.",
    category: "Руководство по тарифам",
    badge: "8 тарифов",
    accentColor: "bc4c00",
    intro: "Полное руководство по всем 8 тарифам Car Blanche. Прозрачные цены от 1000 ₽.",
    sections: [
      {
        heading: "Ежедневные и бизнес",
        bullets: [
          "Business · от 1000 ₽ · Camry, BMW 3, Lexus NX, Audi A4, VW CC, Honda Crosstour",
          "Elegance · от 1500 ₽ · BMW 5, Land Cruiser, Porsche Cayenne, Audi A6, Mercedes ML",
          "Идеально для: ежедневных деловых поездок, регулярных встреч",
        ],
      },
      {
        heading: "Executive и Luxury",
        bullets: [
          "Luxury · от 2000 ₽ · Mercedes W213, Audi A8, Genesis G80, Lexus ES/GS",
          "Premium · от 3000 ₽ · Mercedes W222, Bentley Bentayga, Porsche Panamera, G63, BMW 8",
          "Идеально для: VIP-клиентов, топ-менеджмента, важных мероприятий",
        ],
      },
      {
        heading: "Exclusive и Special",
        bullets: [
          "Exclusive · от 5000 ₽ · Mercedes Maybach, Rolls-Royce Phantom / Ghost",
          "Top Car · от 6000 ₽ · Audi R8, McLaren, Aston Martin, Ferrari, Bugatti Veyron",
          "Идеально для: свадеб, поездок мечты на суперкаре, фотосессий, премьер",
        ],
      },
      {
        heading: "Групповые и Concierge",
        bullets: [
          "XXL · от 3500 ₽ · Mercedes V-250, VW Multivan (7-8 мест)",
          "Concierge Service · от 1000 ₽ · ВАШ автомобиль + наш сертифицированный шофёр",
          "Бронирование: car-blanche.app · можно за 90 дней вперёд",
        ],
      },
    ],
  },

  "academy-program": {
    title: "Академия Car Blanche · 120 часов",
    subtitle: "Как мы готовим каждого шофёра — этикет, языки, безопасность, VIP-сервис.",
    category: "Обучение",
    badge: "Academy",
    accentColor: "bf3989",
    intro: "Каждый шофёр Car Blanche проходит 120 часов обучения в 5 модулях до первой поездки. Пересертификация каждые 6 месяцев поддерживает высокий стандарт.",
    sections: [
      {
        heading: "Модуль 1 · Этикет сервиса (40 часов)",
        bullets: [
          "Протоколы встречи: дома, в офисе, в аэропорту, у отеля",
          "Словарь, тон голоса, язык тела",
          "Упреждение нужд: вода, температура, предпочтения по маршруту",
          "Решение сложных ситуаций: опоздание, жалобы, конфликты",
        ],
      },
      {
        heading: "Модуль 2 · Иностранные языки (30 часов)",
        bullets: [
          "Английский — обязательно: 25 часов делового и travel-лексикона",
          "Немецкий или китайский — на выбор: 5 часов основ",
          "Тестирование в реальных сценариях с носителями языка",
        ],
      },
      {
        heading: "Модули 3-4 · Вождение и VIP (40 часов)",
        bullets: [
          "Безопасное и экономичное вождение (20 ч): город, трасса, погодные условия",
          "VIP-сервис (20 ч): конфиденциальность, протоколы безопасности, back-entrances",
        ],
      },
      {
        heading: "Модуль 5 · Экзамен и непрерывное улучшение (10 ч)",
        bullets: [
          "Финальный экзамен: теория + практический тест-драйв",
          "Сертификат с QR-кодом (показывается клиенту)",
          "Пересертификация каждые 6 месяцев — те же модули, обновлённые",
          "QA-команда проводит 200+ тайных поездок в месяц для контроля качества",
        ],
      },
    ],
  },
};
