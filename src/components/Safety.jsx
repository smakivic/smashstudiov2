import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/Safety.module.css";
import image from "../assets/safety-image.jpg";

export default function Safety() {
  const { tr } = useTranslation();

  return (
    <section className={styles.section} id="safety">
      <div className="container">
        <div className={styles.grid}>
          <Reveal direction="left">
            <div className={styles.visual}>
              <img
                src={image}
                alt={tr.safety.imgAlt}
                className={styles.img}
                loading="lazy"
              />
              <div className={styles.badge} aria-hidden="true">
                <span className={styles.badgeText}>
                  {tr.safety.badge.split("\n").map((line, i) => (
                    <span key={i} style={{ display: "block" }}>
                      {line}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <SectionLabel>{tr.safety.label}</SectionLabel>
            <h2 className={styles.heading}>{tr.safety.heading}</h2>
            <p className={styles.intro}>{tr.safety.intro}</p>
            <ul className={styles.list}>
              {tr.safety.items.map(({ icon, title, text }) => (
                <li key={title} className={styles.item}>
                  <div className={styles.icon} aria-hidden="true">
                    {icon}
                  </div>
                  <div>
                    <div className={styles.itemTitle}>{title}</div>
                    <p className={styles.itemText}>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
