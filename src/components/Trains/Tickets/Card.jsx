export default function Card({ ticket }) {
    if (!ticket) return null;

    const departureTime = new Date(ticket.departure.from.datetime).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const arrivalTime = new Date(ticket.departure.to.datetime).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    let timeInTravel;

    if (ticket.departure.duration > 24 * 60 * 60 * 1000) {
        // Длительность более суток
        const totalSeconds = Math.floor(ticket.departure.duration / 1000); // Миллисекунды в секунды
        const days = Math.floor(totalSeconds / (24 * 60 * 60)); // Дни
        const remainingSecondsAfterDays = totalSeconds % (24 * 60 * 60); // Остаток секунд после вычета дней
        const hours = Math.floor(remainingSecondsAfterDays / (60 * 60)); // Часы
        const remainingSecondsAfterHours = remainingSecondsAfterDays % (60 * 60); // Остаток секунд после вычета часов
        const minutes = Math.floor(remainingSecondsAfterHours / 60); // Минуты

        // Форматируем корректно с ведущими нулями
        const formattedDays = String(days).padStart(2, '0'); // Двухразрядный формат для дней
        const formattedHours = String(hours).padStart(2, '0'); // Двухразрядный формат для часов
        const formattedMinutes = String(minutes).padStart(2, '0'); // Двухразрядный формат для минут

        timeInTravel = `${formattedDays}:${formattedHours}:${formattedMinutes}`; // Формат D:H:M
    } else {
        // Длительность менее суток — просто выводим часы и минуты
        const durationMs = ticket.departure.duration;
        const durationHours = Math.floor(durationMs / (60 * 60 * 1000)); // Часы
        const durationMinutes = Math.floor((durationMs % (60 * 60 * 1000)) / (60 * 1000)); // Минуты

        // Форматируем корректно с ведущими нулями
        const formattedHours = String(durationHours).padStart(2, '0'); // Двухразрядный формат для часов
        const formattedMinutes = String(durationMinutes).padStart(2, '0'); // Двухразрядный формат для минут

        timeInTravel = `${formattedHours}:${formattedMinutes}`; // Формат H:M
    }

    return (
        <div className="card">
            <div className="card-inner">
                <div className="train-info">
                    <img src="src/assets/images/train.png" alt="train.png" className="train-img" />
                    <span className="train-number">{ticket.departure.train.name}</span>
                    <div className="train-direction">
                        <span>{ticket.departure.from.city.name} →</span>
                        <span>{ticket.departure.to.city.name}</span>
                    </div>
                </div>
                <div className="train-time">
                    <div className="departure">
                        <span>{departureTime}</span>
                        <span>{ticket.departure.from.city.name}</span>
                        <span>{ticket.departure.from.railway_station_name} вокзал</span>
                    </div>
                    <div className="inTrip">
                        <span>{timeInTravel}</span>
                        <img src="src/assets/images/trainsTicketArrow.png" alt="trainsTicketArrow.png" />
                    </div>
                    <div className="arrival">
                        <span>{arrivalTime}</span>
                        <span>{ticket.departure.to.city.name}</span>
                        <span>{ticket.departure.to.railway_station_name} вокзал</span>
                    </div>
                </div>
                <div className="train-about">
                    <ul>
                        {ticket.departure.have_fourth_class && (
                            <li>
                                <span>Сидячий</span>
                                <span className="seats-info-count">{ticket.available_seats_info.fourth}</span>
                                <div className="price-info">
                                    <span>от</span>
                                    <span>{ticket.departure.price_info.fourth.price}</span>
                                    <span>₽</span>
                                </div>
                            </li>
                        )}
                        {ticket.departure.have_third_class && (
                            <li>
                                <span>Плацкарт</span>
                                <div className="seats-menu">
                                    <span className="seats-info-count">{ticket.available_seats_info.third}</span>
                                    <ul className="dropdown-seats-menu">
                                        <li>
                                            <span>верхние</span>
                                            <span>{ticket.available_seats_info.third / 3}</span>
                                            <div>
                                                <span>{ticket.departure.price_info.third.top_price}</span>
                                                <span>₽</span>
                                            </div>
                                        </li>
                                        <li>
                                            <span>нижние</span>
                                            <span>{ticket.available_seats_info.third / 3}</span>
                                            <div>
                                                <span>{ticket.departure.price_info.third.bottom_price}</span>
                                                <span>₽</span>
                                            </div>
                                        </li>
                                        <li>
                                            <span>боковые</span>
                                            <span>{ticket.available_seats_info.third / 3}</span>
                                            <div>
                                                <span>{ticket.departure.price_info.third.side_price}</span>
                                                <span>₽</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="price-info">
                                    <span>от</span>
                                    <span>
                                        {Math.min(
                                            ticket.departure.price_info.third.bottom_price, // Нижняя полка
                                            ticket.departure.price_info.third.top_price,    // Верхняя полка
                                            ticket.departure.price_info.third.side_price    // Боковые места
                                        )}
                                    </span>
                                    <span>₽</span>
                                </div>
                            </li>
                        )}
                        {ticket.departure.have_second_class && (
                            <li>
                                <span>Купе</span>
                                <div className="seats-menu">
                                    <span className="seats-info-count">{ticket.available_seats_info.second}</span>
                                    <ul className="dropdown-seats-menu">
                                        <li>
                                            <span>верхние</span>
                                            <span>{ticket.available_seats_info.second / 2}</span>
                                            <div>
                                                <span>{ticket.departure.price_info.second.top_price}</span>
                                                <span>₽</span>
                                            </div>
                                        </li>
                                        <li>
                                            <span>нижние</span>
                                            <span>{ticket.available_seats_info.second / 2}</span>
                                            <div>
                                                <span>{ticket.departure.price_info.second.bottom_price}</span>
                                                <span>₽</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="price-info">
                                    <span>от</span>
                                    <span>
                                        {
                                            Math.min(
                                                ticket.departure.price_info.second.bottom_price,
                                                ticket.departure.price_info.second.top_price
                                            )
                                        }
                                    </span>
                                    <span>₽</span>
                                </div>
                            </li>
                        )}
                        {ticket.departure.have_first_class && (
                            <li>
                                <span>Люкс</span>
                                <span className="seats-info-count">{ticket.available_seats_info.first}</span>
                                <div className="price-info">
                                    <span>от</span>
                                    <span>{ticket.departure.price_info.first.price}</span>
                                    <span>₽</span>
                                </div>
                            </li>
                        )}
                    </ul>

                    <div className="futures">
                        <ul>
                            {ticket.departure.have_air_conditioning && (
                                <li>
                                    <img src="src\assets\images\trains-types\air-conditioner.svg" alt="air-conditioner" title="condition"/>
                                </li>
                            )}
                            {ticket.departure.have_wifi && (
                                <li>
                                    <img src="src\assets\images\trains-types\wifi.svg" alt="wifi" title="wifi"/>
                                </li>
                            )}
                            {ticket.departure.is_express && (
                                <li>
                                    <img src="src\assets\images\trains-types\rocket.svg" alt="express" title="express"/>
                                </li>
                            )}
                        </ul>
                        <a href="">Выбрать места</a>
                    </div>
                </div>
            </div>
        </div>
    );
}