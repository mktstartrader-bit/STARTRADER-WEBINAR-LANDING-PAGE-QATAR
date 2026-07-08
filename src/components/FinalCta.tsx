import { useLang } from "../i18n/LanguageContext";

export default function FinalCta() {
  const { t } = useLang();
  const f = t.final;

  return (
    <section className="section section--dark final">
      <div className="container">
        <h2 className="final__title reveal">{f.title}</h2>

        <div className="final__pills stagger">
          {f.pills.map((p) => (
            <span className="final__pill" key={p}>
              {p}
            </span>
          ))}
        </div>

        <a href="#register" className="btn btn--primary reveal">
          {f.button}
        </a>
      </div>
    </section>
  );
}
