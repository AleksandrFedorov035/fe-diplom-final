import { useNavigate } from 'react-router-dom';

export default function FindTickets({ onBeforeNavigate }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        if (typeof onBeforeNavigate === 'function') {
            const canNavigate = onBeforeNavigate();
            if (!canNavigate) return;
        }
        // Переходим на страницу trains, данные формы сохраняются в контексте
        navigate(`/trains`);
        e.target.classList.add('active');
    };

    return (
        <button
            className="search-trains"
            type="submit"
            onClick={handleClick}
        >
            Найти Билеты
        </button>
    );
}
