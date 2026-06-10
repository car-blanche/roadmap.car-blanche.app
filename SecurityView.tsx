import { COMPANY_LINKS } from "../../context/ViewContext";
import { ViewHero } from "../gh/ViewHero";
import { CollapseSection, CollapsePreview } from "../gh/CollapseSection";
import { useLang } from "../../context/LangContext";

const policies = [
  { title: "Security policy",       status: "Enabled",     file: "SECURITY.md",            desc: { ru: "Как сообщить об уязвимости и SLA на ответ команды безопасности.", en: "How to report a vulnerability and team SLA." }, color: "#3fb950" },
  { title: "Security advisories",   status: "0 active",    file: "—",                       desc: { ru: "Публичные advisory об устранённых уязвимостях.", en: "Public advisories on fixed vulnerabilities." }, color: "#3fb950" },
  { title: "Dependabot alerts",     status: "2 reviewed",  file: ".github/dependabot.yml",  desc: { ru: "Авто-обновление зависимостей. Критические патчи — в течение 24 часов.", en: "Auto dependency updates. Critical patches within 24 hours." }, color: "#d29922" },
  { title: "Code scanning",         status: "Passing",     file: "CodeQL",                  desc: { ru: "Статический анализ на каждом PR. Сторонний аудит — раз в квартал.", en: "Static analysis on every PR. External audit quarterly." }, color: "#3fb950" },
  { title: "Secret scanning",       status: "Enabled",     file: "—",                       desc: { ru: "Авто-блокировка коммитов с утечкой API-ключей и токенов.", en: "Auto-block commits with leaked API keys and tokens." }, color: "#3fb950" },
];

const certifications = [
  { name: "PCI DSS L1",     status: { ru: "Сертифицировано", en: "Certified" },   year: "Q4 2026",        icon: "💳" },
  { name: "ISO 27001",      status: { ru: "Сертифицировано", en: "Certified" },   year: "Q4 2026",        icon: "🛡️" },
  { name: "GDPR",           status: { ru: "Compliant",        en: "Compliant" },   year: "с 2026",         icon: "🇪🇺" },
  { name: "152-ФЗ",         status: { ru: "Compliant",        en: "Compliant" },   year: "с 2026",         icon: "📜" },
  { name: "SOC 2 Type II",  status: { ru: "В процессе",       en: "In progress" }, year: "Q2 2027",        icon: "📋" },
  { name: "Bug Bounty",     status: { ru: "Активна",          en: "Active" },      year: "круглый год",    icon: "🐛" },
];

export function SecurityView() {
  const { lang } = useLang();

  const certified = certifications.filter((c) => c.status.en === "Certified" || c.status.en === "Active" || c.status.en === "Compliant").length;

  return (
    <section className="space-y-6">
      {/* HERO */}
      <ViewHero
        icon="🛡️"
        kicker={{ ru: "Security", en: "Security" }}
        kickerColor="#3fb950"
        gradientFrom="#3fb950"
        gradientTo="#58a6ff"
        title={{
          ru: "Безопасность — наш стандарт по умолчанию",
          en: "Security is our default standard",
        }}
        subtitle={{
          ru: "PCI DSS L1, ISO 27001, GDPR, 152-ФЗ. Данные клиентов под защитой, платежи под аудитом, код проходит сканирование на каждом PR.",
          en: "PCI DSS L1, ISO 27001, GDPR, FZ-152. Client data protected, payments audited, code scanned on every PR.",
        }}
        audiences={["clients", "investors", "partners"]}
        stats={[
          { value: certified.toString(),       label: { ru: "Сертификаций",      en: "Certifications" }, color: "#3fb950" },
          { value: "99.9%",                    label: { ru: "Uptime SLA",         en: "Uptime SLA" },     color: "#58a6ff" },
          { value: "24 ч",                     label: { ru: "Критический патч",  en: "Critical patch" }, color: "#d29922" },
          { value: "100%",                     label: { ru: "Code coverage scan", en: "Code coverage" }, color: "#a371f7" },
        ]}
      />

      {/* CLIENT OVERVIEW — большие сертификации */}
      <section className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3fb95011] via-transparent to-[#58a6ff11]" />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">🏅</span>
            <h2 className="text-lg font-semibold text-[#e6edf3]">
              {lang === "ru" ? "Сертификации и compliance" : "Certifications and compliance"}
            </h2>
          </div>
          <p className="mb-4 text-sm text-[#8b949e]">
            {lang === "ru"
              ? "Внешние аудиторы регулярно проверяют наши системы. Корпоративные клиенты получают полный пакет документов."
              : "External auditors regularly verify our systems. Corporate clients receive a full document package."}
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => {
              const isActive = c.status.en === "Certified" || c.status.en === "Active" || c.status.en === "Compliant";
              const color = isActive ? "#3fb950" : "#d29922";
              return (
                <article
                  key={c.name}
                  className="rounded-md border bg-[#161b22] p-4 transition hover:border-[#58a6ff66]"
                  style={{ borderColor: color + "44" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{c.icon}</div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-[#e6edf3]">{c.name}</div>
                      <div className="text-xs" style={{ color }}>
                        {c.status[lang]}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-[#8b949e]">{c.year}</div>
                </article>
              );
            })}
          </div>

          {/* Disclosure CTA */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-[#30363d] bg-[#161b22] p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔐</span>
              <div>
                <div className="text-sm font-semibold text-[#e6edf3]">
                  {lang === "ru" ? "Нашли уязвимость?" : "Found a vulnerability?"}
                </div>
                <div className="text-xs text-[#8b949e]">
                  {lang === "ru"
                    ? "Bug Bounty программа · SLA первого ответа 24 часа · награды по критичности"
                    : "Bug Bounty program · 24h first-response SLA · severity-based rewards"}
                </div>
              </div>
            </div>
            <a
              href={COMPANY_LINKS.email}
              className="rounded-md bg-gradient-to-r from-[#3fb950] to-[#58a6ff] px-4 py-2 text-sm font-semibold text-white shadow-lg"
            >
              ✉️ {COMPANY_LINKS.emailRaw}
            </a>
          </div>
        </div>
      </section>

      {/* DEVELOPER DETAIL — security policies */}
      <CollapseSection
        icon="⚙️"
        iconBg="#3fb95033"
        badge="For developers"
        badgeColor="#3fb950"
        title={{
          ru: "Security policies и тех-детали",
          en: "Security policies and tech details",
        }}
        subtitle={{
          ru: "Технические настройки: code scanning, secret scanning, Dependabot, политики раскрытия.",
          en: "Technical settings: code scanning, secret scanning, Dependabot, disclosure policies.",
        }}
        preview={
          <CollapsePreview
            items={[
              { value: policies.length.toString(), label: "policies", color: "#3fb950" },
              { value: "0",                        label: "alerts",  color: "#3fb950" },
            ]}
          />
        }
      >
        <div className="overflow-hidden rounded-md border border-[#30363d]">
          <div className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
            <h3 className="text-sm font-semibold text-[#e6edf3]">Security overview</h3>
          </div>
          <ul className="divide-y divide-[#21262d]">
            {policies.map((p) => (
              <li key={p.title} className="flex items-start gap-4 px-4 py-3 hover:bg-[#1f6feb0d]">
                <span
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-[#e6edf3]">{p.title}</span>
                    <span
                      className="rounded-full border px-2 py-0.5 text-[10px] font-medium"
                      style={{ borderColor: p.color + "66", background: p.color + "1a", color: p.color }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#8b949e]">{p.desc[lang]}</p>
                </div>
                <span className="hidden font-mono text-xs text-[#8b949e] sm:block">{p.file}</span>
              </li>
            ))}
          </ul>
        </div>
      </CollapseSection>
    </section>
  );
}
