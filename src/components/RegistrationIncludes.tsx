import nba from "../assets/nba.svg";
import porsche from "../assets/porsche.png";

const toolkit = [
  "Full workshop recording",
  "Presentation slides",
  "Market Decision Checklist",
  "Weekly Market Routine",
  "Economic Event Prioritization Guide",
  "Live Q&A access",
];

export default function RegistrationIncludes() {
  return (
    <section className="section section--fade">
      <div className="container">
        <div className="includes__grid stagger">
          {/* Included with registration */}
          <div className="card-panel">
            <h3 className="card-panel__title">Included With Your Registration</h3>
            <p className="includes__toolkit">
              <b>Your Market Decision Toolkit</b>
              <br />
              Every registered attendee receives:
            </p>
            <ul className="includes__list">
              {toolkit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="includes__note">
              These resources are designed to help you keep using the process
              after the workshop ends.
            </p>
          </div>

          {/* About STARTRADER */}
          <div className="card-panel">
            <h3 className="card-panel__title">About STARTRADER</h3>
            <div className="about__text">
              <p>
                STARTRADER is a globally regulated multi-asset broker providing
                access to financial markets, trading technology, analyst-led
                insights, and market education.
              </p>
              <p>
                Trusted by clients globally and supported by global partnerships
                including the{" "}
                <b>NBA and Porsche Carrera Cup Middle East,</b> STARTRADER
                remains committed to helping traders and market followers better
                understand <b>financial markets</b> through{" "}
                <b>
                  analyst-led sessions, educational resources, and market
                  insights.
                </b>
              </p>
            </div>
            <div className="about__logos">
              <img className="nba" src={nba} alt="NBA official partner" />
              <img
                className="porsche"
                src={porsche}
                alt="Porsche Carrera Cup Middle East partner"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
