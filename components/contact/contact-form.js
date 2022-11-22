import React from 'react';
import {Button, Input, Text} from '../ui';
import styles from './contact-form.module.css';

export default function ContactForm({ onSubmit, contact }) {
  const { emailRef, firstNameRef, lastNameRef, messageRef } = contact;
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Text>
          Name
        </Text>
        <div className={styles.row}>
          <div>
            <Input
              placeholder='e.g. Jon'
              type='text'
              ref={firstNameRef}
              id='firstName'
              required
            />
          </div>
          <div>
            <Input
              placeholder='e.g. Jonson'
              type='text'
              ref={lastNameRef}
              id='lastName'
              required
            />
          </div>
        </div>
        <Text>
          E-mail
        </Text>
        <Input
          placeholder="e.g. example@email.com"
          type="email"
          ref={emailRef}
          id="email"
          required
        />
        <Text>
          Message
        </Text>
        <Input
          placeholder='Write here your message...'
          marginBottom={32}
          ref={messageRef}
          id='message'
          rows='5'
          required
          textarea
        />
        <Button
          title="Submit"
          width="100%"
          marginBottom={20}
        />
      </form>
    </div>
  );
}
