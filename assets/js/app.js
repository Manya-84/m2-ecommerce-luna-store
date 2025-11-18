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
    image: "https://form.cl/cdn/shop/files/39b4b46b-b050-449c-b5db-792050295ba5-v-luz0240426125-2-61e16f71-db20-4911-86fa-c04012251d62.jpg?v=1732822089&width=1400",
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

  cartItems += 1;
  cartCount.textContent = cartItems;
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

function init() {
  renderProducts();
  setupFilters();
  document.addEventListener("click", handleCartClick);
  initYear();
}

document.addEventListener("DOMContentLoaded", init);
