import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import Button from "./Button";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/BookCTA.module.css";

export default function BookCTA() {
  const { tr } = useTranslation();

  return (
    <section className={styles.section} id="book">
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <SectionLabel center>{tr.book.label}</SectionLabel>
        </Reveal>
        <Reveal delay={100}>
          <h2 className={styles.title}>
            {tr.book.title1}
            <br />
            {tr.book.title2}
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className={styles.sub}>{tr.book.sub}</p>
        </Reveal>
        <Reveal delay={300}>
          <div className={styles.actions}>
            <Button
              href="https://smashstudio6c7w.setmore.com/smashstudio"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              {tr.book.cta}
            </Button>
            <a href="mailto:smashstudiobl@gmail.com" className={styles.email}>
              smashstudiobl@gmail.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
