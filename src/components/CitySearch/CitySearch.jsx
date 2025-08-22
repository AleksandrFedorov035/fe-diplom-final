import { useState, useEffect, useRef } from 'react';
import './CitySearch.css';
import { searchCities } from '../../services/api';

export default function CitySearch({
    value,
    onChange,
    placeholder,
    onSelect,
    isOpen,
    onToggle,
    onClose
}) {
    const [searchTerm, setSearchTerm] = useState(typeof value === 'string' ? value : (value?.name || ''));
    const [options, setOptions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const debounceRef = useRef(0);

    useEffect(() => {
        setSearchTerm(typeof value === 'string' ? value : (value?.name || ''));
    }, [value]);

    useEffect(() => {
        if (!isOpen) return;
        window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
            const term = searchTerm.trim();
            if (!term) {
                setOptions([]);
                setSelectedIndex(-1);
                return;
            }
            setLoading(true);
            searchCities(term)
                .then((data) => {
                    setOptions(Array.isArray(data) ? data : []);
                    setSelectedIndex(-1);
                })
                .catch(() => {
                    setOptions([]);
                    setSelectedIndex(-1);
                })
                .finally(() => setLoading(false));
        }, 300);
        return () => window.clearTimeout(debounceRef.current);
    }, [searchTerm, isOpen]);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);
        onChange(newValue);
        if (!isOpen) onToggle(true);
    };

    const handleInputClick = () => {
        if (!isOpen) onToggle(true);
    };

    const handleCitySelect = (cityObj) => {
        setSearchTerm(cityObj?.name || '');
        onChange(cityObj?.name || '');
        onSelect(cityObj);
        onClose();
    };

    const handleKeyDown = (e) => {
        if (!isOpen) return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) => prev < options.length - 1 ? prev + 1 : 0);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => prev > 0 ? prev - 1 : options.length - 1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < options.length) {
                    handleCitySelect(options[selectedIndex]);
                }
                break;
            case 'Escape':
                onClose();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div className="city-search-container" ref={dropdownRef}>
            <input
                ref={inputRef}
                type="text"
                className="city-input"
                value={searchTerm}
                onChange={handleInputChange}
                onClick={handleInputClick}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                autoComplete="off"
            />

            {isOpen && (
                <div className="city-dropdown">
                    {loading && <div className="no-results">Загрузка...</div>}
                    {!loading && options.length > 0 ? (
                        <ul className="city-list">
                            {options.map((city, index) => (
                                <li
                                    key={city._id}
                                    className={`city-item ${index === selectedIndex ? 'selected' : ''}`}
                                    onClick={() => handleCitySelect(city)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    {city.name}
                                </li>
                            ))}
                        </ul>
                    ) : (!loading && (
                        <div className="no-results">
                            Город не найден
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
