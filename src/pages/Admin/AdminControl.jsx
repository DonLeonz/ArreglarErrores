import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";
import { useBlogs } from "../../context/BlogsContext";
import { useOrders } from "../../context/OrdersContext";
import { useUsers } from "../../context/UsersContext";
import { useAuth } from "../../context/AuthContext";
import CreateProductModal from "../../components/modals/CreationModals/CreateProductModal/CreateProductModal";
import ProductSearchForm from "../../components/features/ProductSearchForm/ProductSearchForm";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import AdminTabs from "../../components/features/Admin/AdminTabs";
import AdminProductCard from "../../components/features/Admin/AdminProductCard";
import AdminOrderCard from "../../components/features/Admin/AdminOrderCard";
import AdminBlogCard from "../../components/features/Admin/AdminBlogCard";
import AdminUserCard from "../../components/features/Admin/AdminUserCard";
import ConfirmModal from "../../components/features/Admin/ConfirmModal";
import "./Admin.css";

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

        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
                    <AdminProductCard
                      product={item}
                      onModifyClick={handleModifyClick}
                      onToggleStatus={modifyProductStatus}
                    />
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
                    <AdminOrderCard
                      order={order}
                      onUpdateStatus={handleUpdateOrderStatus}
                    />
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
                filteredBlogs.map((blog) => (
                  <div key={blog._id || blog.id}>
                    <AdminBlogCard
                      blog={blog}
                      comments={comments}
                      onDeleteBlog={handleDeleteBlog}
                      onDeleteComment={handleDeleteComment}
                    />
                  </div>
                ))
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
                  <AdminUserCard
                    user={user}
                    currentUserId={currentUser._id}
                    onUpdateRole={updateUserRole}
                    onModifyStatus={handleModifyUserStatus}
                  />
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

      <ConfirmModal
        isOpen={confirmModal.show}
        message={confirmModal.message}
        onConfirm={handleConfirmAccept}
        onCancel={handleConfirmClose}
      />
    </div>
  );
};

export default AdminControl;
