import { Fragment } from "react";
import heroBanner from "../assets/hero-banner.png";
import nba from "../assets/nba.svg";
import porsche from "../assets/porsche.png";
import {
  Calendar,
  Clock,
  Monitor,
  User,
  Globe,
  ShieldCheck,
} from "./Icons";

const infoItems = [
  { icon: <Calendar size={22} />, label: "27-07-2026", sub: "Monday" },
  { icon: <Clock size={22} />, label: "09:00 AM", sub: "(Qatar Time)" },
  { icon: <Monitor size={22} />, label: "Online", sub: "Free to attend" },
  { icon: <User size={22} />, label: "Attended By", sub: "Ghassan Albahtoori" },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero__copy stagger">
          <span className="pill pill--brand">
            <span className="pill__dot" />
            Free Live Webinar · Qatar
          </span>

          <h1 className="hero__title">
            You've Been Watching the Markets. Is It Time to{" "}
            <span className="accent">Take the Next Step</span>
          </h1>

          <p className="hero__lead">
            Learn how experienced market participants approach Gold, Oil, and
            today's market developments, and discover practical steps you can
            take with greater confidence.
            <span className="em">
              Understanding Markets Is One Thing. Knowing What To Do Next Is
              Another.
            </span>
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
            Save My Free Seat
          </a>
        </div>

        <div className="hero__media reveal reveal--right">
          <img
            src={heroBanner}
            alt="STARTRADER senior market analyst Ghassan Albahtoori"
          />
        </div>

        <div className="trust reveal">
          <div className="trust__item">
            <ShieldCheck size={26} />
            <span className="trust__text">
              <span className="top">
                Regulated across multiple jurisdictions including
              </span>
              <span className="bottom">ASIC | FSCA | CMA | FSA | FSC</span>
            </span>
          </div>

          <span className="trust__divider" />

          <div className="trust__item">
            <Globe size={26} />
            <span className="trust__text">
              <span className="top">Global</span>
              <span className="bottom">Multi-Asset Broker</span>
            </span>
          </div>

          <span className="trust__divider" />

          <div className="trust__logos">
            <img className="nba" src={nba} alt="Official Partner of the NBA" />
            <img
              className="porsche"
              src={porsche}
              alt="Porsche Carrera Cup partner"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
