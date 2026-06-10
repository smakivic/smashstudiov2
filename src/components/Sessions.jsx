import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import SessionCard from "./SessionCard";
import { usePackages } from "../hooks/usePackages";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/Sessions.module.css";

export default function Sessions() {
  const { tr } = useTranslation();
  const { packages, loading, error } = usePackages();

  return (
    <section className={styles.section} id="sessions">
      <div className="container">
        <div className={styles.header}>
          <div>
            <Reveal>
              <SectionLabel>{tr.sessions.label}</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className={styles.title}>
                {tr.sessions.title1}
                <br />
                {tr.sessions.title2}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className={styles.note}>{tr.sessions.note}</p>
          </Reveal>
        </div>

        {loading && (
          <div className={styles.grid}>
            {[1, 2, 3].map((n) => (
              <div key={n} className={styles.skeleton} />
            ))}
          </div>
        )}

        {error && <p className={styles.error}>{tr.sessions.error}</p>}

        {!loading && !error && (
          <div className={styles.grid}>
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 100}>
                <SessionCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
