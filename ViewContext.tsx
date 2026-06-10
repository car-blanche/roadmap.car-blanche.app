import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ViewKey =
  | "code"
  | "issues"
  | "pulls"
  | "discussions"
  | "actions"
  | "projects"
  | "wiki"
  | "security"
  | "insights"
  | "marketplace"
  | "explore"
  | "team"
  | "resources"
  | "repositories"
  | "notifications";

/* Репо-контекст (внутри mobile-tech-transport-personalization) —
   только то, что нужно разработчику для работы с кодом */
export const REPO_VIEWS: ViewKey[] = [
  "issues", "pulls", "discussions", "actions", "security", "insights",
];

export function isRepoView(view: ViewKey): boolean {
  return REPO_VIEWS.includes(view);
}

type Ctx = {
  view: ViewKey;
  setView: (v: ViewKey) => void;
};

const ViewCtx = createContext<Ctx | null>(null);

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setViewRaw] = useState<ViewKey>("code");
  const setView = (v: ViewKey) => {
    setViewRaw(v);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return <ViewCtx.Provider value={{ view, setView }}>{children}</ViewCtx.Provider>;
}

export function useView() {
  const c = useContext(ViewCtx);
  if (!c) throw new Error("useView must be used within ViewProvider");
  return c;
}

/* =================== THEME =================== */

export type Theme = "dark" | "dim" | "light";

type ThemeCtx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeCtxObj = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("cb-theme") as Theme | null;
    return saved || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("cb-theme", theme);
  }, [theme]);

  return (
    <ThemeCtxObj.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeCtxObj.Provider>
  );
}

export function useTheme() {
  const c = useContext(ThemeCtxObj);
  if (!c) throw new Error("useTheme must be used within ThemeProvider");
  return c;
}

/* =================== LINKS =================== */

export const COMPANY_LINKS = {
  net: "http://car-blanche.net/",
  app: "https://car-blanche.app/",
  github: "https://github.com/car-blanche",
  showroom3d: "https://car-blanche-3d-showroom-experience.car-blanche.app/",
  article2026: "https://mobile-tech-transport-personalization.car-blanche.app/",
  businessNews: "http://car-blanche.net/businessnews",
  // Магазины приложений — реальные ссылки на App Store и Google Play
  appStore:  "https://apps.apple.com/ru/app/car-blanche/id6737855245",
  playStore: "https://play.google.com/store/apps/details?id=app.carblanche.car_blanche_taxi_app",
  // Конкретные репозитории / профили
  githubRepo: "https://github.com/car-blanche",
  githubIssues: "https://github.com/car-blanche",
  githubPulls: "https://github.com/car-blanche",
  email: "mailto:b2b.car.blanche@gmail.com",
  emailRaw: "b2b.car.blanche@gmail.com",
};

// Все ссылки на контрибьюторов ведут на официальную организацию car-blanche.
// (Личные GitHub-профили заменены на единую org-ссылку по запросу команды.)
export function githubUser(_username?: string) {
  return "https://github.com/car-blanche";
}
