import { useState } from 'react';
import '../index.css';


function Register(props) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log(password);
        console.log(email);
        props.onRegister(password, email)
    }

    return (
        <>
            <section className='sign'>
                <h2 className='sign__title'>Регистрация</h2>
                <form name='login' className='sign__form' onSubmit={handleSubmit}>
                    <input value={email} onChange={handleChangeEmail} type='email' name='email' placeholder='Email' className='sign__input sign__input_email' required></input>
                    <input value={password} onChange={handleChangePassword} type='password' name='password' placeholder='Пароль' className='sign__input sign__input_password' minLength="5" required></input>
                    <button type='submit' name='sign-in' className='sign__button'>Зарегистрироваться</button>
                    <a href='/sign-in' className='sign__link'>Уже зарегистрированы? Войти</a>
                </form>
            </section>
        </>
    )
}

export default Register;