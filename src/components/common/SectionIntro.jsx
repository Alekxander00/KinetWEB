import styles from "./SectionIntro.module.css";

function SectionIntro({ eyebrow, title, description }) {
  return (
    <header className={styles.intro}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </header>
  );
}

export default SectionIntro;
