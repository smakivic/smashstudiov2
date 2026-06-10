import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { useTranslation } from "../hooks/useTranslation";
import styles from "./styles/Location.module.css";

export default function Location() {
  const { tr } = useTranslation();

  return (
    <section className={styles.section} id="location">
      <div className="container">
        <div className={styles.grid}>
          <div>
            <Reveal>
              <SectionLabel>{tr.location.label}</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 className={styles.heading}>
                {tr.location.heading1}
                <br />
                {tr.location.heading2}
              </h2>
            </Reveal>
            <div className={styles.infoTable}>
              {tr.location.rows.map(({ key, val, href }, i) => (
                <Reveal key={key} delay={i * 60 + 200}>
                  <div className={styles.row}>
                    <span className={styles.rowKey}>{key}</span>
                    <span className={styles.rowVal}>
                      {href ? (
                        <a href={href}>{val}</a>
                      ) : (
                        val.split("\n").map((line, j) => (
                          <span key={j} style={{ display: "block" }}>
                            {line}
                          </span>
                        ))
                      )}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal direction="right" delay={150}>
            <div className={styles.mapWrap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.9700816662094!2d17.162162676186295!3d44.78141527873556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475e0300088cf5a3%3A0x78a25fcc545352cc!2sSmash%20Studio!5e0!3m2!1ssl!2ssi!4v1781103709768!5m2!1ssl!2ssi"
                title="Smash Studio location in Banja Luka"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
