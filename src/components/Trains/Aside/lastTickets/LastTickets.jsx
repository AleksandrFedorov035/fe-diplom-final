import { useState, useEffect } from 'react';
import ListTicket from './ListTicket';
import { getLastRoutes } from '../../../../services/api';

export default function LastTickets() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        getLastRoutes()
            .then((data) => {
                if (!isMounted) return;
                setItems(Array.isArray(data) ? data : []);
            })
            .catch((e) => {
                if (!isMounted) return;
                setError(e.message || 'Не удалось загрузить последние билеты');
            })
            .finally(() => {
                if (!isMounted) return;
                setLoading(false);
            });
        return () => { isMounted = false; };
    }, []);

    return (
        <div className="last-tickets">
            <h3>последние билеты</h3>
            {loading && <div className="tickets-loading">Загрузка...</div>}
            {error && !loading && <div className="tickets-error">{error}</div>}
            {!loading && !error && (
                <ul className="tickets-list">
                    {items.map((el, index) => (
                        <li key={el._id || index}>
                            <ListTicket el={el} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
