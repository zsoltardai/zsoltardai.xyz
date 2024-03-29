import Head from 'next/head';
import Layout from '../components/layout/layout';
import { ModeContextProvider } from '../store/mode-context';
import { NotificationContextProvider } from '../store/notification-context';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <NotificationContextProvider>
            <ModeContextProvider>
                <Head>
                    <title>Zsolt</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                </Head>
                <Layout>
                    <Component {...pageProps} />
                    <Analytics />
                </Layout>
            </ModeContextProvider>
        </NotificationContextProvider>
  );
}

export default MyApp
