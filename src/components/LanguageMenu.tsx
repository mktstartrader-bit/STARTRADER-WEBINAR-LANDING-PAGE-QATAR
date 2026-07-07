import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown, Tick } from "./Icons";

type Lang = { code: string; label: string };

const languages: Lang[] = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

/**
 * Navbar language selector (UI only for now).
 *
 * Renders an English / العربية dropdown. Selecting an option updates the
 * displayed language, but does not yet translate the page or switch text
 * direction — that will be wired up when the localized content is ready.
 */
export default function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("en");
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

  const current = languages.find((l) => l.code === lang) ?? languages[0];

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
          {languages.map((l) => {
            const active = l.code === lang;
            return (
              <li key={l.code} role="none">
                <button
                  type="button"
                  role="menuitem"
                  className={`lang__item${active ? " lang__item--active" : ""}`}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                >
                  <span>{l.label}</span>
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
