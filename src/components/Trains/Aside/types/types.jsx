import { useMemo } from "react";
import FilterElement from "./filterElement"
import { useSearchForm } from '../../../../context/SearchFormContext';

export default function Types() {
    const { searchData, updateSearchData } = useSearchForm();

    const filtersContext = [
        {
            url: 'src/assets/images/trains-types/coupe.svg',
            text: 'Купе',
            id: 'have_second_class',
        },
        {
            url: 'src/assets/images/trains-types/placcart.svg',
            text: 'Плацкарт',
            id: 'have_third_class',
        },
        {
            url: 'src/assets/images/trains-types/sedentary.svg',
            text: 'Сидячий',
            id: 'have_fourth_class',
        },
        {
            url: 'src/assets/images/trains-types/lux.svg',
            text: 'Люкс',
            id: 'have_first_class',
        },
        {
            url: 'src/assets/images/trains-types/wifi.svg',
            text: 'Wi-Fi',
            id: 'have_wifi',
        },
        {
            url: 'src/assets/images/trains-types/rocket.svg',
            text: 'Экспресс',
            id: 'have_express',
        },
    ]

    return (
        <div className="filter-section">
            <ul className="checkbox-group">
                {filtersContext.map((el, index) => {
                    return (
                        <li key={index}>
                            <FilterElement
                                el={el}
                                checked={!!searchData[el.id]}
                                onChange={(checked)=>updateSearchData({ [el.id]: checked })}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
