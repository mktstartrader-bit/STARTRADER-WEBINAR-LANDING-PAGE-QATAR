import { Check } from "./Icons";
import { useLang } from "../i18n/LanguageContext";

export default function WalkAway() {
  const { t } = useLang();
  const w = t.walk;

  return (
    <section className="section">
      <div className="container">
        <div className="who__head reveal">
          <h2 className="section-title">{w.title}</h2>
          <p className="section-subtitle">{w.subtitle}</p>
        </div>

        <div className="checklist stagger">
          {w.items.map((item) => (
            <div className="checklist__row" key={item}>
              <Check size={24} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
