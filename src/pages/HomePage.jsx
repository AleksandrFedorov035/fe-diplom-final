import Header from "../components/header/Header";
import mainBanner from '../assets/images/main-banner.png';
import About from "../components/About/About";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Reviews from "../components/reviews/reviews";
import Footer from "../components/footer/Footer";

export default function HomePage() {
  return (
    <div className="home">
      <Header background={mainBanner} borderBottom='8px solid #FFA800'/>
      <main>
        <About />
        <HowItWorks />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
