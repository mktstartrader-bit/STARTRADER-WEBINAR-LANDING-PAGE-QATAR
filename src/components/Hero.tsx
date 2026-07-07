import { Fragment } from "react";
import heroBanner from "../assets/hero-banner.png";
import nba from "../assets/nba.svg";
import porsche from "../assets/porsche.png";
import { Calendar, Clock, Monitor, User, Globe, ShieldCheck } from "./Icons";
import { useLang } from "../i18n/LanguageContext";

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  const infoItems = [
    { icon: <Calendar size={22} />, ...h.info.date },
    { icon: <Clock size={22} />, ...h.info.time },
    { icon: <Monitor size={22} />, ...h.info.online },
    { icon: <User size={22} />, ...h.info.presenter },
  ];

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero__copy stagger">
          <span className="pill pill--brand">
            <span className="pill__dot" />
            {h.badge}
          </span>

          <h1 className="hero__title">
            {h.title.main} <span className="accent">{h.title.accent}</span>
          </h1>

          <p className="hero__lead">{h.lead}</p>

          <p className="hero__lead hero__lead--sub">{h.sub}</p>

          <p className="hero__tagline">
            {h.tagline[0]}
            <br />
            {h.tagline[1]}
          </p>

          <div className="info-card">
            {infoItems.map((item, i) => (
              <Fragment key={item.label + item.sub}>
                {i > 0 && <span className="info-divider" aria-hidden />}
                <div className="info-item">
                  {item.icon}
                  <span className="info-item__text">
                    <span className="info-item__label">{item.label}</span>
                    <span className="info-item__sub">{item.sub}</span>
                  </span>
                </div>
              </Fragment>
            ))}
          </div>

          <a href="#register" className="btn btn--primary hero__cta">
            {h.cta}
          </a>
        </div>

        <div className="hero__media reveal reveal--right">
          <img src={heroBanner} alt={h.info.presenter.sub} />
        </div>

        <div className="trust reveal">
          <div className="trust__item">
            <ShieldCheck size={26} />
            <span className="trust__text">
              <span className="top">{h.trust.regulatedTop}</span>
              <span className="bottom" dir="ltr">
                {h.trust.regulatedBottom}
              </span>
            </span>
          </div>

          <span className="trust__divider" />

          <div className="trust__item">
            <Globe size={26} />
            <span className="trust__text">
              <span className="top">{h.trust.globalTop}</span>
              <span className="bottom">{h.trust.globalBottom}</span>
            </span>
          </div>

          <span className="trust__divider" />

          <div className="trust__logos">
            <img className="nba" src={nba} alt={h.trust.nbaAlt} />
            <img className="porsche" src={porsche} alt={h.trust.porscheAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}
