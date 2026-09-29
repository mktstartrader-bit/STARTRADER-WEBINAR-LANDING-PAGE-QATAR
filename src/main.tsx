import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { LanguageProvider } from "./i18n/LanguageContext";
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

// The production build ships pre-rendered English HTML. Hydrate it when the
// visitor is on English; otherwise (Arabic saved, or dev server with an empty
// root) render fresh so the markup matches the chosen language.
let savedLang: string | null = null;
try {
  savedLang = window.localStorage.getItem("startrader-lang");
} catch {
  /* storage blocked */
}

if (container.hasChildNodes() && savedLang !== "ar") {
  hydrateRoot(container, app);
} else {
  container.textContent = "";
  createRoot(container).render(app);
}
