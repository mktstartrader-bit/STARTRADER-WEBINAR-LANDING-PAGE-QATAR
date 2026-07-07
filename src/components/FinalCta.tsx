// Ordered so the layout wraps to 3 pills on the first row and the long
// "Leave with a clearer process…" pill centered on its own second row,
// matching the Figma composition.
const pills = [
  "Join this free live workshop",
  "Walk in with market noise.",
  "Registration is free and takes less than a minute.",
  "Leave with a clearer process for deciding what matters next.",
];

export default function FinalCta() {
  return (
    <section className="section section--dark final">
      <div className="container">
        <h2 className="final__title reveal">
          Markets Keep Moving, Know What Matters.
        </h2>
        <p className="final__sub reveal">
          When Gold moves, oil reacts, or new economic news breaks, you should
          not have to start from zero every time.
        </p>

        <div className="final__pills stagger">
          {pills.map((p) => (
            <span className="final__pill" key={p}>
              {p}
            </span>
          ))}
        </div>

        <a href="#register" className="btn btn--primary reveal">
          Reserve My Free Seat
        </a>
      </div>
    </section>
  );
}
