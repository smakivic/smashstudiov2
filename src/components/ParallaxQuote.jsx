import Reveal from "./Reveal";
import { useTranslation } from "../hooks/useTranslation";
import { useParallax } from "../hooks/useParallax";
import styles from "./styles/ParallaxQuote.module.css";
import backgroundImage from "../assets/parallax-bg.jpg";

export default function ParallaxQuote() {
  const { tr } = useTranslation();
  const { blockRef, offset } = useParallax(70);

  return (
    <div className={styles.block} ref={blockRef}>
      <div
        className={styles.bg}
        style={{
          transform: `translateY(${offset}px)`,
        }}
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.inner}>
        <Reveal>
          <blockquote className={styles.quote}>
            {tr.parallaxQuote.line1}
            <br />
            {tr.parallaxQuote.line2} <em>{tr.parallaxQuote.accent}</em>
          </blockquote>
        </Reveal>
      </div>
    </div>
  );
}
