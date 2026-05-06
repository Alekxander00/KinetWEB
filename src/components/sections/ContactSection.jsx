import { closingSignals } from "../../data/siteContent";
import SectionIntro from "../common/SectionIntro";
import styles from "./ContactSection.module.css";

function ContactSection() {
  return (
    <section className={styles.section} id="contacto">
      <SectionIntro
        eyebrow="Hablemos"
        title="Si tu marca necesita una pieza que la gente quiera tocar, Kinet puede construirla."
        description="Trae el producto, la historia o el proyecto. Kinet lo traduce a una experiencia pensada para explicar mejor, sostener la atencion y dejar una muestra real."
      />

      <div className={styles.consoleShell}>
        <article className={styles.consoleMain}>
          <div className={styles.consoleTopline}>
            <span>Canal abierto</span>
            <span>Estado: disponible</span>
          </div>
          <h3>No hacemos pantallas para rellenar un stand. Hacemos piezas que ayudan a mostrar, contar y vender con mas claridad.</h3>
          <div className={styles.signalGrid}>
            {closingSignals.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article className={styles.consoleSide}>
          <div className={styles.contactCard}>
            <small>Correo</small>
            <a href="mailto:hola@kinet.studio?subject=Quiero%20una%20pieza%20interactiva%20para%20mi%20marca" data-cursor="escribir">
              hola@kinet.studio
            </a>
          </div>

          <div className={styles.contactCard}>
            <small>Llamada</small>
            <a href="tel:+573001112233" data-cursor="llamar">+57 300 111 2233</a>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ContactSection;
