import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
    notification: null,
    showNotification: (notification) => {},
    hideNotification: () => {}
});

export function NotificationContextProvider({children}) {

    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (notification && (notification.status === 'success' || notification.status === 'error')) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const showNotificationHandler = (notification) => setNotification(notification);

    const hideNotificationHandler = () => setNotification(null);

    const context = {
        notification: notification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    };

    return (
      <NotificationContext.Provider value={context}>
          {children}
      </NotificationContext.Provider>
    );
}

export default NotificationContext;
