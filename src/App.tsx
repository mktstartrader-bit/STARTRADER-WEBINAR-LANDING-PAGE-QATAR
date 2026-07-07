import { useScrollReveal } from "./hooks/useScrollReveal";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RegistrationForm from "./components/RegistrationForm";
import WhyWorkshop from "./components/WhyWorkshop";
import WhoIsItFor from "./components/WhoIsItFor";
import WalkAway from "./components/WalkAway";
import InsideWorkshop from "./components/InsideWorkshop";
import Presenter from "./components/Presenter";
import RegistrationIncludes from "./components/RegistrationIncludes";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";

export default function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <RegistrationForm />
        <WhyWorkshop />
        <WhoIsItFor />
        <WalkAway />
        <InsideWorkshop />
        <Presenter />
        <RegistrationIncludes />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
