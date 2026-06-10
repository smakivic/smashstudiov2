import Button from "./Button";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/SessionCard.module.css";

export default function SessionCard({ pkg }) {
  const { tr, lang } = useTranslation();

  // Flat package data is English. For Serbian, overlay from translation map.
  const pkgT = lang === "sr" ? (tr.packages?.[pkg.slug] ?? null) : null;
  const { tag, name, description, includes } = pkgT ?? pkg;
  const { price, currency, featured } = pkg;

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <p className={styles.tag}>{tag}</p>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.desc}>{description}</p>
      <ul className={styles.includes}>
        {includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className={styles.footer}>
        <div className={styles.price}>
          <sup>{currency}</sup>
          {price}
        </div>
        <Button
          href="https://smashstudio6c7w.setmore.com/smashstudio"
          target="_blank"
          rel="noopener noreferrer"
          variant={featured ? "primary" : "ghost"}
          style={featured ? { color: "var(--black)" } : undefined}
        >
          {tr.sessions.bookCta}
        </Button>
      </div>
    </article>
  );
}
