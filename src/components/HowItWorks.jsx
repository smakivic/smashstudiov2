import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/HowItWorks.module.css";

export default function HowItWorks() {
  const { tr } = useTranslation();

  return (
    <section className={styles.section} id="how">
      <div className="container">
        <Reveal>
          <SectionLabel>{tr.howItWorks.label}</SectionLabel>
        </Reveal>
        <Reveal delay={100}>
          <h2 className={styles.title}>
            {tr.howItWorks.title1}
            <br />
            {tr.howItWorks.title2}
          </h2>
        </Reveal>
        <div className={styles.grid}>
          {tr.howItWorks.steps.map(({ number, title, text }, i) => (
            <Reveal key={number} delay={i * 100 + 150}>
              <div className={styles.step}>
                <div className={styles.number}>{number}</div>
                <div className={styles.stepTitle}>{title}</div>
                <p className={styles.stepText}>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
