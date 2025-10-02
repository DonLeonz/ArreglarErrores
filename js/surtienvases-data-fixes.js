// ========================================
// DATOS ACTUALIZADOS DE SURTIENVASES
// ========================================

const SURTIENVASES_DATA = {
  whatsapp: {
    sede1: "573163209967",
    sede2: "573153957275",
  },
  phone: {
    sede1: "8672555",
    sede2: "8673132",
  },
  email: "surtienvasesn@gmail.com",
  social: {
    facebook: "https://www.facebook.com/surtienvasesneiva",
    instagram: "https://www.instagram.com/envases_surtienvases",
  },
  location: {
    sede1: {
      name: "Sede Central 1",
      address: "Calle 10 #2-58, Neiva, Huila",
    },
    sede2: {
      name: "Sede Central 2",
      address: "Calle 10 #1G-41, Neiva, Huila",
    },
  },
  schedule: {
    weekdays: "Lunes a Viernes: 8:00 AM - 12:00 PM & 2:00 PM - 6:00 PM",
    saturday: "Sábados: 8:30 AM - 2:30 PM (Jornada continua)",
    sunday: "Domingos: Cerrado",
    note: "Ambos locales con el mismo horario",
  },
};

// ========================================
// FUNCIÓN PARA INDICAR PÁGINA ACTIVA
// ========================================

function setActiveNavItem() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(
    ".uk-navbar-item .uk-button-text, .uk-navbar-item .uk-button-secondary"
  );

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

// ========================================
// FUNCIÓN PARA AGREGAR CARRITO EN TODAS LAS PÁGINAS
// ========================================

function addCartToAllPages() {
  // Verificar si ya existe el carrito flotante
  if (document.querySelector(".cart-floating")) {
    return;
  }

  // Crear elemento de carrito flotante
  const cartHTML = `
        <div class="cart-floating">
            <button class="cart-button-circle" onclick="toggleCart()">
                <span uk-icon="icon: cart; ratio: 1.5" style="color: white"></span>
                <span class="cart-badge" id="cart-count">0</span>
            </button>
        </div>
        
        <!-- Modal del Carrito -->
        <div id="cart-modal" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h2 class="uk-modal-title">Carrito de Cotización</h2>
                <div id="cart-items"></div>
                <div class="uk-text-center uk-margin-top">
                    <button class="uk-button uk-button-primary whatsapp-button uk-width-1-1" 
                            onclick="sendCartToWhatsApp()">
                        <span uk-icon="whatsapp"></span> Enviar Cotización por WhatsApp
                    </button>
                </div>
            </div>
        </div>
    `;

  // Insertar antes del cierre del body
  document.body.insertAdjacentHTML("beforeend", cartHTML);

  // Actualizar contador del carrito
  updateCartCount();
}

// ========================================
// FUNCIÓN PARA TOGGLE DEL CARRITO
// ========================================

function toggleCart() {
  renderCart();
  UIkit.modal("#cart-modal").show();
}

// ========================================
// FUNCIÓN PARA ACTUALIZAR CONTADOR DEL CARRITO
// ========================================

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const badge = document.getElementById("cart-count");

  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}

// ========================================
// FUNCIÓN PARA RENDERIZAR EL CARRITO
// ========================================

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

// ========================================
// FUNCIÓN PARA ACTUALIZAR CANTIDAD EN CARRITO
// ========================================

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

// ========================================
// FUNCIÓN PARA ELIMINAR DEL CARRITO
// ========================================

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// ========================================
// FUNCIÓN PARA ENVIAR CARRITO POR WHATSAPP
// ========================================

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

  const whatsappUrl = `https://wa.me/${
    SURTIENVASES_DATA.whatsapp.sede1
  }?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");

  UIkit.notification({
    message: "Redirigiendo a WhatsApp...",
    status: "success",
    pos: "top-center",
    timeout: 2000,
  });
}

// ========================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // Marcar página activa en navbar
  setActiveNavItem();

  // Agregar carrito a todas las páginas (excepto si ya existe)
  addCartToAllPages();

  // Actualizar contador del carrito
  updateCartCount();

  console.log("SurtiEnvases: Sistema inicializado correctamente");
});
