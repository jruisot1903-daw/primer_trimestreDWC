
let info = document.getElementById("info");

let pie = document.createElement("footer");
let pPie = document.createElement("p");
let pPieText = document.createTextNode("Contacto: 654 654 654");

pPie.appendChild(pPieText);

pie.appendChild(pPie);

// document.body.appendChild(pie);
document.body.innerHTML += "<label>Has ganado un coche. Pincha en este enlace: </label><a href='estafa.com'>Premio!!</a>"


/***************************************************************** */
document.getElementById("check").onclick = () => {
    let op = document.getElementById("opcionLista").value;
    let lista = null;
    
    if ((document.getElementsByTagName("ul").length > 0) && (op != "")) {
        lista = document.getElementsByTagName("ul")[0];

        lista.appendChild(createNode("li", op));
    }

    document.getElementById("opcionLista").value = "";
}

document.getElementById("bDelete").onclick = () => {
    let lista = document.getElementById("lista");
    let lastChild;

    if (lista.getElementsByTagName("li").length > 0) {
       lastChild = lista.getElementsByTagName("li")[lista.getElementsByTagName("li").length-1];
       let nodoBorrado = lastChild.parentNode.removeChild(lastChild);
       console.log(nodoBorrado); // de esta forma nos devuleve el nodo borrado
    }

    // if (lista.getElementsByTagName("li").length > 0) {
    //     lastChild = lista.getElementsByTagName("li")[lista.getElementsByTagName("li").length-1];
    //     let nodoBorrado = lastChild.remove();
    //     console.log(nodoBorrado); // de esta forma no podemos ver que nodo hemos borrado 
    // }

}

/**************************************************************************/

function createNode(tipoNodo, tipoTexto) {
    let nodo;
    let nodoText;

    switch(arguments.length) {
        case 0: 
            throw "Se necesita al menos el tipo de elemento a crear.";
            break;
        case 1:
            nodo = document.createElement(tipoNodo);
            nodo.onclick = changeColor;
            nodo.id = "nuevoNodo"
            break;
        case 2:
            nodo = document.createElement(tipoNodo);
            nodo.onclick = changeColor;
            nodoText = document.createTextNode(tipoTexto);
            nodo.appendChild(nodoText);
            break;
    }

    return nodo;
}

function changeColor() {
    this.style.color = "red";
}


// Ver y ocultar contraseña
document.getElementById("seePass").onclick = function () {
    if (document.getElementById("pass").type == "password") {
        document.getElementById("pass").type = "text"
        this.innerHTML = "Ocultar password";
    }
    else {
        document.getElementById("pass").type = "password"
        this.innerHTML = "Ver password";
    }
}