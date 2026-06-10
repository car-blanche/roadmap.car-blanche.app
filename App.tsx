import { GHHeader } from "./components/gh/GHHeader";
import { RepoHeader } from "./components/gh/RepoHeader";
import { GHFooter } from "./components/gh/Footer";
import { ViewProvider, useView, ThemeProvider, isRepoView } from "./context/ViewContext";
import { LangProvider } from "./context/LangContext";
import { SettingsProvider } from "./context/SettingsContext";
import { ToastProvider } from "./context/ToastContext";

import { SettingsDrawer } from "./components/gh/SettingsDrawer";
import { ShortcutsDialog } from "./components/gh/ShortcutsDialog";
import { PageHeader } from "./components/gh/PageHeader";
import { MobileBottomBar } from "./components/gh/MobileBottomBar";
import { OrgNav } from "./components/gh/OrgNav";

import { CodeView } from "./components/views/CodeView";
import { IssuesView } from "./components/views/IssuesView";
import { PullsView } from "./components/views/PullsView";
import { DiscussionsView } from "./components/views/DiscussionsView";
import { ActionsView } from "./components/views/ActionsView";
import { ProjectsView } from "./components/views/ProjectsView";
import { WikiView } from "./components/views/WikiView";
import { SecurityView } from "./components/views/SecurityView";
import { InsightsView } from "./components/views/InsightsView";
import { MarketplaceView } from "./components/views/MarketplaceView";
import { ExploreView } from "./components/views/ExploreView";
import { TeamView } from "./components/views/TeamView";
import { ResourcesView } from "./components/views/ResourcesView";
import { RepositoriesView } from "./components/views/RepositoriesView";
import { NotificationsView } from "./components/views/NotificationsView";

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <SettingsProvider>
          <ToastProvider>
            <ViewProvider>
              <Shell />
              <SettingsDrawer />
              <ShortcutsDialog />
            </ViewProvider>
          </ToastProvider>
        </SettingsProvider>
      </LangProvider>
    </ThemeProvider>
  );
}

function Shell() {
  const { view } = useView();
  const inRepo = isRepoView(view);

  // PageHeader показываем только когда нужен (на org-страницах)
  // На репо-страницах он не нужен — у них есть свой RepoHeader с табами.
  // PageHeader показываем на org-страницах кроме:
  //   - explore — там свой большой Hero
  //   - code    — там HeroSection (главная)
  const showPageHeader = !inRepo && view !== "explore" && view !== "code";

  return (
    <div className="min-h-screen bg-[#0d1117] pb-16 text-[#e6edf3] antialiased md:pb-0">
      <GHHeader />

      {/* ╔══════════════════════════════════════════════════════════╗
          ║  ORG-контекст (Обзор, Команда, Маркетплейс и т.д.)        ║
          ║  → показываем только OrgNav, без RepoHeader                ║
          ║                                                            ║
          ║  REPO-контекст (Code, Issues, Wiki, PRs, и т.д.)          ║
          ║  → показываем только RepoHeader (с табами + breadcrumb)    ║
          ╚══════════════════════════════════════════════════════════╝ */}
      {inRepo ? <RepoHeader /> : <OrgNav />}

      <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
        {showPageHeader && <PageHeader />}
        {view === "code"          && <CodeView />}
        {view === "issues"        && <IssuesView />}
        {view === "pulls"         && <PullsView />}
        {view === "discussions"   && <DiscussionsView />}
        {view === "actions"       && <ActionsView />}
        {view === "projects"      && <ProjectsView />}
        {view === "wiki"          && <WikiView />}
        {view === "security"      && <SecurityView />}
        {view === "insights"      && <InsightsView />}
        {view === "team"          && <TeamView />}
        {view === "resources"     && <ResourcesView />}
        {view === "repositories"  && <RepositoriesView />}
        {view === "marketplace"   && <MarketplaceView />}
        {view === "explore"       && <ExploreView />}
        {view === "notifications" && <NotificationsView />}
      </main>

      <GHFooter />
      <MobileBottomBar />
    </div>
  );
}
