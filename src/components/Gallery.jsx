import { useRef } from "react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/Gallery.module.css";

import g1 from "../assets/gallery/1.jpg";
import g2 from "../assets/gallery/2.jpg";
import g3 from "../assets/gallery/3.jpg";
import g4 from "../assets/gallery/4.jpg";
import g5 from "../assets/gallery/5.png";
import g6 from "../assets/gallery/6.jpg";
import g7 from "../assets/gallery/7.jpg";
import g8 from "../assets/gallery/8.jpg";
import g9 from "../assets/gallery/9.jpg";
import g10 from "../assets/gallery/10.jpg";

const IMG_SRCS = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10];

export default function Gallery() {
  const { tr } = useTranslation();
  const trackRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0 });

  const images = IMG_SRCS.map((src, i) => ({
    src,
    alt: tr.gallery.imageAlts?.[i] ?? `Gallery image ${i + 1}`,
  }));

  function onMouseDown(e) {
    drag.current = {
      down: true,
      startX: e.pageX - trackRef.current.offsetLeft,
      scrollLeft: trackRef.current.scrollLeft,
    };
    trackRef.current.style.cursor = "grabbing";
  }

  function onMouseMove(e) {
    if (!drag.current.down) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - drag.current.startX) * 1.2;
    trackRef.current.scrollLeft = drag.current.scrollLeft - walk;
  }

  function onMouseUp() {
    drag.current.down = false;
    trackRef.current.style.cursor = "grab";
  }

  return (
    <section className={styles.section}>
      <div className={styles.labelWrap}>
        <Reveal>
          <SectionLabel>{tr.gallery.label}</SectionLabel>
        </Reveal>
      </div>
      <div
        role="region"
        aria-label={tr.gallery.ariaLabel}
        ref={trackRef}
        className={styles.track}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {images.map(({ src, alt }) => (
          <figure key={src} className={styles.item}>
            <img src={src} alt={alt} loading="lazy" draggable="false" />
          </figure>
        ))}
      </div>
    </section>
  );
}
