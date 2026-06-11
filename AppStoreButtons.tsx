import { COMPANY_LINKS } from "../../context/ViewContext";
import { useLang } from "../../context/LangContext";

type Props = {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "compact" | "minimal";
  className?: string;
};

/* =========================================================
   Универсальный компонент: 🍎 App Store + 🤖 Google Play
   Реальные ссылки:
   - https://apps.apple.com/ru/app/car-blanche/id6737855245
   - https://play.google.com/store/apps/details?id=app.carblanche.car_blanche_taxi_app
   ========================================================= */

export function AppStoreButtons({ size = "md", variant = "default", className = "" }: Props) {
  const { lang } = useLang();

  const sizeCls =
    size === "sm" ? "px-2.5 py-1 text-xs"
    : size === "lg" ? "px-5 py-3 text-base"
    : "px-4 py-2 text-sm";

  if (variant === "minimal") {
    // Только иконки — для компактных мест
    return (
      <div className={`flex flex-wrap gap-1.5 ${className}`}>
        <a
          href={COMPANY_LINKS.appStore}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#30363d] bg-[#21262d] text-[#e6edf3] transition hover:bg-[#30363d]"
          title="Car Blanche · App Store"
          aria-label="App Store"
        >
          <AppleIcon className="h-4 w-4" />
        </a>
        <a
          href={COMPANY_LINKS.playStore}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#30363d] bg-[#21262d] text-[#e6edf3] transition hover:bg-[#30363d]"
          title="Car Blanche · Google Play"
          aria-label="Google Play"
        >
          <PlayIcon className="h-4 w-4" />
        </a>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap gap-1.5 ${className}`}>
        <a
          href={COMPANY_LINKS.appStore}
          target="_blank" rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] font-medium text-[#e6edf3] transition hover:bg-[#30363d] ${sizeCls}`}
        >
          <AppleIcon className="h-3.5 w-3.5" />
          App Store
        </a>
        <a
          href={COMPANY_LINKS.playStore}
          target="_blank" rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] font-medium text-[#e6edf3] transition hover:bg-[#30363d] ${sizeCls}`}
        >
          <PlayIcon className="h-3.5 w-3.5" />
          Google Play
        </a>
      </div>
    );
  }

  // Default — большие красивые badge-кнопки в стиле официальных
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <a
        href={COMPANY_LINKS.appStore}
        target="_blank" rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2.5 rounded-lg border border-[#e6edf3] bg-[#000] font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl ${sizeCls}`}
      >
        <AppleIcon className="h-5 w-5 shrink-0" />
        <div className="text-left leading-tight">
          <div className="text-[9px] font-normal uppercase tracking-wider opacity-80">
            {lang === "ru" ? "Скачать в" : "Download on the"}
          </div>
          <div className="text-sm font-semibold">App Store</div>
        </div>
      </a>

      <a
        href={COMPANY_LINKS.playStore}
        target="_blank" rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2.5 rounded-lg border border-[#e6edf3] bg-[#000] font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl ${sizeCls}`}
      >
        <PlayIcon className="h-5 w-5 shrink-0" />
        <div className="text-left leading-tight">
          <div className="text-[9px] font-normal uppercase tracking-wider opacity-80">
            {lang === "ru" ? "Доступно в" : "Get it on"}
          </div>
          <div className="text-sm font-semibold">Google Play</div>
        </div>
      </a>
    </div>
  );
}

/* =========================================================
   SVG иконки магазинов приложений
   ========================================================= */

export function AppleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export function PlayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="playGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C3FF" />
          <stop offset="100%" stopColor="#00A0E3" />
        </linearGradient>
        <linearGradient id="playGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE000" />
          <stop offset="100%" stopColor="#FFBD00" />
        </linearGradient>
        <linearGradient id="playGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF3A44" />
          <stop offset="100%" stopColor="#C31162" />
        </linearGradient>
        <linearGradient id="playGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D89E" />
          <stop offset="100%" stopColor="#00A876" />
        </linearGradient>
      </defs>
      <path d="M3.61 1.91c-.36.38-.57.97-.57 1.74v16.7c0 .77.21 1.36.57 1.74l.06.05L13 12.71v-.21L3.67 1.86l-.06.05z" fill="url(#playGrad1)" />
      <path d="M16.21 16.04L13 12.71v-.21L16.21 9.16l.07.04 3.79 2.16c1.08.62 1.08 1.62 0 2.24l-3.79 2.16-.07.05z" fill="url(#playGrad2)" />
      <path d="M16.28 16l-3.28-3.4L3.61 22.09c.36.38.95.43 1.62.05l11.05-6.14z" fill="url(#playGrad3)" />
      <path d="M16.28 8.6L5.23 1.86c-.67-.38-1.26-.33-1.62.05L13 12.71l3.28-3.4z" fill="url(#playGrad4)" />
    </svg>
  );
}
