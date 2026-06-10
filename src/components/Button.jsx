import styles from "./styles/Button.module.css";

/**
 * @param {'primary'|'ghost'} variant
 * @param {string}  href      renders an <a> when provided
 * @param {string}  className extra classes
 */
export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  style,
  onClick,
  target,
  rel,
}) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        style={style}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {children}
        <span className={styles.arrow} aria-hidden="true" />
      </a>
    );
  }

  return (
    <button type="button" className={cls} style={style} onClick={onClick}>
      {children}
      <span className={styles.arrow} aria-hidden="true" />
    </button>
  );
}
