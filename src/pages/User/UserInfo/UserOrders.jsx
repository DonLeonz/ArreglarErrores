import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useOrders } from "../../../context/OrdersContext";
import OrderSearchForm, {
  ORDER_FILTER_DEFAULTS,
} from "../../../components/features/OrderSearchForm/OrderSearchForm";
import "./UserOrders.css";

const UserOrders = () => {
  const { user } = useAuth();
  const { orders, searchOrders } = useOrders();
  const [orderFilters, setOrderFilters] = useState({
    ...ORDER_FILTER_DEFAULTS,
  });

  useEffect(() => {
    searchOrders({ username: user.username });
  }, []);

  const getStatusClass = (status) => {
    if (status === "COMPLETADO") return "completed";
    if (status === "PENDIENTE") return "pending";
    if (status === "CANCELADA") return "cancelled";
    return "";
  };

  const orderMatchesFilters = (order) => {
    if (!order) return false;

    const keyword = orderFilters.keyword?.trim().toLowerCase();
    if (
      keyword &&
      ![
        order._id,
        order.status,
        order.reference,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(keyword)
        )
    ) {
      return false;
    }

    if (orderFilters.status && order.status !== orderFilters.status) {
      return false;
    }

    const total = Number(order.total_price ?? order.totalPrice ?? 0);
    if (orderFilters.minTotal && total < Number(orderFilters.minTotal)) {
      return false;
    }
    if (orderFilters.maxTotal && total > Number(orderFilters.maxTotal)) {
      return false;
    }

    const createdAt = order.createdAt ? new Date(order.createdAt) : null;
    if (orderFilters.startDate) {
      const from = new Date(orderFilters.startDate);
      if (!createdAt || createdAt < from) return false;
    }
    if (orderFilters.endDate) {
      const to = new Date(orderFilters.endDate);
      if (!createdAt || createdAt > to) return false;
    }

    return true;
  };

  const filteredOrders = Array.isArray(orders)
    ? orders.filter(orderMatchesFilters)
    : [];

  return (
    <div className="first-child-adjustment user-orders-section uk-light">
      <div className="uk-container uk-container-large">
        <h2 className="uk-heading-line uk-text-center user-orders-page-heading">
          <span>Mis Pedidos</span>
        </h2>

        <div className="uk-margin-medium-bottom">
          <OrderSearchForm onApply={setOrderFilters} isAdmin={false} />
        </div>

        <div
          className="uk-grid-small uk-grid-match uk-child-width-1-3@m uk-child-width-1-2@s"
          data-uk-grid
        >
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
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
