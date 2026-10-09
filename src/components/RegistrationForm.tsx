import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLang } from "../i18n/LanguageContext";
import { REGISTER_ENDPOINT } from "../leadConfig";
import { Check } from "./Icons";
import {
  EXPERIENCE_OPTIONS,
  QATAR_DIAL,
  cleanName,
  formatMobile,
  normalizeMobile,
  validateRegistration,
  type RegisterResponse,
  type RegistrationInput,
} from "../registration";

type Status = "idle" | "sending" | "success";
type Field = keyof RegistrationInput;

// Campaign parameters captured with every registration.
const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

function readTracking(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of TRACKING_KEYS) {
      const value = params.get(key);
      if (value) out[key] = value.slice(0, 200);
    }
  } catch {
    /* ignore */
  }
  return out;
}

export default function RegistrationForm() {
  const { t, lang } = useLang();
  const r = t.register;

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [experience, setExperience] = useState("");
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [duplicate, setDuplicate] = useState(false);
  const [failed, setFailed] = useState(false);
  const [confirmed, setConfirmed] = useState({ name: "", phone: "" });
  const successRef = useRef<HTMLHeadingElement>(null);

  const input: RegistrationInput = { fullName, mobile, experience, consent };
  const errors = validateRegistration(input);
  const isValid = Object.keys(errors).length === 0 && !duplicate;

  const touch = (field: Field) =>
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  const errorFor = (field: Field) =>
    touched[field] && errors[field] ? r.errors[errors[field]!] : null;

  useEffect(() => {
    if (status !== "success") return;
    successRef.current?.focus({ preventScroll: true });
    successRef.current
      ?.closest(".form-card")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    setTouched({ fullName: true, mobile: true, experience: true, consent: true });
    if (!isValid) return;

    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)
      ?.value;

    setFailed(false);
    setStatus("sending");
    const name = cleanName(fullName);
    const tracking = readTracking();
    const succeed = () => {
      setConfirmed({
        name: name.split(" ")[0],
        phone: `${QATAR_DIAL} ${formatMobile(mobile)}`,
      });
      setStatus("success");
    };

    let json: RegisterResponse | null = null;
    try {
      const res = await fetch(REGISTER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          mobile,
          experience,
          consent,
          language: lang,
          pageUrl: window.location.href.slice(0, 500),
          referrer: document.referrer.slice(0, 500),
          tracking,
          website: honeypot ?? "",
        }),
      });
      json = (await res.json().catch(() => null)) as RegisterResponse | null;
    } catch {
      json = null;
    }

    if (json?.ok) return succeed();
    if (json && !json.ok && json.code === "duplicate") {
      setDuplicate(true);
      setStatus("idle");
      return;
    }
    setFailed(true);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <section className="section section--dark register" id="register">
        <div className="container">
          <div className="form-card form-card--success" role="status">
            <span className="form-success__icon" aria-hidden="true">
              <Check size={28} />
            </span>
            <h2 className="form-card__title" ref={successRef} tabIndex={-1}>
              {r.success.title}
            </h2>
            <p className="form-success__body">
              {r.success.body.replace("{name}", confirmed.name)}
            </p>
            <p className="form-success__detail">
              {r.success.detail.split("{phone}")[0]}
              <bdi dir="ltr">{confirmed.phone}</bdi>
              {r.success.detail.split("{phone}")[1]}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const nameError = errorFor("fullName");
  const mobileError = duplicate ? r.duplicate : errorFor("mobile");
  const experienceError = errorFor("experience");
  const consentError = errorFor("consent");

  return (
    <section className="section section--dark register" id="register">
      <div className="container">
        <form className="form-card reveal" onSubmit={handleSubmit} noValidate>
          <h2 className="form-card__title">{r.title}</h2>
          <p className="form-card__sub">{r.subtitle}</p>

          <div className={`field${nameError ? " field--invalid" : ""}`}>
            <label htmlFor="fullName">{r.name}</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              autoCapitalize="words"
              enterKeyHint="next"
              maxLength={100}
              placeholder={r.namePlaceholder}
              value={fullName}
              onInput={(e) => setFullName(e.currentTarget.value)}
              onBlur={() => fullName && touch("fullName")}
              aria-invalid={nameError ? true : undefined}
              aria-describedby={nameError ? "fullName-error" : undefined}
              required
            />
            {nameError && (
              <p className="field__error" id="fullName-error">
                {nameError}
              </p>
            )}
          </div>

          <div className={`field${mobileError ? " field--invalid" : ""}`}>
            <label htmlFor="mobile">{r.mobile}</label>
            <div className="phone-row" dir="ltr">
              <span className="phone-code">
                <img
                  className="flag"
                  src="/flags/qa.png"
                  alt=""
                  width={20}
                  height={15}
                  decoding="async"
                />
                {QATAR_DIAL}
              </span>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                enterKeyHint="next"
                placeholder={r.mobilePlaceholder}
                value={mobile}
                onInput={(e) => {
                  const digits = normalizeMobile(e.currentTarget.value);
                  // Keep the field showing only accepted digits.
                  e.currentTarget.value = digits;
                  setMobile(digits);
                  setDuplicate(false);
                  if (digits.length === 8) touch("mobile");
                }}
                onBlur={() => mobile && touch("mobile")}
                aria-invalid={mobileError ? true : undefined}
                aria-describedby={mobileError ? "mobile-error" : undefined}
                required
              />
            </div>
            {mobileError && (
              <p className="field__error" id="mobile-error" role={duplicate ? "alert" : undefined}>
                {mobileError}
              </p>
            )}
          </div>

          <fieldset
            className={`field choice${experienceError ? " field--invalid" : ""}`}
            aria-describedby={experienceError ? "experience-error" : undefined}
          >
            <legend>{r.experience}</legend>
            {EXPERIENCE_OPTIONS.map((option) => (
              <label className="choice__option" key={option}>
                <input
                  type="radio"
                  name="experience"
                  value={option}
                  checked={experience === option}
                  onChange={() => {
                    setExperience(option);
                    touch("experience");
                  }}
                  required
                />
                <span>{r.experienceOptions[option]}</span>
              </label>
            ))}
            {experienceError && (
              <p className="field__error" id="experience-error">
                {experienceError}
              </p>
            )}
          </fieldset>

          <label className={`consent${consentError ? " consent--invalid" : ""}`}>
            <input
              type="checkbox"
              name="consent"
              checked={consent}
              onChange={(e) => {
                setConsent(e.currentTarget.checked);
                touch("consent");
              }}
              aria-invalid={consentError ? true : undefined}
              required
            />
            <span>{r.consent}</span>
          </label>
          {consentError && <p className="field__error consent__error">{consentError}</p>}

          {/* Honeypot: hidden from real users, catches bots. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hp"
            aria-hidden="true"
          />

          <button
            type="submit"
            className="btn btn--primary btn--block"
            disabled={!isValid || status === "sending"}
            aria-busy={status === "sending" || undefined}
          >
            {status === "sending" ? r.sending : r.button}
          </button>
          <p className="form-microcopy">{r.microcopy}</p>

          {failed && (
            <p className="form-error" role="alert">
              {r.error}
            </p>
          )}

        </form>
      </div>
    </section>
  );
}
