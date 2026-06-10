import { useEffect, useRef } from "react";
import Button from "./Button";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/Hero.module.css";
import heroVideo from "../assets/mixkit-feet-with-baseball-bat-waiting-17491-hd-ready.mp4";
export default function Hero() {
  const { tr } = useTranslation();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoad = () => video.classList.add(styles.videoLoaded);
    video.addEventListener("loadeddata", onLoad);
    return () => video.removeEventListener("loadeddata", onLoad);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className={styles.bgFallback} aria-hidden="true" />
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>{tr.hero.eyebrow}</p>
        <h1 className={styles.title}>
          {tr.hero.titleLine1}
          <em className={styles.accent}>{tr.hero.titleLine2}</em>
        </h1>
        <p className={styles.sub}>{tr.hero.sub}</p>
        <div className={styles.actions}>
          <Button
            href="https://smashstudio6c7w.setmore.com/smashstudio"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            {tr.hero.cta}
          </Button>
          <Button href="#sessions" variant="ghost">
            {tr.hero.ctaSecondary}
          </Button>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        {tr.hero.scroll}
      </div>
    </section>
  );
}
