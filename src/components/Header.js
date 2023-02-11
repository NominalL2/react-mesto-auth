import '../index.css';

function Header(props) {
    return (
        <header className="header">
            <div className="header__logo"></div>
            <button onClick={props.onButtonClick} className='header__button'>{props.info.title}</button>
        </header>
    );
}

export default Header;