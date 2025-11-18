import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useOrders } from "../../../context/OrdersContext";
import "./UserOrders.css";

const UserOrders = () => {
  const { user } = useAuth();
  const { orders, searchOrders } = useOrders();

  useEffect(() => {
    searchOrders({ username: user.username });
  }, []);

  const getStatusClass = (status) => {
    if (status === "COMPLETADO") return "completed";
    if (status === "PENDIENTE") return "pending";
    if (status === "CANCELADA") return "cancelled";
    return "";
  };

  return (
    <div className="first-child-adjustment user-orders-section uk-light">
      <div className="uk-container uk-container-large">
        <div className="user-orders-title">
          <div className="user-orders-title-icon">
            <h1>Mis Pedidos</h1>
          </div>
        </div>

        <div
          className="uk-grid-small uk-grid-match uk-child-width-1-3@m uk-child-width-1-2@s"
          data-uk-grid
        >
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id || order.id}>
                <div className="user-order-card">
                  <div className="user-order-header">
                    <div className="user-order-number">
                      Pedido #{order._id?.slice(-6)}
                    </div>
                    <div
                      className={`user-order-status ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </div>
                  </div>

                  <div className="user-order-details">
                    <div className="user-order-info-row">
                      <span className="user-order-info-label">Creado:</span>
                      <span>
                        {new Date(order.createdAt).toLocaleString("es-CO", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                    <div className="user-order-info-row">
                      <span className="user-order-info-label">
                        Actualizado:
                      </span>
                      <span>
                        {new Date(order.updatedAt).toLocaleString("es-CO", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="user-order-products">
                    <div className="user-order-products-title">Productos</div>
                    <ul className="user-order-product-list">
                      {order.order_details?.map((detail, idx) => (
                        <li key={idx} className="user-order-product-item">
                          <span className="user-order-product-name">
                            {detail.product.name}
                          </span>
                          {" × "}
                          {detail.quantity} - $
                          {detail.product.price.toLocaleString("es-CO")} c/u
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="user-order-total">
                    <span className="user-order-total-label">Total:</span>
                    <span className="user-order-total-amount">
                      ${order.total_price.toLocaleString("es-CO")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="uk-width-1-1 user-orders-empty">
              <div className="user-orders-empty-icon">📋</div>
              <div className="user-orders-empty-message">
                No tienes pedidos aún
              </div>
              <div className="user-orders-empty-submessage">
                ¡Explora nuestros productos y haz tu primer pedido!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
