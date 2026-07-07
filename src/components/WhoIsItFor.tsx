import { Check } from "./Icons";

const items = [
  "You follow Gold, Oil, Forex, or global market news",
  "You watch market updates but still feel unsure what matters most",
  "You do not want to depend on random opinions or signals",
  "You want a clear way for reading market movement",
  "You have traded before but want more structure",
  "You are considering your next step and want more clarity first",
];

export default function WhoIsItFor() {
  return (
    <section className="section">
      <div className="container">
        <div className="who__head reveal">
          <h2 className="section-title">Who is it for</h2>
          <p className="section-subtitle">
            This Workshop Is For Market Followers Who Want More Clarity
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

        <div className="who__tags stagger">
          <span className="who__tag">
            <Check size={18} />
            No advanced knowledge is required.
          </span>
          <span className="who__tag">
            <Check size={18} />
            You just need a better way to deal with market data.
          </span>
        </div>
      </div>
    </section>
  );
}
