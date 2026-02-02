const infoErr = document.getElementById("err");

mostrarTodo();

document.getElementById("todos").addEventListener("click",function(){
    mostrarTodo();  
})

function mostrarTodo() {
  fetch("http://localhost/gestionProduct/server/PRODUCTS.json", {
    method: "GET",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then(function (resp) {
      if (resp.ok) {
        resp
          .json()
          .then(function (data) {
            if (data && data.products && Array.isArray(data.products)) {
              rellenaTargeta(data.products);
              actualizarContador(data.products.length);
            } else {
              throw new Error("Formato de datos incorrecto: no se encontró la propiedad 'products'");
            }
          })
          .catch(function (err) {
            infoErr.innerHTML = "Error: " + err.message;
          });
      } else {
        infoErr.innerHTML = "Error HTTP: " + resp.status;
      }
    })
    .catch(function (err) {
      infoErr.innerHTML = "Error de conexión: " + err.message;
    });
}

document.getElementById("buscarP").addEventListener("click", function(){
    const inputPrecio = document.getElementById("inputPrecio");
    const precioMax = inputPrecio.value;
    
    if (!precioMax || precioMax <= 0) {
        infoErr.innerHTML = "Ingresa un precio válido";
        infoErr.style.color = "red";
        return;
    }
    
    infoErr.innerHTML = "";
    
    fetch("http://localhost/gestionProduct/server/PRODUCTS.json", {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then(function (resp) {
        if (resp.ok) {
            resp.json()
            .then(function (data) {
                if (data && data.products && Array.isArray(data.products)) {
                    // Filtrar productos por precio
                    const productosFiltrados = data.products.filter(function(producto) {
                        return producto.price <= parseFloat(precioMax);
                    });
                    
                    // Mostrar resultados filtrados
                    mostrarResultadosFiltrados(productosFiltrados, precioMax);
                }
            })
            .catch(function (err) {
                infoErr.innerHTML = "Error: " + err.message;
            });
        }
    })
    .catch(function (err) {
        infoErr.innerHTML = "Error: " + err.message;
    });
});

function mostrarResultadosFiltrados(productos, precioMax) {
    const main = document.getElementById("main");
    main.innerHTML = "";
    
    if (productos.length === 0) {
        const mensaje = createNode("p", `No hay productos con precio ≤ ${precioMax}€`);
        mensaje.style.color = "var(--texto-principal)";
        mensaje.style.textAlign = "center";
        mensaje.style.padding = "20px";
        main.appendChild(mensaje);
        return;
    }
    
    // Crear cabecera de resultados
    const cabecera = createNode("div");
    cabecera.innerHTML = `
        <div style="text-align: center; padding: 15px; background: var(--color-secundario); margin-bottom: 20px; border-radius: 5px;">
            <h3 style="color: var(--texto-principal); margin: 0 0 10px 0;">Productos con precio ≤ ${precioMax}€</h3>
            <p style="color: var(--color-primario); font-weight: bold; margin: 0 0 10px 0;">${productos.length} productos encontrados</p>
            <button onclick="mostrarTodo()" style="padding: 8px 16px; background: var(--color-primario); color: var(--texto-principal); border: none; border-radius: 4px; cursor: pointer;">
                Ver todos los productos
            </button>
        </div>
    `;
    main.appendChild(cabecera);
    
    // Mostrar productos filtrados
    rellenaTargeta(productos);
}

function buscarPrecio (){
    fetch("http://localhost/gestionProduct/server/PRODUCTS.json", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then(function (resp) {
      if (resp.ok) {
        resp
          .json()
          .then(function (data) {
            if (data && data.products && Array.isArray(data.products)) {
              rellenaTargeta(data.products);
              actualizarContador(data.products.length);
            } else {
              throw new Error("Formato de datos incorrecto: no se encontró la propiedad 'products'");
            }
          })
          .catch(function (err) {
            infoErr.innerHTML = "Error: " + err.message;
          });
      } else {
        infoErr.innerHTML = "Error HTTP: " + resp.status;
      }
    })
    .catch(function (err) {
      infoErr.innerHTML = "Error de conexión: " + err.message;
    });
}

function actualizarContador(numProductos) {
  const nav = document.getElementById("nav");
  if (nav && nav.querySelector("p")) {
    nav.querySelector("p").textContent = `Número de productos totales: ${numProductos}`;
  }
}

function rellenaTargeta(productos) {
  const main = document.getElementById("main");
  
  // Limpiar main solo si no hay cabecera (para búsquedas)
  const tieneCabecera = main.querySelector('div[style*="text-align: center"]');
  if (!tieneCabecera) {
    main.innerHTML = "";
  }
  
  // Verificar si productos es un array
  if (!Array.isArray(productos)) {
    console.error("productos no es un array:", productos);
    const mensaje = createNode("p", "Error: Los datos no tienen el formato esperado");
    mensaje.style.color = "red";
    main.appendChild(mensaje);
    return;
  }
  
  if (productos.length === 0 && !tieneCabecera) {
    const mensaje = createNode("p", "No hay productos disponibles");
    mensaje.style.color = "var(--texto-principal)";
    main.appendChild(mensaje);
    return;
  }
  

  productos.forEach(producto => {
    const tarjeta = crearTarjetaIndividual(producto);
    main.appendChild(tarjeta);
  });
}

function crearTarjetaIndividual(producto) {
  const sectionTarjeta = createNode("section");
  sectionTarjeta.id = "card";
  
  sectionTarjeta.style.border = "1px solid var(--color-primario)";
  sectionTarjeta.style.borderRadius = "8px";
  sectionTarjeta.style.overflow = "hidden";
  sectionTarjeta.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  sectionTarjeta.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
  sectionTarjeta.style.backgroundColor = "var(--color-fondo)";
  sectionTarjeta.style.display = "flex";
  sectionTarjeta.style.flexDirection = "column";
  sectionTarjeta.style.width = "20%";
  sectionTarjeta.style.minWidth = "200px";
  sectionTarjeta.style.height = "auto"; // Cambiado a auto para que se expanda
  sectionTarjeta.style.minHeight = "300px"; // Altura mínima
  sectionTarjeta.style.marginTop = "20px";
  sectionTarjeta.style.borderTopRightRadius = "10px";
  
  sectionTarjeta.onmouseover = function() {
    this.style.transform = "translateY(-5px)";
    this.style.boxShadow = "0 8px 20px rgba(0,0,0,0.5)";
    this.style.borderColor = "var(--texto-principal)";
  };
  sectionTarjeta.onmouseout = function() {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    this.style.borderColor = "var(--color-primario)";
  };
  
  // Imagen del producto
  const contenedorImagen = createNode("div");
  contenedorImagen.style.position = "relative";
  contenedorImagen.style.height = "120px";
  contenedorImagen.style.backgroundColor = "var(--color-secundario)";
  contenedorImagen.style.display = "flex";
  contenedorImagen.style.alignItems = "center";
  contenedorImagen.style.justifyContent = "center";
  contenedorImagen.style.overflow = "hidden";
  contenedorImagen.style.flexShrink = "0";
  contenedorImagen.style.borderBottom = "1px solid var(--color-primario)";
  
  let imagenSrc = "";
  if (producto.images && producto.images[0]) {
    imagenSrc = producto.images[0];
  } else if (producto.thumbnail) {
    imagenSrc = producto.thumbnail;
  }
  
  let imagenElement;
  if (imagenSrc) {
    imagenElement = createNode("img");
    imagenElement.src = imagenSrc;
    imagenElement.alt = producto.title || "Producto";
    imagenElement.style.width = "100%";
    imagenElement.style.height = "100%";
    imagenElement.style.objectFit = "cover";
    imagenElement.style.transition = "transform 0.5s ease";
    
    contenedorImagen.onmouseover = function() {
      imagenElement.style.transform = "scale(1.1)";
    };
    contenedorImagen.onmouseout = function() {
      imagenElement.style.transform = "scale(1)";
    };
  } else {
    imagenElement = createNode("div");
    imagenElement.style.width = "100%";
    imagenElement.style.height = "100%";
    imagenElement.style.display = "flex";
    imagenElement.style.alignItems = "center";
    imagenElement.style.justifyContent = "center";
    imagenElement.style.backgroundColor = "var(--color-secundario)";
    
    const textoImagen = createNode("span", producto.title);
    textoImagen.style.color = "var(--texto-principal)";
    textoImagen.style.fontSize = "14px";
    textoImagen.style.textAlign = "center";
    textoImagen.style.padding = "0 10px";
    imagenElement.appendChild(textoImagen);
  }
  
  contenedorImagen.appendChild(imagenElement);
  

  const contenido = createNode("div");
  contenido.style.padding = "10px";
  contenido.style.flexGrow = "1";
  contenido.style.display = "flex";
  contenido.style.flexDirection = "column";
  contenido.style.overflow = "hidden";
  
  const tituloTexto = producto.title;
  const titulo = createNode("h2", tituloTexto);
  titulo.className = "product-title";
  titulo.style.margin = "0 0 8px 0";
  titulo.style.fontSize = "16px";
  titulo.style.color = "var(--texto-principal)";
  titulo.style.fontWeight = "600";
  titulo.style.whiteSpace = "nowrap";
  titulo.style.overflow = "hidden";
  titulo.style.textOverflow = "ellipsis";
  
  // Descripción con altura flexible
  const descripcionTexto = producto.description;
  const descripcion = createNode("p", descripcionTexto);
  descripcion.style.color = "var(--texto-principal)";
  descripcion.style.fontSize = "12px";
  descripcion.style.lineHeight = "1.4";
  descripcion.style.margin = "0 0 12px 0";
  descripcion.style.opacity = "0.8";
  descripcion.style.flexGrow = "0"; // No crece
  descripcion.style.flexShrink = "1"; // Puede encogerse
  descripcion.style.maxHeight = "80px"; // Altura máxima
  descripcion.style.overflowY = "auto"; // Scroll si es muy larga
  descripcion.style.paddingRight = "5px"; // Espacio para scroll
  
  // Contenedor para detalles (esto se mantiene fijo abajo)
  const detallesContainer = createNode("div");
  detallesContainer.style.marginTop = "auto"; // Esto empuja los detalles hacia abajo
  detallesContainer.style.paddingTop = "10px";
  detallesContainer.style.borderTop = "1px solid var(--color-secundario)";
  detallesContainer.style.flexShrink = "0"; // No se encoge
  
  const detalles = [
    { 
      label: "Precio:", 
      value: `${producto.price || "0"} €`, 
      destacado: true 
    },
    {
        label: "Descuento:",
        value: producto.discountPercentage + "%"
    },
    { 
      label: "Puntuación:", 
      value: producto.rating || "0" 
    },
    { 
      label: "Stock:", 
      value: producto.stock || "0" 
    },
    {
        label: "Marca:",
        value: producto.brand
    },
    {
        label: "Categoría:",
        value: producto.category
    }
  ];
  
  detalles.forEach(detalle => {
    const filaDetalle = createNode("div");
    filaDetalle.style.display = "flex";
    filaDetalle.style.justifyContent = "space-between";
    filaDetalle.style.marginBottom = "6px";
    
    const label = createNode("span", detalle.label);
    label.style.color = "var(--texto-principal)";
    label.style.fontSize = "12px";
    label.style.opacity = "0.7";
    label.style.flexShrink = "0"; // No se encoge
    
    const value = createNode("span", detalle.value);
    value.style.color = detalle.destacado ? "var(--color-primario)" : "var(--texto-principal)";
    value.style.fontWeight = detalle.destacado ? "600" : "400";
    value.style.fontSize = detalle.destacado ? "13px" : "12px";
    value.style.textAlign = "right";
    value.style.flexShrink = "1"; // Puede encogerse
    value.style.overflow = "hidden";
    value.style.textOverflow = "ellipsis";
    value.style.whiteSpace = "nowrap";
    
    filaDetalle.appendChild(label);
    filaDetalle.appendChild(value);
    detallesContainer.appendChild(filaDetalle);
  });
  
  
  
  
  
  contenido.appendChild(titulo);
  contenido.appendChild(descripcion);
  contenido.appendChild(detallesContainer);

  
  sectionTarjeta.appendChild(contenedorImagen);
  sectionTarjeta.appendChild(contenido);
  
  return sectionTarjeta;
}

function createNode(tipoNodo, tipoTexto) {
  let nodo;
  let nodoText;

  switch (arguments.length) {
    case 0:
      throw "Se necesita al menos el tipo de elemento a crear.";
      break;
    case 1:
      nodo = document.createElement(tipoNodo);
      break;
    case 2:
      nodo = document.createElement(tipoNodo);
      nodoText = document.createTextNode(tipoTexto);
      nodo.appendChild(nodoText);
      break;
  }

  return nodo;
}