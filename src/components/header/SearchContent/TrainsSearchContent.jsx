import SearchForm from "./SearchForm";
import ProgressStep from "./ProgressStep";

export default function TrainsSearchContent() {
    return (
        <div className="header-search-content trains-page">
            <div className="trains-form-wrapper">
                <SearchForm isTrainsPage={true} />
            </div>
            <div className="trains-progress-wrapper">
                <ProgressStep />
            </div>
        </div>
    );
}
