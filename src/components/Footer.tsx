import logo from "../assets/logo.svg";
import { useLang } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="container">
        <img className="footer__logo" src={logo} alt="STARTRADER" />
        <p className="footer__disclaimer">{t.footer.disclaimer}</p>
      </div>
    </footer>
  );
}
