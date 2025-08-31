export default function Pagination({ page, setPage, totalCount, limit }) {
    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(totalCount / limit);

    // Если страниц нет или только одна, не показываем пагинацию
    if (totalPages <= 1) {
        return null;
    }

    // Функция для генерации элементов пагинации
    const generatePaginationItems = () => {
        const items = [];

        if (totalPages <= 7) {
            // Если страниц мало, показываем все
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <li
                        key={i}
                        className={`page-item ${page === i ? 'active' : ''}`}
                        onClick={() => setPage(i)}
                    >
                        {i}
                    </li>
                );
            }
        } else {
            // Если страниц много, используем сокращение
            // Всегда показываем первую страницу
            items.push(
                <li
                    key={1}
                    className={`page-item ${page === 1 ? 'active' : ''}`}
                    onClick={() => setPage(1)}
                >
                    1
                </li>
            );

            // Если текущая страница далеко от начала
            if (page > 4) {
                items.push(<li key="dots1" className="page-dots">...</li>);
            }

            // Показываем страницы вокруг текущей
            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);

            for (let i = start; i <= end; i++) {
                items.push(
                    <li
                        key={i}
                        className={`page-item ${page === i ? 'active' : ''}`}
                        onClick={() => setPage(i)}
                    >
                        {i}
                    </li>
                );
            }

            // Если текущая страница далеко от конца
            if (page < totalPages - 3) {
                items.push(<li key="dots2" className="page-dots">...</li>);
            }

            // Всегда показываем последнюю страницу
            if (totalPages > 1) {
                items.push(
                    <li
                        key={totalPages}
                        className={`page-item ${page === totalPages ? 'active' : ''}`}
                        onClick={() => setPage(totalPages)}
                    >
                        {totalPages}
                    </li>
                );
            }
        }

        return items;
    };


    return (
        <div className="pagination">
            <button className="pagination-btn prev"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}>
                <svg width="18" height="29" viewBox="0 0 18 29" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6637 14.5C8.17924 11.0945 4.87989 7.89424 1.62688 4.72332C0.733082
                     3.85207 0.801327 2.34671 1.69059 1.47083C2.55844 0.616038 3.88051 0.686134 4.74835
                      1.54092C8.93683 5.66637 13.1384 9.80466 17.2767 13.8808C17.6744 14.2725 17.6745
                       14.9137 17.2767 15.3053C13.2903 19.2293 9.13775 23.2984 5.00506 27.3844C4.10447
                        28.2748 2.7315 28.3485 1.85554 27.4338C1.00133 26.5419 0.948345 25.0479 1.82557 
                        24.1785C4.92418 21.1078 8.19048 17.8945 11.6637 14.5Z" />
                </svg>
            </button>

            <ul className="pagination-list">
                {generatePaginationItems()}
            </ul>
            <button className="pagination-btn next"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}>
                <svg width="18" height="29" viewBox="0 0 18 29" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6637 14.5C8.17924 11.0945 4.87989 7.89424 1.62688 4.72332C0.733082
                     3.85207 0.801327 2.34671 1.69059 1.47083C2.55844 0.616038 3.88051 0.686134 4.74835
                      1.54092C8.93683 5.66637 13.1384 9.80466 17.2767 13.8808C17.6744 14.2725 17.6745
                       14.9137 17.2767 15.3053C13.2903 19.2293 9.13775 23.2984 5.00506 27.3844C4.10447
                        28.2748 2.7315 28.3485 1.85554 27.4338C1.00133 26.5419 0.948345 25.0479 1.82557 
                        24.1785C4.92418 21.1078 8.19048 17.8945 11.6637 14.5Z" />
                </svg>
            </button>
        </div>
    );
}