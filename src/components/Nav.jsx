import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/Nav.module.css";
import logo from "../assets/logo.jpg";
export default function Nav() {
  const { tr, lang, setLang } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { href: "#sessions", label: tr.nav.sessions },
    { href: "#how", label: tr.nav.howItWorks },
    { href: "#safety", label: tr.nav.safety },
    { href: "#location", label: tr.nav.location },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  const LangToggle = ({ mobile }) => (
    <div
      className={mobile ? styles.mobileLangToggle : styles.langToggle}
      role="group"
      aria-label="Language selection"
    >
      {/* Sliding orange pill indicator */}
      <span
        className={`${styles.langPill} ${lang === "en" ? styles.langPillRight : ""}`}
        aria-hidden="true"
      />
      <button
        onClick={() => setLang("sr")}
        className={lang === "sr" ? styles.langBtnActive : styles.langBtn}
        aria-pressed={lang === "sr"}
        aria-label="Srpski"
      >
        SR
      </button>
      <button
        onClick={() => setLang("en")}
        className={lang === "en" ? styles.langBtnActive : styles.langBtn}
        aria-pressed={lang === "en"}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ""} ${open ? styles.navOpen : ""}`}
        aria-label="Main navigation"
      >
        <a href="#" className={styles.logo}>
          <img src={logo} alt="Smash Studio" className={styles.logoImg} />
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
          <li>
            <LangToggle />
          </li>
          <li>
            <a
              href="https://smashstudio6c7w.setmore.com/smashstudio"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              {tr.nav.bookNow}
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile overlay — sibling to nav so z-index 102 beats nav's stacking context */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!open}
      >
        <LangToggle mobile />
        <ul className={styles.mobileLinks}>
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={close}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#book" onClick={close} className={styles.mobileCta}>
              {tr.nav.bookNow}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
