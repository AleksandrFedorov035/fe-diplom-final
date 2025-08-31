export default function SortControls({ totalCount, setSortDropdownOpen, sortDropdownOpen, sortBy, setPage, setSortBy, limit, setLimit }) {
    return (
        <div className="results-header">
            <div className="results-info">
                <span>найдено {totalCount}</span>
            </div>
            <div className="results-controls">
                <div className="sort-controls">
                    <span>сортировать по: </span>
                    <div className="sort-dropdown">
                        <div className="sort-trigger" onClick={() => setSortDropdownOpen(!sortDropdownOpen)}>
                            <span className="sort-text activeTextSort">
                                {sortBy === 'date' ? 'времени' :
                                    sortBy === 'price' ? 'стоимости' :
                                        sortBy === 'duration' ? 'длительности' : 'времени'}
                            </span>
                        </div>
                        {sortDropdownOpen && (
                            <ul className="sort-options">
                                <li
                                    className={`sort-option ${sortBy === 'date' ? 'activeTextSort' : ''}`}
                                    onClick={() => { setPage(1); setSortBy('date'); setSortDropdownOpen(false); }}
                                >
                                    времени
                                </li>
                                <li
                                    className={`sort-option ${sortBy === 'price' ? 'activeTextSort' : ''}`}
                                    onClick={() => { setPage(1); setSortBy('price'); setSortDropdownOpen(false); }}
                                >
                                    стоимости
                                </li>
                                <li
                                    className={`sort-option ${sortBy === 'duration' ? 'activeTextSort' : ''}`}
                                    onClick={() => { setPage(1); setSortBy('duration'); setSortDropdownOpen(false); }}
                                >
                                    длительности
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
                <div className="limit-controls">
                    <span>показывать по: </span>
                    <ul className="limit-buttons">
                        <li
                            className={`limit-btn ${limit === 5 ? 'activeTextSort' : ''}`}
                            onClick={() => { setPage(1); setLimit(5); }}
                        >
                            5
                        </li>
                        <li
                            className={`limit-btn ${limit === 10 ? 'activeTextSort' : ''}`}
                            onClick={() => { setPage(1); setLimit(10); }}
                        >
                            10
                        </li>
                        <li
                            className={`limit-btn ${limit === 20 ? 'activeTextSort' : ''}`}
                            onClick={() => { setPage(1); setLimit(20); }}
                        >
                            20
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}