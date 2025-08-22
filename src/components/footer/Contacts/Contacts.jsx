export default function Contacts() {
    const footerList = [
        {
            url: 'src/assets/images/phone.png',
            text: '8 (800) 000 00 00',
            href: 'tel:88000000000',
        },
        {
            url: 'src/assets/images/mail.png',
            text: 'inbox@mail.ru',
            href: 'mailto:inbox@mail.ru',
        },
        {
            url: 'src/assets/images/skype.png',
            text: 'tu.train.tickets',
            href: 'tu.train.tickets',
        },
        {
            url: 'src/assets/images/geo.png',
            text: 'г. Москва ул.Московская 27-35 555 555',
            href: 'https://yandex.ru/maps/213/moscow/house/moskovskaya_ulitsa_vl27s1/Z04YcgZlQUYPQFtvfXp2cH9iZQ==/?ll=37.415838%2C55.671311&z=17',
        },
    ]
    return (
        <div className="contacts">
            <span>Свяжитесь с нами</span>
            <ul>
                {footerList.map((el, index) => {
                    return (
                        <li key={index}>
                            <img src={el.url} alt="img" />
                            <a href={el.href}>{el.text}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
