import { useOrders } from "../../../context/OrdersContext";
import "./CartPopup.css";

export const CartPopup = () => {
  const { actualOrder, removeFromCart, createOrder, isCartOpen, setIsCartOpen } = useOrders();

  if (!isCartOpen) return null;

  return (
    <div className="uk-modal uk-open" style={{ display: "block" }}>
      <div className="uk-modal-dialog uk-modal-body uk-border-rounded">
        <button
          className="uk-modal-close-default"
          type="button"
          onClick={() => setIsCartOpen(false)}
          uk-close="true"
        ></button>

        <h3 className="uk-modal-title">Tu carrito</h3>

        {actualOrder.orderDetails.length === 0 ? (
          <p>No hay productos en tu carrito</p>
        ) : (
          <ul className="uk-list uk-list-divider">
            {actualOrder.orderDetails.map((item) => (
              <li key={item.product._id}>
                <strong>{item.product.name}</strong> — {item.quantity} × ${item.product.price.toLocaleString()}
                <br />
                <button
                  className="uk-button uk-button-text uk-text-danger"
                  onClick={() => removeFromCart(item.product._id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        <hr />
        <p className="uk-text-bold">
          Total: ${actualOrder.totalPrice.toLocaleString()}
        </p>

        <button
          className="uk-button uk-button-primary uk-border-rounded"
          onClick={() => createOrder()}
        >
          Confirmar compra
        </button>
      </div>
    </div>
  );
};