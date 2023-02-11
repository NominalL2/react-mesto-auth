import '../index.css';
import UnionSuccess from '../images/message_popuup/Union_success.png'

function MessagePopup(props) {
    return (
        <section className={`popup ${/* props.isOpen */ false && 'popup_opened'}`} id={`popup__${props.name}`}>
            <div className="popup__container popup__container_message">
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                <img className='popup__message-image' src={UnionSuccess} />
                <h2 className="popup__title popup__title_message">{/* {props.title} */} Вы успешно зарегистрировались!</h2>
            </div>
        </section>
    )
}

export default MessagePopup;