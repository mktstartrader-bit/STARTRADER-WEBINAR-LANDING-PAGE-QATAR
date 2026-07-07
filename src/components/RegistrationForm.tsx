import { useState, type FormEvent } from "react";
import { QatarFlag } from "./Icons";
import { useLang } from "../i18n/LanguageContext";

export default function RegistrationForm() {
  const { t } = useLang();
  const r = t.register;
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

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

          <p className="form-note">{r.note}</p>

          <button type="submit" className="btn btn--primary btn--block">
            {submitted ? r.submitted : r.button}
          </button>

          <p className="form-microcopy">{r.microcopy}</p>
        </form>

        <p className="register__caption">{r.caption}</p>
      </div>
    </section>
  );
}
