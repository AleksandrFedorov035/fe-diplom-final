import { useState } from 'react';
import './Calendar.css';

export default function Calendar({ selectedDate, onDateSelect, onClose }) {
    const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

    // Массив названий месяцев на русском
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    // Получаем текущий месяц и год
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Функция для получения первого дня месяца
    const getFirstDayOfMonth = () => {
        const firstDay = new Date(currentYear, currentMonth, 1);
        // Возвращаем день недели (0 = воскресенье, 1 = понедельник, и т.д.)
        return firstDay.getDay() === 0 ? 7 : firstDay.getDay();
    };

    // Функция для получения количества дней в месяце
    const getDaysInMonth = () => {
        return new Date(currentYear, currentMonth + 1, 0).getDate();
    };

    // Функция для получения последнего дня предыдущего месяца
    const getLastDayOfPrevMonth = () => {
        return new Date(currentYear, currentMonth, 0).getDate();
    };

    // Функция для перехода к предыдущему месяцу
    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    // Функция для перехода к следующему месяцу
    const goToNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // Функция для проверки, является ли дата прошедшей
    const isPastDate = (day) => {
        const today = new Date();
        const checkDate = new Date(currentYear, currentMonth, day);

        // Сбрасываем время для корректного сравнения только дат
        today.setHours(0, 0, 0, 0);
        checkDate.setHours(0, 0, 0, 0);

        return checkDate < today;
    };

    // Функция для выбора даты
    const handleDateClick = (day, isCurrentMonth = true) => {
        if (isCurrentMonth && !isPastDate(day)) {
            const newDate = new Date(currentYear, currentMonth, day);
            onDateSelect(newDate);
            onClose();
        }
    };

    // Функция для проверки, является ли дата выбранной
    const isSelectedDate = (day) => {
        if (!selectedDate) return false;
        return selectedDate.getDate() === day &&
               selectedDate.getMonth() === currentMonth &&
               selectedDate.getFullYear() === currentYear;
    };

    // Функция для проверки, является ли дата сегодняшней
    const isToday = (day) => {
        const today = new Date();
        return today.getDate() === day &&
               today.getMonth() === currentMonth &&
               today.getFullYear() === currentYear;
    };

    // Генерируем массив дат для отображения
    const generateCalendarDays = () => {
        const days = [];
        const firstDayIndex = getFirstDayOfMonth();
        const daysInMonth = getDaysInMonth();
        const lastDayPrevMonth = getLastDayOfPrevMonth();

        // Добавляем дни предыдущего месяца
        for (let i = firstDayIndex - 1; i > 0; i--) {
            const day = lastDayPrevMonth - i + 1;
            days.push({ day, isCurrentMonth: false });
        }

        // Добавляем дни текущего месяца
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, isCurrentMonth: true });
        }

        // Добавляем дни следующего месяца для заполнения сетки
        const remainingDays = 42 - days.length; // 6 строк * 7 дней = 42
        for (let i = 1; i <= remainingDays; i++) {
            days.push({ day: i, isCurrentMonth: false });
        }

        return days;
    };

    const calendarDays = generateCalendarDays();

    return (
        <div className="calendar-popup">
            <div className="calendar-header">
                <button
                    className="calendar-nav-btn prev-month"
                    onClick={goToPrevMonth}
                    aria-label="Предыдущий месяц"
                    type='button'
                >
                    ‹
                </button>
                <h2 className="calendar-month">{months[currentMonth]}</h2>
                <button
                    className="calendar-nav-btn next-month"
                    onClick={goToNextMonth}
                    aria-label="Следующий месяц"
                    type='button'
                >
                    ›
                </button>
            </div>

            <div className="calendar-grid">

                {/* Даты */}
                <div className="calendar-days">
                    {calendarDays.map(({ day, isCurrentMonth }, index) => {
                        const isPast = isCurrentMonth && isPastDate(day);
                        const isDisabled = !isCurrentMonth || isPast;

                        return (
                            <button
                                key={index}
                                className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isSelectedDate(day) ? 'selected' : ''} ${isToday(day) ? 'today' : ''} ${isPast ? 'past-date' : ''}`}
                                onClick={() => handleDateClick(day, isCurrentMonth)}
                                disabled={isDisabled}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
