import { useEffect, useMemo, useRef, useState } from "react";
import IconMark from "../../../Icono.png";
import Wordmark from "../../../NombreLogo.png";
import SectionIntro from "../common/SectionIntro";
import styles from "./StoryEngineSection.module.css";

function StoryEngineSection({ chapters }) {
  const [activeChapterId, setActiveChapterId] = useState(chapters[0]?.id);
  const chapterRefs = useRef([]);

  useEffect(() => {
    const observers = chapterRefs.current.map((node, index) => {
      if (!node) {
        return null;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveChapterId(chapters[index].id);
            }
          });
        },
        {
          rootMargin: "-35% 0px -35% 0px",
          threshold: 0.2
        }
      );

      observer.observe(node);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [chapters]);

  const activeChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === activeChapterId) ?? chapters[0],
    [activeChapterId, chapters]
  );

  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeChapter.id);

  return (
    <section className={styles.section} id="engine">
      <SectionIntro
        eyebrow="Recorrido Kinet"
        title="La experiencia no se arma como un brochure largo. Se dirige como una demostracion."
        description="Cada bloque tiene una tarea: atraer, explicar, dejar tocar y guiar la conversacion. Esa es la diferencia entre una pagina bonita y una pieza util para marca."
      />

      <div className={styles.shell}>
        <div className={styles.storyColumn}>
          {chapters.map((chapter, index) => {
            const isActive = chapter.id === activeChapter.id;

            return (
              <article
                key={chapter.id}
                ref={(node) => {
                  chapterRefs.current[index] = node;
                }}
                className={isActive ? styles.storyCardActive : styles.storyCard}
                data-cursor={isActive ? "ver" : "leer"}
              >
                <div className={styles.storyTopline}>
                  <span>{chapter.chapter}</span>
                  <small>{chapter.eyebrow}</small>
                </div>
                <h3>{chapter.title}</h3>
                <p>{chapter.description}</p>
                <ul>
                  {chapter.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className={styles.stageColumn}>
          <div className={styles.stageFrame}>
            <div className={styles.stageTopline}>
              <span>{activeChapter.stageCode}</span>
              <span>
                {String(activeIndex + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
              </span>
            </div>

            <div className={styles.stagePoster} data-mode={activeChapter.id} data-cursor="explora">
              <div className={styles.posterWordmark}>
                <img src={Wordmark} alt="" aria-hidden="true" />
              </div>
              <div className={styles.posterIcon}>
                <img src={IconMark} alt="" aria-hidden="true" />
              </div>
              <div className={styles.posterCopy} key={activeChapter.id}>
                <p>{activeChapter.stageLabel}</p>
                <h3>{activeChapter.stageLead}</h3>
              </div>
              <div className={styles.signalBars} aria-hidden="true">
                {activeChapter.matrix.map((item) => (
                  <span key={item.label}>
                    <i />
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.stageMatrix}>
              {activeChapter.matrix.map((item) => (
                <article key={item.label} className={styles.matrixCard}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>

            <div className={styles.stageProgress} aria-hidden="true">
              {chapters.map((chapter) => (
                <span
                  key={chapter.id}
                  className={chapter.id === activeChapter.id ? styles.progressDotActive : styles.progressDot}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoryEngineSection;
