import { useRef } from 'react';
import Button from '../../components/ui/button';
import { useRouter } from 'next/router';
import styles from './registration-form.module.css';

export default function RegistrationForm(props) {
    const router = useRouter();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const codeRef = useRef();
    async function onSubmitHandler(event) {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const code = codeRef.current.value;

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
            props.notificationCtx.showNotification({
                status: 'error',
                title: 'Error',
                message: 'The provided e-mail address is not valid!'
            });
            return;
        }

        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(password)) {
            props.notificationCtx.showNotification({
                status: 'error',
                title: 'Error',
                message: 'The provided password is not valid!'
            });
            return;
        }

        if (password !== confirmPassword) {
            props.notificationCtx.showNotification({
                status: 'error',
                title: 'Error',
                message: 'The provided passwords did not match!'
            });
            return;
        }

        emailRef.current.value = '';
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';
        codeRef.current.value = '';

        await props.onRegister(email, password, code);

        await router.replace('/administration/login');
    }
    return (
      <form className={styles.form} onSubmit={onSubmitHandler}>
          <h1>Registration</h1>
          <div className={styles.control}>
            <label htmlFor='email'>E-mail</label>
            <input type='email' id='email' required ref={emailRef} placeholder='e.g. example@email.com' />
          </div>
          <div className={styles.control}>
              <label htmlFor='password'>Password</label>
              <input type='password' id='password' required ref={passwordRef}
                     placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;' />
          </div>
          <div className={styles.control}>
              <label htmlFor='confirmPassword'>Confirm password</label>
              <input type='password' id='confirmPassword' required ref={confirmPasswordRef}
                     placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;' />
          </div>
          <div className={styles.control}>
              <label htmlFor='code'>Code</label>
              <input type='password' id='code' required ref={codeRef}
                     placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;' />
          </div>
          <div className={styles.actions}>
              <Button>Register</Button>
          </div>
      </form>
    );
}