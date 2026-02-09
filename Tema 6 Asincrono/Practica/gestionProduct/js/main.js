const infoErr = document.getElementById("err");
const API_URL = "http://localhost/gestionProduct/server/datos.php";

mostrarTodo();

// Event Listeners
document.getElementById("todos").addEventListener("click", function () {
    restaurarNav();
    mostrarTodo();
});

document.getElementById("buscarP").addEventListener("click", function () {
    mostrarInputPrecio();
});

document.getElementById("buscarT").addEventListener("click", function () {
    mostrarInputTitulo();
});

document.getElementById("obtener").addEventListener("click", function () {
    obtenerCategorias();
});

document.getElementById("anadir").addEventListener("click", function () {
    mostrarFormularioAnadir();
});

document.getElementById("borrar").addEventListener("click", function () {
    mostrarFormularioBorrar();
});

// Funciones de navegación
function limpiarNav() {
    const nav = document.getElementById("nav");
    [...nav.children].forEach(child => {
        if (child.tagName !== "P") {
            child.remove();
        }
    });
}

function restaurarNav() {
    const nav = document.getElementById("nav");
    nav.innerHTML = "<p>Número de productos totales:</p>";
}

// Funciones principales
function mostrarTodo() {
    fetch(API_URL)
        .then(resp => {
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            return resp.json();
        })
        .then(productos => {
            console.log("Productos recibidos:", productos);
            rellenaTargeta(productos);
            actualizarContador(productos.length);
        })
        .catch(err => {
            console.error("Error:", err);
            infoErr.innerHTML = "Error: " + err.message;
            infoErr.style.color = "red";
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
    main.innerHTML = "";

    if (!Array.isArray(productos)) {
        const mensaje = createNode("p", "Error: Los datos no tienen el formato esperado");
        mensaje.style.color = "red";
        main.appendChild(mensaje);
        return;
    }

    if (productos.length === 0) {
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
    sectionTarjeta.className = "card";

    sectionTarjeta.onmouseover = function () {
        this.style.transform = "translateY(-5px)";
        this.style.boxShadow = "0 8px 20px rgba(0,0,0,0.5)";
        this.style.borderColor = "var(--texto-principal)";
    };
    sectionTarjeta.onmouseout = function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
        this.style.borderColor = "var(--color-primario)";
    };

    // Imagen
    const contenedorImagen = createNode("div");
    contenedorImagen.style.position = "relative";
    contenedorImagen.style.height = "120px";
    contenedorImagen.style.backgroundColor = "var(--color-secundario)";
    contenedorImagen.style.display = "flex";
    contenedorImagen.style.alignItems = "center";
    contenedorImagen.style.justifyContent = "center";
    contenedorImagen.style.overflow = "hidden";
    contenedorImagen.style.borderBottom = "1px solid var(--color-primario)";

    const imagenElement = createNode("img");
    imagenElement.src = producto.thumbnail || "https://via.placeholder.com/150/374151/F5F5F5?text=Sin+imagen";
    imagenElement.alt = producto.title;
    imagenElement.style.width = "100%";
    imagenElement.style.height = "100%";
    imagenElement.style.objectFit = "cover";
    
    // Efecto hover en imagen
    contenedorImagen.onmouseover = function() {
        imagenElement.style.transform = "scale(1.1)";
        imagenElement.style.transition = "transform 0.5s ease";
    };
    contenedorImagen.onmouseout = function() {
        imagenElement.style.transform = "scale(1)";
    };

    contenedorImagen.appendChild(imagenElement);

    // Contenido
    const contenido = createNode("div");
    contenido.style.padding = "10px";
    contenido.style.flexGrow = "1";
    contenido.style.display = "flex";
    contenido.style.flexDirection = "column";
    contenido.style.overflow = "hidden";

    // Título
    const titulo = createNode("h2", producto.title);
    titulo.style.margin = "0 0 8px 0";
    titulo.style.fontSize = "16px";
    titulo.style.color = "var(--texto-principal)";
    titulo.style.fontWeight = "600";
    titulo.style.whiteSpace = "nowrap";
    titulo.style.overflow = "hidden";
    titulo.style.textOverflow = "ellipsis";

    // Descripción
    const descripcion = createNode("p", producto.description);
    descripcion.style.color = "var(--texto-principal)";
    descripcion.style.fontSize = "12px";
    descripcion.style.lineHeight = "1.4";
    descripcion.style.margin = "0 0 12px 0";
    descripcion.style.opacity = "0.8";
    descripcion.style.flexShrink = "1";
    descripcion.style.maxHeight = "80px";
    descripcion.style.overflowY = "auto";
    descripcion.style.paddingRight = "5px";

    // Detalles
    const detallesContainer = createNode("div");
    detallesContainer.style.marginTop = "auto";
    detallesContainer.style.paddingTop = "10px";
    detallesContainer.style.borderTop = "1px solid var(--color-secundario)";

    const detalles = [
        { label: "Precio:", value: `${producto.price || "0"} €`, destacado: true },
        { label: "Descuento:", value: `${producto.discountPercentage || "0"} %` },
        { label: "Rating:", value: producto.rating || "0" },
        { label: "Stock:", value: producto.stock || "0" },
        { label: "Marca:", value: producto.brand || "" },
        { label: "Categoría:", value: producto.category || "" }
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

        const value = createNode("span", detalle.value);
        value.style.color = detalle.destacado ? "var(--color-primario)" : "var(--texto-principal)";
        value.style.fontWeight = detalle.destacado ? "600" : "400";
        value.style.fontSize = detalle.destacado ? "13px" : "12px";
        value.style.textAlign = "right";
        value.style.whiteSpace = "nowrap";

        filaDetalle.appendChild(label);
        filaDetalle.appendChild(value);
        detallesContainer.appendChild(filaDetalle);
    });

    // Botón de borrar
    const btnBorrar = createNode("button", "Borrar");
    btnBorrar.title = "Borrar este producto";
    btnBorrar.style.flex = "1";
    btnBorrar.style.padding = "8px";
    btnBorrar.style.backgroundColor = "transparent";
    btnBorrar.style.color = "#dc3545";
    btnBorrar.style.border = "1px solid #dc3545";
    btnBorrar.style.borderRadius = "4px";
    btnBorrar.style.cursor = "pointer";
    btnBorrar.style.marginTop = "10px";
    btnBorrar.style.fontWeight = "bold";
    
    btnBorrar.addEventListener("click", function(e) {
        e.stopPropagation();
        if (confirm(`¿Borrar "${producto.title}"?`)) {
            borrarProducto(producto.id);
        }
    });

    contenido.appendChild(titulo);
    contenido.appendChild(descripcion);
    contenido.appendChild(detallesContainer);
    contenido.appendChild(btnBorrar);

    sectionTarjeta.appendChild(contenedorImagen);
    sectionTarjeta.appendChild(contenido);

    return sectionTarjeta;
}

function borrarProducto(id) {
    fetch(`${API_URL}?id=${id}`, {
        method: "DELETE"
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.status === "deleted") {
                infoErr.innerHTML = "Producto borrado correctamente";
                infoErr.style.color = "green";
                mostrarTodo();
            } else {
                throw new Error(data.error || "Error al borrar");
            }
        })
        .catch(err => {
            infoErr.innerHTML = "Error: " + err.message;
            infoErr.style.color = "red";
        });
}

// Funciones de búsqueda
function mostrarInputPrecio() {
    limpiarNav();
    const nav = document.getElementById("nav");

    const input = createNode("input");
    input.type = "number";
    input.placeholder = "Precio máximo";
    input.id = "precioMax";
    input.style.padding = "8px";
    input.style.marginRight = "10px";

    const btn = createNode("button", "Buscar");
    btn.style.padding = "8px 16px";
    
    btn.addEventListener("click", function() {
        buscarPorPrecio(input.value);
    });

    nav.appendChild(input);
    nav.appendChild(btn);
}

function buscarPorPrecio(precioMax) {
    const precio = parseFloat(precioMax);
    if (!precio || precio <= 0) {
        infoErr.innerHTML = "Ingresa un precio válido";
        infoErr.style.color = "red";
        return;
    }

    fetch(API_URL)
        .then(resp => resp.json())
        .then(productos => {
            const filtrados = productos.filter(p => p.price <= precio);
            rellenaTargeta(filtrados);
            actualizarContador(filtrados.length);
            infoErr.innerHTML = `${filtrados.length} productos encontrados con precio ≤ ${precio}€`;
            infoErr.style.color = "var(--color-primario)";
        })
        .catch(err => {
            infoErr.innerHTML = "Error: " + err.message;
            infoErr.style.color = "red";
        });
}

function mostrarInputTitulo() {
    limpiarNav();
    const nav = document.getElementById("nav");

    const input = createNode("input");
    input.type = "text";
    input.placeholder = "Buscar título...";
    input.id = "tituloBuscar";
    input.style.padding = "8px";
    input.style.marginRight = "10px";

    const btn = createNode("button", "Buscar");
    btn.style.padding = "8px 16px";
    
    btn.addEventListener("click", function() {
        buscarPorTitulo(input.value);
    });

    nav.appendChild(input);
    nav.appendChild(btn);
}

function buscarPorTitulo(texto) {
    if (!texto.trim()) {
        infoErr.innerHTML = "Ingresa un texto para buscar";
        infoErr.style.color = "red";
        return;
    }

    fetch(API_URL)
        .then(resp => resp.json())
        .then(productos => {
            const filtrados = productos.filter(p =>
                p.title.toLowerCase().includes(texto.toLowerCase())
            );
            rellenaTargeta(filtrados);
            actualizarContador(filtrados.length);
            infoErr.innerHTML = `${filtrados.length} productos encontrados con "${texto}"`;
            infoErr.style.color = "var(--color-primario)";
        })
        .catch(err => {
            infoErr.innerHTML = "Error: " + err.message;
            infoErr.style.color = "red";
        });
}

function obtenerCategorias() {
    limpiarNav();

    fetch(API_URL)
        .then(resp => resp.json())
        .then(productos => {
            const categorias = [...new Set(productos.map(p => p.category).filter(Boolean))];
            mostrarSelectCategorias(categorias);
        })
        .catch(err => {
            infoErr.innerHTML = "Error: " + err.message;
            infoErr.style.color = "red";
        });
}

function mostrarSelectCategorias(categorias) {
    const nav = document.getElementById("nav");

    const select = createNode("select");
    select.id = "selectCategorias";
    select.style.padding = "8px";
    select.style.marginRight = "10px";

    const def = createNode("option", "Selecciona categoría");
    def.value = "";
    select.appendChild(def);

    categorias.forEach(cat => {
        const op = createNode("option", cat);
        op.value = cat;
        select.appendChild(op);
    });

    nav.appendChild(select);

    select.addEventListener("change", function() {
        if (this.value !== "") {
            filtrarPorCategoria(this.value);
        }
    });
}

function filtrarPorCategoria(categoria) {
    fetch(API_URL)
        .then(resp => resp.json())
        .then(productos => {
            const filtrados = productos.filter(p => p.category === categoria);
            rellenaTargeta(filtrados);
            actualizarContador(filtrados.length);
            infoErr.innerHTML = `${filtrados.length} productos en categoría "${categoria}"`;
            infoErr.style.color = "var(--color-primario)";
        })
        .catch(err => {
            infoErr.innerHTML = "Error: " + err.message;
            infoErr.style.color = "red";
        });
}

function mostrarFormularioAnadir() {
    limpiarNav();
    const nav = document.getElementById("nav");

    const form = createNode("form");
    form.id = "formAnadirProducto";
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "10px";
    form.style.padding = "15px";
    form.style.backgroundColor = "var(--color-secundario)";
    form.style.borderRadius = "5px";

    // Título del formulario
    const titulo = createNode("h3", "Añadir Nuevo Producto");
    titulo.style.color = "var(--texto-principal)";
    titulo.style.margin = "0 0 10px 0";
    titulo.style.textAlign = "center";

    // Campos del formulario
    const campos = [
        { id: "nuevoTitle", label: "Título:", type: "text", placeholder: "Nombre del producto" },
        { id: "nuevoDescription", label: "Descripción:", type: "textarea", placeholder: "Descripción del producto" },
        { id: "nuevoPrice", label: "Precio (€):", type: "number", placeholder: "0.00" },
        { id: "nuevoDiscount", label: "Descuento (%):", type: "number", placeholder: "0.00" },
        { id: "nuevoRating", label: "Rating:", type: "number", placeholder: "0.0", step: "0.1" },
        { id: "nuevoStock", label: "Stock:", type: "number", placeholder: "0" },
        { id: "nuevoBrand", label: "Marca:", type: "text", placeholder: "Marca del producto" },
        { id: "nuevoCategory", label: "Categoría:", type: "text", placeholder: "Categoría" }
    ];

    campos.forEach(campo => {
        const contenedor = createNode("div");
        contenedor.style.display = "flex";
        contenedor.style.flexDirection = "column";
        contenedor.style.gap = "5px";

        const label = createNode("label", campo.label);
        label.style.color = "var(--texto-principal)";
        label.style.fontSize = "14px";

        let input;
        if (campo.type === "textarea") {
            input = createNode("textarea");
            input.rows = "3";
        } else {
            input = createNode("input");
            input.type = campo.type;
        }

        input.id = campo.id;
        input.placeholder = campo.placeholder;
        if (campo.step) input.step = campo.step;
        input.style.padding = "8px";
        input.style.borderRadius = "4px";
        input.style.backgroundColor = "var(--color-fondo)";
        input.style.color = "var(--texto-principal)";
        input.style.border = "1px solid var(--color-primario)";

        contenedor.appendChild(label);
        contenedor.appendChild(input);
        form.appendChild(contenedor);
    });

    const btnAnadir = createNode("button", "Añadir Producto");
    btnAnadir.type = "button";
    btnAnadir.style.padding = "10px";
    btnAnadir.style.backgroundColor = "var(--color-primario)";
    btnAnadir.style.color = "var(--texto-principal)";
    btnAnadir.style.border = "none";
    btnAnadir.style.borderRadius = "4px";
    btnAnadir.style.cursor = "pointer";
    btnAnadir.style.fontWeight = "600";
    btnAnadir.style.marginTop = "10px";

    btnAnadir.addEventListener("click", function() {
        anadirProducto();
    });

    form.insertBefore(titulo, form.firstChild);
    form.appendChild(btnAnadir);
    nav.appendChild(form);
}

function anadirProducto() {
    const nuevoProducto = {
        title: document.getElementById("nuevoTitle").value,
        description: document.getElementById("nuevoDescription").value,
        price: parseFloat(document.getElementById("nuevoPrice").value) || 0,
        discountPercentage: parseFloat(document.getElementById("nuevoDiscount").value) || 0,
        rating: parseFloat(document.getElementById("nuevoRating").value) || 0,
        stock: parseInt(document.getElementById("nuevoStock").value) || 0,
        brand: document.getElementById("nuevoBrand").value,
        category: document.getElementById("nuevoCategory").value
    };

    // Validación
    if (!nuevoProducto.title || !nuevoProducto.description || !nuevoProducto.category) {
        infoErr.innerHTML = "El título, descripción y categoría son obligatorios";
        infoErr.style.color = "red";
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto)
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.status === "ok") {
                infoErr.innerHTML = "✅ Producto añadido correctamente";
                infoErr.style.color = "green";
                restaurarNav();
                mostrarTodo();
            } else {
                throw new Error(data.error || "Error al añadir");
            }
        })
        .catch(err => {
            infoErr.innerHTML = "Error: " + err.message;
            infoErr.style.color = "red";
        });
}

function mostrarFormularioBorrar() {
    limpiarNav();
    const nav = document.getElementById("nav");

    const form = createNode("div");
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "10px";
    form.style.padding = "15px";
    form.style.backgroundColor = "var(--color-secundario)";
    form.style.borderRadius = "5px";

    const input = createNode("input");
    input.type = "number";
    input.id = "idBorrar";
    input.placeholder = "ID del producto a borrar";
    input.style.padding = "8px";
    input.style.borderRadius = "4px";

    const btnBorrar = createNode("button", "Borrar Producto");
    btnBorrar.style.padding = "10px";
    btnBorrar.style.backgroundColor = "#dc3545";
    btnBorrar.style.color = "var(--texto-principal)";
    btnBorrar.style.border = "none";
    btnBorrar.style.borderRadius = "4px";
    btnBorrar.style.cursor = "pointer";
    btnBorrar.style.fontWeight = "600";

    btnBorrar.addEventListener("click", function() {
        const id = document.getElementById("idBorrar").value;
        if (id) {
            borrarProducto(id);
        } else {
            infoErr.innerHTML = "Por favor, ingresa un ID";
            infoErr.style.color = "red";
        }
    });

    form.appendChild(input);
    form.appendChild(btnBorrar);
    nav.appendChild(form);
}

function createNode(tipo, texto) {
    const nodo = document.createElement(tipo);
    if (texto) nodo.appendChild(document.createTextNode(texto));
    return nodo;
}