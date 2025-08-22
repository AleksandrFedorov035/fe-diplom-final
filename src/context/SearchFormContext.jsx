import { createContext, useContext, useState } from 'react';

const SearchFormContext = createContext();

export const useSearchForm = () => {
    const context = useContext(SearchFormContext);
    if (!context) throw new Error('useSearchForm must be used within a SearchFormProvider');
    return context;
};

export const SearchFormProvider = ({ children }) => {
    const [searchData, setSearchData] = useState({
        fromCity: '',
        toCity: '',
        fromCityId: '',
        toCityId: '',
        startDate: null,
        endDate: null,
        // filters
        have_first_class: false,
        have_second_class: false,
        have_third_class: false,
        have_fourth_class: false,
        have_wifi: false,
        have_express: false,
        price_from: 1920,
        price_to: 7000,
        start_departure_hour_from: 0,
        start_departure_hour_to: 24,
        start_arrival_hour_from: 0,
        start_arrival_hour_to: 24,
        end_departure_hour_from: 0,
        end_departure_hour_to: 24,
        end_arrival_hour_from: 0,
        end_arrival_hour_to: 24
    });

    const [isSearching, setIsSearching] = useState(false);
    const [searchProgress, setSearchProgress] = useState(0);

    const updateSearchData = (newData) => {
        setSearchData(prev => ({ ...prev, ...newData }));
    };

    const clearSearchData = () => {
        setSearchData({
            fromCity: '',
            toCity: '',
            startDate: null,
            endDate: null
        });
    };

    const startSearch = () => {
        setIsSearching(true);
        setSearchProgress(0);
        // Здесь можно добавить логику для начала поиска
    };

    const finishSearch = () => {
        setIsSearching(false);
        setSearchProgress(100);
        // Здесь можно добавить логику для завершения поиска
    };

    return (
        <SearchFormContext.Provider value={{
            searchData,
            updateSearchData,
            clearSearchData,
            isSearching,
            setIsSearching,
            searchProgress,
            setSearchProgress,
            startSearch,
            finishSearch
        }}>
            {children}
        </SearchFormContext.Provider>
    );
};
