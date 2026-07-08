import { Coins, BarChart } from "./Icons";
import { useLang } from "../i18n/LanguageContext";

export default function WhyWorkshop() {
  const { t } = useLang();
  const w = t.why;
  const icons = [<Coins size={24} />, <BarChart size={24} />];

  return (
    <section className="section section--surface">
      <div className="container">
        <div className="why__panel reveal">
          <h2 className="why__title">{w.title}</h2>
          <p className="why__sub">{w.subtitle}</p>

          <div className="why__cards stagger">
            {w.cards.map((text, i) => (
              <div className="why__card" key={text}>
                {icons[i]}
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
