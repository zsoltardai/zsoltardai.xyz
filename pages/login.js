import { Fragment, useContext } from 'react';
import NotificationContext from '../store/notification-context';
import LoginForm from '../components/login/login-form';
import Notification from '../components/layout/notification';
import { signin } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();
    const notificationContext = useContext(NotificationContext);
    const notification = notificationContext.notification;
    async function loginHandler(email, password) {
        notificationContext.showNotification({
            status: 'pending',
            title: 'Pending',
            message: 'Your login request has been sent!'
        });
        const result = await signin('credentials', { redirect: false, email: email, password: password});
        if (!result.error) {
            notificationContext.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Logging in was successful!'
            });
            await router.replace('/administration');
        }
        notificationContext.showNotification({
            status: 'error',
            title: 'Error',
            message: result.error
        });
    }
    return (
        <Fragment>
            <LoginForm onLogin={loginHandler} />
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