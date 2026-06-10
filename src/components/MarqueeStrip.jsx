import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/MarqueeStrip.module.css";

export default function MarqueeStrip() {
  const { tr } = useTranslation();
  const items = [...tr.marquee, ...tr.marquee, ...tr.marquee, ...tr.marquee];

  return (
    <div className={styles.strip} aria-hidden="true">
      <div className={styles.track}>
        {items.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.dot}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
