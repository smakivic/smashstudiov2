import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/Testimonials.module.css";

export default function Testimonials() {
  const { tr } = useTranslation();

  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <SectionLabel>{tr.testimonials.label}</SectionLabel>
        </Reveal>
        <Reveal delay={100}>
          <h2 className={styles.title}>
            {tr.testimonials.title1}
            <br />
            {tr.testimonials.title2}
          </h2>
        </Reveal>
        <div className={styles.grid}>
          {tr.testimonials.items.map(({ id, text, name, avatar }, i) => (
            <Reveal key={id} delay={i * 100 + 150}>
              <article className={styles.card}>
                <div className={styles.quoteMark} aria-hidden="true">
                  "
                </div>
                <p className={styles.text}>{text}</p>
                <div className={styles.author}>
                  <img
                    src={avatar}
                    alt={name}
                    className={styles.avatar}
                    loading="lazy"
                  />
                  <div>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.stars} aria-label="5 stars">
                      ★★★★★
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
