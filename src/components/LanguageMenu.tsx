import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown, Tick } from "./Icons";
import { useLang } from "../i18n/LanguageContext";
import type { Lang } from "../i18n/translations";

const options: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

/** Navbar language selector — switches the whole page between English and Arabic. */
export default function LanguageMenu() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = options.find((o) => o.code === lang) ?? options[0];

  return (
    <div className="lang" ref={ref}>
      <button
        type="button"
        className="lang__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Select language"
        onClick={() => setOpen((o) => !o)}
      >
        <Globe size={18} />
        <span className="lang__current">{current.label}</span>
        <ChevronDown
          size={16}
          className={`lang__chev${open ? " lang__chev--open" : ""}`}
        />
      </button>

      {open && (
        <ul className="lang__menu" role="menu">
          {options.map((o) => {
            const active = o.code === lang;
            return (
              <li key={o.code} role="none">
                <button
                  type="button"
                  role="menuitem"
                  lang={o.code}
                  className={`lang__item${active ? " lang__item--active" : ""}`}
                  onClick={() => {
                    setLang(o.code);
                    setOpen(false);
                  }}
                >
                  <span>{o.label}</span>
                  {active && <Tick size={16} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
