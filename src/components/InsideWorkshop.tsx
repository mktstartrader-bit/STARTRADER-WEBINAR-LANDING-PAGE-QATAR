import {
  TrendingUp,
  Droplet,
  DollarSign,
  CalendarCheck,
  MessageSquare,
} from "./Icons";

const rows = [
  {
    icon: <TrendingUp size={24} />,
    text: "Why market information creates confusion, and why more news does not always mean better decisions",
  },
  {
    icon: <Droplet size={24} />,
    text: "How experienced market participants filter market noise and focus on what matters first",
  },
  {
    icon: <DollarSign size={24} />,
    text: "Applying the process to Gold, Oil, the US dollar, and recent market events",
  },
  {
    icon: <CalendarCheck size={24} />,
    text: "Building a simple market routine you can use before reacting to market moves",
  },
  {
    icon: <MessageSquare size={24} />,
    text: "Live Q&A with the analyst",
  },
];

export default function InsideWorkshop() {
  return (
    <section className="section section--dark">
      <div className="container">
        <div className="inside__head reveal">
          <h2 className="section-title">Inside the workshop</h2>
          <p className="inside__sub">60-Minute Live Workshop</p>
        </div>

        <div className="inside__list stagger">
          {rows.map((row) => (
            <div key={row.text} className="inside__row">
              <span className="inside__icon">{row.icon}</span>
              <span>{row.text}</span>
            </div>
          ))}
        </div>

        <div className="inside__cta reveal">
          <a href="#register" className="btn btn--primary">
            Reserve My Free Seat
          </a>
        </div>
      </div>
    </section>
  );
}
