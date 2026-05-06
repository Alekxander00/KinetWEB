import { useState } from "react";
import IconMark from "../../../Icono.png";
import Wordmark from "../../../NombreLogo.png";
import { heroMetrics, heroRoutes, heroSignals } from "../../data/siteContent";
import SignalPill from "../common/SignalPill";
import styles from "./HeroSection.module.css";

function HeroSection() {
  const [activeRouteId, setActiveRouteId] = useState(heroRoutes[0].id);
  const activeRoute = heroRoutes.find((route) => route.id === activeRouteId) ?? heroRoutes[0];

  return (
    <section className={styles.hero} id="top">
      <div className={styles.heroShell}>
        <div className={styles.heroCopy}>
          <SignalPill>Interaccion para ferias, producto y espacios</SignalPill>
          <p className={styles.kicker}>Comunicacion Interactiva & Branding Generativo</p>
          <h1 className={styles.title}>
            Una pieza de Kinet deberia sentirse mas instalacion que landing.
          </h1>
          <p className={styles.description}>
            Kinet disena micrositios para feria, catalogos interactivos y
            experiencias tactiles para marcas que necesitan mostrar mejor lo
            que venden y dejar una impresion real.
          </p>

          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#engine" data-cursor="entrar">
              Ver recorrido
            </a>
            <a className={styles.secondaryAction} href="#lab" data-cursor="ver">
              Abrir muestras
            </a>
          </div>

          <div className={styles.routePanel}>
            <p className={styles.routeLabel}>Elige un escenario</p>
            <div className={styles.routeButtons}>
              {heroRoutes.map((route) => {
                const isActive = route.id === activeRoute.id;

                return (
                  <button
                    key={route.id}
                    type="button"
                    className={isActive ? styles.routeButtonActive : styles.routeButton}
                    onClick={() => setActiveRouteId(route.id)}
                    data-cursor="ver"
                  >
                    {route.label}
                  </button>
                );
              })}
            </div>
            <div className={styles.routeSummary}>
              <strong>{activeRoute.output}</strong>
              <span>{activeRoute.outcome}</span>
            </div>
          </div>
        </div>

        <div className={styles.heroStage} data-mode={activeRoute.id}>
          <div className={styles.stageTopline}>
            <span>Sistema Kinet</span>
            <span>Selecciona un escenario</span>
          </div>

          <div className={styles.stagePoster} data-cursor="explora">
            <div className={styles.stageGrid} aria-hidden="true" />
            <div className={styles.scanBeam} aria-hidden="true" />
            <div className={styles.iconLayer}>
              <img src={IconMark} alt="" aria-hidden="true" />
            </div>
            <div className={styles.wordmarkLayer}>
              <img src={Wordmark} alt="Kinet" />
            </div>
            <div className={styles.routeCard} key={activeRoute.id}>
              <small>{activeRoute.output}</small>
              <h2>{activeRoute.title}</h2>
              <p>{activeRoute.description}</p>
              <div className={styles.routeTags}>
                {activeRoute.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className={styles.signalRow}>
              {heroSignals.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className={styles.metricGrid}>
            {heroMetrics.map((metric) => (
              <article key={metric.label} className={styles.metricCard}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
