import React, {useContext} from 'react';
import NotificationContext from "../store/notification-context";

const useNotification = () => {
  const ctx = useContext(NotificationContext);
  return {
    set: ctx.showNotification,
    hide: ctx.hideNotification,
    notification: ctx.notification,
  };
}

export default useNotification;
