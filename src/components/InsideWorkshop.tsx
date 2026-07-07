import {
  TrendingUp,
  Droplet,
  DollarSign,
  CalendarCheck,
  MessageSquare,
} from "./Icons";
import { useLang } from "../i18n/LanguageContext";

export default function InsideWorkshop() {
  const { t } = useLang();
  const w = t.inside;
  const icons = [
    <TrendingUp size={24} />,
    <Droplet size={24} />,
    <DollarSign size={24} />,
    <CalendarCheck size={24} />,
    <MessageSquare size={24} />,
  ];

  return (
    <section className="section section--dark">
      <div className="container">
        <div className="inside__head reveal">
          <h2 className="section-title">{w.title}</h2>
          <p className="inside__sub">{w.subtitle}</p>
        </div>

        <div className="inside__list stagger">
          {w.rows.map((text, i) => (
            <div key={text} className="inside__row">
              <span className="inside__icon">{icons[i]}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="inside__cta reveal">
          <a href="#register" className="btn btn--primary">
            {w.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
