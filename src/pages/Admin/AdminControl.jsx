import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";
import { useBlogs } from "../../context/BlogsContext";
import { useOrders } from "../../context/OrdersContext";
import { useUsers } from "../../context/UsersContext";
import CreateProductModal from "../../components/modals/CreationModals/CreateProductModal/CreateProductModal";
import ProductSearchForm from "../../components/features/ProductSearchForm/ProductSearchForm";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import "./Admin.css";
import { useAuth } from "../../context/AuthContext";

const AdminControl = () => {
  const { blogs, comments, deleteBlog, deleteComment } = useBlogs();

  console.log(blogs);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState("create");
  const [activeTab, setActiveTab] = useState("products");
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    message: "",
    onConfirm: null,
  });
  const [orderSearchTerm, setOrderSearchTerm] = useState("");
  const [blogSearchTerm, setBlogSearchTerm] = useState("");

  // PRODUCTOS
  const { products, modifyProductStatus, setModifiedProducts } = useProducts();

  const handleCreateClick = () => {
    setSelectedProduct(null);
    setModalMode("create");
    setShowModal(true);
  };

  const handleModifyClick = (product) => {
    setSelectedProduct(product);
    setModalMode("modify");
    setShowModal(true);
  };

  // ORDENES
  const {
    orders,
    searchOrders,
    modifyOrderStatus,
    modifiedOrders,
    setModifiedOrders,
  } = useOrders();

  useEffect(() => {
    if (activeTab === "orders") {
      searchOrders();
      setModifiedOrders(false);
    }
  }, [activeTab, modifiedOrders]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const success = await modifyOrderStatus(orderId, newStatus);
    setModifiedProducts(true);
    if (success && window.UIkit) {
      window.UIkit.notification({
        message: `Estado actualizado a ${newStatus}`,
        status: "success",
        pos: "top-center",
      });
    }
  };

  // USUARIOS
  const {
    users,
    searchUsers,
    modifiedUsers,
    setModifiedUsers,
    modifyUserStatus,
    updateUserRole,
    deleteUserRole,
  } = useUsers();

  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (activeTab === "users") {
      searchUsers();
      setModifiedUsers(false);
    }
  }, [activeTab, modifiedUsers]);

  const handleModifyUserStatus = async (userId, enabled) => {
    showConfirm(
      `¿Estás seguro de que deseas ${
        enabled ? "activar" : "desactivar"
      }  este usuario?`,
      async () => {
        const success = await modifyUserStatus(userId, enabled);
        if (success && window.UIkit) {
          window.UIkit.notification({
            message: `Usuario ${
              enabled ? "activado" : "desactivado"
            } exitosamente`,
            status: "success",
            pos: "top-center",
          });
        }
      }
    );
  };

  // GLOBAL
  const showConfirm = (message, onConfirm) => {
    setConfirmModal({ show: true, message, onConfirm });
  };

  const handleConfirmClose = () => {
    setConfirmModal({ show: false, message: "", onConfirm: null });
  };

  const handleConfirmAccept = () => {
    if (confirmModal.onConfirm) {
      confirmModal.onConfirm();
    }
    handleConfirmClose();
  };

  //

  const handleDeleteBlog = async (blogId) => {
    showConfirm("¿Estás seguro de que deseas eliminar este blog?", async () => {
      const success = await deleteBlog(blogId);
      if (success && window.UIkit) {
        window.UIkit.notification({
          message: "Blog eliminado exitosamente",
          status: "success",
          pos: "top-center",
        });
      }
    });
  };

  const handleDeleteComment = async (commentId) => {
    showConfirm(
      "¿Estás seguro de que deseas eliminar este comentario?",
      async () => {
        const success = await deleteComment(commentId);
        if (success && window.UIkit) {
          window.UIkit.notification({
            message: "Comentario eliminado exitosamente",
            status: "success",
            pos: "top-center",
          });
        }
      }
    );
  };

  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => {
        const searchLower = orderSearchTerm.toLowerCase();
        return (
          order._id?.toLowerCase().includes(searchLower) ||
          order.client?.username?.toLowerCase().includes(searchLower) ||
          order.status?.toLowerCase().includes(searchLower)
        );
      })
    : [];

  const filteredBlogs = Array.isArray(blogs)
    ? blogs.filter((blog) => {
        const searchLower = blogSearchTerm.toLowerCase();
        return (
          blog.title?.toLowerCase().includes(searchLower) ||
          blog.user?.username?.toLowerCase().includes(searchLower) ||
          blog.content?.toLowerCase().includes(searchLower)
        );
      })
    : [];

  return (
    <div className="uk-section first-child-adjustment uk-background-secondary uk-light uk-padding-small">
      <div className="uk-container uk-container-xlarge uk-padding-small">
        <h2 className="uk-heading-line uk-text-center">
          <span>Panel de Administración</span>
        </h2>

        <div className="admin-tabs uk-margin-medium-bottom uk-flex uk-flex-center">
          <button
            className={`admin-tab-button ${
              activeTab === "products" ? "active" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            Productos
          </button>
          <button
            className={`admin-tab-button ${
              activeTab === "orders" ? "active" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Pedidos
          </button>
          <button
            className={`admin-tab-button ${
              activeTab === "blogs" ? "active" : ""
            }`}
            onClick={() => setActiveTab("blogs")}
          >
            Blogs y Comentarios
          </button>
          <button
            className={`admin-tab-button ${
              activeTab === "users" ? "active" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            Usuarios
          </button>
        </div>

        {activeTab === "products" && (
          <>
            <div className="uk-margin-medium-bottom">
              <ProductSearchForm enabled={null} />
            </div>

            <div className="uk-margin-medium-bottom uk-flex uk-flex-center">
              <button
                className="btn-golden-primary admin-register-product-btn uk-text-capitalize uk-width-1-2@s uk-width-1-3@m"
                onClick={handleCreateClick}
              >
                Registrar Nuevo Producto
              </button>
            </div>

            <div
              className="uk-grid-small uk-child-width-1-3@m uk-child-width-1-2@s"
              data-uk-grid
              data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 120; repeat: true"
            >
              {Array.isArray(products) &&
                products.map((item, index) => (
                  <div key={index}>
                    <div className="admin-product-card">
                      <img
                        src={`/src/assets/img/menu/${item.image}`}
                        alt={item.name}
                        className="admin-product-image"
                      />
                      <h4 className="admin-card-title">{item.name}</h4>
                      <p className="admin-card-info">
                        <strong>Categoría:</strong>{" "}
                        {item.category?.name || "Sin categoría"}
                      </p>
                      <p className="admin-card-info">
                        <strong>Precio:</strong> ${" "}
                        {item.price.toLocaleString("es-CO")}
                      </p>
                      <p className="admin-card-info">
                        <strong>Stock:</strong> {item.stock}
                      </p>
                      <p className="admin-card-info">
                        <strong>Origen:</strong> {item.origin}
                      </p>

                      <button
                        className="btn-golden-primary uk-margin-top"
                        onClick={() => handleModifyClick(item)}
                      >
                        Modificar
                      </button>
                      <div className="uk-margin-small-top uk-width-1-1">
                        <div className="admin-button-column">
                          <button
                            className={`${
                              !item.enabled
                                ? "admin-order-completed-btn"
                                : "admin-order-cancelled-btn"
                            }`}
                            onClick={() =>
                              modifyProductStatus(
                                item._id,
                                item.enabled ? false : true
                              )
                            }
                          >
                            {!item.enabled
                              ? "Activar Producto"
                              : "Desactivar Producto"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <>
            <div className="uk-margin-medium-bottom uk-flex uk-flex-center">
              <div className="uk-width-1-2@m">
                <SearchBar
                  onSearch={setOrderSearchTerm}
                  textHint="Buscar por ID, cliente o estado"
                />
              </div>
            </div>
            <div
              className="uk-grid-small uk-grid-match uk-child-width-1-3@s"
              data-uk-grid
              data-uk-scrollspy="cls: uk-animation-slide-right-medium; target: > div; delay: 150; repeat: true"
            >
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                <div key={order._id || order.id}>
                  <div className="admin-blog-card">
                    <div className="uk-grid-small" data-uk-grid>
                      <div className="uk-width-1-1">
                        <h4 className="admin-card-title">
                          Pedido #{order._id?.slice(-6)}
                        </h4>
                        <p className="admin-card-info">
                          <strong>Cliente:</strong> {order.client.username}
                        </p>
                        <p className="admin-card-info">
                          <strong>Estado:</strong>{" "}
                          <span
                            className={
                              order.status === "COMPLETADO"
                                ? "admin-status-completed"
                                : order.status === "PENDIENTE"
                                ? "admin-status-pending"
                                : order.status === "CANCELADA"
                                ? "admin-status-cancelled"
                                : ""
                            }
                          >
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
                                {detail.product.name} - Cantidad:{" "}
                                {detail.quantity} - Precio Unidad: $
                                {detail.product.price.toLocaleString("es-CO")}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p className="admin-card-info admin-order-total">
                          <strong>Total:</strong> $
                          {order.total_price.toLocaleString("es-CO")}
                        </p>
                      </div>

                      <div className="uk-width-1-1">
                        <div className="admin-button-column">
                          <button
                            className="admin-order-completed-btn"
                            onClick={() =>
                              handleUpdateOrderStatus(order._id, "COMPLETADO")
                            }
                            disabled={order.status !== "PENDIENTE"}
                          >
                            Marcar Completado
                          </button>
                          <button
                            className="admin-order-cancelled-btn"
                            onClick={() =>
                              handleUpdateOrderStatus(order._id, "CANCELADA")
                            }
                            disabled={order.status !== "PENDIENTE"}
                          >
                            Marcar Cancelado
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="uk-width-1-1 uk-text-center admin-empty-message">
                <p>
                  No hay pedidos para mostrar. Los pedidos se mostrarán aquí una
                  vez sean registrados
                </p>
              </div>
            )}
            </div>
          </>
        )}

        {activeTab === "blogs" && (
          <>
            <div className="uk-margin-medium-bottom uk-flex uk-flex-center">
              <div className="uk-width-1-2@m">
                <SearchBar
                  onSearch={setBlogSearchTerm}
                  textHint="Buscar por título, autor o contenido"
                />
              </div>
            </div>
            <div
              className="uk-grid-small uk-child-width-1-3@m"
              data-uk-grid
              data-uk-scrollspy="cls: uk-animation-slide-top-medium; target: > div; delay: 130; repeat: true"
            >
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => {
                const blogComments = Array.isArray(comments)
                  ? comments.filter((c) => c.blog._id === blog._id)
                  : [];

                return (
                  <div key={blog._id || blog.id}>
                    <div className="admin-blog-card">
                      <h4 className="admin-card-title">{blog.title}</h4>
                      <p className="admin-card-info">
                        <strong>Autor:</strong> {blog.user.username}
                      </p>
                      <p className="admin-card-info">
                        <strong>Fecha:</strong>{" "}
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString("es-ES")
                          : blog.date || "N/A"}
                      </p>
                      <p className="admin-blog-excerpt">{blog.content}</p>
                      <div className="admin-button-column">
                        <button
                          className="btn-golden-primary"
                          onClick={() => {
                            window.UIkit.notification({
                              message:
                                "Funcionalidad de edición lista para conectar con backend",
                              status: "primary",
                              pos: "top-center",
                            });
                          }}
                        >
                          Editar Blog
                        </button>
                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDeleteBlog(blog._id || blog.id)}
                        >
                          Eliminar Blog
                        </button>
                      </div>

                      {blogComments.length > 0 && (
                        <div className="admin-comments-section">
                          <h5 className="admin-comments-title">
                            Comentarios ({blogComments.length})
                          </h5>
                          {blogComments.map((comment) => (
                            <div
                              key={comment._id}
                              className="admin-comment-card"
                            >
                              <div className="admin-comment-container">
                                <p className="admin-comment-info">
                                  <strong>{comment.user.username}</strong> -{" "}
                                  {comment.createdAt
                                    ? new Date(
                                        comment.createdAt
                                      ).toLocaleDateString("es-CO")
                                    : "N/A"}
                                </p>

                                <div className="admin-comment-text uk-padding-left">
                                  {comment.content}
                                </div>

                                <button
                                  className="admin-delete-btn admin-delete-btn-small"
                                  onClick={() =>
                                    handleDeleteComment(comment._id)
                                  }
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="uk-width-1-1 uk-text-center admin-empty-message">
                <p>
                  No hay blogs para mostrar. Los blogs se mostrarán aquí cuando
                  el backend esté configurado.
                </p>
              </div>
            )}
            </div>
          </>
        )}

        {activeTab === "users" && (
          <div
            className="uk-grid-small uk-child-width-1-2@m uk-child-width-1-1@s"
            data-uk-grid
            data-uk-scrollspy="cls: uk-animation-scale-up; target: > div; delay: 180; repeat: true"
          >
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <div key={user._id || user.id}>
                  <div className="admin-blog-card">
                    <h4 className="admin-card-title">{user.username}</h4>
                    <p className="admin-card-info">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="admin-card-info">
                      <strong>Rol:</strong>{" "}
                      <span
                        className={
                          user.roles?.some((r) => r.name === "ADMIN")
                            ? "admin-role-admin"
                            : "admin-role-customer"
                        }
                      >
                        {user.roles?.map((r) => r.name).join(", ") || "N/A"}
                      </span>
                    </p>
                    <p className="admin-card-info">
                      <strong>Estado:</strong>{" "}
                      <span
                        className={
                          user.enabled
                            ? "admin-user-active"
                            : "admin-user-inactive"
                        }
                      >
                        {user.enabled ? "Activo" : "Suspendido"}
                      </span>
                    </p>
                    <p className="admin-card-info">
                      <strong>Fecha de registro:</strong>{" "}
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("es-ES")
                        : "N/A"}
                    </p>

                    <div className="admin-button-column">
                      <button
                        className="admin-make-admin-btn"
                        onClick={() => updateUserRole(user._id, "ADMIN")}
                        disabled={user.roles?.some((r) => r.name === "ADMIN")}
                      >
                        Hacer Admin
                      </button>
                      <button
                        className="admin-make-customer-btn"
                        onClick={() => updateUserRole(user._id, "CUSTOMER")}
                        disabled={
                          user.roles?.some((r) => r.name === "CUSTOMER") &&
                          !user.roles?.some((r) => r.name === "ADMIN")
                        }
                      >
                        Hacer Customer
                      </button>
                      <button
                        className={`admin-toggle-status-btn ${
                          user._id !== currentUser._id
                            ? user.enabled
                              ? "suspend"
                              : "activate"
                            : "disabled"
                        }`}
                        onClick={() =>
                          handleModifyUserStatus(
                            user._id,
                            user.enabled ? false : true
                          )
                        }
                        disabled={user._id === currentUser._id}
                      >
                        {user._id !== currentUser._id
                          ? user.enabled
                            ? "Suspender"
                            : "Activar"
                          : "Este es tu Usuario"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="uk-width-1-1 uk-text-center admin-empty-message">
                <p>
                  No hay usuarios para mostrar. Los usuarios se mostrarán aquí
                  cuando el backend esté configurado.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <CreateProductModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
          mode={modalMode}
          product={selectedProduct}
        />
      )}

      {confirmModal.show && (
        <div
          className="uk-modal uk-open login-modal-display"
          onClick={handleConfirmClose}
        >
          <div
            className="uk-modal-dialog uk-modal-body login-modal-container login-modal-center admin-confirm-modal-width"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-golden"
              type="button"
              onClick={handleConfirmClose}
              aria-label="Cerrar"
            ></button>

            <h2 className="uk-modal-title admin-modal-title-centered">
              Confirmación
            </h2>

            <p className="admin-confirm-message">{confirmModal.message}</p>

            <div className="uk-flex uk-flex-between uk-flex-middle">
              <button
                className="btn-golden-primary admin-confirm-btn-left"
                type="button"
                onClick={handleConfirmAccept}
              >
                Confirmar
              </button>
              <button
                className="btn-cancel-product admin-confirm-btn-right"
                type="button"
                onClick={handleConfirmClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminControl;
