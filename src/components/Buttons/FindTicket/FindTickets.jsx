import { useNavigate } from "react-router-dom";

export default function FindTickets({ onBeforeNavigate }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (typeof onBeforeNavigate === "function") {
      const canNavigate = onBeforeNavigate();
      if (!canNavigate) return;
    }

    // // Выполняем запрос
    // searchRoutes(params)
    //   .then((data) => {
    //     console.log("Получен ответ от API:", data);
    //     console.log("Текущая сортировка:", sortBy);

    //     if (!data) {
    //       console.warn("API вернул пустой ответ");
    //       setTickets([]);
    //       setTotalCount(0);
    //       setError("API вернул пустой ответ");
    //       return;
    //     }

    //     const items = Array.isArray(data.items) ? data.items : [];
    //     const total = Number(data.total_count) || 0;

    //     console.log(`Найдено билетов: ${items.length}, всего: ${total}`);

    //     if (items.length === 0) {
    //       console.warn("API вернул пустой массив билетов");
    //     } else {
    //       setError(""); // Очищаем ошибку если есть результаты
    //     }

    //     setTickets(items);
    //     setTotalCount(total);
    //   })
    //   .catch((e) => {
    //     console.error("Ошибка при запросе билетов:", e);
    //     setError(`Ошибка при сортировке по "${sortBy}": ${e.message}`);
    //     setTickets([]);
    //     setTotalCount(0);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    // Переходим на страницу trains, данные формы сохраняются в контексте
    navigate(`/trains`);
    e.target.classList.add("active");
  };

  return (
    <button className="search-trains" type="submit" onClick={handleClick}>
      Найти Билеты
    </button>
  );
}
