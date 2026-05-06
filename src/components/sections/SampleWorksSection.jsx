import IconMark from "../../../Icono.png";
import SectionIntro from "../common/SectionIntro";
import styles from "./SampleWorksSection.module.css";

function SampleWorksSection({ sampleWorks, activeWork, onSelectWork }) {
  return (
    <section className={styles.section} id="lab">
      <SectionIntro
        eyebrow="Muestras Kinet"
        title="Este modulo no es una galeria. Es un escenario para subir piezas que se activan."
        description="Aqui puedes cargar renders, loops, capturas o mini demos reales. La estructura ya esta lista para mostrar un caso con ritmo, contexto y una presencia menos convencional."
      />

      <div className={styles.topRail}>
        {sampleWorks.map((work) => {
          const isActive = work.id === activeWork.id;

          return (
            <button
              key={work.id}
              className={isActive ? styles.railButtonActive : styles.railButton}
              onClick={() => onSelectWork(work.id)}
              type="button"
              data-cursor="click"
            >
              <span>{work.code}</span>
              <strong>{work.title}</strong>
            </button>
          );
        })}
      </div>

      <div className={styles.labShell}>
        <article className={styles.previewShell}>
          <div className={styles.previewTopline}>
            <span>{activeWork.category}</span>
            <span>Espacio para demo, teaser o caso</span>
          </div>

          <div className={styles.previewStage} data-cursor="click">
            <div className={styles.previewNoise} aria-hidden="true" />
            <div className={styles.previewBeam} aria-hidden="true" />
            <div className={styles.previewIconWrap}>
              <img src={IconMark} alt="" aria-hidden="true" />
            </div>
            <div className={styles.previewContent} key={activeWork.id}>
              <p>{activeWork.code}</p>
              <h3>{activeWork.placeholderTitle}</h3>
              <span>{activeWork.placeholderText}</span>
            </div>
            <div className={styles.surfaceBand}>
              {activeWork.surfaces.map((surface) => (
                <i key={surface}>{surface}</i>
              ))}
            </div>
          </div>
        </article>

        <aside className={styles.dossierShell}>
          <div className={styles.dossierIntro}>
            <p>Pieza activa</p>
            <h3>{activeWork.title}</h3>
            <span>{activeWork.summary}</span>
          </div>

          <div className={styles.dossierGrid}>
            <article className={styles.dossierCard}>
              <small>Interacciones</small>
              <ul>
                {activeWork.interactions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className={styles.dossierCard}>
              <small>Nota de uso</small>
              <p>{activeWork.note}</p>
            </article>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default SampleWorksSection;
