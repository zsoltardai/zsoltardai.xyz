import { Fragment, useContext } from 'react';
import RegistrationForm from '../../components/register/registration-form';
import Notification from '../../components/layout/notification';
import NotificationContext from '../../store/notification-context';
import styles from '../../styles/administration/register.module.css';

export default function Register() {
    const notificationContext = useContext(NotificationContext);
    const notification = notificationContext.notification;
    async function registrationHandler(email, password, code) {
        notificationContext.showNotification({
            status: 'pending',
            title: 'Pending',
            message: 'Your registration has been sent!'
        });
        const body = JSON.stringify({ email: email, password: password, code: code });
        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
        const response = await fetch('/api/auth/register', { method: 'POST', headers: headers, body: body });
        const data = await response.json();
        if (!response.ok) {
            notificationContext.showNotification({
                status: 'error',
                title: 'Error',
                message: data.message
            });
            return;
        }
        notificationContext.showNotification({
            status: 'success',
            title: 'Success',
            message: data.message
        });
    }
    return (
      <Fragment>
        <RegistrationForm notificationCtx={notificationContext} onRegister={registrationHandler} />
        {
          notification
          &&
          <Notification
              status={notification.status}
              title={notification.title}
              message={notification.message}
          />
        }
      </Fragment>
    );
}
