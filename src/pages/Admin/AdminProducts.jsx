import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";
import { useBlogs } from "../../context/BlogsContext";
import { useOrders } from "../../context/OrdersContext";
import { useUsers } from "../../context/UsersContext";
import CreateProductModal from "../../components/modals/CreationModals/CreateProductModal";
import ProductSearchForm from "../../components/features/Menu/MenuHeader/ProductSearchForm";
import "./Admin.css";

const AdminProducts = () => {
  const { products } = useProducts();
  const { blogs, comments, deleteBlog, deleteComment } = useBlogs();
  const { allOrders, searchAllOrders, updateOrderStatus, deleteOrder, modifiedOrders, setModifiedOrders } = useOrders();
  const { users, searchUsers, updateUserRole, toggleUserStatus, deleteUser, modifiedUsers, setModifiedUsers } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState("create");
  const [activeTab, setActiveTab] = useState("products");
  const [confirmModal, setConfirmModal] = useState({ show: false, message: "", onConfirm: null });

  // Cargar pedidos cuando el tab esté activo
  useEffect(() => {
    if (activeTab === "orders") {
      searchAllOrders();
      setModifiedOrders(false);
    }
  }, [activeTab, modifiedOrders]);

  // Cargar usuarios cuando el tab esté activo
  useEffect(() => {
    if (activeTab === "users") {
      searchUsers();
      setModifiedUsers(false);
    }
  }, [activeTab, modifiedUsers]);

  const handleModifyClick = (product) => {
    setSelectedProduct(product);
    setModalMode("modify");
    setShowModal(true);
  };

  const handleCreateClick = () => {
    setSelectedProduct(null);
    setModalMode("create");
    setShowModal(true);
  };

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
    showConfirm("¿Estás seguro de que deseas eliminar este comentario?", async () => {
      const success = await deleteComment(commentId);
      if (success && window.UIkit) {
        window.UIkit.notification({
          message: "Comentario eliminado exitosamente",
          status: "success",
          pos: "top-center",
        });
      }
    });
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const success = await updateOrderStatus(orderId, newStatus);
    if (success && window.UIkit) {
      window.UIkit.notification({
        message: `Estado actualizado a ${newStatus}`,
        status: "success",
        pos: "top-center",
      });
    }
  };

  const handleDeleteOrder = async (orderId) => {
    showConfirm("¿Estás seguro de que deseas eliminar este pedido?", async () => {
      const success = await deleteOrder(orderId);
      if (success && window.UIkit) {
        window.UIkit.notification({
          message: "Pedido eliminado exitosamente",
          status: "success",
          pos: "top-center",
        });
      }
    });
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    const success = await updateUserRole(userId, newRole);
    if (success && window.UIkit) {
      window.UIkit.notification({
        message: `Rol actualizado a ${newRole}`,
        status: "success",
        pos: "top-center",
      });
    }
  };

  const handleToggleUserStatus = async (userId) => {
    const success = await toggleUserStatus(userId);
    if (success && window.UIkit) {
      window.UIkit.notification({
        message: "Estado del usuario actualizado",
        status: "success",
        pos: "top-center",
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    showConfirm("¿Estás seguro de que deseas eliminar este usuario?", async () => {
      const success = await deleteUser(userId);
      if (success && window.UIkit) {
        window.UIkit.notification({
          message: "Usuario eliminado exitosamente",
          status: "success",
          pos: "top-center",
        });
      }
    });
  };

  return (
    <div className="uk-section first-child-adjustment uk-background-secondary uk-light uk-padding-small">
      <div className="uk-container uk-container-xlarge uk-padding-small">
        <h2 className="uk-heading-line uk-text-center">
          <span>Panel de Administración</span>
        </h2>

        <div className="admin-tabs uk-margin-medium-bottom uk-flex uk-flex-center">
          <button
            className={`admin-tab-button ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Productos
          </button>
          <button
            className={`admin-tab-button ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Pedidos
          </button>
          <button
            className={`admin-tab-button ${activeTab === "blogs" ? "active" : ""}`}
            onClick={() => setActiveTab("blogs")}
          >
            Blogs y Comentarios
          </button>
          <button
            className={`admin-tab-button ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Usuarios
          </button>
        </div>

        {activeTab === "products" && (
          <>
            <div className="uk-margin-medium-bottom">
              <ProductSearchForm />
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
                        <strong>Categoría:</strong> {item.category?.name || "Sin categoría"}
                      </p>
                      <p className="admin-card-info">
                        <strong>Precio:</strong> ${item.price}
                      </p>
                      <p className="admin-card-info">
                        <strong>Stock:</strong> {item.stock}
                      </p>
                      <p className="admin-card-info">
                        <strong>Origen:</strong> {item.origin}
                      </p>

                      <button
                        className="admin-edit-btn uk-margin-top"
                        onClick={() => handleModifyClick(item)}
                      >
                        Modificar
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <div
            className="uk-grid-small uk-child-width-1-1@s"
            data-uk-grid
            data-uk-scrollspy="cls: uk-animation-slide-right-medium; target: > div; delay: 150; repeat: true"
          >
            {Array.isArray(allOrders) && allOrders.length > 0 ? (
              allOrders.map((order) => (
                <div key={order._id || order.id}>
                  <div className="admin-blog-card">
                    <div className="uk-grid-small" data-uk-grid>
                      <div className="uk-width-2-3@m uk-width-1-1">
                        <h4 className="admin-card-title">
                          Pedido #{order._id?.slice(-6) || order.id}
                        </h4>
                        <p className="admin-card-info">
                          <strong>Cliente:</strong> {order.clientId?.username || order.clientId?.email || "N/A"}
                        </p>
                        <p className="admin-card-info">
                          <strong>Estado:</strong>{" "}
                          <span style={{
                            color: order.status === "COMPLETADO" ? "#27ae60" :
                                   order.status === "PENDIENTE" ? "#f39c12" :
                                   order.status === "CANCELADO" ? "#e74c3c" : "#95a5a6",
                            fontWeight: "bold"
                          }}>
                            {order.status}
                          </span>
                        </p>
                        <p className="admin-card-info">
                          <strong>Fecha:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString('es-ES') : "N/A"}
                        </p>

                        <div className="admin-blog-excerpt">
                          <strong>Productos:</strong>
                          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                            {order.orderDetails?.map((detail, idx) => (
                              <li key={idx}>
                                {detail.productId?.name || "Producto"} - Cantidad: {detail.quantity} - ${detail.total_price || (detail.quantity * (detail.productId?.price || 0))}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p className="admin-card-info" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '15px' }}>
                          <strong>Total:</strong> ${order.totalPrice || order.orderDetails?.reduce((acc, d) => acc + (d.total_price || 0), 0) || 0}
                        </p>
                      </div>

                      <div className="uk-width-1-3@m uk-width-1-1">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <button
                            className="admin-edit-btn"
                            style={{
                              background: order.status === "PENDIENTE" ? "linear-gradient(135deg, #95a5a6, #7f8c8d)" : "linear-gradient(135deg, #f39c12, #e67e22)",
                              opacity: order.status === "PENDIENTE" ? 0.6 : 1
                            }}
                            onClick={() => handleUpdateOrderStatus(order._id || order.id, "PENDIENTE")}
                            disabled={order.status === "PENDIENTE"}
                          >
                            Marcar Pendiente
                          </button>
                          <button
                            className="admin-edit-btn"
                            style={{
                              background: order.status === "COMPLETADO" ? "linear-gradient(135deg, #95a5a6, #7f8c8d)" : "linear-gradient(135deg, #27ae60, #2ecc71)",
                              opacity: order.status === "COMPLETADO" ? 0.6 : 1
                            }}
                            onClick={() => handleUpdateOrderStatus(order._id || order.id, "COMPLETADO")}
                            disabled={order.status === "COMPLETADO"}
                          >
                            Marcar Completado
                          </button>
                          <button
                            className="admin-edit-btn"
                            style={{
                              background: order.status === "CANCELADO" ? "linear-gradient(135deg, #95a5a6, #7f8c8d)" : "linear-gradient(135deg, #e74c3c, #c0392b)",
                              opacity: order.status === "CANCELADO" ? 0.6 : 1
                            }}
                            onClick={() => handleUpdateOrderStatus(order._id || order.id, "CANCELADO")}
                            disabled={order.status === "CANCELADO"}
                          >
                            Marcar Cancelado
                          </button>
                          <button
                            className="admin-delete-btn"
                            onClick={() => handleDeleteOrder(order._id || order.id)}
                          >
                            Eliminar Pedido
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="uk-width-1-1 uk-text-center" style={{ color: '#d4a762', padding: '40px' }}>
                <p>No hay pedidos para mostrar. Los pedidos se mostrarán aquí cuando el backend esté configurado.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "blogs" && (
          <div
            className="uk-grid-small uk-child-width-1-1@s"
            data-uk-grid
            data-uk-scrollspy="cls: uk-animation-slide-top-medium; target: > div; delay: 130; repeat: true"
          >
            {Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.map((blog) => {
                const blogComments = Array.isArray(comments)
                  ? comments.filter(c => c.blogId === blog._id || c.blogId === blog.id || c.blogId?.title === blog.title)
                  : [];

                return (
                  <div key={blog._id || blog.id}>
                    <div className="admin-blog-card">
                      <h4 className="admin-card-title">{blog.title}</h4>
                      <p className="admin-card-info">
                        <strong>Autor:</strong> {blog.author}
                      </p>
                      <p className="admin-card-info">
                        <strong>Fecha:</strong> {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('es-ES') : blog.date || "N/A"}
                      </p>
                      <p className="admin-blog-excerpt">{blog.excerpt}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                        <button
                          className="admin-edit-btn"
                          onClick={() => {
                            window.UIkit.notification({
                              message: "Funcionalidad de edición lista para conectar con backend",
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

                      {/* Comentarios del blog */}
                      {blogComments.length > 0 && (
                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid rgba(212, 167, 98, 0.3)' }}>
                          <h5 style={{ color: '#d4a762', marginBottom: '15px', fontSize: '1.1rem' }}>
                            Comentarios ({blogComments.length})
                          </h5>
                          {blogComments.map((comment) => (
                            <div key={comment._id || comment.id} style={{
                              background: 'rgba(212, 167, 98, 0.05)',
                              padding: '12px',
                              borderRadius: '8px',
                              marginBottom: '10px',
                              border: '1px solid rgba(212, 167, 98, 0.2)'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                                <div style={{ flex: 1 }}>
                                  <p className="admin-card-info" style={{ marginBottom: '5px', fontSize: '0.85rem' }}>
                                    <strong>{comment.author}</strong> - {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString('es-ES') : "N/A"}
                                  </p>
                                  <div className="admin-comment-text" style={{ fontSize: '0.9rem' }}>
                                    {comment.text || comment.content}
                                  </div>
                                </div>
                                <button
                                  className="admin-delete-btn"
                                  onClick={() => handleDeleteComment(comment._id || comment.id)}
                                  style={{ minWidth: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
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
              <div className="uk-width-1-1 uk-text-center" style={{ color: '#d4a762', padding: '40px' }}>
                <p>No hay blogs para mostrar. Los blogs se mostrarán aquí cuando el backend esté configurado.</p>
              </div>
            )}
          </div>
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
                      <span style={{
                        color: user.roles?.some(r => r.name === "ADMIN") ? "#e74c3c" : "#3498db",
                        fontWeight: "bold"
                      }}>
                        {user.roles?.map(r => r.name).join(", ") || "N/A"}
                      </span>
                    </p>
                    <p className="admin-card-info">
                      <strong>Estado:</strong>{" "}
                      <span style={{
                        color: user.isActive ? "#27ae60" : "#95a5a6",
                        fontWeight: "bold"
                      }}>
                        {user.isActive ? "Activo" : "Suspendido"}
                      </span>
                    </p>
                    <p className="admin-card-info">
                      <strong>Fecha de registro:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : "N/A"}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                      <button
                        className="admin-edit-btn"
                        style={{
                          background: user.roles?.some(r => r.name === "ADMIN") ? "linear-gradient(135deg, #95a5a6, #7f8c8d)" : "linear-gradient(135deg, #e74c3c, #c0392b)",
                          opacity: user.roles?.some(r => r.name === "ADMIN") ? 0.6 : 1
                        }}
                        onClick={() => handleUpdateUserRole(user._id || user.id, "ADMIN")}
                        disabled={user.roles?.some(r => r.name === "ADMIN")}
                      >
                        Hacer Admin
                      </button>
                      <button
                        className="admin-edit-btn"
                        style={{
                          background: user.roles?.some(r => r.name === "CUSTOMER") && !user.roles?.some(r => r.name === "ADMIN") ? "linear-gradient(135deg, #95a5a6, #7f8c8d)" : "linear-gradient(135deg, #3498db, #2980b9)",
                          opacity: user.roles?.some(r => r.name === "CUSTOMER") && !user.roles?.some(r => r.name === "ADMIN") ? 0.6 : 1
                        }}
                        onClick={() => handleUpdateUserRole(user._id || user.id, "CUSTOMER")}
                        disabled={user.roles?.some(r => r.name === "CUSTOMER") && !user.roles?.some(r => r.name === "ADMIN")}
                      >
                        Hacer Customer
                      </button>
                      <button
                        className="admin-edit-btn"
                        style={{
                          background: user.isActive ? "linear-gradient(135deg, #f39c12, #e67e22)" : "linear-gradient(135deg, #27ae60, #2ecc71)"
                        }}
                        onClick={() => handleToggleUserStatus(user._id || user.id)}
                      >
                        {user.isActive ? "Suspender" : "Activar"}
                      </button>
                      <button
                        className="admin-delete-btn"
                        onClick={() => handleDeleteUser(user._id || user.id)}
                      >
                        Eliminar Usuario
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="uk-width-1-1 uk-text-center" style={{ color: '#d4a762', padding: '40px' }}>
                <p>No hay usuarios para mostrar. Los usuarios se mostrarán aquí cuando el backend esté configurado.</p>
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
            className="uk-modal-dialog uk-modal-body login-modal-container login-modal-center"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '500px' }}
          >
            <button
              className="login-modal-close"
              type="button"
              onClick={handleConfirmClose}
              aria-label="Cerrar"
            ></button>

            <h2 className="uk-modal-title" style={{ textAlign: 'center', marginBottom: '25px' }}>
              Confirmación
            </h2>

            <p style={{ color: '#f5f5f5', fontSize: '1.1rem', textAlign: 'center', marginBottom: '30px', lineHeight: '1.6' }}>
              {confirmModal.message}
            </p>

            <div className="uk-flex uk-flex-between uk-flex-middle">
              <button
                className="btn-submit-product"
                type="button"
                onClick={handleConfirmAccept}
                style={{ flex: '1', marginRight: '10px' }}
              >
                Confirmar
              </button>
              <button
                className="btn-cancel-product"
                type="button"
                onClick={handleConfirmClose}
                style={{ flex: '1', marginLeft: '10px' }}
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

export default AdminProducts;