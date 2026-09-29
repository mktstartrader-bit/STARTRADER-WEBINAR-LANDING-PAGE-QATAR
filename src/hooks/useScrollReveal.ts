import { useEffect } from "react";

/**
 * Reveal-on-scroll engine.
 *
 * Observes every element carrying a `.reveal` or `.stagger` class and adds
 * `.is-visible` the first time it enters the viewport, which triggers the CSS
 * entrance transitions. Hidden states are gated on `html.reveal-on`, so the
 * pre-rendered page is fully visible before this runs. Honours `prefers-reduced-motion` by showing everything
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

    // Anything already on screen stays as painted (no hide-then-animate),
    // then the hidden states are switched on for everything below the fold.
    const vh = window.innerHeight;
    nodes.forEach((n) => {
      const { top, bottom } = n.getBoundingClientRect();
      if (top < vh && bottom > 0) n.classList.add("is-visible");
    });
    document.documentElement.classList.add("reveal-on");

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
