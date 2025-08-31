import { useEffect, useState } from 'react';
import { useSearchForm } from '../../../context/SearchFormContext';
import { searchRoutes } from '../../../services/api';
import Card from './Card';
import SortControls from './SortControls';
import Pagination from './Pagination';

export default function Tickets({ loading, setLoading }) {
    const { searchData } = useSearchForm();
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [sortBy, setSortBy] = useState('date');
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);


    useEffect(() => {
        // Проверяем, что у нас есть необходимые данные для поиска
        if (!searchData.fromCityId || !searchData.toCityId) {
            setTickets([]);
            setTotalCount(0);
            return;
        }

        setLoading(true);
        setError('');

        // Формируем параметры запроса
        const params = {
            from_city_id: searchData.fromCityId,
            to_city_id: searchData.toCityId,
            limit,
            offset: (page - 1) * limit
        };

        // Добавляем сортировку только если она поддерживается
        if (sortBy === 'date') {
            params.sort = 'date';
        } else if (sortBy === 'price') {
            params.sort = 'price';
        } else if (sortBy === 'duration') {
            params.sort = 'duration';
        }

        console.log('Отправляем запрос с параметрами:', params);

        // Добавляем даты, если они есть
        if (searchData.startDate) {
            const d = searchData.startDate;
            params.date_start = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        }
        if (searchData.endDate) {
            const d = searchData.endDate;
            params.date_end = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        }

        // Добавляем фильтры по классам вагонов
        if (searchData.have_first_class) params.have_first_class = true;
        if (searchData.have_second_class) params.have_second_class = true;
        if (searchData.have_third_class) params.have_third_class = true;
        if (searchData.have_fourth_class) params.have_fourth_class = true;
        if (searchData.have_wifi) params.have_wifi = true;
        if (searchData.have_express) params.have_express = true;

        // Добавляем фильтры по цене
        if (searchData.price_from != null) params.price_from = searchData.price_from;
        if (searchData.price_to != null) params.price_to = searchData.price_to;

        // Выполняем запрос
        searchRoutes(params)
            .then((data) => {
                console.log('Получен ответ от API:', data);
                console.log('Текущая сортировка:', sortBy);

                if (!data) {
                    console.warn('API вернул пустой ответ');
                    setTickets([]);
                    setTotalCount(0);
                    setError('API вернул пустой ответ');
                    return;
                }

                const items = Array.isArray(data.items) ? data.items : [];
                const total = Number(data.total_count) || 0;

                console.log(`Найдено билетов: ${items.length}, всего: ${total}`);

                if (items.length === 0) {
                    console.warn('API вернул пустой массив билетов');
                } else {
                    setError(''); // Очищаем ошибку если есть результаты
                }

                setTickets(items);
                setTotalCount(total);
            })
            .catch((e) => {
                console.error('Ошибка при запросе билетов:', e);
                setError(`Ошибка при сортировке по "${sortBy}": ${e.message}`);
                setTickets([]);
                setTotalCount(0);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [searchData, sortBy, limit, page, setLoading]);


    return (
        <div className="tickets">
            <SortControls
                sortBy={sortBy}
                setSortBy={setSortBy}
                limit={limit}
                setLimit={setLimit}
                page={page}
                setPage={setPage}
                sortDropdownOpen={sortDropdownOpen}
                setSortDropdownOpen={setSortDropdownOpen}
                totalCount={totalCount}
            />

            {!loading && !error && tickets.length === 0 && (
                <div className="notFound">
                    <p>билеты не найдены или ошибка сортировки</p>
                    <p>Попробуйте изменить параметры поиска.</p>
                </div>
            )}

            {!loading && !error && tickets.length > 0 && (
                <>
                    <ul className="results-list">
                        {tickets.map((ticket, index) => (
                            <li key={ticket._id || index} className="route-card">
                                <Card ticket={ticket} />
                            </li>
                        ))}
                    </ul>
                    {totalCount > limit && (
                        <Pagination page={page} setPage={setPage} totalCount={totalCount} limit={limit} />
                    )}
                </>
            )}
        </div>
    );
}