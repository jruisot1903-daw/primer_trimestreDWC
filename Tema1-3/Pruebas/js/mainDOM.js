const { createElement } = require("react");

let info = document.getElementById("info");

console.log(info.innerHTML);

document.getElementById("check").onclick = () => {
  for (op of document.getElementsByName("opciones"))
    if (op.checked) {
      info.innerHTML = "Opción seleccionada: " + op.value;
      break;
    }
};

// creacion de elementos HTML

document.getElementById("check").onclick = () => {
  //tenemos el texto que queremos insertar
  let opc = document.getElementById("opcionLista").value;
  //Nos devuelve un array con todas las listas ul del archivo en este caso queremos la primera solo
  let lista = null;
  if (document.getElementsByTagName("ul").length > 0 && opc != "") {
    lista = document.getElementsByTagName("ul")[0];
    //Creamos el elemento y el nodo del texto que queremos añadir
    let opElement = document.createElement("li");
    let opcElementText = document.createTextNode(opc);
    //creamos el hijo al elemento
    opElement.appendChild(opcElementText);

    //a la lista le añadimos un hijo

    lista.appendChild(opElement);

    document.getElementById("opcionLista").value = "";
  } else {
    alert("No has insertado nada");
  }

  /**************************************************************/
  function createNode(tipoNodo, tipoText) {
    let nodo = createElement(tipoNodo);
    let nodoText = createTextNode(tipoText);

    nodo.appendChild(nodoText);

    return nodo;
}