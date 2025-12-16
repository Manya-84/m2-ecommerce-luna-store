# Luna Store · Frontend e-commerce

Repositorio público: **https://github.com/Manya-84/m2-ecommerce-luna-store**.

Interfaz responsiva creada como parte del portafolio del proyecto final del Curso de JavaScript. El objetivo es maquetar la experiencia de una tienda sustentable llamada **Luna Store**, contemplando una página principal con listado de productos y una página individual de detalle.

## 🎯 Requerimientos
- Navegación principal con enlaces internos y acceso directo al carro.
- Listado de productos en tarjetas con botones de compra y filtros por categoría.
- Sección dedicada para simular un carro de compras y llamada a la acción.
- Footer con datos de la tienda y enlaces sociales.
- Página `producto.html` con descripción completa del artículo, galería, acordeón de especificaciones y CTA.
- Uso de **Bootstrap 5.3** + **Bootstrap Icons 1.11** y fuentes modernas (Manrope).

## 🗂️ Estructura del proyecto
```
Modulo 2/
├── index.html            # Landing page con hero, destacados y grid de productos
├── producto.html         # Página de descripción del producto destacado
├── assets/
│   ├── css/styles.css    # Estilos personalizados y mejoras visuales
│   └── js/app.js         # Render dinámico, filtros, y sistema de carrito completo
└── README.md             # Descripción del proyecto y guía de uso
```

## 🛠️ Tecnologías utilizadas
- HTML5 semántico
- Bootstrap 5.3.3 (CDN)
- Bootstrap Icons 1.11.3
- JavaScript moderno (ES2020+)
- Manrope como tipografía base (Google Fonts)

## 🚀 Cómo ejecutar el proyecto
1. Descarga o clona este repositorio.
2. Abre `index.html` en tu navegador preferido. No se requiere un servidor adicional.
3. Usa los filtros para ver las categorías y haz clic en "Ver" para navegar hasta la página de detalle.

> Consejo: Si usas VS Code puedes instalar la extensión **Live Server** para obtener recarga automática mientras editas.

## Funciones disponibles

### Gestión del Carrito

- **`agregarAlCarrito(id, cantidad)`** - Agrega productos al carrito o incrementa la cantidad si ya existe
  - Valida que el producto exista en el catálogo
  - Valida que la cantidad sea mayor a 0
  - Actualiza automáticamente la UI del carrito

- **`removerDelCarrito(id)`** - Elimina un producto del carrito
  - Actualiza automáticamente la UI y los totales

- **`incrementarCantidad(id)`** - Aumenta en 1 la cantidad de un producto en el carrito
  - Se puede usar desde la consola o mediante los botones + en la UI

- **`decrementarCantidad(id)`** - Disminuye en 1 la cantidad de un producto
  - Si la cantidad llega a 0, el producto se elimina automáticamente

### Cálculos y Descuentos

- **`subtotal()`** - Calcula el subtotal del carrito sin descuentos ni envío
  - Retorna el valor en CLP

- **`aplicarDescuento(codigo)`** - Aplica un código de descuento y retorna objeto con total y detalle
  - Valida montos mínimos requeridos
  - Retorna `{ total, detalle }` con el resultado

- **`resumen(codigo)`** - Muestra un resumen completo del carrito con formato
  - Lista todos los productos con cantidades y precios
  - Muestra subtotal, descuento (si aplica) y total
  - Retorna string formateado para consola

### Códigos de descuento

Los códigos se pueden aplicar desde la UI (campo de texto + botón "Aplicar") o desde la consola:

- **`PROMO10`** - 10% de descuento sobre el subtotal
  - Requisito: Subtotal >= $30,000 CLP
  - El envío se mantiene en $3,990 CLP

- **`ENVIOGRATIS`** - Envío gratis (descuento de $3,990 CLP)
  - Requisito: Subtotal >= $25,000 CLP
  - El subtotal no se modifica

### Ejemplo de uso desde la consola

```javascript
// Agregar productos al carrito
agregarAlCarrito(1, 2);  // 2 Auriculares Nova X2
agregarAlCarrito(3, 1);  // 1 Bicicleta Urbana Aster

// Ajustar cantidades
incrementarCantidad(1);  // Ahora son 3 auriculares
decrementarCantidad(1);  // Vuelven a ser 2 auriculares

// Ver subtotal
subtotal();

// Aplicar descuento
aplicarDescuento("PROMO10");

// Ver resumen completo con descuento
console.log(resumen("PROMO10"));

// Ejecutar todas las pruebas
ejecutarPruebas();
```

### Uso desde la interfaz

1. **Agregar productos**: Haz clic en "Agregar al carrito" en cualquier tarjeta de producto
2. **Ver el carrito**: Desplázate a la sección "Carro de compras inteligente"
3. **Ajustar cantidades**: Usa los botones + y - junto a cada producto
4. **Aplicar descuento**: Ingresa un código (PROMO10 o ENVIOGRATIS) y haz clic en "Aplicar"
5. **Eliminar productos**: Haz clic en el ícono de basura junto a cada producto

### Pruebas

Abre la consola del navegador (F12) y ejecuta `ejecutarPruebas()` para ver todas las funciones en acción con casos de prueba completos que validan:
- Agregar productos válidos e inválidos
- Incrementar cantidades
- Validación de cantidades <= 0
- Cálculo de subtotales
- Aplicación de códigos de descuento
- Validación de montos mínimos
- Generación de resúmenes
