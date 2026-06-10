import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Density = "comfortable" | "compact";

type Ctx = {
  density: Density;
  setDensity: (d: Density) => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  shortcutsOpen: boolean;
  openShortcuts: () => void;
  closeShortcuts: () => void;
  resetWelcome: () => void;
};

const Ctx = createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [density, setDensityState] = useState<Density>(() => {
    if (typeof window === "undefined") return "comfortable";
    return (localStorage.getItem("cb-density") as Density) || "comfortable";
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-density", density);
    localStorage.setItem("cb-density", density);
  }, [density]);

  const setDensity = (d: Density) => setDensityState(d);

  const resetWelcome = () => {
    localStorage.removeItem("cb-welcome-hidden");
    location.reload();
  };

  return (
    <Ctx.Provider
      value={{
        density,
        setDensity,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        shortcutsOpen,
        openShortcuts: () => setShortcutsOpen(true),
        closeShortcuts: () => setShortcutsOpen(false),
        resetWelcome,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useSettings() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSettings must be used within SettingsProvider");
  return c;
}
