import Inputs from "./Inputs";

export default function Directions() {

    const onClickPlus = (e) => {
        e.preventDefault()
        e.target.classList.toggle("active")
        const parentEl = e.target.closest('.direction-content')

        parentEl.querySelector('.direction-inner').classList.toggle('show')
    }

    return (
        <div className="filter-section">
            <div className="directions">
                <div className="direction-content toCity">
                    <div className="direction-content-header">
                        <img src="src/assets/images/trainsArrow.png" alt="trainsArrow" />
                        <h3>Туда</h3>
                        <div className="plus" onClick={onClickPlus}></div>
                    </div>
                    <div className="direction-inner">
                        <Inputs />
                    </div>
                </div>

                <div className="direction-content fromCity">
                    <div className="direction-content-header">
                        <img src="src/assets/images/trainsArrow.png" alt="trainsArrow" />
                        <h3>Обратно</h3>
                        <div className="plus" onClick={onClickPlus}></div>
                    </div>
                    <div className="direction-inner">
                        <Inputs isReturn={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}
