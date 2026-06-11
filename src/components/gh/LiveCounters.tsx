import { useEffect, useRef, useState } from "react";
import { liveCounters } from "../../data/fleet";
import { useLang } from "../../context/LangContext";

export function LiveCounters() {
  const { lang, t } = useLang();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Trigger anim when scrolled into view
  useEffect(() => {
    if (!ref.current || visible) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [visible]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] p-5 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3fb9501f] via-transparent to-[#58a6ff1f]" />

      <div className="relative">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-[#e6edf3]">
            <span>📊</span> {t("counters.title")}
          </h3>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#3fb950]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fb950] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3fb950]" />
            </span>
            {t("counters.live")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {liveCounters.map((c) => (
            <Counter
              key={c.label.en}
              target={c.value}
              suffix={c.suffix}
              label={c.label[lang]}
              color={c.color}
              start={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({
  target,
  suffix,
  label,
  color,
  start,
}: {
  target: number;
  suffix: string;
  label: string;
  color: string;
  start: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1500;
    const startTs = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTs) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setVal(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  const formatted =
    target >= 10000
      ? val.toLocaleString("ru-RU")
      : val.toString();

  return (
    <div className="rounded-md border border-[#30363d] bg-[#161b22] px-3 py-3">
      <div className="font-mono text-xl font-bold sm:text-2xl" style={{ color }}>
        {formatted}{suffix}
      </div>
      <div className="mt-0.5 text-[10px] leading-3 text-[#8b949e] sm:text-[11px]">{label}</div>
    </div>
  );
}
