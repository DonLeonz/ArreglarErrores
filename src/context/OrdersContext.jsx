import { createContext, useContext, useState } from "react";
import { createOrderRequest } from "../api/requests/orders.request";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrdersProvider");
  return context;
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [actualOrder, setActualOrder] = useState({
    orderDetails: [],
    totalPrice: 0,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [errors, setErrors] = useState([]);

  const { user, isAuth } = useAuth();

  useEffect(() => {
    setActualOrder({
      orderDetails: [],
      totalPrice: 0,
    });
  }, [isAuth])

  const addToCart = (product, quantity = 1) => {
    if (quantity <= 0) {
      setErrors(["La cantidad debe ser mayor a 0"]);
      return;
    }

    if (quantity > product.stock) {
      setErrors([`Solo hay ${product.stock} unidades disponibles`]);
      return;
    }

    const existing = actualOrder.orderDetails.find(
      (item) => item.product._id === product._id
    );

    let updatedDetails;

    if (existing) {
      const newQuantity = existing.quantity + quantity;

      if (newQuantity > product.stock) {
        setErrors([`No puedes agregar más de ${product.stock}`]);
        return;
      }

      updatedDetails = actualOrder.orderDetails.map((item) =>
        item.product._id === product._id
          ? {
              ...item,
              quantity: newQuantity,
              total_price: newQuantity * product.price,
            }
          : item
      );
    } else {
      updatedDetails = [
        ...actualOrder.orderDetails,
        {
          product,
          quantity,
          total_price: quantity * product.price,
        },
      ];
    }

    const newTotal = updatedDetails.reduce((acc, i) => acc + i.total_price, 0);

    setActualOrder({ orderDetails: updatedDetails, totalPrice: newTotal });
  };

  const removeFromCart = (productId) => {
    const updatedDetails = actualOrder.orderDetails.filter(
      (item) => item.product._id !== productId
    );
    const newTotal = updatedDetails.reduce((acc, i) => acc + i.total_price, 0);
    setActualOrder({ orderDetails: updatedDetails, totalPrice: newTotal });
  };

  const createOrder = async () => {
    try {
      const order = {
        clientId: user._id,
        orderDetails: actualOrder.orderDetails.map((d) => ({
          productId: d.product._id,
          quantity: d.quantity,
        })),
        status: "PENDIENTE",
      };

      const res = await createOrderRequest(order);
      if (res.status === 201) {
        setOrders((prev) => [...prev, res.data.order]);
        setActualOrder({ orderDetails: [], totalPrice: 0 });
        setIsCartOpen(false);
      }
    } catch (error) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al crear la orden"]);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        actualOrder,
        isCartOpen,
        errors,
        addToCart,
        removeFromCart,
        setIsCartOpen,
        createOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};