import SearchForm from "./SearchForm";

export default function SearchContent() {
    return (
        <div className="header-search-content">
            <div className="search-content-left">
                <h1>Вся жизнь - <span>путешествие!</span></h1>
            </div>
            <div className="search-content-right">
                <SearchForm />
            </div>
        </div>
    );
}
