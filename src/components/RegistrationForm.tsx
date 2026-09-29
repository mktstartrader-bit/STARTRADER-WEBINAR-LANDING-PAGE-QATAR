import { useState, type FormEvent } from "react";
import { useLang } from "../i18n/LanguageContext";
import { COUNTRIES, flagUrl } from "../countries";
import {
  WEB3FORMS_ACCESS_KEY,
  LEAD_CC,
  LEAD_SUBJECT,
  LEAD_FROM_NAME,
} from "../leadConfig";

type Status = "idle" | "sending" | "success" | "error";

export default function RegistrationForm() {
  const { t, lang } = useLang();
  const r = t.register;
  const [status, setStatus] = useState<Status>("idle");
  const [iso, setIso] = useState(COUNTRIES[0].iso);
  const country = COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES[0];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || status === "success") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", LEAD_SUBJECT);
    data.append("from_name", LEAD_FROM_NAME);
    if (LEAD_CC.length > 0) data.append("cc", LEAD_CC.join(", "));

    // Send readable values: country name + dial-ready mobile number.
    data.set("country", country.en);
    const mobile = String(data.get("mobile") ?? "").trim();
    if (mobile) data.set("mobile", `${country.dial} ${mobile}`);
    data.set("agreedToTerms", "Yes");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
        setIso(COUNTRIES[0].iso);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const buttonLabel =
    status === "sending"
      ? r.sending
      : status === "success"
        ? r.submitted
        : r.button;

  return (
    <section className="section section--dark register" id="register">
      <div className="container">
        <form className="form-card reveal" onSubmit={handleSubmit}>
          <h2 className="form-card__title">{r.title}</h2>
          <p className="form-card__sub">{r.subtitle}</p>

          <div className="field">
            <label htmlFor="country">{r.country}</label>
            <div className="select-wrap">
              <img
                className="flag"
                src={flagUrl(country.iso)}
                alt=""
                width={20}
                height={15}
                loading="lazy"
                decoding="async"
              />
              <select
                id="country"
                name="country"
                value={iso}
                onChange={(e) => setIso(e.target.value)}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.iso} value={c.iso}>
                    {lang === "ar" ? c.ar : c.en}
                  </option>
                ))}
              </select>
              <svg
                className="chevron"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                aria-hidden="true"
              >
                <path
                  d="M2.5 4.5 6 8l3.5-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="field">
            <label htmlFor="mobile">{r.mobile}</label>
            <div className="phone-row" dir="ltr">
              <span className="phone-code">
                <img
                  className="flag"
                  src={flagUrl(country.iso)}
                  alt=""
                  width={20}
                  height={15}
                  loading="lazy"
                  decoding="async"
                />
                {country.dial}
              </span>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder={country.placeholder}
                pattern="[0-9 ]{6,15}"
                title={r.phoneHint}
                required
              />
            </div>
          </div>

          <label className="consent">
            <input type="checkbox" name="terms" required />
            <span>
              {r.consent.before}
              <a href={r.consent.termsUrl} target="_blank" rel="noopener">
                {r.consent.terms}
              </a>
              {r.consent.and}
              <a href={r.consent.privacyUrl} target="_blank" rel="noopener">
                {r.consent.privacy}
              </a>
              {r.consent.after}
            </span>
          </label>

          {/* Honeypot: hidden from real users, catches bots. */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            style={{ display: "none" }}
            aria-hidden="true"
          />

          <button
            type="submit"
            className="btn btn--primary btn--block"
            disabled={status === "sending" || status === "success"}
          >
            {buttonLabel}
          </button>

          {status === "error" && (
            <p className="form-error" role="alert">
              {r.error}
            </p>
          )}

          <p className="form-signin">
            {r.haveAccount}{" "}
            <a href={r.signInUrl} target="_blank" rel="noopener">
              {r.signIn}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
