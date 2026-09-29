import { useLang } from "../i18n/LanguageContext";

// Logo lives in public/ so it stays one small cacheable file (not inlined).
const logo = "/logo.png";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="container">
        <img className="footer__logo" src={logo} alt="STARTRADER" width={160} height={36} loading="lazy" decoding="async" />
        <p className="footer__disclaimer">{t.footer.disclaimer}</p>
      </div>
    </footer>
  );
}
