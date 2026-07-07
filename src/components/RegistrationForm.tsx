import { useState, type FormEvent } from "react";
import { QatarFlag } from "./Icons";

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="section section--dark register" id="register">
      <div className="container">
        <form className="form-card reveal" onSubmit={handleSubmit}>
          <h2 className="form-card__title">Save My Free Seat</h2>

          <div className="field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="field field--phone">
            <label htmlFor="mobile">Mobile Number</label>
            <div className="phone-wrap">
              <QatarFlag size={26} />
              <span className="code">+974</span>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="tel"
                placeholder="5000 0000"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@example.com"
              required
            />
          </div>

          <p className="form-note">
            Please ensure your phone number is correct so you can receive webinar
            access details and reminders. A <b>STARTRADER</b> team member may
            contact you before the session if needed.
          </p>

          <button type="submit" className="btn btn--primary btn--block">
            {submitted ? "You're Registered ✓" : "Save My Free Seat"}
          </button>
        </form>

        <p className="register__caption">
          Free registration · Limited live seats · Instant confirmation
        </p>
      </div>
    </section>
  );
}
