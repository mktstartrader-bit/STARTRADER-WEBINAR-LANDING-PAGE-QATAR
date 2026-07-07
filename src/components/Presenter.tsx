import presenter from "../assets/presenter.png";
import mediaMain from "../assets/media-main.jpg";
import media2 from "../assets/media-2.jpg";
import media3 from "../assets/media-3.jpg";
import { useLang } from "../i18n/LanguageContext";

export default function Presenter() {
  const { t } = useLang();
  const p = t.presenter;

  return (
    <section className="section">
      <div className="container">
        <div className="presenter__grid">
          <div className="presenter__photo reveal reveal--left">
            <img src={presenter} alt={p.name} />
            <div className="presenter__stats">
              {p.stats.map((s) => (
                <div className="presenter__stat" key={s.cap}>
                  <div className="num">{s.num}</div>
                  <div className="cap">{s.cap}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="presenter__info reveal reveal--right">
            <p className="presenter__eyebrow">{p.eyebrow}</p>
            <h2 className="presenter__name">{p.name}</h2>
            <p className="presenter__role">{p.role}</p>

            <div className="presenter__bio">
              {p.bio.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="presenter__media stagger">
              <img className="wide" src={mediaMain} alt={p.name} />
              <img className="small" src={media2} alt={p.name} />
              <img className="small" src={media3} alt={p.name} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
