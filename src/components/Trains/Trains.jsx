import LoadingProgress from "./LoadingProgress"; // Вернули импорт
import { useState } from "react";
import Aside from "./Aside/Aside";
import Tickets from "./Tickets/Tickets";
import "./trains.css";
import { useSearchForm } from "../../context/SearchFormContext";

export default function Trains() {
  const [loading, setLoading] = useState(false);
  const { searchProgress } = useSearchForm(); // Извлекаем прогресс из контекста

  // if (loading) {
  //     return (
  //         <div>
  //             <LoadingProgress progress={searchProgress} isVisible={true} />
  //             <iframe src="../../assets/images/animationTrain.gif" frameborder="0"></iframe>
  //         </div>
  //     );
  // }

  return (
    <main className="trains-page">
      <div className="container">
        <div className="trains-content">
          <Aside />
          <Tickets loading={loading} setLoading={setLoading} />
        </div>
      </div>
    </main>
  );
}
