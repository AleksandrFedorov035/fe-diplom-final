import { useState } from 'react';
import { useSearchForm } from '../../../../context/SearchFormContext';

export default function Cost() {
    const { searchData, updateSearchData } = useSearchForm();
    const [localFrom, setLocalFrom] = useState(searchData.price_from);
    const [localTo, setLocalTo] = useState(searchData.price_to);

    const min = 1920;
    const max = 7000;

    const onFromChange = (e) => {
        const val = Math.min(Number(e.target.value), localTo);
        setLocalFrom(val);
        updateSearchData({ price_from: val });
    };
    const onToChange = (e) => {
        const val = Math.max(Number(e.target.value), localFrom);
        setLocalTo(val);
        updateSearchData({ price_to: val });
    };

    const left = ((localFrom - min) / (max - min)) * 100;
    const right = ((localTo - min) / (max - min)) * 100;

    return (
        <div className="filter-section cost">
            <h3>Стоимость</h3>
            <div className="price-range">
                <div className="range-block white">
                    <span>от</span>
                    <span>до</span>
                </div>
                <div className="price-slider">
                    <div className="track" />
                    <div className="range" style={{ left: `${left}%`, right: `${100 - right}%` }} />
                    <input type="range" min={min} max={max} value={localFrom} onChange={onFromChange} className="range-input" />
                    <input type="range" min={min} max={max} value={localTo} onChange={onToChange} className="range-input" />
                </div>
                <div className="range-block">
                    <span>{localFrom}</span>
                    <span>{localTo}</span>
                </div>
            </div>
        </div>
    )
}
