// ========================================
// SISTEMA UNIVERSAL DE CARRITO SURTIENVASES
// Funciona en todas las páginas
// ========================================

// Actualizar contador del carrito en todos los badges
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  // Actualizar todos los badges del carrito
  const badges = [
    document.getElementById("cart-count"),
    document.getElementById("cart-count-navbar"),
  ];

  badges.forEach((badge) => {
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "flex" : "none";
    }
  });
}

// Toggle del carrito
function toggleCart() {
  renderCart();
  UIkit.modal("#cart-modal").show();
}

// Renderizar el carrito
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML =
      '<p class="uk-text-center uk-text-muted">El carrito está vacío</p>';
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-expand">
                    <h4 class="uk-margin-remove">${item.title}</h4>
                    <p class="uk-text-small uk-text-muted uk-margin-remove">${
                      item.minimumOrder || "Consultar"
                    }</p>
                </div>
                <div class="uk-width-auto">
                    <button class="uk-button uk-button-small uk-button-default" 
                            onclick="updateCartQuantity(${
                              item.id
                            }, -1)">-</button>
                    <span class="uk-margin-small-left uk-margin-small-right">${
                      item.quantity
                    }</span>
                    <button class="uk-button uk-button-small uk-button-default" 
                            onclick="updateCartQuantity(${
                              item.id
                            }, 1)">+</button>
                </div>
                <div class="uk-width-auto">
                    <button class="uk-button uk-button-small uk-button-danger" 
                            onclick="removeFromCart(${item.id})">
                        <span uk-icon="trash"></span>
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Actualizar cantidad en el carrito
function updateCartQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((i) => i.id === productId);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.id !== productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }
}

// Eliminar del carrito
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// Enviar carrito por WhatsApp
function sendCartToWhatsApp() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    UIkit.notification({
      message: "El carrito está vacío",
      status: "warning",
      pos: "top-center",
    });
    return;
  }

  let message =
    "¡Hola! Me gustaría solicitar una cotización para los siguientes productos:\n\n";

  cart.forEach((item) => {
    message += `• ${item.title}\n  Cantidad: ${
      item.quantity
    }\n  Pedido mínimo: ${item.minimumOrder || "Consultar"}\n\n`;
  });

  message += "Quedo atento a su respuesta. ¡Gracias!";

  const whatsappUrl = `https://wa.me/573153957275?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");

  UIkit.notification({
    message: "Redirigiendo a WhatsApp...",
    status: "success",
    pos: "top-center",
    timeout: 2000,
  });
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();

  // Actualizar cuando cambie el localStorage (para sincronizar entre pestañas)
  window.addEventListener("storage", function (e) {
    if (e.key === "cart") {
      updateCartCount();
    }
  });

  console.log("SurtiEnvases: Sistema de carrito inicializado");
});
