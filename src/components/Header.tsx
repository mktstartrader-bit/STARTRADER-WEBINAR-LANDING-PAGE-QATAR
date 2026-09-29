import { useEffect, useState } from "react";
import LanguageMenu from "./LanguageMenu";

// Logo lives in public/ so it stays one small cacheable file (not inlined).
const logo = "/logo.png";

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
          <img className="header__logo" src={logo} alt="STARTRADER" width={160} height={36} {...{ fetchpriority: "high" }} />
        </a>
        <div className="header__actions">
          <LanguageMenu />
        </div>
      </div>
    </header>
  );
}
