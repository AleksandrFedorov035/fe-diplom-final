import { HashLink } from 'react-router-hash-link';

export default function MenuItem({ name, link }) {
    return (
        <HashLink smooth to={link} className='header__menu-item'>{name}</HashLink>
    )
}
