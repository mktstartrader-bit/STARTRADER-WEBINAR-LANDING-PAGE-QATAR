# STARTRADER — Qatar Live Workshop (standalone / native build)

Plain **HTML + CSS + JavaScript**. No framework, no build step, no
dependencies. Open `index.html` in a browser or drop this folder onto any
static host (Vercel, Netlify, S3, Nginx, a CMS upload, …) as‑is.

## Files

```
index.html    Semantic markup for the whole page + an inline SVG icon sprite
styles.css    All styles (design tokens as CSS custom properties)
script.js     Language switch (EN/AR + RTL), form submit, FAQ accordion,
              sticky-header state, and scroll-reveal animations
assets/       Images, logos and favicons
```

## Editing copy

All user‑facing text lives in one `translations` object at the top of
`script.js` (English + Arabic side by side). The HTML carries `data-i18n="…"`
keys that are filled from that object, so:

- To change wording, edit `translations` in `script.js`.
- The English text is also written directly in `index.html` as the default /
  no‑JS fallback — keep the two in sync, or treat `script.js` as the source of
  truth (it wins at runtime).

Arabic renders right‑to‑left automatically (`<html dir="rtl">`) and switches to
the Tajawal font. The language choice is remembered in `localStorage`.

> Note: the Arabic "Included" list has 4 items and "Who is it for" has 5, while
> English has 6 each. Items without an Arabic translation are hidden when
> Arabic is active. Add the missing Arabic strings to show them in both.

## Registration form

Leads are delivered via [Web3Forms](https://web3forms.com). Configure at the top
of `script.js`:

- `WEB3FORMS_ACCESS_KEY` — the public access key (replace with the real one to
  go live).
- `LEAD_CC` — extra recipient emails.
- `LEAD_SUBJECT`, `LEAD_FROM_NAME` — notification email labels.

The mobile number is submitted with its `+974` country code.
