import Header from "../components/header/Header";
import Footer from '../components/footer/Footer';
import Trains from '../components/Trains/Trains';

export default function TrainsPage() {
    return (
        <div className="trains">
            <Header background='src/assets/images/second-banner.png'/>
            <Trains />
            <Footer />
        </div>
    );
}
