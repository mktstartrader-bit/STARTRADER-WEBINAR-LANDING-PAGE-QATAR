import { Check } from "./Icons";

const items = [
  "A simple process for deciding what deserves your attention",
  "A clearer way to find useful information about the market",
  "A practical routine for following Gold, Oil, and economic events",
  "A stronger understanding of how experienced participants view markets",
  "More confidence in interpreting market moves",
];

export default function WalkAway() {
  return (
    <section className="section">
      <div className="container">
        <div className="who__head reveal">
          <h2 className="section-title">What you'll walk away with</h2>
          <p className="section-subtitle">
            Leave With a Clear Vision of How Markets Move. By the end of the
            workshop, you will have:
          </p>
        </div>

        <div className="checklist stagger">
          {items.map((item) => (
            <div className="checklist__row" key={item}>
              <Check size={24} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
