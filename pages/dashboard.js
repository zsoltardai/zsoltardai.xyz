import React from 'react';
import Head from 'next/head';
import PoemForm from '../components/dashboard/poem-form';
import Notification from '../components/layout/notification';
import getSession from "../lib/auth/getSession";
import {useNotification} from '../hooks';
import styles from '../styles/dashboard.module.css';

const Dashboard = () => {
    const {set, notification} = useNotification();
    const publishPoemHandler = async (title, content, date) => {
        set({
            status: 'pending',
            title: 'Pending',
            message: 'Your poem is being published...'
        });
        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
        const body = JSON.stringify({title, content, date});
        const response = await fetch('/api/poems', {method: 'POST', headers: headers, body: body});
        let message = await response.text();
        if (!response.ok) {
            set({
               status: 'error',
               title: 'Error',
               message
            });
            return false;
        }

        message = 'Your poem has been published successfully!';

        set({
            status: 'success',
            title: 'Success',
            message
        });

        return true;
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Dashboard</title>
                <meta
                    name='description'
                    content='On this page you can add blog posts and poems.'
                />
            </Head>
            <PoemForm onPublishPoem={publishPoemHandler} />
            {notification &&
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            }
        </div>
    );
}

export default Dashboard;

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (!session) return { redirect: { destination: '/login', permanent: false } };
    return { props: { } };
}
