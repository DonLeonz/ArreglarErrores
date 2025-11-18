/**
 * Sistema de notificaciones mejorado
 * Maneja la creación y gestión de notificaciones sin bugs
 */

let notificationContainer = null;
let activeNotifications = new Map();
const MAX_NOTIFICATIONS = 4;
let notificationIdCounter = 0;

/**
 * Inicializa el contenedor de notificaciones
 */
const initializeContainer = () => {
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.className = 'custom-notification-container';
    notificationContainer.setAttribute('role', 'region');
    notificationContainer.setAttribute('aria-label', 'Notificaciones');
    document.body.appendChild(notificationContainer);
  }
  return notificationContainer;
};

/**
 * Obtiene el icono según el tipo de notificación
 */
const getIconForStatus = (status) => {
  const icons = {
    success: '✓',
    danger: '✕',
    warning: '⚠',
    primary: 'ℹ'
  };
  return icons[status] || icons.primary;
};

/**
 * Crea el elemento de notificación
 */
const createNotificationElement = (id, message, status) => {
  const notification = document.createElement('div');
  notification.className = `custom-notification custom-notification-${status}`;
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'polite');
  notification.dataset.notificationId = id;

  const icon = document.createElement('div');
  icon.className = 'custom-notification-icon';
  icon.textContent = getIconForStatus(status);

  const content = document.createElement('div');
  content.className = 'custom-notification-content';
  content.textContent = message;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'custom-notification-close';
  closeBtn.setAttribute('aria-label', 'Cerrar notificación');
  closeBtn.innerHTML = '×';

  notification.appendChild(icon);
  notification.appendChild(content);
  notification.appendChild(closeBtn);

  return notification;
};

/**
 * Elimina una notificación del DOM
 */
const removeNotification = (id) => {
  const notification = activeNotifications.get(id);
  if (!notification) return;

  const element = notification.element;

  // Animar salida
  element.style.animation = 'notificationSlideOut 0.3s ease forwards';

  setTimeout(() => {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
    activeNotifications.delete(id);

    // Limpiar timeout si existe
    if (notification.timeout) {
      clearTimeout(notification.timeout);
    }
  }, 300);
};

/**
 * Muestra una notificación
 * @param {Object} config - Configuración de la notificación
 * @param {string} config.message - Mensaje a mostrar
 * @param {string} config.status - Tipo de notificación (success, danger, warning, primary)
 * @param {number} config.timeout - Tiempo en ms antes de auto-cerrar (default: 4000)
 */
export const showNotification = ({ message, status = 'primary', timeout = 4000 }) => {
  if (!message) {
    console.warn('No message provided for notification');
    return null;
  }

  // Inicializar contenedor si no existe
  const container = initializeContainer();

  // Generar ID único
  const id = `notification-${notificationIdCounter++}`;

  // Si hay demasiadas notificaciones, eliminar la más antigua
  if (activeNotifications.size >= MAX_NOTIFICATIONS) {
    const oldestId = Array.from(activeNotifications.keys())[0];
    removeNotification(oldestId);
  }

  // Crear elemento de notificación
  const element = createNotificationElement(id, message, status);

  // Agregar al contenedor con animación
  requestAnimationFrame(() => {
    container.appendChild(element);

    // Forzar reflow para que la animación funcione
    element.offsetHeight;
    element.classList.add('custom-notification-show');
  });

  // Configurar auto-cierre
  let timeoutId = null;
  if (timeout > 0) {
    timeoutId = setTimeout(() => {
      removeNotification(id);
    }, timeout);
  }

  // Agregar event listener para cerrar manualmente
  const closeBtn = element.querySelector('.custom-notification-close');
  closeBtn.addEventListener('click', () => {
    removeNotification(id);
  });

  // Guardar referencia
  activeNotifications.set(id, {
    element,
    timeout: timeoutId,
  });

  return id;
};

/**
 * Cierra una notificación específica
 */
export const closeNotification = (id) => {
  removeNotification(id);
};

/**
 * Cierra todas las notificaciones activas
 */
export const clearAllNotifications = () => {
  const ids = Array.from(activeNotifications.keys());
  ids.forEach(id => removeNotification(id));
};

/**
 * Limpia el contenedor de notificaciones (útil para cleanup)
 */
export const cleanupNotifications = () => {
  clearAllNotifications();

  if (notificationContainer && notificationContainer.parentNode) {
    notificationContainer.parentNode.removeChild(notificationContainer);
    notificationContainer = null;
  }

  activeNotifications.clear();
  notificationIdCounter = 0;
};
