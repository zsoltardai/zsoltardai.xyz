import { Fragment } from 'react';
import Button from '../ui/button';
import styles from './contact-form.module.css';

export default function ContactForm({ onSubmit, contact }) {
    const { emailRef, firstNameRef, lastNameRef, messageRef } = contact;
    return (
      <Fragment>
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.control}>
                    <label htmlFor='email'>E-mail</label>
                    <input type='email' ref={emailRef} id='email' required placeholder='e.g. example@email.com' />
                </div>
                <div className={styles.controls}>
                    <div className={styles.control}>
                        <label htmlFor='firstName'>Firstname</label>
                        <input type='text' ref={firstNameRef} id='firstName' required placeholder='e.g. Jon' />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor='lastName'>Lastname</label>
                        <input type='text' ref={lastNameRef} id='lastName' required placeholder='e.g. Jonson' />
                    </div>
                </div>
                <div className={styles.control}>
                    <label htmlFor='message'>Message</label>
                    <textarea ref={messageRef} id='message' rows='5' required placeholder='Write here your message...'>
                    </textarea>
                </div>
                <div className={styles.actions}>
                    <Button title="Submit" />
                </div>
            </form>
        </div>
      </Fragment>
    );
}
