// Where the registration form sends its data.
//
// The form posts JSON to this endpoint (api/register.ts, a Vercel Function).
// The function checks the Qatar Webinar Google Sheet for a duplicate mobile
// number, adds the full registration to the Sheet, then sends the lead to the
// CRM. The Sheet and CRM addresses are server-side environment variables; see
// INTEGRATION.md.
export const REGISTER_ENDPOINT = "/api/register";

