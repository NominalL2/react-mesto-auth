import '../index.css';
import Header from './Header.js';


function Register() {
    return (
        <>
            <div className='page'>
                <Header />
                <section className='sign'>
                    <h2 className='sign__title'>Регистрация</h2>
                    <form name='login' className='sign__form'>
                        <input type='email' name='email' placeholder='Email' className='sign__input sign__input_email' required></input>
                        <input type='password' name='password' placeholder='Пароль' className='sign__input sign__input_password' minLength="5" required></input>
                        <button type='submit' name='sign-in' className='sign__button'>Зарегистрироваться</button>
                        <a href='/sign-in' className='sign__link'>Уже зарегистрированы? Войти</a>
                    </form>
                </section>
            </div>
        </>
    )
}

export default Register;