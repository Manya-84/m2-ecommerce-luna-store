const products = [
  {
    id: 1,
    name: "Auriculares Nova X2",
    description: "Cancelación activa y 40h de batería.",
    price: 129990,
    category: "audio",
    image: "https://acdn-us.mitiendanube.com/stores/003/248/153/products/5-c74c83ec037dbdd2e317477436004549-1024-1024.webp",
    badge: "Nuevo"
  },
  {
    id: 2,
    name: "Lámpara Orbit",
    description: "Iluminación ambiental inteligente.",
    price: 89990,
    category: "hogar",
    image: "https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/1080x0/filters:quality(75)/prd-cl/product-medias/2d36341c-3bae-49aa-a7aa-444485c8abde/MK68QLWUI6/MK68QLWUI6-1/1702317561750-MK68QLWUI6-1-1.jpg",
    badge: "Eco"
  },
  {
    id: 3,
    name: "Bicicleta Urbana Aster",
    description: "Marco reciclado y conectividad IoT.",
    price: 459990,
    category: "movilidad",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80",
    badge: "Best seller"
  },
  {
    id: 4,
    name: "Parlante Solar Beam",
    description: "Carga con energía solar.",
    price: 99990,
    category: "audio",
    image: "https://rimage.ripley.cl/home.ripley/Attachment/MKP/10144/MPM10003025993/full_image-1",
    badge: "Solar"
  },
  {
    id: 5,
    name: "Purificador Aire Aura",
    description: "Sensores inteligentes y filtros HEPA.",
    price: 159990,
    category: "hogar",
    image: "https://m.media-amazon.com/images/I/512qP6OmR4L._AC_SY300_SX300_QL70_FMwebp_.jpg",
    badge: "Smart"
  },
  {
    id: 6,
    name: "Scooter Flux S",
    description: "Autonomía de 45 km y freno regenerativo.",
    price: 369990,
    category: "movilidad",
    image: "https://imagenes.ololand.com/image/data/productos/Scooter-Grit-Fluxx-2016/Scooter-Grit-Fluxx-2016-quarter-1024.jpg",
    badge: "Edición limitada"
  }
];

const productGrid = document.getElementById("product-grid");
const filterButtons = document.querySelectorAll("[data-filter]");
const cartCount = document.getElementById("cart-count");
const yearLabel = document.getElementById("year");

let cartItems = 0;

// ========================================
// SISTEMA DE CARRITO DE COMPRAS
// ========================================

// Carrito inicialmente vacío
const carrito = [];

// Código de descuento aplicado
let codigoDescuentoAplicado = "";

/**
 * Agrega un producto al carrito o incrementa su cantidad si ya existe
 * @param {number} id - ID del producto
 * @param {number} cantidad - Cantidad a agregar
 */
function agregarAlCarrito(id, cantidad) {
  // Validar cantidad
  if (cantidad <= 0) {
    console.error("❌ Error: La cantidad debe ser mayor a 0");
    return;
  }

  // Buscar si el producto existe en el catálogo
  const producto = products.find(p => p.id === id);

  if (!producto) {
    console.error(`❌ Producto no encontrado con ID: ${id}`);
    return;
  }

  // Buscar si el producto ya está en el carrito
  const itemEnCarrito = carrito.find(item => item.id === id);

  if (itemEnCarrito) {
    // Si ya existe, incrementar cantidad
    itemEnCarrito.cantidad += cantidad;
    console.log(`✅ Cantidad actualizada: ${producto.name} (${itemEnCarrito.cantidad} unidades)`);
  } else {
    // Si no existe, agregar nuevo item
    carrito.push({ id, cantidad });
    console.log(`✅ Producto agregado: ${producto.name} (${cantidad} unidades)`);
  }

  // Actualizar contador visual del carrito
  actualizarContadorCarrito();
  // Actualizar UI del carrito
  renderCartUI();
}

/**
 * Remueve un producto del carrito por su ID
 * @param {number} id - ID del producto a remover
 */
function removerDelCarrito(id) {
  const index = carrito.findIndex(item => item.id === id);

  if (index === -1) {
    console.error(`❌ El producto con ID ${id} no está en el carrito`);
    return;
  }

  const producto = products.find(p => p.id === id);
  carrito.splice(index, 1);
  console.log(`🗑️ Producto removido: ${producto.name}`);

  // Actualizar contador visual del carrito
  actualizarContadorCarrito();
  // Actualizar UI del carrito
  renderCartUI();
}

/**
 * Incrementa la cantidad de un producto en el carrito
 * @param {number} id - ID del producto
 */
function incrementarCantidad(id) {
  const item = carrito.find(item => item.id === id);

  if (!item) {
    console.error(`❌ El producto con ID ${id} no está en el carrito`);
    return;
  }

  item.cantidad++;
  const producto = products.find(p => p.id === id);
  console.log(`➕ Cantidad incrementada: ${producto.name} (${item.cantidad} unidades)`);

  // Actualizar contador visual del carrito
  actualizarContadorCarrito();
  // Actualizar UI del carrito
  renderCartUI();
}

/**
 * Decrementa la cantidad de un producto en el carrito
 * @param {number} id - ID del producto
 */
function decrementarCantidad(id) {
  const item = carrito.find(item => item.id === id);

  if (!item) {
    console.error(`❌ El producto con ID ${id} no está en el carrito`);
    return;
  }

  if (item.cantidad > 1) {
    item.cantidad--;
    const producto = products.find(p => p.id === id);
    console.log(`➖ Cantidad decrementada: ${producto.name} (${item.cantidad} unidades)`);
  } else {
    // Si la cantidad es 1, remover el producto del carrito
    removerDelCarrito(id);
    return;
  }

  // Actualizar contador visual del carrito
  actualizarContadorCarrito();
  // Actualizar UI del carrito
  renderCartUI();
}

/**
 * Calcula el subtotal del carrito (sin descuentos)
 * @returns {number} Subtotal en CLP
 */
function subtotal() {
  let total = 0;

  // Recorrer cada item del carrito
  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const producto = products.find(p => p.id === item.id);

    if (producto) {
      total += producto.price * item.cantidad;
    }
  }

  return total;
}

/**
 * Aplica un código de descuento al carrito
 * @param {string} codigo - Código de descuento ("PROMO10" o "ENVIOGRATIS")
 * @returns {object} Objeto con total y detalle del descuento
 */
function aplicarDescuento(codigo) {
  const subtotalCarrito = subtotal();
  let descuento = 0;
  let detalle = "";
  let total = subtotalCarrito;

  // Validar y aplicar descuentos según el código
  if (codigo === "PROMO10") {
    if (subtotalCarrito >= 30000) {
      descuento = subtotalCarrito * 0.10;
      total = subtotalCarrito - descuento;
      detalle = `Descuento 10% aplicado: -${formatCurrency(descuento)}`;
    } else {
      detalle = `Código PROMO10 requiere un mínimo de ${formatCurrency(30000)} (subtotal actual: ${formatCurrency(subtotalCarrito)})`;
    }
  } else if (codigo === "ENVIOGRATIS") {
    if (subtotalCarrito >= 25000) {
      descuento = 3990;
      total = Math.max(0, subtotalCarrito - descuento);
      detalle = `Envío gratis aplicado: -${formatCurrency(descuento)}`;
    } else {
      detalle = `Código ENVIOGRATIS requiere un mínimo de ${formatCurrency(25000)} (subtotal actual: ${formatCurrency(subtotalCarrito)})`;
    }
  } else {
    detalle = "❌ Código inválido";
    total = subtotalCarrito;
  }

  return { total, detalle };
}

/**
 * Genera un resumen completo del carrito con descuento aplicado
 * @param {string} codigo - Código de descuento opcional
 * @returns {string} Resumen formateado del carrito
 */
function resumen(codigo = "") {
  let resumenTexto = "\n" + "=".repeat(50) + "\n";
  resumenTexto += "🛒 RESUMEN DEL CARRITO - LUNA STORE\n";
  resumenTexto += "=".repeat(50) + "\n\n";

  // Verificar si el carrito está vacío
  if (carrito.length === 0) {
    resumenTexto += "El carrito está vacío.\n";
    resumenTexto += "=".repeat(50) + "\n";
    return resumenTexto;
  }

  // Listar items del carrito
  resumenTexto += "PRODUCTOS:\n";
  resumenTexto += "-".repeat(50) + "\n";

  carrito.forEach(item => {
    const producto = products.find(p => p.id === item.id);
    if (producto) {
      const precioLinea = producto.price * item.cantidad;
      resumenTexto += `• ${producto.name}\n`;
      resumenTexto += `  Cantidad: ${item.cantidad} x ${formatCurrency(producto.price)} = ${formatCurrency(precioLinea)}\n`;
    }
  });

  // Calcular subtotal
  const subtotalCarrito = subtotal();
  resumenTexto += "\n" + "-".repeat(50) + "\n";
  resumenTexto += `Subtotal: ${formatCurrency(subtotalCarrito)}\n`;

  // Aplicar descuento si se proporciona código
  if (codigo) {
    const { total, detalle } = aplicarDescuento(codigo);
    resumenTexto += `\nCódigo aplicado: "${codigo}"\n`;
    resumenTexto += `${detalle}\n`;
    resumenTexto += "\n" + "=".repeat(50) + "\n";
    resumenTexto += `💰 TOTAL FINAL: ${formatCurrency(total)}\n`;
    resumenTexto += "=".repeat(50) + "\n";
  } else {
    resumenTexto += "\n" + "=".repeat(50) + "\n";
    resumenTexto += `💰 TOTAL: ${formatCurrency(subtotalCarrito)}\n`;
    resumenTexto += "=".repeat(50) + "\n";
  }

  return resumenTexto;
}

/**
 * Actualiza el contador visual del carrito en la UI
 */
function actualizarContadorCarrito() {
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
  cartItems = totalItems;
}

/**
 * Renderiza la UI del carrito con los productos agregados
 */
function renderCartUI() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartSubtotalElement = document.getElementById("cart-subtotal");
  const cartShippingElement = document.getElementById("cart-shipping");
  const cartTotalElement = document.getElementById("cart-total");
  const cartDiscountElement = document.getElementById("cart-discount");
  const discountLine = document.getElementById("discount-line");
  const checkoutButton = document.getElementById("checkout-button");
  const cartEmptyMessage = document.getElementById("cart-empty-message");

  if (!cartItemsContainer) return;

  // Si el carrito está vacío
  if (carrito.length === 0) {
    if (cartEmptyMessage) {
      cartEmptyMessage.style.display = "block";
    }
    if (checkoutButton) {
      checkoutButton.disabled = true;
    }
    if (cartSubtotalElement) cartSubtotalElement.textContent = "$0 CLP";
    if (cartShippingElement) cartShippingElement.textContent = "$3,990 CLP";
    if (cartTotalElement) cartTotalElement.textContent = "$0 CLP";
    if (discountLine) discountLine.style.display = "none";
    return;
  }

  // Ocultar mensaje de carrito vacío
  if (cartEmptyMessage) {
    cartEmptyMessage.style.display = "none";
  }

  // Crear HTML para los items del carrito
  let cartHTML = '<div class="cart-items-list">';

  carrito.forEach(item => {
    const producto = products.find(p => p.id === item.id);
    if (producto) {
      const precioLinea = producto.price * item.cantidad;
      cartHTML += `
        <div class="cart-item mb-3 pb-3 border-bottom">
          <div class="d-flex justify-content-between align-items-start">
            <div class="flex-grow-1">
              <h6 class="mb-1">${producto.name}</h6>
              <p class="fw-semibold mb-2">${formatCurrency(producto.price)} c/u</p>
              
              <!-- Controles de cantidad -->
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-outline-secondary" onclick="decrementarCantidad(${item.id})" aria-label="Disminuir cantidad">
                  <i class="bi bi-dash"></i>
                </button>
                <span class="fw-semibold px-2">${item.cantidad}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="incrementarCantidad(${item.id})" aria-label="Aumentar cantidad">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>
            <div class="text-end">
              <p class="fw-bold mb-2">${formatCurrency(precioLinea)}</p>
              <button class="btn btn-sm btn-outline-danger" onclick="removerDelCarrito(${item.id})" aria-label="Remover ${producto.name}">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }
  });

  cartHTML += '</div>';
  cartItemsContainer.innerHTML = cartHTML;

  // Calcular totales
  const subtotalCarrito = subtotal();
  let costoEnvio = 3990;
  let descuentoMonto = 0;
  let totalCarrito = subtotalCarrito + costoEnvio;

  // Aplicar descuento si hay código
  if (codigoDescuentoAplicado) {
    if (codigoDescuentoAplicado === "PROMO10" && subtotalCarrito >= 30000) {
      descuentoMonto = subtotalCarrito * 0.10;
      totalCarrito = subtotalCarrito - descuentoMonto + costoEnvio;
    } else if (codigoDescuentoAplicado === "ENVIOGRATIS" && subtotalCarrito >= 25000) {
      costoEnvio = 0;
      descuentoMonto = 3990;
      totalCarrito = subtotalCarrito;
    }
  }

  // Actualizar valores en la UI
  if (cartSubtotalElement) {
    cartSubtotalElement.textContent = formatCurrency(subtotalCarrito);
  }

  // Mostrar/ocultar línea de descuento
  if (descuentoMonto > 0 && discountLine && cartDiscountElement) {
    discountLine.style.display = "flex";
    cartDiscountElement.textContent = "-" + formatCurrency(descuentoMonto);
  } else if (discountLine) {
    discountLine.style.display = "none";
  }

  if (cartShippingElement) {
    cartShippingElement.textContent = costoEnvio === 0 ? "GRATIS" : formatCurrency(costoEnvio);
  }
  if (cartTotalElement) {
    cartTotalElement.textContent = formatCurrency(totalCarrito);
  }

  // Habilitar botón de checkout
  if (checkoutButton) {
    checkoutButton.disabled = false;
  }
}


function formatCurrency(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(value);
}

function renderProducts(filter = "todos") {
  if (!productGrid) return;
  const fragment = document.createDocumentFragment();

  products
    .filter((product) => filter === "todos" || product.category === filter)
    .forEach((product) => {
      const col = document.createElement("div");
      col.className = "col-sm-6 col-lg-4";
      col.innerHTML = `
        <article class="card product-card h-100">
          <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="card-body d-flex flex-column gap-3">
            <div class="d-flex justify-content-between align-items-start">
              <h3 class="h5 mb-0">${product.name}</h3>
              <span class="badge rounded-pill">${product.badge}</span>
            </div>
            <p class="text-body-secondary mb-0">${product.description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <p class="fw-bold fs-5 mb-0">${formatCurrency(product.price)}</p>
              <span class="badge category-chip text-capitalize">${product.category}</span>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-primary w-100" data-add-to-cart="${product.id}">Agregar al carrito</button>
              <a class="btn btn-outline-secondary" href="producto.html?ref=${product.id}">Ver</a>
            </div>
          </div>
        </article>`;
      fragment.append(col);
    });

  productGrid.innerHTML = "";
  productGrid.append(fragment);
}

function setActiveFilter(target) {
  filterButtons.forEach((button) => button.classList.remove("active"));
  target.classList.add("active");
}

function handleCartClick(event) {
  const button = event.target.closest("[data-add-to-cart]");
  if (!button) return;

  const productId = parseInt(button.dataset.addToCart);

  // Usar la función agregarAlCarrito
  agregarAlCarrito(productId, 1);

  button.classList.add("btn-success");
  button.textContent = "Agregado";
  button.disabled = true;

  setTimeout(() => {
    button.classList.remove("btn-success");
    button.classList.add("btn-primary");
    button.textContent = "Agregar al carrito";
    button.disabled = false;
  }, 2000);
}

function setupFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const filter = event.currentTarget.dataset.filter;
      setActiveFilter(event.currentTarget);
      renderProducts(filter);
    });
  });

  const defaultFilter = document.querySelector("[data-filter=\"todos\"]");
  if (defaultFilter) {
    defaultFilter.classList.add("active");
  }
}

function initYear() {
  if (yearLabel) {
    yearLabel.textContent = new Date().getFullYear();
  }
}

/**
 * Maneja la aplicación de códigos de descuento desde la UI
 */
function handleApplyDiscount() {
  const discountInput = document.getElementById("discount-code-input");
  const discountMessage = document.getElementById("discount-message");

  if (!discountInput || !discountMessage) return;

  const codigo = discountInput.value.trim().toUpperCase();

  if (!codigo) {
    discountMessage.textContent = "Por favor ingresa un código de descuento.";
    discountMessage.className = "mt-2 small text-danger";
    discountMessage.style.display = "block";
    return;
  }

  // Validar si el carrito tiene productos
  if (carrito.length === 0) {
    discountMessage.textContent = "Agrega productos al carrito antes de aplicar un código.";
    discountMessage.className = "mt-2 small text-danger";
    discountMessage.style.display = "block";
    return;
  }

  const subtotalActual = subtotal();
  const resultado = aplicarDescuento(codigo);

  // Validar código
  if (codigo === "PROMO10") {
    if (subtotalActual >= 30000) {
      codigoDescuentoAplicado = codigo;
      discountMessage.textContent = `✓ Código ${codigo} aplicado: 10% de descuento`;
      discountMessage.className = "mt-2 small text-success";
      discountMessage.style.display = "block";
      renderCartUI();
    } else {
      discountMessage.textContent = `El código PROMO10 requiere un mínimo de ${formatCurrency(30000)}`;
      discountMessage.className = "mt-2 small text-danger";
      discountMessage.style.display = "block";
    }
  } else if (codigo === "ENVIOGRATIS") {
    if (subtotalActual >= 25000) {
      codigoDescuentoAplicado = codigo;
      discountMessage.textContent = `✓ Código ${codigo} aplicado: Envío gratis`;
      discountMessage.className = "mt-2 small text-success";
      discountMessage.style.display = "block";
      renderCartUI();
    } else {
      discountMessage.textContent = `El código ENVIOGRATIS requiere un mínimo de ${formatCurrency(25000)}`;
      discountMessage.className = "mt-2 small text-danger";
      discountMessage.style.display = "block";
    }
  } else {
    discountMessage.textContent = "Código inválido. Códigos disponibles: PROMO10, ENVIOGRATIS";
    discountMessage.className = "mt-2 small text-danger";
    discountMessage.style.display = "block";
  }
}

function init() {
  renderProducts();
  setupFilters();
  document.addEventListener("click", handleCartClick);
  initYear();

  // Event listener para el botón de aplicar descuento
  const applyDiscountBtn = document.getElementById("apply-discount-btn");
  if (applyDiscountBtn) {
    applyDiscountBtn.addEventListener("click", handleApplyDiscount);
  }

  // Event listener para aplicar descuento con Enter
  const discountInput = document.getElementById("discount-code-input");
  if (discountInput) {
    discountInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleApplyDiscount();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", init);

// ========================================
// PRUEBAS MÍNIMAS DEL SISTEMA DE CARRITO
// ========================================

/**
 * Ejecuta pruebas del sistema de carrito
 * Descomenta la línea siguiente para ejecutar las pruebas automáticamente
 */
function ejecutarPruebas() {
  console.log("\n🧪 INICIANDO PRUEBAS DEL SISTEMA DE CARRITO\n");
  console.log("=".repeat(60));

  // Prueba 1: Agregar productos válidos
  console.log("\n📝 Prueba 1: Agregar productos válidos");
  agregarAlCarrito(1, 2); // Auriculares Nova X2 x2
  agregarAlCarrito(3, 1); // Bicicleta Urbana Aster x1
  agregarAlCarrito(5, 1); // Purificador Aire Aura x1

  // Prueba 2: Incrementar cantidad de producto existente
  console.log("\n📝 Prueba 2: Incrementar cantidad de producto existente");
  agregarAlCarrito(1, 1); // Auriculares Nova X2 +1 (total: 3)

  // Prueba 3: Intentar agregar producto inexistente
  console.log("\n📝 Prueba 3: Intentar agregar producto inexistente");
  agregarAlCarrito(999, 1);

  // Prueba 4: Intentar agregar cantidad inválida
  console.log("\n📝 Prueba 4: Intentar agregar cantidad <= 0");
  agregarAlCarrito(2, 0);
  agregarAlCarrito(2, -5);

  // Prueba 5: Calcular subtotal
  console.log("\n📝 Prueba 5: Calcular subtotal");
  const subtotalActual = subtotal();
  console.log(`Subtotal calculado: ${formatCurrency(subtotalActual)}`);

  // Prueba 6: Aplicar código PROMO10 (válido si subtotal >= 30000)
  console.log("\n📝 Prueba 6: Aplicar código PROMO10");
  const resultadoPromo = aplicarDescuento("PROMO10");
  console.log(`Total con PROMO10: ${formatCurrency(resultadoPromo.total)}`);
  console.log(`Detalle: ${resultadoPromo.detalle}`);

  // Prueba 7: Aplicar código ENVIOGRATIS (válido si subtotal >= 25000)
  console.log("\n📝 Prueba 7: Aplicar código ENVIOGRATIS");
  const resultadoEnvio = aplicarDescuento("ENVIOGRATIS");
  console.log(`Total con ENVIOGRATIS: ${formatCurrency(resultadoEnvio.total)}`);
  console.log(`Detalle: ${resultadoEnvio.detalle}`);

  // Prueba 8: Aplicar código inválido
  console.log("\n📝 Prueba 8: Aplicar código inválido");
  const resultadoInvalido = aplicarDescuento("CODIGO_FALSO");
  console.log(`Total: ${formatCurrency(resultadoInvalido.total)}`);
  console.log(`Detalle: ${resultadoInvalido.detalle}`);

  // Prueba 9: Mostrar resumen con PROMO10
  console.log("\n📝 Prueba 9: Mostrar resumen con código PROMO10");
  console.log(resumen("PROMO10"));

  // Prueba 10: Remover producto del carrito
  console.log("\n📝 Prueba 10: Remover producto del carrito");
  removerDelCarrito(3); // Remover Bicicleta

  // Prueba 11: Intentar remover producto que no está en el carrito
  console.log("\n📝 Prueba 11: Intentar remover producto inexistente en carrito");
  removerDelCarrito(999);

  // Prueba 12: Resumen final después de remover producto
  console.log("\n📝 Prueba 12: Resumen final");
  console.log(resumen("ENVIOGRATIS"));

  console.log("\n" + "=".repeat(60));
  console.log("✅ PRUEBAS COMPLETADAS\n");
}

// Descomenta la siguiente línea para ejecutar las pruebas automáticamente al cargar la página
// ejecutarPruebas();

console.log("\n💡 TIP: Ejecuta ejecutarPruebas() en la consola para probar el sistema de carrito");
console.log("💡 O usa las funciones directamente:");
console.log("   - agregarAlCarrito(id, cantidad)");
console.log("   - removerDelCarrito(id)");
console.log("   - subtotal()");
console.log("   - aplicarDescuento(codigo)");
console.log("   - resumen(codigo)\n");

