import { useState } from "react";
import { Plus, Minus } from "./Icons";

const faqs = [
  {
    q: "Is this workshop free?",
    a: "Yes. Registration and attendance are free.",
  },
  {
    q: "Do I need trading experience?",
    a: "No. Basic market interest is enough. The workshop is designed for people who already follow markets and want a clearer process.",
  },
  {
    q: "Who is this workshop for?",
    a: "People who follow Gold, Oil, Forex, currencies, or global market news and want a clearer way to deal with market noise.",
  },
  {
    q: "Will I receive trading signals?",
    a: "No. This is not a signals session. The workshop is designed to help you build your own process for reading market movement.",
  },
  {
    q: "What markets will be discussed?",
    a: "Gold, Oil, the US dollar, and major economic events will be used as practical examples.",
  },
  {
    q: "Will there be a recording?",
    a: "Yes. Registered attendees will receive the recording after the session.",
  },
  {
    q: "What language is the workshop in?",
    a: "The workshop will be available in English and Arabic.",
  },
  {
    q: "How will I receive access?",
    a: "Access details and reminders will be sent by email and/or mobile before the workshop. A STARTRADER team member may also contact you if support is needed before the session.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section">
      <div className="container">
        <div className="faq">
          <h2 className="section-title faq__title reveal">
            Frequently Asked Questions
          </h2>

          <div className="faq__list stagger">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
              <div className="faq__item" data-open={isOpen} key={item.q}>
                <button
                  className="faq__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>
                    <span className="idx">{i + 1}.</span>
                    {item.q}
                  </span>
                  <span className="faq__toggle">
                    {isOpen ? <Minus size={20} /> : <Plus size={18} />}
                  </span>
                </button>
                <div className="faq__a">
                  <div className="faq__a-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
