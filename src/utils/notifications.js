let activeNotifications = [];
const MAX_NOTIFICATIONS = 3;

export const showNotification = ({ message, status = "primary", timeout = 4000 }) => {
  if (!window.UIkit) return;

  if (activeNotifications.length >= MAX_NOTIFICATIONS) {
    const oldestNotification = activeNotifications.shift();
    if (oldestNotification && oldestNotification.close) {
      try {
        oldestNotification.close(false);
      } catch (e) {
        console.warn('Error closing notification:', e);
      }
    }
  }

  requestAnimationFrame(() => {
    const notification = window.UIkit.notification({
      message,
      status,
      pos: "top-right",
      timeout,
    });

    activeNotifications.push(notification);

    setTimeout(() => {
      const index = activeNotifications.indexOf(notification);
      if (index > -1) {
        activeNotifications.splice(index, 1);
      }
    }, timeout + 500);
  });
};

export const clearAllNotifications = () => {
  activeNotifications.forEach((notification) => {
    if (notification && notification.close) {
      notification.close(true);
    }
  });
  activeNotifications = [];
};
