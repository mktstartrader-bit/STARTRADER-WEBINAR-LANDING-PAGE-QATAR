import { Fragment } from "react";
import heroBanner from "../assets/hero-banner.webp";
import heroBannerAvif from "../assets/hero-banner.avif";
// Mobile crop has the edge feathering baked in (no CSS mask to composite).
import heroMobileAvif from "../assets/hero-banner-mobile.avif";
import heroMobileWebp from "../assets/hero-banner-mobile.webp";
import nba from "../assets/nba.svg";
import porsche from "../assets/porsche.webp";
import { Calendar, Clock, Monitor, User, Check } from "./Icons";
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
        <div className="hero__copy">
          <span className="pill pill--brand">
            <span className="pill__dot" />
            {h.badge}
          </span>

          <h1 className="hero__title">
            {h.title.main} <span className="accent">{h.title.accent}</span>
          </h1>

          <p className="hero__lead">{h.lead}</p>

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

        {/* No entrance animation: this is in the first viewport and must
            paint in its final state immediately. */}
        <div className="hero__media">
          <picture>
            <source
              media="(max-width: 900px)"
              srcSet={heroMobileAvif}
              type="image/avif"
            />
            <source
              media="(max-width: 900px)"
              srcSet={heroMobileWebp}
              type="image/webp"
            />
            <source srcSet={heroBannerAvif} type="image/avif" />
            <img
              src={heroBanner}
              alt="Gold bar, oil barrel and a glass globe resting on a market price chart"
              width={900}
              height={1124}
              {...{ fetchpriority: "high" }}
            />
          </picture>
        </div>

        <div className="trust reveal">
          <ul className="trust__list">
            {h.trust.points.map((point) => (
              <li className="trust__point" key={point}>
                <Check size={22} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="trust__logos">
            <img className="nba" src={nba} alt={h.trust.nbaAlt} width={70} height={42} loading="lazy" decoding="async" />
            <img className="porsche" src={porsche} alt={h.trust.porscheAlt} width={93} height={56} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}
