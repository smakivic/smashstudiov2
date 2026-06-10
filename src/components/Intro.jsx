import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/Intro.module.css";

export default function Intro() {
  const { tr } = useTranslation();

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <Reveal direction="left">
            <SectionLabel>{tr.intro.label}</SectionLabel>
            <h2 className={styles.headline}>
              {tr.intro.headline1}
              <br />
              {tr.intro.headline2}
              <br />
              <span className={styles.accent}>{tr.intro.headline3}</span>
            </h2>
            <div className={styles.statRow}>
              {tr.intro.stats.map(({ number, label }) => (
                <div key={label} className={styles.stat}>
                  <div className={styles.statNumber}>{number}</div>
                  <div className={styles.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className={styles.body}>
              <p>
                {tr.intro.p1Before}
                <em>{tr.intro.p1Emphasis}</em>
                {tr.intro.p1After}
              </p>
              <p>{tr.intro.p2}</p>
              <p>{tr.intro.p3}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
