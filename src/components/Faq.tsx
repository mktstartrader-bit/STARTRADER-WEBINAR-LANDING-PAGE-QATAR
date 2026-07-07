import { useState } from "react";
import { Plus, Minus } from "./Icons";
import { useLang } from "../i18n/LanguageContext";

export default function Faq() {
  const { t } = useLang();
  const faqs = t.faq.items;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section">
      <div className="container">
        <div className="faq">
          <h2 className="section-title faq__title reveal">{t.faq.title}</h2>

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
