const AdminUserCard = ({
  user,
  currentUserId,
  onUpdateRole,
  onModifyStatus,
}) => {
  const isAdmin = user.roles?.some((r) => r.name === "ADMIN");
  const isCustomer = user.roles?.some((r) => r.name === "CUSTOMER");
  const isCurrentUser = user._id === currentUserId;

  return (
    <div className="admin-blog-card">
      <h4 className="admin-card-title">{user.username}</h4>
      <p className="admin-card-info">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="admin-card-info">
        <strong>Rol:</strong>{" "}
        <span className={isAdmin ? "admin-role-admin" : "admin-role-customer"}>
          {user.roles?.map((r) => r.name).join(", ") || "N/A"}
        </span>
      </p>
      <p className="admin-card-info">
        <strong>Estado:</strong>{" "}
        <span
          className={
            user.enabled ? "admin-user-active" : "admin-user-inactive"
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
          onClick={() => onUpdateRole(user._id, "ADMIN")}
          disabled={isAdmin}
        >
          Hacer Admin
        </button>
        <button
          className="admin-make-customer-btn"
          onClick={() => onUpdateRole(user._id, "CUSTOMER")}
          disabled={isCustomer && !isAdmin}
        >
          Hacer Customer
        </button>
        <button
          className={`admin-toggle-status-btn ${
            !isCurrentUser
              ? user.enabled
                ? "suspend"
                : "activate"
              : "disabled"
          }`}
          onClick={() => onModifyStatus(user._id, !user.enabled)}
          disabled={isCurrentUser}
        >
          {!isCurrentUser
            ? user.enabled
              ? "Suspender Usuario"
              : "Activar Usuario"
            : "No puedes modificarte"}
        </button>
      </div>
    </div>
  );
};

export default AdminUserCard;
