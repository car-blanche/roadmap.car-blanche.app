import { useView, COMPANY_LINKS } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";

export function ShowcaseCard() {
  const { setView } = useView();
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden rounded-xl border border-[#a371f766] bg-[#0d1117] p-5 sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#a371f722] via-transparent to-[#db61a222]" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#a371f7] opacity-20 blur-3xl" />

      <div className="relative grid items-center gap-4 lg:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a371f7] to-[#db61a2] px-3 py-1 text-xs font-semibold text-white">
            ⭐ {t("showcase.kicker")}
          </div>
          <h3 className="text-xl font-semibold text-[#e6edf3] sm:text-2xl">
            🎨 {t("showcase.title")}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-[#c9d1d9]">{t("showcase.desc")}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={COMPANY_LINKS.showroom3d}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#a371f7] to-[#db61a2] px-4 py-2 text-sm font-semibold text-white shadow-lg hover:opacity-90"
          >
            {t("showcase.open")}
          </a>
          <button
            onClick={() => setView("resources")}
            className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm font-semibold text-[#e6edf3] hover:bg-[#30363d]"
          >
            {t("nav.resources")} →
          </button>
        </div>
      </div>
    </section>
  );
}
