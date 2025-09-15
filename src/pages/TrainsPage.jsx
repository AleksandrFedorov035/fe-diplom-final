import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Trains from "../components/Trains/Trains";
const base = import.meta.env.BASE_URL;
export default function TrainsPage() {
  return (
    <div className="trains">
      <Header background={base + "/second-banner.png"} />
      <Trains />
      <Footer />
    </div>
  );
}
