import { useEffect } from "react";

/**
 * Reveal-on-scroll engine.
 *
 * Observes every element carrying a `.reveal` or `.stagger` class and adds
 * `.is-visible` the first time it enters the viewport, which triggers the CSS
 * entrance transitions. Hidden states are gated on `html.reveal-on`, so the
 * pre-rendered page is fully visible before this runs. Honours
 * `prefers-reduced-motion` by showing everything immediately, and degrades
 * gracefully where IntersectionObserver is missing.
 *
 * No getBoundingClientRect here: measuring would force the browser to lay out
 * below-the-fold sections that `content-visibility: auto` lets it skip.
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

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            reveal.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    // First pass: anything already on screen (even partly) stays exactly as
    // painted. Only then are hidden states switched on for the rest.
    const initial = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
        else reveal.observe(entry.target);
      });
      initial.disconnect();
      document.documentElement.classList.add("reveal-on");
    });
    nodes.forEach((n) => initial.observe(n));

    return () => {
      initial.disconnect();
      reveal.disconnect();
    };
  }, []);
}
