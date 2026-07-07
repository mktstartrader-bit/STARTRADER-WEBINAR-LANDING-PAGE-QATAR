import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div className="container header__inner">
        <a href="#top" className="header__brand" aria-label="STARTRADER home">
          <img className="header__logo" src={logo} alt="STARTRADER" />
        </a>
        <a href="#register" className="btn btn--primary">
          Save My Free Seat
        </a>
      </div>
    </header>
  );
}
