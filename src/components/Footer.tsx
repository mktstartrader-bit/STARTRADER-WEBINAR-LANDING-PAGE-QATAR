import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <img className="footer__logo" src={logo} alt="STARTRADER" />
        <p className="footer__disclaimer">
          Trading involves risk. CFD trading is not suitable for all investors.
          This workshop is for educational purposes only and does not constitute
          financial advice, investment advice, or a recommendation to buy or sell
          any financial product.
        </p>
      </div>
    </footer>
  );
}
