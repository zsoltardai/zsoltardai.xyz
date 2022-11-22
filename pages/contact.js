import Head from 'next/head';
import React, {useRef} from 'react';
import ContactForm from '../components/contact/contact-form';
import Notification from '../components/layout/notification';
import {useNotification} from '../hooks';

export default function Contact() {
  const {set, notification} = useNotification();

  const emailRef = useRef();

  const firstNameRef = useRef();

  const lastNameRef = useRef();

  const messageRef = useRef();

  const onSubmitHandler = (event) => {

    event.preventDefault();

    const email = emailRef.current.value;

    const firstName = firstNameRef.current.value;

    const lastName = lastNameRef.current.value;

    const message = messageRef.current.value;

    if (!email || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
      set({
        status: 'error',
        title: 'Error',
        message: 'You did not provide a valid e-mail address!'
      });
      return;
    }

    if (!firstName || firstName.trim() === '') {
      set({
        status: 'error',
        title: 'Error',
        message: 'You did not provide a valid first name!'
      });
      return;
    }

    if (!lastName || lastName.trim() === '') {
      set({
        status: 'error',
        title: 'Error',
        message: 'You did not provide a valid last name!'
      });
      return;
    }

    if (!message || message.trim() === '') {
      set({
        status: 'error',
        title: 'Error',
        message: 'You did not provide a valid message!'
      });
      return;
    }

    const msg = 'Sending message...';

    set({
      status: 'pending',
      title: 'Pending',
      message: msg
    });

    const contact = { email: email, firstName: firstName, lastName: lastName, message: message };
    const body = JSON.stringify(contact);
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
    fetch('/api/contact', { method: 'POST', body: body, headers: headers })
      .then(response => {
        if (response.ok) return response.json();
        response.json()
          .then(data => {
            throw new Error(data.message || 'Failed to send message, due to an unknown error!');
          });
      })
      .then(data => {
        const message = data.message || 'Message sent successfully!';
        set({
          status: 'success',
          title: 'Success',
          message: message
        });
        emailRef.current.value = '';
        firstNameRef.current.value = '';
        lastNameRef.current.value = '';
        messageRef.current.value = '';
      })
      .catch(error => {
        const message = error.message || 'Failed to send message, due to an unknown reason!';
        set({
          status: 'error',
          title: 'Error',
          message: message
        });
      });
  };

  const contact = {
    emailRef,
    firstNameRef,
    lastNameRef,
    messageRef
  };

  return (
      <>
        <Head>
          <title>Contact me</title>
          <meta name='description' content='Send me a message to contact me.' />
        </Head>
        <ContactForm
          onSubmit={onSubmitHandler}
          contact={contact}
        />
        {
          notification && (
            <Notification
                status={notification.status}
                title={notification.title}
                message={notification.message}
            />
          )
        }
      </>
  );
}
