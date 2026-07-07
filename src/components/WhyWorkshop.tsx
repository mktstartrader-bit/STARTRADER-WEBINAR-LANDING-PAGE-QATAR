import { Coins, BarChart, Refresh } from "./Icons";

export default function WhyWorkshop() {
  return (
    <section className="section section--surface">
      <div className="container">
        <div className="why__panel reveal">
          <h2 className="why__title">Why this workshop</h2>
          <p className="why__sub">
            Market moves can be overwhelming. We can help simplify it
          </p>

          <div className="why__cards stagger">
            <div className="why__card">
              <Coins size={24} />
              <span>
                Gold, oil, the dollar, the relationship between different assets
                can be difficult to navigate.
              </span>
            </div>
            <div className="why__card">
              <BarChart size={24} />
              <span>
                If you feel confused about the market, this workshop is for you.
              </span>
            </div>
            <div className="why__card why__card--wide">
              <Refresh size={24} />
              <span>
                It is built to help you stop reacting to every update and start
                using a clearer process for what to focus on, what to ignore,
                and what to do next.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
