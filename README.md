# Luna Store · Frontend e-commerce

Repositorio público: **https://github.com/Manya-84/m2-ecommerce-luna-store**.

Interfaz responsiva creada como parte del portafolio del módulo 2 del Curso de JavaScript. El objetivo es maquetar la experiencia de una tienda sustentable llamada **Luna Store**, contemplando una página principal con listado de productos y una página individual de detalle.

Durante el desarrollo se reforzaron tres aspectos clave:

1. **Catálogo consistente:** las tarjetas de “Productos recomendados” usan un wrapper de proporción fija para que todas las imágenes mantengan el mismo tamaño visual, sin importar el formato del archivo original. Los filtros por categoría se mantienen funcionales y el botón de carrito simula la interacción.
2. **Galería interactiva en `producto.html`:** la imagen principal de los auriculares cambia dinámicamente al hacer clic sobre cualquiera de las tres miniaturas inferiores, mostrando vistas frontal, lateral y plegada sin recargar la página.
3. **Estilos refinados:** se añadieron transiciones suaves, control de `object-fit` y ajustes responsivos específicos para la galería y las tarjetas, asegurando una presentación uniforme tanto en desktop como en mobile.

## 🎯 Requerimientos cubiertos
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
│   └── js/app.js         # Render dinámico de tarjetas y lógica del filtro/carrito
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
