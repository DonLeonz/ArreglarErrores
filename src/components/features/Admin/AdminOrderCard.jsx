const AdminOrderCard = ({ order, onUpdateStatus }) => {
  const getStatusClass = (status) => {
    if (status === "COMPLETADO") return "admin-status-completed";
    if (status === "PENDIENTE") return "admin-status-pending";
    if (status === "CANCELADA") return "admin-status-cancelled";
    return "";
  };

  return (
    <div className="admin-blog-card">
      <div className="uk-grid-small" data-uk-grid>
        <div className="uk-width-1-1">
          <h4 className="admin-card-title">Pedido #{order._id?.slice(-6)}</h4>
          <p className="admin-card-info">
            <strong>Cliente:</strong> {order.client.username}
          </p>
          <p className="admin-card-info">
            <strong>Estado:</strong>{" "}
            <span className={getStatusClass(order.status)}>
              {order.status}
            </span>
          </p>
          <p className="admin-card-info">
            <strong>Creada:</strong>{" "}
            {new Date(order.createdAt).toLocaleString("es-ES")}
            <br />
            <strong>Modificada:</strong>{" "}
            {new Date(order.updatedAt).toLocaleString("es-ES")}
          </p>

          <div className="admin-blog-excerpt">
            <strong>Productos:</strong>
            <ul className="admin-product-list">
              {order.order_details?.map((detail, idx) => (
                <li key={idx}>
                  {detail.product.name} - Cantidad: {detail.quantity} - Precio
                  Unidad: ${detail.product.price.toLocaleString("es-CO")}
                </li>
              ))}
            </ul>
          </div>

          <p className="admin-card-info admin-order-total">
            <strong>Total:</strong> ${order.total_price.toLocaleString("es-CO")}
          </p>
        </div>

        <div className="uk-width-1-1">
          <div className="admin-button-column">
            <button
              className="admin-order-completed-btn"
              onClick={() => onUpdateStatus(order._id, "COMPLETADO")}
              disabled={order.status !== "PENDIENTE"}
            >
              Marcar Completado
            </button>
            <button
              className="admin-order-cancelled-btn"
              onClick={() => onUpdateStatus(order._id, "CANCELADA")}
              disabled={order.status !== "PENDIENTE"}
            >
              Marcar Cancelado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderCard;
