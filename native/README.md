# STARTRADER — Qatar Live Workshop (standalone HTML / CSS / JS)

Plain **HTML + CSS + JavaScript**. No framework, no build step, no
dependencies. Open `index.html` in a browser, or drop this folder onto any
static host or CMS (Vercel, Netlify, S3, Nginx, WordPress media, …) as-is.
All paths are relative, so it works from any sub-folder.

This is the same page as the live React build
(https://startrader-webinar-qatar.vercel.app/): same design, copy, form,
English/Arabic switch and performance work.

## Files

```
index.html    Page markup + inline SVG icon sprite + the stylesheet (inlined)
styles.css    Readable copy of the inlined styles (see "Styles" below)
script.js     English copy, language switch, form, FAQ, header, scroll-reveal
ar.js         Arabic copy — loaded only when a visitor picks Arabic
assets/       Images (AVIF/WebP), logos, favicons
assets/fonts  Self-hosted Plus Jakarta Sans + Tajawal (woff2)
assets/flags  Country flags for the form
```

## Styles

The CSS is **inlined in `index.html`** on purpose. Linking it as a separate
file (`<link rel="stylesheet" href="styles.css">`) made Chrome hold the first
paint ~1 s longer in Lighthouse mobile tests. `styles.css` is an identical,
readable copy. If you change styles, edit `styles.css` and paste it back into
the `<style>` block in `index.html` (or switch to the `<link>` and accept the
slower first paint).

## Editing copy

- English: the `translations.en` object at the top of `script.js`.
- Arabic: `ar.js`.
- The HTML carries `data-i18n="…"` keys (plus `data-i18n-ph` for placeholders,
  `data-i18n-href` for links, `data-i18n-alt` for image alt text). The English
  text is also written in `index.html` as the default — keep the two in sync.

Arabic renders right-to-left (`<html dir="rtl">`) with the Tajawal font. The
choice is remembered in `localStorage`. Switching never reloads the page, so
URL/campaign parameters and anything typed in the form are kept.

## Registration form

Country / Region + phone number + Terms & Privacy consent. Leads are sent to
[Web3Forms](https://web3forms.com); configure at the top of `script.js`:

- `WEB3FORMS_ACCESS_KEY` — public access key.
- `LEAD_CC` — extra recipient emails.
- `LEAD_SUBJECT`, `LEAD_FROM_NAME` — notification email labels.

Each lead contains `country` (e.g. "Qatar"), `mobile` with its dial code
(e.g. "+974 5000 0000") and `agreedToTerms: Yes`. The country list (flag, dial
code, number hint, EN/AR names) is the `COUNTRIES` array in `script.js`; add a
country there, add its `<option>` in `index.html`, and drop its 40px PNG in
`assets/flags/`.

## Performance notes (keep these when integrating)

- Keep the CSS inlined, and don't add `<link rel="preload">` for the fonts.
  Both made Chrome delay the first paint in testing.
- Leave the images near the top (trust-bar logos, form flags) **without**
  `loading="lazy"`; lazy images that close to the first screen delayed it too.
  Images further down stay lazy.
- Serve with gzip/Brotli and long-term caching for `assets/`.
- Load analytics/tag scripts after the page has rendered (e.g. `defer`, or
  after consent) so they don't block the first paint.
