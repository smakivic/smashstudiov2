import { useState, useEffect, useRef } from "react";

/**
 * Returns a ref to attach to a container element, and a CSS translate offset
 * driven by the element's scroll position — ready to apply to a child layer.
 *
 * @param {number} strength  Total px range of the parallax movement (default 80).
 */
export function useParallax(strength = 80) {
  const blockRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;

    const update = () => {
      const { top, height } = block.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when block bottom enters viewport, 1 when block top leaves
      const progress = (vh - top) / (vh + height);
      setOffset((progress - 0.5) * strength);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [strength]);

  return { blockRef, offset };
}
