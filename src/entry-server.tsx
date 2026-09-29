// Build-time renderer: produces the static HTML for index.html so the page
// paints before JavaScript loads (see scripts/prerender.mjs).
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { LanguageProvider } from "./i18n/LanguageContext";

export function render(): string {
  return renderToString(
    <StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </StrictMode>
  );
}
