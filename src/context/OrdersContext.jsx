import { createContext, useContext, useState } from "react";
import {
  createOrderRequest,
  searchOrdersRequest,
  updateOrderStatusRequest,
  deleteOrderRequest
} from "../api/requests/orders.request";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { useProducts } from "./ProductsContext";

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrdersProvider");
  return context;
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]); // Para admin
  const [actualOrder, setActualOrder] = useState({
    orderDetails: [],
    totalPrice: 0,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [modifiedOrders, setModifiedOrders] = useState(false);

  const { user, isAuth } = useAuth();
  const { setModifiedProducts } = useProducts();

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
      window.UIkit?.notification({
        message: `Solo hay ${item.product.stock} unidades disponibles`,
        status: "warning",
        pos: "top-center",
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
      }
    } catch (error) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al crear la orden"]);
    }
  };

  // Funciones de administración
  const searchAllOrders = async (params) => {
    try {
      const res = await searchOrdersRequest(params);
      if (res.status === 200 && res.data) {
        setAllOrders(res.data);
        return true;
      }
    } catch (error) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al buscar órdenes"]);
      return false;
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await updateOrderStatusRequest(orderId, { status: newStatus });
      if (res.status === 200 || res.status === 204) {
        setModifiedOrders(true);
        return true;
      }
    } catch (error) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al actualizar estado"]);
      return false;
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const res = await deleteOrderRequest(orderId);
      if (res.status === 200 || res.status === 204) {
        setModifiedOrders(true);
        return true;
      }
    } catch (error) {
      console.error(error);
      setErrors([error.response?.data?.message || "Error al eliminar orden"]);
      return false;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        allOrders,
        actualOrder,
        isCartOpen,
        errors,
        modifiedOrders,
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        setIsCartOpen,
        createOrder,
        searchAllOrders,
        updateOrderStatus,
        deleteOrder,
        setModifiedOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};