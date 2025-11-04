import { useState } from "react";
import { useOrders } from "../../../context/OrdersContext";
import "./CartPopup.css";

export const CartPopup = () => {
  const {
    actualOrder,
    removeFromCart,
    createOrder,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
  } = useOrders();

  const [editingQuantity, setEditingQuantity] = useState({});

  if (!isCartOpen) return null;

  const handleQuantityChange = (productId, value) => {
    const numValue = parseInt(value) || 0;
    setEditingQuantity({ ...editingQuantity, [productId]: numValue });
  };

  const handleQuantityBlur = (productId, stock) => {
    const newQuantity = editingQuantity[productId];
    if (newQuantity && newQuantity > 0 && newQuantity <= stock) {
      updateQuantity(productId, newQuantity);
    }
    setEditingQuantity({ ...editingQuantity, [productId]: undefined });
  };

  const handleIncrement = (productId, currentQty, stock) => {
    if (currentQty < stock) {
      incrementQuantity(productId);
    } else {
      if (window.UIkit) {
        window.UIkit.notification({
          message: `Stock máximo disponible: ${stock}`,
          status: "warning",
          pos: "top-center",
        });
      }
    }
  };

  const handleDecrement = (productId, currentQty) => {
    if (currentQty > 1) {
      decrementQuantity(productId);
    }
  };

  return (
    <div className="uk-modal uk-open cart-modal-overlay" style={{ display: "block" }}>
      <div className="uk-modal-dialog uk-modal-body cart-modal-dialog">
        <button
          className="cart-modal-close-btn"
          type="button"
          onClick={() => setIsCartOpen(false)}
          aria-label="Cerrar carrito"
        ></button>

        <h2 className="cart-modal-title">
          <span data-uk-icon="icon: cart; ratio: 1.5" className="uk-margin-small-right"></span>
          Tu Carrito
        </h2>

        {actualOrder.orderDetails.length === 0 ? (
          <div className="cart-empty-state">
            <span data-uk-icon="icon: bag; ratio: 4"></span>
            <p>Tu carrito está vacío</p>
            <button
              className="cart-continue-shopping-btn"
              onClick={() => setIsCartOpen(false)}
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-container">
              {actualOrder.orderDetails.map((item) => (
                <div key={item.product._id} className="cart-item-card">
                  <div className="cart-item-image">
                    <img
                      src={`/src/assets/img/menu/${item.product.image}`}
                      alt={item.product.name}
                    />
                  </div>

                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.product.name}</h4>
                    <p className="cart-item-price">
                      ${item.product.price.toLocaleString()}
                    </p>
                    <p className="cart-item-stock">
                      Stock disponible: {item.product.stock}
                    </p>
                  </div>

                  <div className="cart-item-quantity">
                    <button
                      className="cart-qty-btn"
                      onClick={() => handleDecrement(item.product._id, item.quantity)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="cart-qty-input"
                      value={
                        editingQuantity[item.product._id] !== undefined
                          ? editingQuantity[item.product._id]
                          : item.quantity
                      }
                      onChange={(e) =>
                        handleQuantityChange(item.product._id, e.target.value)
                      }
                      onBlur={() =>
                        handleQuantityBlur(item.product._id, item.product.stock)
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleQuantityBlur(item.product._id, item.product.stock);
                        }
                      }}
                      min="1"
                      max={item.product.stock}
                    />
                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        handleIncrement(item.product._id, item.quantity, item.product.stock)
                      }
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-subtotal">
                    <p className="cart-item-subtotal-label">Subtotal</p>
                    <p className="cart-item-subtotal-value">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  <button
                    className="cart-item-remove-btn"
                    onClick={() => removeFromCart(item.product._id)}
                    aria-label="Eliminar producto"
                  >
                    <span data-uk-icon="icon: trash"></span>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-total-row">
                <span className="cart-total-label">Total:</span>
                <span className="cart-total-value">
                  ${actualOrder.totalPrice.toLocaleString()}
                </span>
              </div>

              <button className="cart-confirm-btn" onClick={() => createOrder()}>
                <span data-uk-icon="icon: check" className="uk-margin-small-right"></span>
                Confirmar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
