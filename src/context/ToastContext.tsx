import { createContext, useContext, useState, type ReactNode } from "react";

export type Toast = {
  id: number;
  title: string;
  desc?: string;
  kind?: "success" | "info" | "warning" | "error";
  icon?: string;
};

type Ctx = {
  toasts: Toast[];
  showToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
};

const ToastCtx = createContext<Ctx | null>(null);
let counter = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (t: Omit<Toast, "id">) => {
    const id = counter++;
    setToasts((prev) => [...prev, { id, kind: "info", ...t }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 4000);
  };

  const dismissToast = (id: number) =>
    setToasts((prev) => prev.filter((x) => x.id !== id));

  return (
    <ToastCtx.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastViewport />
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const c = useContext(ToastCtx);
  if (!c) throw new Error("useToast must be used within ToastProvider");
  return c;
}

const tone = {
  success: { bd: "#3fb95066", bg: "#3fb95022", fg: "#3fb950" },
  info:    { bd: "#58a6ff66", bg: "#58a6ff22", fg: "#58a6ff" },
  warning: { bd: "#d2992266", bg: "#d2992222", fg: "#d29922" },
  error:   { bd: "#f8514966", bg: "#f8514922", fg: "#f85149" },
};

function ToastViewport() {
  const c = useContext(ToastCtx);
  if (!c) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[200] flex w-80 max-w-[90vw] flex-col gap-2">
      {c.toasts.map((t) => {
        const k = tone[t.kind || "info"];
        return (
          <div
            key={t.id}
            className="pointer-events-auto overflow-hidden rounded-md border bg-[#161b22] p-3 shadow-2xl"
            style={{ borderColor: k.bd, animation: "slideIn 0.18s ease-out" }}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-base"
                style={{ background: k.bg, color: k.fg }}
              >
                {t.icon || "🔔"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-[#e6edf3]">{t.title}</div>
                {t.desc && <div className="mt-0.5 text-xs text-[#8b949e]">{t.desc}</div>}
              </div>
              <button
                onClick={() => c.dismissToast(t.id)}
                className="text-[#8b949e] hover:text-[#e6edf3]"
                aria-label="Dismiss"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                  <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
