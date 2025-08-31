import { useState, useEffect, useRef } from "react";
import FindTickets from "../../Buttons/FindTicket/FindTickets";
import Calendar from "../../Calendar";
import CitySearch from "../../CitySearch";
import { useSearchForm } from "../../../context/SearchFormContext";

export default function SearchForm({ isTrainsPage = false }) {
    const { searchData, updateSearchData } = useSearchForm();

    const [fromCityValue, setFromCityValue] = useState(searchData.fromCity);
    const [toCityValue, setToCityValue] = useState(searchData.toCity);
    const [startDate, setStartDate] = useState(searchData.startDate || new Date());
    const [endDate, setEndDate] = useState(searchData.endDate);
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);
    const [showFromCityDropdown, setShowFromCityDropdown] = useState(false);
    const [showToCityDropdown, setShowToCityDropdown] = useState(false);

    const startDateRef = useRef(null);
    const endDateRef = useRef(null);

    // Устанавливаем сегодняшнюю дату по умолчанию, если она ещё не задана в контексте
    useEffect(() => {
        if (!searchData.startDate) {
            const today = new Date();
            setStartDate(today);
            updateSearchData({ startDate: today });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData.startDate]);

    // Синхронизация локального состояния с контекстом
    useEffect(() => {
        setFromCityValue(searchData.fromCity);
        setToCityValue(searchData.toCity);
        setStartDate(searchData.startDate || startDate);
        setEndDate(searchData.endDate);
    }, [searchData]);

    // Обработчик клика вне календаря
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (startDateRef.current && !startDateRef.current.contains(event.target)) {
                setShowStartCalendar(false);
            }
            if (endDateRef.current && !endDateRef.current.contains(event.target)) {
                setShowEndCalendar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const reverseValues = () => {
        if (!toCityValue || !fromCityValue) return

        // Обновляем локальное состояние
        setFromCityValue(toCityValue);
        setToCityValue(fromCityValue);

        // Небольшая задержка для лучшего UX
        updateSearchData({
            fromCity: toCityValue,
            toCity: fromCityValue,
            fromCityId: searchData.toCityId,
            toCityId: searchData.fromCityId
        });
    };

    const handleStartDateSelect = (date) => {
        setStartDate(date);
        setShowStartCalendar(false);

        // Обновляем контекст
        updateSearchData({ startDate: date });
    };

    const handleEndDateSelect = (date) => {
        setEndDate(date);
        setShowEndCalendar(false);

        // Обновляем контекст
        updateSearchData({ endDate: date });
    };

    const handleFromCityChange = (value) => {
        setFromCityValue(value);
        updateSearchData({ fromCity: value, fromCityId: '' });
    };

    const handleToCityChange = (value) => {
        setToCityValue(value);
        updateSearchData({ toCity: value, toCityId: '' });
    };

    const handleFromCitySelect = (cityObj) => {
        const name = cityObj?.name || '';
        const id = cityObj?._id || '';
        setFromCityValue(name);
        updateSearchData({ fromCity: name, fromCityId: id });
        setShowFromCityDropdown(false);
    };

    const handleToCitySelect = (cityObj) => {
        const name = cityObj?.name || '';
        const id = cityObj?._id || '';
        setToCityValue(name);
        updateSearchData({ toCity: name, toCityId: id });
        setShowToCityDropdown(false);
    };

    const formatDate = (date) => {
        if (!date) return '';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    const [modal, setModal] = useState({ visible: false, type: 'error', title: '', text: '' });
    const showModal = (type, title, text) => setModal({ visible: true, type, title, text });
    const hideModal = () => setModal((m) => ({ ...m, visible: false }));

    const validate = () => {
        if (!fromCityValue || !toCityValue) {
            showModal('error', 'Ошибка', 'Выберите города отправления и прибытия');
            return false;
        }
        if (startDate && endDate && endDate < startDate) {
            showModal('error', 'Ошибка дат', 'Дата возвращения не может быть раньше даты поездки');
            return false;
        }
        return true;
    };

    if (isTrainsPage) {
        return (
            <form className="form trains-form">
                <div className="form-container">
                    <div className="form-header">
                        <div className="direction-section">
                            <span className="section-label">Направление</span>
                            <div className="cities trains-cities">
                                <div className="input-group trains-input">
                                    <CitySearch
                                        value={fromCityValue}
                                        onChange={handleFromCityChange}
                                        placeholder="Откуда"
                                        onSelect={handleFromCitySelect}
                                        isOpen={showFromCityDropdown}
                                        onToggle={setShowFromCityDropdown}
                                        onClose={() => setShowFromCityDropdown(false)}
                                    />
                                    <img src="src/assets/images/geo.png" alt="geo" />
                                </div>
                                <img
                                    src="src/assets/images/reverse.png"
                                    alt="reverse"
                                    className={`reverse trains-reverse ${(!fromCityValue || !toCityValue) ? 'disabled' : ''}`}
                                    onClick={reverseValues}
                                    title={(!fromCityValue || !toCityValue) ? "Выберите оба города для смены мест" : "Поменять местами города"}
                                    style={{
                                        cursor: (!fromCityValue || !toCityValue) ? 'not-allowed' : 'pointer',
                                        opacity: (!fromCityValue || !toCityValue) ? 0.4 : 0.8
                                    }}
                                />
                                <div className="input-group trains-input">
                                    <CitySearch
                                        value={toCityValue}
                                        onChange={handleToCityChange}
                                        placeholder="Куда"
                                        onSelect={handleToCitySelect}
                                        isOpen={showToCityDropdown}
                                        onToggle={setShowToCityDropdown}
                                        onClose={() => setShowToCityDropdown(false)}
                                    />
                                    <img src="src/assets/images/geo.png" alt="geo" />
                                </div>
                            </div>
                        </div>
                        <div className="date-section">
                            <span className="section-label">Дата</span>
                            <div className="dates trains-dates">
                                <div className="input-group trains-input" ref={startDateRef}>
                                    <input
                                        type="text"
                                        name="startDate"
                                        placeholder="ДД/ММ/ГГ"
                                        value={formatDate(startDate)}
                                        readOnly
                                        onClick={() => setShowStartCalendar(!showStartCalendar)}
                                        className="date-input"
                                    />
                                    <img
                                        src="src/assets/images/calendar.png"
                                        alt="calendar"
                                        onClick={() => setShowStartCalendar(!showStartCalendar)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    {showStartCalendar && (
                                        <Calendar
                                            selectedDate={startDate}
                                            onDateSelect={handleStartDateSelect}
                                            onClose={() => setShowStartCalendar(false)}
                                        />
                                    )}
                                </div>
                                <div className="input-group trains-input" ref={endDateRef}>
                                    <input
                                        type="text"
                                        name="endDate"
                                        placeholder="ДД/ММ/ГГ"
                                        value={formatDate(endDate)}
                                        readOnly
                                        onClick={() => setShowEndCalendar(!showEndCalendar)}
                                        className="date-input"
                                    />
                                    <img
                                        src="src/assets/images/calendar.png"
                                        alt="calendar"
                                        onClick={() => setShowEndCalendar(!showEndCalendar)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    {showEndCalendar && (
                                        <Calendar
                                            selectedDate={endDate}
                                            onDateSelect={handleEndDateSelect}
                                            onClose={() => setShowEndCalendar(false)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="search-button-container">
                        <FindTickets onBeforeNavigate={validate} />
                    </div>
                </div>
                {modal.visible && (
                    <div className="modal-backdrop">
                        <div className={`modal ${modal.type}`} role="dialog" aria-modal="true">
                            <div className="modal-header">
                                <div className="modal-icon">!</div>
                                <div>{modal.title}</div>
                            </div>
                            <div className="modal-body">{modal.text}</div>
                            <div className="modal-actions">
                                <button type="button" onClick={hideModal}>Понятно</button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        );
    }

    // Оригинальный вид для главной страницы
    return (
        <form className="form">
            <div className="form-container">
                <span>Направление</span>
                <div className="cities">
                    <div className="input-group">
                        <CitySearch
                            value={fromCityValue}
                            onChange={handleFromCityChange}
                            placeholder="Откуда"
                            onSelect={handleFromCitySelect}
                            isOpen={showFromCityDropdown}
                            onToggle={setShowFromCityDropdown}
                            onClose={() => setShowFromCityDropdown(false)}
                        />
                        <img src="src/assets/images/geo.png" alt="geo" />
                    </div>
                    <img
                        src="src/assets/images/reverse.png"
                        alt="reverse"
                        className={`reverse ${(!fromCityValue || !toCityValue) ? 'disabled' : ''}`}
                        onClick={reverseValues}
                        title={(!fromCityValue || !toCityValue) ? "Выберите оба города для смены мест" : "Поменять местами города"}
                        style={{
                            cursor: (!fromCityValue || !toCityValue) ? 'not-allowed' : 'pointer',
                            opacity: (!fromCityValue || !toCityValue) ? 0.4 : 0.8
                        }}
                    />
                    <div className="input-group">
                        <CitySearch
                            value={toCityValue}
                            onChange={handleToCityChange}
                            placeholder="Куда"
                            onSelect={handleToCitySelect}
                            isOpen={showToCityDropdown}
                            onToggle={setShowToCityDropdown}
                            onClose={() => setShowToCityDropdown(false)}
                        />
                        <img src="src/assets/images/geo.png" alt="geo" />
                    </div>
                </div>
                <span>Даты</span>
                <div className="dates">
                    <div className="input-group" ref={startDateRef}>
                        <input
                            type="text"
                            name="startDate"
                            placeholder="ДД/ММ/ГГ"
                            value={formatDate(startDate)}
                            readOnly
                            onClick={() => setShowStartCalendar(!showStartCalendar)}
                            className="date-input"
                        />
                        <img
                            src="src/assets/images/calendar.png"
                            alt="calendar"
                            onClick={() => setShowStartCalendar(!showStartCalendar)}
                            style={{ cursor: 'pointer' }}
                        />
                        {showStartCalendar && (
                            <Calendar
                                selectedDate={startDate}
                                onDateSelect={handleStartDateSelect}
                                onClose={() => setShowStartCalendar(false)}
                            />
                        )}
                    </div>
                    <div className="input-group" ref={endDateRef}>
                        <input
                            type="text"
                            name="endDate"
                            placeholder="ДД/ММ/ГГ"
                            value={formatDate(endDate)}
                            readOnly
                            onClick={() => setShowEndCalendar(!showEndCalendar)}
                            className="date-input"
                        />
                        <img
                            src="src/assets/images/calendar.png"
                            alt="calendar"
                            onClick={() => setShowEndCalendar(!showEndCalendar)}
                            style={{ cursor: 'pointer' }}
                        />
                        {showEndCalendar && (
                            <Calendar
                                selectedDate={endDate}
                                onDateSelect={handleEndDateSelect}
                                onClose={() => setShowEndCalendar(false)}
                            />
                        )}
                    </div>
                </div>
                <FindTickets onBeforeNavigate={validate} />
            </div>
            {modal.visible && (
                <div className="modal-backdrop">
                    <div className={`modal ${modal.type}`} role="dialog" aria-modal="true">
                        <div className="modal-header">
                            <div className="modal-icon">!</div>
                            <div>{modal.title}</div>
                        </div>
                        <div className="modal-body">{modal.text}</div>
                        <div className="modal-actions">
                            <button type="button" onClick={hideModal}>Понятно</button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}
