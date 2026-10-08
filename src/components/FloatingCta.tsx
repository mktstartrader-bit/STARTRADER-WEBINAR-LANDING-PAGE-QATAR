import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageContext";

/**
 * Persistent mobile-only "Reserve" button fixed to the bottom of the screen.
 * It steps aside while the registration form is on screen, so it never
 * covers the form's own Register button.
 */
export default function FloatingCta() {
  const { t } = useLang();
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const form = document.getElementById("register");
    if (!form || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      // Count the form as on screen while it's within the lower 85% or so.
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(form);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href="#register"
      className={`floating-cta${formInView ? " floating-cta--hidden" : ""}`}
      aria-hidden={formInView || undefined}
      tabIndex={formInView ? -1 : undefined}
    >
      {t.hero.cta}
    </a>
  );
}
