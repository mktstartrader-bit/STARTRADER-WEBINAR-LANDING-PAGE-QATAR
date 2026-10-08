# Qatar Webinar registration: set-up and testing

How the registration form gets its data into the Google Sheet and the CRM,
what has to be configured before go-live, and how to test it.

## The flow

1. The visitor fills in the form on the landing page: Full Name, Qatar mobile
   number (+974 fixed), trading experience, consent.
2. The form checks everything in the browser. **Register** stays disabled until
   every field is complete and valid.
3. The form posts to `/api/register` (a Vercel Function, `api/register.ts`).
4. The function checks the input again with the same rules, then asks the
   Google Sheet to add the registration.
5. The Sheet's script looks for the mobile number. If it is already there, the
   registration is refused and the visitor sees "This mobile number is already
   registered for the webinar." Otherwise the full registration is added as a
   new row.
6. The function sends the lead to the CRM and writes the result into the
   Sheet's **CRM Status** column.
7. The visitor sees the confirmation state.

If the CRM call fails, the visitor is still registered: the row is in the
Sheet, and **CRM Status** shows `failed (…)` so the lead can be re-sent.
If the Sheet can't be reached, the visitor sees "Something went wrong. Please
try again." and nothing is saved.

## Validation rules

| Field | Rule |
| --- | --- |
| Full Name | Required. At least 2 characters, letters only (Arabic or Latin), spaces, `'`, `-` and `.` allowed. |
| Mobile | +974 is fixed. Numbers only, exactly 8 digits, must start with 3, 5, 6 or 7. A pasted `+974…` or `00974…` is trimmed automatically. |
| Trading experience | One of the three options is required. |
| Consent | Must be ticked. |

The rules live in one file, `src/registration.ts`, used by both the form and
the server. The plain HTML build (`native/script.js`) repeats them; change both
together. To restrict mobile numbers to specific operator ranges, edit
`QATAR_MOBILE_PREFIXES` in both files.

## What goes where

**Google Sheet** (tab `Registrations`, created automatically on the first
registration): Submitted (Qatar time), Full Name, Mobile, Trading Experience,
Consent, Page Language, utm_source, utm_medium, utm_campaign, utm_term,
utm_content, gclid, fbclid, Page URL, Referrer, IP Country, Device / Browser,
Submitted (UTC), Mobile digits (used for the duplicate check), CRM Status.

**CRM** (JSON POST): `fullName`, `mobile`, `countryCode`, `tradingExperience`,
`consent`, `source`, `language`, `utm_source`, `utm_medium`, `utm_campaign`,
`submittedAt`.
**These CRM field names are placeholders.** Once the CRM team confirms the
endpoint and the fields they expect, update `sendToCrm()` in `api/register.ts`.
Nothing else needs to change.

## Set-up before go-live

### 1. Google Sheet (owner of the Qatar Webinar Sheet)

1. Open the Qatar Webinar Google Sheet → **Extensions → Apps Script**.
2. Replace the editor contents with `google-apps-script/Code.gs` and save.
3. **Project Settings → Script properties → Add script property**:
   name `SECRET`, value a long random string (e.g. from a password manager).
4. **Deploy → New deployment → Web app**. Execute as: **Me**. Who has access:
   **Anyone**. Deploy, approve the permissions, copy the **Web app URL**
   (ends in `/exec`).

"Anyone" only lets someone *call* the script. It does nothing without the
secret, and it can't read the Sheet.

If the Sheet already has registrations from another source, their mobile
numbers will only be caught as duplicates if they are in the
"Mobile (digits, for duplicate check)" column as `974XXXXXXXX`.

### 2. Vercel (project `startrader-webinar-qatar`)

Settings → Environment Variables, for Production (and Preview if you test
there):

| Name | Value | Required |
| --- | --- | --- |
| `SHEET_WEBHOOK_URL` | the Web app URL from step 1 | yes |
| `SHEET_WEBHOOK_SECRET` | the same `SECRET` value | yes |
| `CRM_WEBHOOK_URL` | CRM endpoint for new leads | when the CRM is ready |
| `CRM_WEBHOOK_AUTH` | Authorization header value, e.g. `Bearer …` | if the CRM needs it |
| `ALLOWED_ORIGINS` | origins of other sites hosting the plain HTML build, comma-separated | only for the `native/` build |

Redeploy after adding them. Without `CRM_WEBHOOK_URL`, registrations still go
to the Sheet with CRM Status `not configured`.

### 3. Plain HTML build (`native/`), only if it is used

It posts to `https://startrader-webinar-qatar.vercel.app/api/register`
(`REGISTER_ENDPOINT` at the top of `native/script.js`). Add the origin of the
site hosting it to `ALLOWED_ORIGINS`, e.g. `https://www.startrader.com`.

## Testing

**Locally:** `npm run dev`. Without a `.env.local`, the dev server uses an
in-memory stand-in for the Sheet and CRM and prints each row and lead in the
terminal, so the whole flow (including duplicates) can be tested without
touching the real Sheet. To test against a real (test) Sheet, put
`SHEET_WEBHOOK_URL` and `SHEET_WEBHOOK_SECRET` in `.env.local`.

**Checklist** (phone first, then desktop, English and Arabic):

- [ ] Register is disabled on an empty form.
- [ ] Letters and symbols can't be typed in the mobile field; it stops at 8 digits.
- [ ] `4412 3456` shows the prefix error; `5512 345` shows the 8-digit error.
- [ ] Register enables only once all four fields are valid.
- [ ] A new number registers, shows the confirmation, and appears in the Sheet.
- [ ] The same number again shows the "already registered" message, and no new row is added.
- [ ] UTM parameters on the page URL appear in the Sheet row.
- [ ] The CRM receives the lead, and CRM Status reads `sent`.
- [ ] The floating "Reserve" button hides while the form is on screen.
