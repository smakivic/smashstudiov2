import { useEffect, useRef, useState } from "react";

const DIRECTION_MAP = {
  up: "translateY(36px)",
  left: "translateX(-28px)",
  right: "translateX(28px)",
};

/**
 * Scroll-reveal wrapper. Observes its root element and fades+slides it in
 * when it enters the viewport.
 *
 * @param {'up'|'left'|'right'} direction
 * @param {number}              delay       ms transition delay
 * @param {string}              as          HTML tag to render (default 'div')
 * @param {string}              className   extra className on the wrapper
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : DIRECTION_MAP[direction],
        transition: `opacity 0.72s ease ${delay}ms, transform 0.72s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
