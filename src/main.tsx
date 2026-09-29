import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { LanguageProvider, getSavedLang } from "./i18n/LanguageContext";
import { loadTranslation } from "./i18n/translations";
import "./styles/fonts.css";
import "./styles/global.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);

function start() {
  // The production build ships pre-rendered English HTML. Hydrate it for
  // English visitors; for a saved Arabic choice (or the dev server's empty
  // root) load the Arabic copy first, then render fresh in that language.
  if (container.hasChildNodes() && getSavedLang() === "en") {
    hydrateRoot(container, app);
    return;
  }
  const ready =
    getSavedLang() === "ar" ? loadTranslation("ar") : Promise.resolve();
  ready
    .catch(() => undefined)
    .then(() => {
      container.textContent = "";
      createRoot(container).render(app);
    });
}

// Deferred hydration. The pre-rendered English page is complete and readable
// without JS, so for English visitors hydration waits for the first sign of
// interaction instead of competing with the initial render. It runs
// synchronously inside that first event (pointerdown/touchstart fire before
// click), so the tap or keypress that triggered it still reaches its handler.
const TRIGGERS = [
  "pointerdown",
  "touchstart",
  "keydown",
  "focusin",
  "mousemove",
  "wheel",
  "scroll",
] as const;

function hydrateOnInteraction() {
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    TRIGGERS.forEach((t) => window.removeEventListener(t, go, true));
    start();
  };
  TRIGGERS.forEach((t) =>
    window.addEventListener(t, go, { capture: true, passive: true })
  );
  // Arriving via a link like #register means the page is already scrolled.
  if (window.scrollY > 0) go();
}

if (container.hasChildNodes() && getSavedLang() === "en") {
  hydrateOnInteraction();
} else {
  start();
}

// Warm the below-the-fold italic font once the page has settled, so it's
// cached before the visitor scrolls to the note that uses it.
window.addEventListener("load", () => {
  const idle =
    window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500));
  idle(() => {
    document.fonts?.load('italic 300 12px "Plus Jakarta Sans"').catch(() => {});
  });
});
