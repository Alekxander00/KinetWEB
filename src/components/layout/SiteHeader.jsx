import IconMark from "../../../Icono.png";
import Wordmark from "../../../NombreLogo.png";
import { navItems } from "../../data/siteContent";
import styles from "./SiteHeader.module.css";

function SiteHeader({ scrollProgress }) {
  return (
    <header className={styles.header}>
      <div className={styles.progressTrack} aria-hidden="true">
        <span
          className={styles.progressBar}
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label="Ir al inicio de Kinet" data-cursor="inicio">
          <img className={styles.brandIcon} src={IconMark} alt="" aria-hidden="true" />
          <img className={styles.brandWordmark} src={Wordmark} alt="Kinet" />
        </a>
        <nav className={styles.nav} aria-label="Navegacion principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} data-cursor="ir">
              {item.label}
            </a>
          ))}
        </nav>
        <a className={styles.cta} href="#contacto" data-cursor="hablar">
          Cuentanos tu proyecto
        </a>
      </div>
    </header>
  );
}

export default SiteHeader;
