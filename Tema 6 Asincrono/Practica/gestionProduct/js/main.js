const infoErr = document.getElementById("err");

mostrarTodo();

document.getElementById("todos").addEventListener("click", function () {
    restaurarNav();
    mostrarTodo();
});

function limpiarNav() {
    const nav = document.getElementById("nav");
// obtenemos todos los hijos de nav y le decimos que borre todos menos los p (en este caso el que tiene el texto de cuantos productos aparecen en pantalla)
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

function mostrarTodo() {
    fetch("http://localhost/gestionProduct/server/PRODUCTS.json", {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
        .then(function (resp) {
            if (resp.ok) {
                resp.json().then(function (data) {
                    if (data && data.products && Array.isArray(data.products)) {
                        rellenaTargeta(data.products);
                        actualizarContador(data.products.length);
                    } else {
                        throw new Error("Formato de datos incorrecto: no se encontró la propiedad 'products'");
                    }
                }).catch(function (err) {
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

    let imagenElement = createNode("img");
    imagenElement.src = imagenSrc;
    imagenElement.alt = producto.title;
    imagenElement.style.width = "100%";
    imagenElement.style.height = "100%";
    imagenElement.style.objectFit = "cover";
    imagenElement.style.transition = "transform 0.5s ease";

    contenedorImagen.appendChild(imagenElement);

    const contenido = createNode("div");
    contenido.style.padding = "10px";
    contenido.style.flexGrow = "1";
    contenido.style.display = "flex";
    contenido.style.flexDirection = "column";
    contenido.style.overflow = "hidden";

    const titulo = createNode("h2", producto.title);
    titulo.className = "product-title";
    titulo.style.margin = "0 0 8px 0";
    titulo.style.fontSize = "16px";
    titulo.style.color = "var(--texto-principal)";
    titulo.style.fontWeight = "600";
    titulo.style.whiteSpace = "nowrap";
    titulo.style.overflow = "hidden";
    titulo.style.textOverflow = "ellipsis";

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

    const detallesContainer = createNode("div");
    detallesContainer.style.marginTop = "auto";
    detallesContainer.style.paddingTop = "10px";
    detallesContainer.style.borderTop = "1px solid var(--color-secundario)";
    detallesContainer.style.flexShrink = "0";

    const detalles = [
        { label: "Precio:", value: `${producto.price || "0"} €`, destacado: true },
        { label: "Descuento:", value: producto.discountPercentage + "%" },
        { label: "Puntuación:", value: producto.rating || "0" },
        { label: "Stock:", value: producto.stock || "0" },
        { label: "Marca:", value: producto.brand },
        { label: "Categoría:", value: producto.category }
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

    contenido.appendChild(titulo);
    contenido.appendChild(descripcion);
    contenido.appendChild(detallesContainer);

    sectionTarjeta.appendChild(contenedorImagen);
    sectionTarjeta.appendChild(contenido);

    return sectionTarjeta;
}

document.getElementById("buscarP").addEventListener("click", function () {
    mostrarInputPrecio();
});

function mostrarInputPrecio() {
    limpiarNav();
    const nav = document.getElementById("nav");

    const input = createNode("input");
    input.type = "number";
    input.placeholder = "Precio máximo";
    input.id = "precioMax";
    input.style.marginRight = "10px";

    const btn = createNode("button", "Buscar");
    btn.id = "btnBuscarPrecio";
    
    nav.appendChild(input);
    nav.appendChild(btn);

    btn.addEventListener("click", function () {
        buscarPorPrecio(input.value);
    });
}

function buscarPorPrecio(precioMax) {
    fetch("http://localhost/gestionProduct/server/PRODUCTS.json")
        .then(resp => resp.json())
        .then(data => {
            const filtrados = data.products.filter(p => p.price <= precioMax);
            const main = document.getElementById("main");
            main.innerHTML = "";

            if (filtrados.length === 0) {
                main.appendChild(createNode("p", "No hay productos con ese precio"));
                return;
            }

            rellenaTargeta(filtrados);
            actualizarContador(filtrados.length);
        })
        .catch(err => infoErr.innerHTML = "Error: " + err.message);
}

document.getElementById("buscarT").addEventListener("click", function () {
    mostrarInputTitulo();
});

function mostrarInputTitulo() {
    limpiarNav();
    const nav = document.getElementById("nav");

    const input = createNode("input");
    input.type = "text";
    input.placeholder = "Buscar título...";
    input.id = "tituloBuscar";
    input.style.marginRight = "10px";

    const btn = createNode("button", "Buscar");
    btn.id = "btnBuscarTitulo";

    nav.appendChild(input);
    nav.appendChild(btn);

    btn.addEventListener("click", function () {
        buscarPorTitulo(input.value);
    });
}

function buscarPorTitulo(texto) {
    fetch("http://localhost/gestionProduct/server/PRODUCTS.json")
        .then(resp => resp.json())
        .then(data => {
            const filtrados = data.products.filter(p =>
                p.title.toLowerCase().includes(texto.toLowerCase())
            );

            const main = document.getElementById("main");
            main.innerHTML = "";

            if (filtrados.length === 0) {
                main.appendChild(createNode("p", "No hay productos que coincidan"));
                return;
            }

            rellenaTargeta(filtrados);
            actualizarContador(filtrados.length);
        })
        .catch(err => infoErr.innerHTML = "Error: " + err.message);
}

document.getElementById("obtener").addEventListener("click", function () {
    obtenerCategorias();
});

function obtenerCategorias() {
    limpiarNav();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/gestionProduct/server/PRODUCTS.json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            const categorias = [];
            for (let i = 0; i < data.products.length; i++) {
                const cat = data.products[i].category;
                if (!categorias.includes(cat)) {
                    categorias.push(cat);
                }
            }

            mostrarSelectCategorias(categorias);
        } else {
            infoErr.textContent = "Error al cargar categorías";
        }
    };

    xhr.onerror = function () {
        infoErr.textContent = "Error de conexión con el servidor";
    };

    xhr.send();
}


function mostrarSelectCategorias(categorias) {
    const nav = document.getElementById("nav");

    const select = createNode("select");
    select.id = "selectCategorias";

    const opcionDefault = createNode("option", "Selecciona categoría");
    opcionDefault.value = "";
    select.appendChild(opcionDefault);

    for (let i = 0; i < categorias.length; i++) {
        const op = createNode("option", categorias[i]);
        op.value = categorias[i];
        select.appendChild(op);
    }

    nav.appendChild(select);

    select.addEventListener("change", function () {
        if (this.value !== "") {
            filtrarPorCategoria(this.value);
        }
    });
}


function filtrarPorCategoria(categoria) {
    fetch("http://localhost/gestionProduct/server/PRODUCTS.json")
        .then(resp => resp.json())
        .then(data => {
            const filtrados = data.products.filter(p => p.category === categoria);

            const main = document.getElementById("main");
            main.innerHTML = "";

            rellenaTargeta(filtrados);
            actualizarContador(filtrados.length);
        })
        .catch(err => infoErr.textContent = "Error: " + err.message);
}


function createNode(tipoNodo, tipoTexto) {
    let nodo;
    let nodoText;

    switch (arguments.length) {
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
