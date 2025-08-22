import LastTickets from './lastTickets/LastTickets';
import Cost from './cost/Cost';
import Dates from './dates/Dates';
import Directions from './directions/Directions';
import Types from './types/types';

export default function Aside() {

    return (
        <aside className="search-filters">
            <div className="filters-container">
                <div className="tripDetails">
                    <Dates />
                    <Types />
                    <Cost />
                    <Directions />
                </div>
                <LastTickets />
            </div>
        </aside>
    );
}
