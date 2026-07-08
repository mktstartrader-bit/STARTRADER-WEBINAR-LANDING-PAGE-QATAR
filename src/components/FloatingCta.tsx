import { useLang } from "../i18n/LanguageContext";

/** Persistent mobile-only "Reserve" button fixed to the bottom of the screen. */
export default function FloatingCta() {
  const { t } = useLang();
  return (
    <a href="#register" className="floating-cta">
      {t.hero.cta}
    </a>
  );
}
