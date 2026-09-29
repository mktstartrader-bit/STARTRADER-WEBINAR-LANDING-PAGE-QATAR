import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  en,
  getTranslation,
  loadTranslation,
  type Lang,
  type Translation,
} from "./translations";

type LanguageContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Translation;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const STORAGE_KEY = "startrader-lang";

export function getSavedLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

// Start in the saved language only if its copy is already loaded (main.tsx
// preloads Arabic before the first render when it was the saved choice).
function getInitialLang(): Lang {
  const saved = getSavedLang();
  return getTranslation(saved) ? saved : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore storage failures */
    }
  }, [lang, dir]);

  // Switching fetches the other language's copy on first use, then swaps in
  // place — no page reload, so URL params and form input are kept.
  const setLang = useCallback((next: Lang) => {
    loadTranslation(next).then(
      () => setLangState(next),
      () => {
        /* chunk failed to load (offline) — stay on the current language */
      }
    );
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir,
      t: getTranslation(lang) ?? en,
      setLang,
    }),
    [lang, dir, setLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
