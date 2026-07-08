import { useState, type FormEvent } from "react";
import { QatarFlag } from "./Icons";
import { useLang } from "../i18n/LanguageContext";
import {
  WEB3FORMS_ACCESS_KEY,
  LEAD_CC,
  LEAD_SUBJECT,
  LEAD_FROM_NAME,
} from "../leadConfig";

type Status = "idle" | "sending" | "success" | "error";

export default function RegistrationForm() {
  const { t } = useLang();
  const r = t.register;
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || status === "success") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", LEAD_SUBJECT);
    data.append("from_name", LEAD_FROM_NAME);
    if (LEAD_CC.length > 0) data.append("cc", LEAD_CC.join(", "));

    // Store the mobile with its country code so the lead is dial-ready.
    const mobile = String(data.get("mobile") ?? "").trim();
    if (mobile) data.set("mobile", `+974 ${mobile}`);

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

          <div className="field">
            <label htmlFor="fullName">{r.fullName}</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder={r.fullNamePlaceholder}
              required
            />
          </div>

          <div className="field field--phone">
            <label htmlFor="mobile">{r.mobile}</label>
            <div className="phone-wrap">
              <QatarFlag size={26} />
              <span className="code" dir="ltr">
                +974
              </span>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="tel"
                placeholder={r.phonePlaceholder}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">{r.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={r.emailPlaceholder}
              required
            />
          </div>

          {/* Honeypot: hidden from real users, catches bots. */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            style={{ display: "none" }}
            aria-hidden="true"
          />

          <p className="form-note">{r.note}</p>

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

          <p className="form-microcopy">{r.microcopy}</p>
        </form>

        <p className="register__caption">{r.caption}</p>
      </div>
    </section>
  );
}
