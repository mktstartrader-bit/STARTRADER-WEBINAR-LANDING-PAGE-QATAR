import { useEffect } from "react";

/**
 * Reveal-on-scroll engine.
 *
 * Observes every element carrying a `.reveal` or `.stagger` class and adds
 * `.is-visible` the first time it enters the viewport, which triggers the CSS
 * entrance transitions. Honours `prefers-reduced-motion` by showing everything
 * immediately, and degrades gracefully where IntersectionObserver is missing.
 */
export function useScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .stagger")
    );

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
}
