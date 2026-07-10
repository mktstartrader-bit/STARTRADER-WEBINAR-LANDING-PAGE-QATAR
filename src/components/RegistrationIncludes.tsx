import nba from "../assets/nba.svg";
import porsche from "../assets/porsche.png";
import { Check } from "./Icons";
import { useLang } from "../i18n/LanguageContext";

export default function RegistrationIncludes() {
  const { t } = useLang();
  const inc = t.includes;
  const about = t.about;

  return (
    <section className="section section--fade">
      <div className="container">
        <div className="includes__grid stagger">
          {/* Included with registration */}
          <div className="card-panel">
            <h3 className="card-panel__title">{inc.title}</h3>
            <p className="includes__toolkit">{inc.toolkit}</p>
            <p className="includes__receives">{inc.receives}</p>
            <ul className="includes__list">
              {inc.items.map((item) => (
                <li key={item}>
                  <Check size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="includes__note">{inc.note}</p>
          </div>

          {/* About STARTRADER */}
          <div className="card-panel">
            <h3 className="card-panel__title">{about.title}</h3>
            <div className="about__text">
              {about.paras.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <div className="about__logos">
              <img className="nba" src={nba} alt="NBA official partner" />
              <img
                className="porsche"
                src={porsche}
                alt="Porsche Carrera Cup Middle East partner"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
