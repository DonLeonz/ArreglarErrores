const AdminTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "products", label: "Productos" },
    { id: "orders", label: "Pedidos" },
    { id: "blogs", label: "Blogs y Comentarios" },
    { id: "users", label: "Usuarios" },
  ];

  return (
    <div className="admin-tabs uk-margin-medium-bottom uk-flex uk-flex-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`admin-tab-button ${
            activeTab === tab.id ? "active" : ""
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;
