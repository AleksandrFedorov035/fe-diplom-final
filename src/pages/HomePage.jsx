import Header from "../components/header/Header";
import About from "../components/About/About";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Reviews from "../components/reviews/Reviews";
import Footer from "../components/footer/Footer";
const base = import.meta.env.BASE_URL;
export default function HomePage() {
  return (
    <div className="home">
      <Header
        background={base + "/main-banner.png"}
        borderBottom="8px solid #FFA800"
      />
      <main>
        <About />
        <HowItWorks />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
