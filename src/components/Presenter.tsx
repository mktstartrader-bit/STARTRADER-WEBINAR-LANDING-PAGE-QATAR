import presenter from "../assets/presenter.jpg";
import mediaMain from "../assets/media-main.jpg";
import media2 from "../assets/media-2.jpg";
import media3 from "../assets/media-3.jpg";

const stats = [
  { num: "10+", cap: "Years in markets" },
  { num: "100s", cap: "Educational sessions" },
  { num: "1,000s", cap: "Followers guided" },
];

export default function Presenter() {
  return (
    <section className="section">
      <div className="container">
        <div className="presenter__grid">
          <div className="presenter__photo reveal reveal--left">
            <img src={presenter} alt="Ghassan Albohtori, Senior Market Analyst" />
            <div className="presenter__stats">
              {stats.map((s) => (
                <div className="presenter__stat" key={s.cap}>
                  <div className="num">{s.num}</div>
                  <div className="cap">{s.cap}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="presenter__info reveal reveal--right">
            <p className="presenter__eyebrow">Meet Your Presenter</p>
            <h2 className="presenter__name">Ghassan Albohtori</h2>
            <p className="presenter__role">Senior Market Analyst · STARTRADER</p>

            <div className="presenter__bio">
              <p>
                With more than 10 years of experience in financial markets,
                Ghassan has helped thousands of market followers better
                understand global economic developments, commodities, and market
                behavior.
              </p>
              <p>
                Through hundreds of educational sessions and media appearances,
                he has become known for simplifying complex market topics and
                helping participants connect market events with real-world
                implications.
              </p>
              <p>
                His interactive approach encourages discussion, practical
                thinking, and a clearer understanding of how experienced market
                participants interpret changing market conditions.
              </p>
            </div>

            <div className="presenter__media stagger">
              <img className="wide" src={mediaMain} alt="Ghassan presenting a live market session" />
              <img className="small" src={media2} alt="Media appearance" />
              <img className="small" src={media3} alt="Media appearance" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
