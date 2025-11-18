import { createContext, useContext, useState } from "react";
import {
  createOrderRequest,
  modifyOrderStatusRequest,
  searchOrdersRequest,
} from "../api/requests/orders.request";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { useProducts } from "./ProductsContext";
import { showNotification } from "../utils/notifications";

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context)
    throw new Error("useOrders must be used within an OrdersProvider");
  return context;
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [actualOrder, setActualOrder] = useState({
    userOrder: null,
    orderDetails: [],
    totalPrice: 0,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [modifiedOrders, setModifiedOrders] = useState(false);

  const { user, isAuth } = useAuth();
  const { setModifiedProducts } = useProducts();

  useEffect(() => {
    if (actualOrder.userOrder && user._id !== actualOrder.userOrder._id) {
      setActualOrder({
        userOrder: isAuth ? user._id : null,
        orderDetails: [],
        totalPrice: 0,
      });
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      searchOrders();
      setModifiedOrders(false);
      setErrors([]);
    }
  }, [modifiedOrders]);

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
      if (existing.quantity === 1 && quantity < 0) {
        removeFromCart(product._id);
        return;
      }

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

  const updateQuantity = (productId, newQuantity) => {
    const item = actualOrder.orderDetails.find(
      (item) => item.product._id === productId
    );

    if (!item) return;

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (newQuantity > item.product.stock) {
      showNotification({
        message: `Solo hay ${item.product.stock} unidades disponibles`,
        status: "warning",
      });
      return;
    }

    const updatedDetails = actualOrder.orderDetails.map((detail) =>
      detail.product._id === productId
        ? {
            ...detail,
            quantity: newQuantity,
            total_price: newQuantity * detail.product.price,
          }
        : detail
    );

    const newTotal = updatedDetails.reduce((acc, i) => acc + i.total_price, 0);
    setActualOrder({ orderDetails: updatedDetails, totalPrice: newTotal });
  };

  const incrementQuantity = (productId) => {
    const item = actualOrder.orderDetails.find(
      (item) => item.product._id === productId
    );
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  const decrementQuantity = (productId) => {
    const item = actualOrder.orderDetails.find(
      (item) => item.product._id === productId
    );
    if (item) {
      updateQuantity(productId, item.quantity - 1);
    }
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
        setModifiedProducts(true);
        showNotification({
          message: `<span uk-icon="icon: check"></span> ¡Pedido realizado exitosamente!`,
          status: "success",
          timeout: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al crear la orden"]);
    }
  };

  const modifyOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await modifyOrderStatusRequest({
        id: orderId,
        status: newStatus,
      });
      if (res.status === 200) {
        setModifiedOrders(true);
      }
    } catch (error) {
      console.error(error);
      setErrors([
        error.response?.data?.message ||
          "Error al modificar el estado de la orden",
      ]);
    }
  };

  const searchOrders = async (params) => {
    try {
      const res = await searchOrdersRequest(params);
      if (res.status === 200 && res.data) {
        setOrders(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors([
        error.response?.data?.message || "Error al cargar las órdenes",
      ]);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        actualOrder,
        isCartOpen,
        errors,
        modifiedOrders,
        setModifiedOrders,
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        setIsCartOpen,
        createOrder,
        modifyOrderStatus,
        searchOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
