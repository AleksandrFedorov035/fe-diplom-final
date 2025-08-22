import { useState } from 'react';
import { useSearchForm } from '../../../../context/SearchFormContext';

export default function Inputs({ isReturn = false }) {
    const { searchData, updateSearchData } = useSearchForm();
    const keyPrefix = isReturn ? 'end' : 'start';

    const [fromHour, setFromHour] = useState(searchData[`${keyPrefix}_departure_hour_from`] || 0);
    const [toHour, setToHour] = useState(searchData[`${keyPrefix}_departure_hour_to`] || 24);
    const [fromArrHour, setFromArrHour] = useState(searchData[`${keyPrefix}_arrival_hour_from`] || 0);
    const [toArrHour, setToArrHour] = useState(searchData[`${keyPrefix}_arrival_hour_to`] || 24);

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const onDepartFromChange = (e) => {
        const v = clamp(Number(e.target.value), 0, toHour);
        setFromHour(v);
        updateSearchData({ [`${keyPrefix}_departure_hour_from`]: v });
    };
    const onDepartToChange = (e) => {
        const v = clamp(Number(e.target.value), fromHour, 24);
        setToHour(v);
        updateSearchData({ [`${keyPrefix}_departure_hour_to`]: v });
    };
    const onArrFromChange = (e) => {
        const v = clamp(Number(e.target.value), 0, toArrHour);
        setFromArrHour(v);
        updateSearchData({ [`${keyPrefix}_arrival_hour_from`]: v });
    };
    const onArrToChange = (e) => {
        const v = clamp(Number(e.target.value), fromArrHour, 24);
        setToArrHour(v);
        updateSearchData({ [`${keyPrefix}_arrival_hour_to`]: v });
    };

    const leftDep = (fromHour/24)*100;
    const rightDep = (toHour/24)*100;
    const leftArr = (fromArrHour/24)*100;
    const rightArr = (toArrHour/24)*100;

    return (
        <div className="inputs">
            <div className="from">
                <div className="div">Время отбытия</div>
                <div className="range-wrapper">
                    <div className="track" />
                    <div className="range" style={{ left: `${leftDep}%`, right: `${100 - rightDep}%` }} />
                    <input className="range-input" type="range" min={0} max={24} value={fromHour} onChange={onDepartFromChange} />
                    <input className="range-input" type="range" min={0} max={24} value={toHour} onChange={onDepartToChange} />
                </div>
                <div className="block-time">
                    <span>0:00</span>
                    <span>24:00</span>
                </div>
            </div>
            <div className="to">
                <div className="div">Время прибытия</div>
                <div className="range-wrapper">
                    <div className="track" />
                    <div className="range" style={{ left: `${leftArr}%`, right: `${100 - rightArr}%` }} />
                    <input className="range-input" type="range" min={0} max={24} value={fromArrHour} onChange={onArrFromChange} />
                    <input className="range-input" type="range" min={0} max={24} value={toArrHour} onChange={onArrToChange} />
                </div>
                <div className="block-time">
                    <span>0:00</span>
                    <span>24:00</span>
                </div>
            </div>
        </div>
    )
}
