import { useEffect, useMemo, useState } from 'react';
import { useSearchForm } from '../../../context/SearchFormContext';
import { searchRoutes } from '../../../services/api';

export default function Tickets() {
    const { searchData, isSearching, setIsSearching, searchProgress, setSearchProgress } = useSearchForm();
    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);

    const queryParams = useMemo(() => {
        const params = {
            from_city_id: searchData.fromCityId,
            to_city_id: searchData.toCityId,
            sort: sortBy,
            limit,
            offset: (page - 1) * limit
        };
        if (searchData.startDate) {
            const d = searchData.startDate;
            params.date_start = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        }
        if (searchData.endDate) {
            const d = searchData.endDate;
            params.date_end = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        }
        // coach types & features
        if (searchData.have_first_class) params.have_first_class = true;
        if (searchData.have_second_class) params.have_second_class = true;
        if (searchData.have_third_class) params.have_third_class = true;
        if (searchData.have_fourth_class) params.have_fourth_class = true;
        if (searchData.have_wifi) params.have_wifi = true;
        if (searchData.have_express) params.have_express = true;
        // price
        if (searchData.price_from != null) params.price_from = searchData.price_from;
        if (searchData.price_to != null) params.price_to = searchData.price_to;
        // times
        if (searchData.start_departure_hour_from != null) params.start_departure_hour_from = searchData.start_departure_hour_from;
        if (searchData.start_departure_hour_to != null) params.start_departure_hour_to = searchData.start_departure_hour_to;
        if (searchData.start_arrival_hour_from != null) params.start_arrival_hour_from = searchData.start_arrival_hour_from;
        if (searchData.start_arrival_hour_to != null) params.start_arrival_hour_to = searchData.start_arrival_hour_to;
        if (searchData.end_departure_hour_from != null) params.end_departure_hour_from = searchData.end_departure_hour_from;
        if (searchData.end_departure_hour_to != null) params.end_departure_hour_to = searchData.end_departure_hour_to;
        if (searchData.end_arrival_hour_from != null) params.end_arrival_hour_from = searchData.end_arrival_hour_from;
        if (searchData.end_arrival_hour_to != null) params.end_arrival_hour_to = searchData.end_arrival_hour_to;
        return params;
    }, [searchData, sortBy, limit, page]);

    useEffect(() => {
        if (!queryParams.from_city_id || !queryParams.to_city_id) {
            setResults([]);
            setTotalCount(0);
            return;
        }
        setLoading(true);
        setError('');
        setIsSearching(true);
        setSearchProgress(0);
        const progressTimer = setInterval(() => {
            setSearchProgress((p) => Math.min(99, p + Math.random() * 10));
        }, 300);

        searchRoutes(queryParams)
            .then((data) => {
                setResults(Array.isArray(data?.items) ? data.items : []);
                setTotalCount(Number(data?.total_count) || 0);
                console.log(data);
            })
            .catch((e) => setError(e.message || 'Ошибка загрузки маршрутов'))
            .finally(() => {
                clearInterval(progressTimer);
                setSearchProgress(100);
                setTimeout(() => setIsSearching(false), 300);
                setLoading(false);
            });
    }, [queryParams]);

    return (
        <div className="tickets">
            {error && !loading && <div className="search-results error">{error}</div>}
            {!loading && !error && results.length === 0 && (
                <div className="search-results empty">
                    <p>Билеты не найдены</p>
                    <p>Попробуйте изменить параметры поиска</p>
                </div>
            )}
            {!loading && !error && results.length > 0 && (
                <div className="search-results">
                    <div className="results-header">
                        <div className="results-info">
                            <span>найдено {totalCount}</span>
                        </div>
                        <div className="results-controls">
                            <div className="sort-controls">
                                <span>сортировать по:</span>
                                <select value={sortBy} onChange={(e) => { setPage(1); setSortBy(e.target.value); }} className="sort-select">
                                    <option value="date">Времени</option>
                                    <option value="price">Стоимости</option>
                                    <option value="duration">Длительности</option>
                                </select>
                            </div>
                            <div className="limit-controls">
                                <span>показывать по:</span>
                                <select value={limit} onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }} className="sort-select">
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="results-list">
                        {results.map((route, index) => {
                            const dep = route.departure || {};
                            const from = dep.from || {};
                            const to = dep.to || {};
                            const train = dep.train || {};
                            const durationSec = dep.duration || 0;
                            const durationH = Math.floor(durationSec / 3600);
                            const durationM = Math.floor((durationSec % 3600) / 60);

                            // Цена и места из price_info и available_seats_info в departure
                            const priceInfo = dep.price_info || {};
                            const seatsInfo = dep.available_seats_info || {};

                            // Купе может приходить как price_info.coupe, либо как first с top/bottom
                            const coupeLike = priceInfo.coupe || (priceInfo.first && (priceInfo.first.top_price || priceInfo.first.bottom_price) ? priceInfo.first : null);
                            const luxLike = priceInfo.first && !priceInfo.first.top_price && !priceInfo.first.bottom_price ? priceInfo.first : null;

                            return (
                                <div key={route._id || index} className="route-card">
                                    <div className="route-header">
                                        <div className="train-info">
                                            <img src="src/assets/images/train.png" alt="train.png" className='train-img' />
                                            <div className="train-number">{train.name || 'Н/Д'}</div>
                                            <div className="train-direction">{from.city?.name} → <br /> {to.city?.name}</div>
                                        </div>
                                        <div className="route-time">
                                            <div className="departure-time">
                                                <span className='time-train'>{from.datetime ? new Date(from.datetime * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                                                <br />
                                                <div>
                                                    <span className='city-name-train'>{from.city?.name}</span>
                                                    <br />
                                                    <span className='railway-station-name'>{from.railway_station_name} вокзал</span>
                                                </div>
                                            </div>
                                            <div className="travel-info">
                                                <div className="duration">{String(durationH).padStart(2, '0')} : {String(durationM).padStart(2, '0')}</div>
                                                <img src="src/assets/images/trainsTicketArrow.png" alt="arrow" />
                                            </div>
                                            <div className="arrival-time">
                                                <span className='time-train'>{to.datetime ? new Date(to.datetime * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                                                <br />
                                                <div>
                                                    <span className='city-name-train'>{to.city?.name}</span>
                                                    <br />
                                                    <span className='railway-station-name'>{to.railway_station_name} вокзал</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="route-details">
                                        <div className="coach-list">
                                            {(priceInfo.sitting || seatsInfo.sitting) && (
                                                <div className="coach-row">
                                                    <span>Сидячий</span>
                                                    <span className="seat-count">{seatsInfo.sitting ?? '-'}</span>
                                                    {priceInfo.sitting && <span className="price">от {priceInfo.sitting.price.toLocaleString('ru-RU')} ₽</span>}
                                                </div>
                                            )}
                                            {(priceInfo.platzkart || seatsInfo.platzkart) && (
                                                <div className="coach-row">
                                                    <span>Плацкарт</span>
                                                    <span className="seat-count">{seatsInfo.platzkart ?? '-'}</span>
                                                    {priceInfo.platzkart && <span className="price">от {priceInfo.platzkart.price.toLocaleString('ru-RU')} ₽</span>}
                                                </div>
                                            )}
                                            {(priceInfo.coupe || coupeLike) && (
                                                <div className="coach-row coupe">
                                                    <span>Купе</span>
                                                    <span className="seat-count">{seatsInfo.coupe ?? seatsInfo.second ?? seatsInfo.first ?? '-'}</span>
                                                    <span className="price">от {(priceInfo.coupe?.price ?? coupeLike?.price)?.toLocaleString('ru-RU')} ₽</span>
                                                    <div className="coupe-dropdown">
                                                        {(coupeLike?.top_price || coupeLike?.bottom_price) && (
                                                            <>
                                                                {coupeLike?.top_price && <div><span>верхние</span> <span>{coupeLike.top_price.toLocaleString('ru-RU')} ₽</span></div>}
                                                                {coupeLike?.bottom_price && <div><span>нижние</span> <span>{coupeLike.bottom_price.toLocaleString('ru-RU')} ₽</span></div>}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {(luxLike || priceInfo.first && !coupeLike) && (
                                                <div className="coach-row">
                                                    <span>Люкс</span>
                                                    <span className="seat-count">{seatsInfo.first ?? '-'}</span>
                                                    <span className="price">от {(luxLike?.price ?? priceInfo.first?.price)?.toLocaleString('ru-RU')} ₽</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="train-features">
                                            {dep.have_air_conditioning && <span className="feature ac">Кондиционер</span>}
                                            {dep.have_wifi && <span className="feature wifi">Wi-Fi</span>}
                                            {dep.have_first_class && <span className="feature restaurant">Ресторан</span>}
                                            {dep.is_express && <span className="feature express">Экспресс</span>}
                                        </div>
                                        <button className="btn-select">Выбрать места</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {totalCount > limit && (
                        <div className="pagination">
                            <button className="pagination-btn" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>←</button>
                            <span className="pagination-info">Стр. {page} из {Math.ceil(totalCount / limit)}</span>
                            <button className="pagination-btn" disabled={page >= Math.ceil(totalCount / limit)} onClick={() => setPage((p) => p + 1)}>→</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
