import { useEffect, useRef, useState } from 'react';
import Calendar from '../../../Calendar/Calendar';
import { useSearchForm } from '../../../../context/SearchFormContext';

export default function Dates() {
    const { searchData, updateSearchData } = useSearchForm();
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const startRef = useRef(null);
    const endRef = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (startRef.current && !startRef.current.contains(e.target)) setShowStart(false);
            if (endRef.current && !endRef.current.contains(e.target)) setShowEnd(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    const formatDate = (date) => {
        if (!date) return '';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="filter-section">
            <div className="filter-section-container">
                <h3>Дата поездки</h3>
                <div className="date-input-container" ref={startRef}>
                    <input
                        type="text"
                        placeholder="ДД/ММ/ГГ"
                        readOnly
                        className="date-input"
                        value={formatDate(searchData.startDate)}
                        onClick={() => setShowStart((s) => !s)}
                    />
                    <img
                        src="src/assets/images/calendar.png"
                        alt="calendar"
                        className="calendar-icon"
                        onClick={() => setShowStart((s) => !s)}
                    />
                    {showStart && (
                        <Calendar
                            selectedDate={searchData.startDate}
                            onDateSelect={(d) => updateSearchData({ startDate: d })}
                            onClose={() => setShowStart(false)}
                        />
                    )}
                </div>
                <h3>Дата возвращения</h3>
                <div className="date-input-container" ref={endRef}>
                    <input
                        type="text"
                        placeholder="ДД/ММ/ГГ"
                        readOnly
                        className="date-input"
                        value={formatDate(searchData.endDate)}
                        onClick={() => setShowEnd((s) => !s)}
                    />
                    <img
                        src="src/assets/images/calendar.png"
                        alt="calendar"
                        className="calendar-icon"
                        onClick={() => setShowEnd((s) => !s)}
                    />
                    {showEnd && (
                        <Calendar
                            selectedDate={searchData.endDate}
                            onDateSelect={(d) => updateSearchData({ endDate: d })}
                            onClose={() => setShowEnd(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
