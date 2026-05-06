import styles from "./SignalPill.module.css";

function SignalPill({ children }) {
  return <span className={styles.signalPill}>{children}</span>;
}

export default SignalPill;
