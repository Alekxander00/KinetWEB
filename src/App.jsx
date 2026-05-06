import { useMemo, useState } from "react";
import AudioToggle from "./components/effects/AudioToggle";
import InteractiveBackdrop from "./components/effects/InteractiveBackdrop";
import InteractiveCursor from "./components/effects/InteractiveCursor";
import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";
import ContactSection from "./components/sections/ContactSection";
import HeroSection from "./components/sections/HeroSection";
import SampleWorksSection from "./components/sections/SampleWorksSection";
import StoryEngineSection from "./components/sections/StoryEngineSection";
import { sampleWorks, storyChapters } from "./data/siteContent";
import { usePointerAura } from "./hooks/usePointerAura";
import { useScrollProgress } from "./hooks/useScrollProgress";
import styles from "./styles/App.module.css";

function App() {
  usePointerAura();
  const scrollProgress = useScrollProgress();
  const [activeWorkId, setActiveWorkId] = useState(sampleWorks[0].id);
  const activeWork = useMemo(
    () => sampleWorks.find((item) => item.id === activeWorkId) ?? sampleWorks[0],
    [activeWorkId]
  );

  return (
    <div className={styles.appShell}>
      <InteractiveBackdrop />
      <InteractiveCursor />
      <AudioToggle />
      <div className={styles.noiseLayer} aria-hidden="true" />
      <div className={styles.gridLayer} aria-hidden="true" />
      <div className={styles.shardLayer} aria-hidden="true" />
      <SiteHeader scrollProgress={scrollProgress} />
      <main className={styles.mainContent}>
        <HeroSection />
        <StoryEngineSection chapters={storyChapters} />
        <SampleWorksSection
          activeWork={activeWork}
          onSelectWork={setActiveWorkId}
          sampleWorks={sampleWorks}
        />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
