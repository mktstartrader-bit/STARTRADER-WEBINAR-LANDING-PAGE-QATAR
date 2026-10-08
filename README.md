# STARTRADER — Qatar Live Workshop Landing Page

A responsive marketing landing page for STARTRADER's free live market workshop in
Qatar, implemented from the Figma design (`2026_LandingPages_ui`, node `197-13`).

Built with **Vite + React + TypeScript** and plain CSS (design tokens via CSS
custom properties). No CSS framework dependencies.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
```

## Structure

```
src/
  App.tsx                    # page composition (section order)
  styles/global.css          # design tokens + all section styles
  components/
    Icons.tsx                # inline SVG icon set (brand-blue check, etc.)
    Header.tsx               # sticky nav
    Hero.tsx                 # headline, info card, trust bar
    RegistrationForm.tsx     # registration form (name / +974 mobile / experience / consent)
    WhyWorkshop.tsx          # "Why this workshop" panel
    WhoIsItFor.tsx           # qualifying checklist + tags
    WalkAway.tsx             # outcomes checklist
    InsideWorkshop.tsx       # 60-minute agenda rows
    Presenter.tsx            # presenter bio, stats, media
    RegistrationIncludes.tsx # toolkit + About STARTRADER
    Faq.tsx                  # accordion (first item open by default)
    FinalCta.tsx             # closing call-to-action
    Footer.tsx               # logo + risk disclaimer
  assets/                    # brand logos, presenter & media images
  registration.ts            # form rules shared by the form and the API
api/register.ts              # registration endpoint: Sheet + CRM
google-apps-script/Code.gs   # script to paste into the Google Sheet
```

## Notes

- **Typography:** Plus Jakarta Sans (loaded from Google Fonts in `index.html`).
- **Palette:** brand `#0047bb`, deep navy `#0d0d4b`, teal accent `#16e9d7`.
- **Responsive:** fluid grids collapse to a single column below ~900px; the page
  never scrolls horizontally.
- Registration: the form posts to `api/register.ts` (Vercel Function), which
  checks the Qatar Webinar Google Sheet for duplicate numbers, saves the
  registration and sends the lead to the CRM. Validation rules are in
  `src/registration.ts`. Set-up, environment variables and the test checklist:
  [INTEGRATION.md](INTEGRATION.md).
