export default function ProgressStep() {
    return (
        <div className="progress-steps">
            <div className="step step-1 active">
                <div className="step-number">1</div>
                <span>Билеты</span>
            </div>
            <div className="step step-2">
                <div className="step-number">2</div>
                <span>Пассажиры</span>
            </div>
            <div className="step step-3">
                <div className="step-number">3</div>
                <span>Оплата</span>
            </div>
            <div className="step step-4">
                <div className="step-number">4</div>
                <span>Проверка</span>
            </div>
        </div>
    )
}
