import { useState } from 'react';
import { subscribe as apiSubscribe } from '../../../services/api';

export default function Subscribe() {

    const socialList = [
        { url: 'src/assets/images/youtube.svg' },
        { url: 'src/assets/images/in.svg' },
        { url: 'src/assets/images/google.svg' },
        { url: 'src/assets/images/facebook.svg' },
        { url: 'src/assets/images/Twitter.svg' }
    ]

    const [email, setEmail] = useState('');
    const [modal, setModal] = useState({ visible: false, type: 'info', title: '', text: '' });

    const onSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!emailRegex.test(email)) {
            setModal({ visible: true, type: 'error', title: 'Ошибка', text: 'Введите корректный e-mail' });
            return;
        }
        try {
            await apiSubscribe(email);
            setEmail('');
            setModal({ visible: true, type: 'success', title: 'Готово', text: 'Вы успешно подписались на рассылку' });
        } catch (err) {
            setModal({ visible: true, type: 'error', title: 'Ошибка', text: 'Не удалось оформить подписку. Попробуйте позже.' });
        }
    };
    const closeModal = () => setModal((m)=>({ ...m, visible: false }));

    return (
        <div className="subscribe">
            <span>Подписка</span>
            <div className="subscribe-input">
                <span>Будьте в курсе событий</span>
                <form onSubmit={onSubmit}>
                    <input type="email" name="email" required placeholder="e-mail" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <button type="submit">отправить</button>
                </form>
                {modal.visible && (
                    <div className="modal-backdrop">
                        <div className={`modal ${modal.type}`} role="dialog" aria-modal="true">
                            <div className="modal-header">
                                <div className="modal-icon">&#10004;</div>
                                <div>{modal.title}</div>
                            </div>
                            <div className="modal-body">{modal.text}</div>
                            <div className="modal-actions">
                                <button type="button" onClick={closeModal}>Понятно</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="social">
                <span>Подписывайтесь на нас</span>
                <ul>
                    {socialList.map((el, index) => {
                        return (
                            <li key={index}>
                                <a href="/"><img src={el.url} alt="social" /></a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
