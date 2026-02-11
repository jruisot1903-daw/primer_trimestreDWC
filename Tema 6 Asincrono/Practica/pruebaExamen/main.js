// ---------------------------------------------------------
// 1. DOM
// ---------------------------------------------------------
const app = document.getElementById("app");

// Título
const titulo = document.createElement("h2");
titulo.textContent = "Práctica final de examen – JavaScript avanzado";
app.appendChild(titulo);

// Lista
const lista = document.createElement("ul");
lista.id = "lista";
app.appendChild(lista);

// Botones
const btnAdd = document.createElement("button");
btnAdd.textContent = "Añadir elemento";

const btnDel = document.createElement("button");
btnDel.textContent = "Eliminar último";

const btnClone = document.createElement("button");
btnClone.textContent = "Clonar lista";

app.appendChild(btnAdd);
app.appendChild(btnDel);
app.appendChild(btnClone);

// Funciones DOM
btnAdd.onclick = () => {
    const li = document.createElement("li");
    li.textContent = "Elemento " + (lista.children.length + 1);
    lista.appendChild(li);
};

btnDel.onclick = () => {
    if (lista.lastChild) lista.removeChild(lista.lastChild);
};

btnClone.onclick = () => {
    const copia = lista.cloneNode(true);
    app.appendChild(copia);
};

// ---------------------------------------------------------
// 2. FORMULARIO Y EVENTOS
// ---------------------------------------------------------
const nombre = document.getElementById("nombre");
const contador = document.getElementById("contador");
const edad = document.getElementById("edad");
const provincia = document.getElementById("provincia");
const condiciones = document.getElementById("condiciones");
const enviar = document.getElementById("enviar");

nombre.oninput = () => {
    contador.textContent = " (" + nombre.value.length + " caracteres)";
};

edad.onblur = () => {
    const n = parseInt(edad.value);
    if (isNaN(n) || n < 1 || n > 120) {
        alert("Edad no válida");
    }
};

provincia.onchange = () => {
    alert("Has seleccionado: " + provincia.value);
};

enviar.onclick = (e) => {
    if (!condiciones.checked) {
        e.preventDefault();
        alert("Debes aceptar las condiciones");
    }
};

// ---------------------------------------------------------
// 3. XMLHttpRequest + responseXML
// ---------------------------------------------------------
document.getElementById("btnXML").onclick = () => {
    const xhr = new XMLHttpRequest();
    const salida = document.getElementById("resultadoXML");

    xhr.onreadystatechange = () => {
        salida.innerHTML = "Estado actual: " + xhr.readyState;

        if (xhr.readyState === 4 && xhr.status === 200) {
            const xml = xhr.responseXML;
            const usuarios = xml.getElementsByTagName("usuario");

            let html = "<h3>Usuarios cargados:</h3>";

            for (let u of usuarios) {
                const nombre = u.getElementsByTagName("nombre")[0].textContent;
                const edad = u.getElementsByTagName("edad")[0].textContent;
                const ciudad = u.getElementsByTagName("ciudad")[0].textContent;

                html += `<p><strong>${nombre}</strong> (${edad}) - ${ciudad}</p>`;
            }

            html += "<h4>Cabeceras:</h4><pre>" + xhr.getAllResponseHeaders() + "</pre>";
            salida.innerHTML = html;
        }
    };

    xhr.open("GET", "usuarios.xml", true);
    xhr.send();
};

// ---------------------------------------------------------
// 4. FETCH JSON
// ---------------------------------------------------------
document.getElementById("btnJSON").onclick = () => {
    fetch("productos.json")
        .then(res => res.json())
        .then(data => {
            let html = "<table><tr><th>Producto</th><th>Precio</th><th>Stock</th></tr>";

            data.productos.forEach(p => {
                const clase = p.stock < 10 ? "poco-stock" : "";
                html += `<tr class="${clase}">
                            <td>${p.nombre}</td>
                            <td>${p.precio}</td>
                            <td>${p.stock}</td>
                         </tr>`;
            });

            html += "</table>";
            document.getElementById("resultadoJSON").innerHTML = html;
        });
};

// ---------------------------------------------------------
// 5. FETCH POST + XML
// ---------------------------------------------------------
document.getElementById("btnPost").onclick = (e) => {
    e.preventDefault();

    const datos = {
        nombre: document.getElementById("postNombre").value,
        email: document.getElementById("postEmail").value
    };

    fetch("respuesta.php", {
        method: "POST",
        body: JSON.stringify(datos)
    })
    .then(res => res.text())
    .then(texto => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(texto, "text/xml");

        const estado = xml.getElementsByTagName("estado")[0].textContent;
        const mensaje = xml.getElementsByTagName("mensaje")[0].textContent;

        document.getElementById("respuestaPost").innerHTML =
            `<p><strong>${estado}</strong>: ${mensaje}</p>`;
    });
};