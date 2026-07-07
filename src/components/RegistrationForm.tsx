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
          <h2 className="form-card__title">Reserve Your Free Seat</h2>

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
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@example.com"
              required
            />
          </div>

          <p className="form-note">
            Enter your correct mobile number so our team can send access details,
            reminders, and contact you before the session to help you attend
            smoothly.
          </p>

          <button type="submit" className="btn btn--primary btn--block">
            {submitted ? "You're Registered ✓" : "Reserve My Free Seat"}
          </button>

          <p className="form-microcopy">Takes less than 60 seconds to register</p>
        </form>

        <p className="register__caption">
          Free registration · Live session · Instant confirmation
        </p>
      </div>
    </section>
  );
}
