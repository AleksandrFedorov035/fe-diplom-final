import SearchForm from "./SearchForm";
import ProgressStep from "./ProgressStep";
import { useSearchForm } from "../../../context/SearchFormContext";

export default function TrainsSearchContent() {
    const { isSearching, searchProgress } = useSearchForm();
    return (
        <div className="header-search-content trains-page">
            <div className="trains-form-wrapper">
                <SearchForm isTrainsPage={true} />
            </div>
            <div className="trains-progress-wrapper">
                {!isSearching && (
                    <ProgressStep style={{ display: 'block' }} />
                )}
            </div>
        </div>
    );
}
