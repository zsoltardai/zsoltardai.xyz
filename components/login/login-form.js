import { useRef } from 'react';
import Button from '../ui/button';
import styles from './login-form.module.css';

export default function LoginForm(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    async function submitHandler(event) {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email.trim() === '' || password.trim() === '') {
            return;
        }

        await props.onLogin(email, password);

        emailRef.current.value = '';
        passwordRef.current.value = '';
    }
    return (
      <form className={styles.form} onSubmit={submitHandler}>
        <h1>Login</h1>
        <div className={styles.control}>
            <label htmlFor='email'>E-mail</label>
            <input type='email' id='email' ref={emailRef} />
        </div>
        <div className={styles.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' ref={passwordRef} />
        </div>
        <div className={styles.actions}>
            <Button>Login</Button>
        </div>
      </form>
    );
}