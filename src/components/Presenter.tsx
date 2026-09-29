import presenter from "../assets/presenter.webp";
import media1 from "../assets/media-1.webp";
import media2 from "../assets/media-2.webp";
import { useLang } from "../i18n/LanguageContext";

export default function Presenter() {
  const { t } = useLang();
  const p = t.presenter;

  return (
    <section className="section">
      <div className="container">
        <div className="presenter__grid">
          <div className="presenter__photo reveal reveal--left">
            <img src={presenter} alt={p.name} width={820} height={814} loading="lazy" decoding="async" />
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
              <img src={media1} alt={p.name} width={610} height={338} loading="lazy" decoding="async" />
              <img src={media2} alt={p.name} width={610} height={338} loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
