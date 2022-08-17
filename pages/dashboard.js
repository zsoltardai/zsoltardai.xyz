import { useContext } from 'react';
import { getSession } from 'next-auth/client';
import PoemForm from '../components/dashboard/poem-form';
import NotificationContext from '../store/notification-context';
import Notification from '../components/layout/notification';
import styles from '../styles/dashboard.module.css';

export default function Dashboard() {
    const notificationContext = useContext(NotificationContext);
    const notification = notificationContext.notification;
    const publishPoemHandler = async (title, content, author, date) => {
        notificationContext.showNotification({
            status: 'pending',
            title: 'Pending',
            message: 'Your poem is being published...'
        });

        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
        const body = JSON.stringify({ title: title, content: content, author: author, date: date });
        const response = await fetch('/api/poems', { method: 'POST', headers: headers, body: body });
        const data = await response.json();
        if (!response.ok) {
            notificationContext.showNotification({
               status: 'error',
               title: 'Error',
               message: data.message
            });
            return false;
        }

        notificationContext.showNotification({
            status: 'success',
            title: 'Success',
            message: data.message
        });

        return true;
    }
    return (
        <div className={styles.container}>
            <PoemForm notificationContext={notificationContext} onPublishPoem={publishPoemHandler} />
            {
                notification
                &&
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            }
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (!session) return { redirect: { destination: '/login', permanent: false } };
    return { props: { } };
}
