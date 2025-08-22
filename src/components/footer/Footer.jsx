import Contacts from './Contacts/Contacts'
import './footer.css'
import LogoLine from './LogoLine/LogoLine'
import Subscribe from './Subscribe/Subscribe'

export default function Footer() {

    return (
        <footer className="footer" id='contacts'>
            <div className='footer-info'>
                <Contacts />
                <Subscribe />
            </div>
            <LogoLine />
        </footer>
    )
}
