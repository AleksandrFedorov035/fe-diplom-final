import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";
import SearchContent from "./SearchContent/SearchContent";
import TrainsSearchContent from "./SearchContent/TrainsSearchContent";
import './header.css'


export default function Header({ background, borderBottom }) {
    const isTrainsPage = background && background.includes('second-banner');

    return (
        <header className="header" style={{
            backgroundImage: background ? `url(${background})` : "none",
            borderBottom: borderBottom ? borderBottom : "none"
        }}>
            <Logo />
            <Menu />

            {isTrainsPage ? <TrainsSearchContent /> : <SearchContent />}
        </header>
    )
}
