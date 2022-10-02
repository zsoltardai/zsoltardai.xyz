import ReactDOM from 'react-dom';
import Error from '../icons/error';
import Success from '../icons/success';
import Pending from '../icons/pending';
import styles from './notification.module.css';

export default function Notification({ title, message, status }) {
    let statusClasses = '';

    let icon = <Pending color='#ffffff' />

    if (status === 'success') {
        statusClasses = styles.success;
        icon = <Success color='#ffffff' />;
    }

    if (status === 'error') {
        statusClasses = styles.error;
        icon = <Error color='#ffffff' />;
    }

    const cssClasses = `${styles.notification} ${statusClasses}`;

    return (
        <div className={cssClasses}>
            <div className={`${styles.left} notification`}>{icon}{title}</div>
            <div className={`${styles.right} notification`}>{message}</div>
        </div>
    );

    /*return ReactDOM.createPortal(
    (
        <div className={cssClasses}>
            <p>{title}</p>
            <p>{message}</p>
        </div>
    ), document.getElementById('notifications'));*/
}
