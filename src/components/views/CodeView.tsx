import { Readme } from "../gh/Readme";
import { Sidebar } from "../gh/Sidebar";
import { TechStack } from "../gh/TechStack";
import { PinnedSection } from "../gh/PinnedSection";
import { WelcomeBanner } from "../gh/WelcomeBanner";
import { ShowcaseCard } from "../gh/ShowcaseCard";
import { ScenariosShowcase } from "../gh/ScenariosShowcase";
import { ExpansionMap } from "../gh/ExpansionMap";
import { RoadmapProgressTracker } from "../gh/RoadmapProgressTracker";
import { FleetShowcase } from "../gh/FleetShowcase";
import { LiveCounters } from "../gh/LiveCounters";
import { HeroSection } from "../gh/HeroSection";
import { DeveloperSection } from "../gh/DeveloperSection";
import { CollapseSection, CollapsePreview } from "../gh/CollapseSection";

export function CodeView() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_296px]">
      <div className="space-y-6 min-w-0">

        {/* ╔══════════════════════════════════════════════════╗
            ║  🔥 ВСЕГДА ОТКРЫТО — главные WOW-блоки          ║
            ╚══════════════════════════════════════════════════╝ */}

        {/* 1. Hero — главный экран */}
        <HeroSection />

        {/* 2. Живые цифры */}
        <LiveCounters />

        {/* 3. 🚗 Парк автомобилей — главное предложение */}
        <FleetShowcase />

        {/* 4. 🎯 Сценарии — конкретные клиентские кейсы */}
        <ScenariosShowcase />

        {/* 5. 🎨 3D Showroom — визуальная фишка */}
        <ShowcaseCard />

        {/* ╔══════════════════════════════════════════════════╗
            ║  ▾ КОЛЛАПСЫ — план развития и документация      ║
            ╚══════════════════════════════════════════════════╝ */}

        {/* 🚀 Прогресс и план развития */}
        <CollapseSection
          icon="🚀"
          iconBg="#3fb95033"
          badge="Roadmap"
          badgeColor="#3fb950"
          title={{ ru: "Прогресс до 2029",  en: "Progress to 2029" }}
          subtitle={{
            ru: "От Уфы — к 21 городу за 3 года. Поэтапный план запуска.",
            en: "From Ufa to 21 cities in 3 years. Phased launch plan.",
          }}
          preview={
            <CollapsePreview
              items={[
                { value: "1 / 21", label: "сейчас", color: "#3fb950" },
                { value: "5%",     label: "прогресс", color: "#58a6ff" },
              ]}
            />
          }
        >
          <RoadmapProgressTracker />
        </CollapseSection>

        {/* 🌍 Штаб-квартира и города */}
        <CollapseSection
          icon="🌍"
          iconBg="#3fb95033"
          badge="Geography"
          badgeColor="#3fb950"
          title={{ ru: "Штаб-квартира и города",  en: "Headquarters & cities" }}
          subtitle={{
            ru: "Уфа — наш дом с 2018. План расширения на 20+ городов к 2029 году.",
            en: "Ufa — our home since 2018. Expansion plan to 20+ cities by 2029.",
          }}
          preview={
            <CollapsePreview
              items={[
                { value: "21",  label: "город",  color: "#a371f7" },
                { value: "9",   label: "стран",  color: "#f0883e" },
              ]}
            />
          }
        >
          <ExpansionMap />
        </CollapseSection>

        {/* 🗺️ Документ-дорожная карта */}
        <CollapseSection
          icon="🗺️"
          iconBg="#a371f733"
          badge="About company"
          badgeColor="#a371f7"
          title={{ ru: "Car Blanche · Roadmap 2026 → 2029",  en: "Car Blanche · Roadmap 2026 → 2029" }}
          subtitle={{
            ru: "Документ-дорожная карта: README, закреплённые материалы, приветствие команды.",
            en: "Roadmap document: README, pinned items, team welcome.",
          }}
          preview={
            <CollapsePreview
              items={[{ value: "6", label: "pinned", color: "#a371f7" }]}
            />
          }
        >
          <PinnedSection />
          <WelcomeBanner />
          <Readme />
        </CollapseSection>

        {/* ⚙️ Стек технологий */}
        <CollapseSection
          icon="⚙️"
          iconBg="#58a6ff33"
          badge="Tech"
          badgeColor="#58a6ff"
          title={{ ru: "Стек технологий",  en: "Tech Stack" }}
          subtitle={{
            ru: "PHP / Yii2 · Dart / Flutter · MySQL / Redis · Swift / Kotlin.",
            en: "PHP / Yii2 · Dart / Flutter · MySQL / Redis · Swift / Kotlin.",
          }}
          preview={
            <CollapsePreview
              items={[{ value: "4", label: "стека", color: "#58a6ff" }]}
            />
          }
        >
          <TechStack />
        </CollapseSection>

        {/* ⚙️ Для разработчиков */}
        <DeveloperSection />
      </div>
      <Sidebar />
    </div>
  );
}
