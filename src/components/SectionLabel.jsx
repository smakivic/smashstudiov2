import styles from "./styles/SectionLabel.module.css";

export default function SectionLabel({ children, center = false }) {
  return (
    <p className={`${styles.label} ${center ? styles.center : ""}`}>
      {children}
    </p>
  );
}
