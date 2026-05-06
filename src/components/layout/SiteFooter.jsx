import styles from "./SiteFooter.module.css";

function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p>Kinet. Sistemas interactivos para marcas que no quieren verse quietas.</p>
      <a href="#top">Volver arriba</a>
    </footer>
  );
}

export default SiteFooter;
