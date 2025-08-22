import MenuItem from './MenuItem';


export default function Menu() {
    const menuItems = [
        { name: "О нас", link: "/#about" },
        { name: "Как это работает", link: "/#howitworks" },
        { name: "Отзывы", link: "/#reviews" },
        { name: "Контакты", link: "/#contacts" },
    ];

    return (
        <nav >
            <ul className='header__menu'>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <MenuItem name={item.name} link={item.link} />
                    </li>
                ))}
            </ul>
        </nav>
    );
}
