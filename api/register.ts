// POST /api/register — Qatar webinar registration (Vercel Function).
//
// 1. Re-validates the submission with the same rules as the form.
// 2. Asks the Google Sheet (via its Apps Script web app) to add the
//    registration. The script refuses a mobile number that is already in the
//    Sheet, so the same number can't register twice.
// 3. Sends the lead to the CRM, then writes the CRM result back to the Sheet.
//
// Configuration (Vercel → Project → Settings → Environment Variables):
//   SHEET_WEBHOOK_URL     Apps Script web-app URL (…/exec)            required
//   SHEET_WEBHOOK_SECRET  shared secret, same value as in the script   required
//   CRM_WEBHOOK_URL       CRM endpoint that accepts a JSON POST        optional
//   CRM_WEBHOOK_AUTH      value sent as the Authorization header       optional
//   ALLOWED_ORIGINS       extra origins allowed to post, comma-separated optional
// See INTEGRATION.md for the full set-up.

import {
  EXPERIENCE_LABELS,
  QATAR_DIAL,
  cleanName,
  formatMobile,
  validateRegistration,
  type Experience,
  type RegisterResponse,
} from "../src/registration.js";

type Body = {
  fullName?: unknown;
  mobile?: unknown;
  experience?: unknown;
  consent?: unknown;
  language?: unknown;
  pageUrl?: unknown;
  referrer?: unknown;
  tracking?: unknown;
  website?: unknown; // honeypot
};

type SheetResult = { result: "added" | "duplicate" };

const str = (v: unknown, max = 500) =>
  typeof v === "string" ? v.slice(0, max) : "";

function json(
  data: RegisterResponse,
  status: number,
  headers: Record<string, string>
) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin");
  const allowed = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  if (!origin || !allowed.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

// ---------------------------------------------------------------------------
// Google Sheet (Apps Script web app). In local development without a Sheet
// configured, an in-memory stand-in is used instead (see vite.config.ts).
// ---------------------------------------------------------------------------
const devStore = new Set<string>();

async function callSheet(payload: Record<string, unknown>): Promise<SheetResult> {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) {
    if (process.env.REGISTER_DEV_MOCK === "1") {
      if (payload.action === "crmStatus") return { result: "added" };
      const key = String((payload.row as Record<string, string>).mobileDigits);
      if (devStore.has(key)) return { result: "duplicate" };
      devStore.add(key);
      console.log("[register:dev] sheet row", payload.row);
      return { result: "added" };
    }
    throw new Error("SHEET_WEBHOOK_URL is not set");
  }
  const res = await fetch(url, {
    method: "POST",
    // text/plain keeps Apps Script from rejecting the request; body is JSON.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...payload, secret: process.env.SHEET_WEBHOOK_SECRET }),
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
  });
  const text = await res.text();
  let data: { result?: string; error?: string };
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Sheet returned non-JSON (HTTP ${res.status})`);
  }
  if (data.result === "added" || data.result === "duplicate") {
    return { result: data.result };
  }
  throw new Error(`Sheet error: ${data.error ?? "unknown"}`);
}

// ---------------------------------------------------------------------------
// CRM. The payload shape is a placeholder until the CRM team confirms the
// field names they expect; change only this function when they do.
// ---------------------------------------------------------------------------
async function sendToCrm(lead: Record<string, string>): Promise<string> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) {
    if (process.env.REGISTER_DEV_MOCK === "1") {
      console.log("[register:dev] crm lead", lead);
      return "sent (dev)";
    }
    return "not configured";
  }
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.CRM_WEBHOOK_AUTH) headers.Authorization = process.env.CRM_WEBHOOK_AUTH;
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok ? "sent" : `failed (HTTP ${res.status})`;
  } catch (err) {
    return `failed (${err instanceof Error ? err.name : "error"})`;
  }
}

export function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  const cors = corsHeaders(request);

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ ok: false, code: "invalid" }, 400, cors);
  }

  // Bots fill the hidden field. Pretend success, store nothing.
  if (str(body.website)) return json({ ok: true }, 200, cors);

  const input = {
    fullName: cleanName(str(body.fullName, 200)),
    mobile: str(body.mobile, 20),
    experience: str(body.experience, 20),
    consent: body.consent === true,
  };
  const errors = validateRegistration(input);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, code: "invalid", errors }, 400, cors);
  }

  const tracking =
    body.tracking && typeof body.tracking === "object"
      ? (body.tracking as Record<string, unknown>)
      : {};
  const now = new Date();
  const mobileIntl = `${QATAR_DIAL} ${formatMobile(input.mobile)}`;
  const experienceLabel = EXPERIENCE_LABELS[input.experience as Experience];

  // Full registration details → Google Sheet.
  const row = {
    submittedAt: now.toISOString(),
    submittedAtQatar: now.toLocaleString("en-GB", { timeZone: "Asia/Qatar" }),
    fullName: input.fullName,
    mobile: mobileIntl,
    mobileDigits: `974${input.mobile}`,
    experience: experienceLabel,
    consent: "Yes",
    language: str(body.language, 5) === "ar" ? "Arabic" : "English",
    utm_source: str(tracking.utm_source, 200),
    utm_medium: str(tracking.utm_medium, 200),
    utm_campaign: str(tracking.utm_campaign, 200),
    utm_term: str(tracking.utm_term, 200),
    utm_content: str(tracking.utm_content, 200),
    gclid: str(tracking.gclid, 200),
    fbclid: str(tracking.fbclid, 200),
    pageUrl: str(body.pageUrl),
    referrer: str(body.referrer),
    ipCountry: request.headers.get("x-vercel-ip-country") ?? "",
    userAgent: (request.headers.get("user-agent") ?? "").slice(0, 300),
    crmStatus: "pending",
  };

  let sheet: SheetResult;
  try {
    sheet = await callSheet({ action: "register", row });
  } catch (err) {
    console.error("[register] sheet failed:", err);
    return json({ ok: false, code: "unavailable" }, 503, cors);
  }
  if (sheet.result === "duplicate") {
    return json({ ok: false, code: "duplicate" }, 409, cors);
  }

  // Agreed lead information → CRM.
  const crmStatus = await sendToCrm({
    fullName: input.fullName,
    mobile: mobileIntl,
    countryCode: "QA",
    tradingExperience: experienceLabel,
    consent: "Yes",
    source: "Qatar Webinar Landing Page",
    language: row.language,
    utm_source: row.utm_source,
    utm_medium: row.utm_medium,
    utm_campaign: row.utm_campaign,
    submittedAt: row.submittedAt,
  });
  if (!crmStatus.startsWith("sent")) {
    console.error("[register] crm:", crmStatus);
  }
  try {
    await callSheet({ action: "crmStatus", mobileDigits: row.mobileDigits, status: crmStatus });
  } catch (err) {
    console.error("[register] could not record CRM status:", err);
  }

  // The registration is saved in the Sheet, so the visitor is registered even
  // if the CRM call failed; the Sheet's "CRM Status" column shows what to retry.
  return json({ ok: true }, 200, cors);
}
