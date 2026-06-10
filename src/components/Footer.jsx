import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/Footer.module.css";
import logo from "../assets/logo.jpg";
export default function Footer() {
  const { tr } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <img src={logo} alt="Smash Studio logo" className={styles.logoImg} />
        </div>
        <p className={styles.tagline}>{tr.footer.tagline}</p>
      </div>

      <nav className={styles.nav} aria-label="Footer navigation">
        {tr.footer.navLinks.map(({ href, label }) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className={styles.right}>
        <div className={styles.social}>
          {tr.footer.social.map(({ href, label }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ))}
        </div>
        <p className={styles.legal}>
          &copy; {year} {tr.footer.legalSuffix}
        </p>
      </div>

      <div className={styles.devBar}>
        <span>
          {tr.footer.designed}
          <a
            href="https://github.com/smakivic"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.devLink}
          >
            Stefan Makivić
          </a>
        </span>
      </div>
    </footer>
  );
}
