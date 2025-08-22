import LoadingProgress from './LoadingProgress';
import Aside from './Aside/Aside';
import Tickets from './Tickets/Tickets';
import './trains.css';
import { useSearchForm } from '../../context/SearchFormContext';

export default function Trains() {
    const { isSearching, searchProgress } = useSearchForm();

    // return isSearching ? (
    //     <LoadingProgress progress={searchProgress} isVisible={true} />
    // ) : (
    //     <main className="trains-page">
    //         <div className="container">
    //             <div className="trains-content">
    //                 <Aside />
    //                 <Tickets />
    //             </div>
    //         </div>
    //     </main>
    // );

    return (
        <main className="trains-page">
            <div className="container">
                <div className="trains-content">
                    <Aside />
                    <Tickets />
                </div>
            </div>
        </main>
    )
}
