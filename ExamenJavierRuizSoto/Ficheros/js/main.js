// estructura del aside con el fielset y legend
aside = createNode("aside");
aside.id = "aside";

document.body.appendChild(aside);

form = createNode("form");
form.id = "formuColor";

fielset = createNode("fieldset");
legen = createNode("legend", "Configuración visual");

aside.appendChild(form);
form.appendChild(fielset);
fielset.appendChild(legen);

// creamos el h4 en negrita
h4 = createNode("h4", "Tema de interfaz");
textH4 = document.createTextNode("Tema de interfaz");

h4.style.fontWeight = "bold";

fielset.appendChild(h4);

//creamos los input
primerLabel = createNode("label", "Claro");
primerInput = createNode("input");
primerInput.type = "radio";
primerInput.name = "opc";
primerInput.id = "claro";
primerLabel.appendChild(primerInput);

fielset.appendChild(primerLabel);
fielset.appendChild(primerInput);
salto = createNode("br");
fielset.appendChild(salto);

segundoLabel = createNode("label", "Oscuro");
segundoInput = createNode("input");
segundoInput.type = "radio";
segundoInput.name = "opc";
segundoInput.id = "oscuro";

segundoLabel.appendChild(segundoInput);

fielset.appendChild(segundoLabel);
fielset.appendChild(segundoInput);
salto = createNode("br");
fielset.appendChild(salto);

terceroLabel = createNode("label", "Alto Contraste");
terceroInput = createNode("input");
terceroInput.type = "radio";
terceroInput.name = "opc";
terceroInput.id = "alto";

terceroLabel.appendChild(terceroInput);

fielset.appendChild(terceroLabel);
fielset.appendChild(terceroInput);

salto = createNode("br");
fielset.appendChild(salto);

// creamos el rango

labelRango = createNode("label", "Tamaño de la fuente Global:");
rango = createNode("input");
rango.type = "range";
rango.value = 16;
rango.min = 10;
rango.max = 24;
Range.id = "rango";

salto = createNode("br");
fielset.appendChild(salto);

fielset.appendChild(labelRango);
fielset.appendChild(rango);

// creamos el boton para resetear

bt = createNode("button", "Resetear Configuración");
bt.id = "main-button";

fielset.appendChild(bt);

// creamos el otro fieldset con su legend

fielset2 = createNode("fieldset");
legen2 = createNode("legend", "Alta empleado");

form.appendChild(fielset2);
fielset2.appendChild(legen2);

// creamos los input con sus label
labelNombre = createNode("label", "Nombre:");
labelNombre.style.fontWeight = "bold";
labelNombre.for = "name";

inputNombre = createNode("input");
inputNombre.type = "text";
inputNombre.name = "name";
inputNombre.required = "yes";

fielset2.appendChild(labelNombre);
fielset2.appendChild(inputNombre);

salto = createNode("br");
fielset2.appendChild(salto);

labelEmail = createNode("label", "Email:");
labelEmail.style.fontWeight = "bold";
labelEmail.for = "email";

inputEmail = createNode("input");
inputEmail.type = "email";
inputEmail.name = "email";
inputEmail.required = "yes";

fielset2.appendChild(labelEmail);
fielset2.appendChild(inputEmail);

salto = createNode("br");
fielset2.appendChild(salto);

labelPass = createNode("label", "Contraseña:");
labelPass.style.fontWeight = "bold";
labelPass.for = "pass";

inputPass = createNode("input");
inputPass.type = "password";
inputPass.name = "pass";
inputPass.id = "pass";
inputPass.required = "yes";

fielset2.appendChild(labelPass);
fielset2.appendChild(inputPass);

salto = createNode("br");
fielset2.appendChild(salto);

labelPass = createNode("label", "Repite Contraseña:");
labelPass.style.fontWeight = "bold";
labelPass.for = "passCon";

inputPass = createNode("input");
inputPass.type = "password";
inputPass.name = "passCon";
inputPass.required = "yes";

fielset2.appendChild(labelPass);
fielset2.appendChild(inputPass);

salto = createNode("br");
fielset2.appendChild(salto);

labelFecha = createNode("label", "Fecha:");
labelFecha.style.fontWeight = "bold";
labelFecha.for = "fecha";

inputDate = createNode("input");
inputDate.type = "date";
inputDate.name = "fecha";
inputDate.required = "yes";

fielset2.appendChild(labelFecha);
fielset2.appendChild(inputDate);

salto = createNode("br");
fielset2.appendChild(salto);

labelLink = createNode("label", "link:");
labelLink.style.fontWeight = "bold";
labelLink.for = "link";

inputLink = createNode("input");
inputLink.type = "text";
inputLink.placeholder = "https://www.linkedin.com";
inputLink.name = "link";
inputLink.required = "yes";
inputLink.id = "link";

fielset2.appendChild(labelLink);
fielset2.appendChild(inputLink);

salto = createNode("br");
fielset2.appendChild(salto);

labelTerminos = createNode("label", "Terminos:");
labelTerminos.style.fontWeight = "bold";
labelTerminos.for = "terminos";

inputTerminos = createNode("input");
inputTerminos.type = "checkBox";
inputTerminos.placeholder = "https://www.linkedin.com";
inputTerminos.name = "terminos";
inputTerminos.required = "yes";

fielset2.appendChild(labelTerminos);
fielset2.appendChild(inputTerminos);

salto = createNode("br");
fielset2.appendChild(salto);

// creamos el select con sus opciones
labelhabi = createNode("label", "Selecciona Habilidades:");
labelhabi.style.fontWeight = "bold";

selecthabi = createNode("select");
selecthabi.name = "habi";
selecthabi.multiple = "yes";

opc = createNode("option", "JS");
opc.value = "JS";

opc2 = createNode("option", "CSS");
opc2.value = "CSS";

opc3 = createNode("option", "HTML");
opc3.value = "HTML";

opc4 = createNode("option", "Python");
opc4.value = "Python";

opc5 = createNode("option", "SQL");
opc5.value = "SQL";

selecthabi.appendChild(opc);
selecthabi.appendChild(opc2);
selecthabi.appendChild(opc3);
selecthabi.appendChild(opc4);
selecthabi.appendChild(opc5);

fielset2.appendChild(labelhabi);

salto = createNode("br");
fielset2.appendChild(salto);

fielset2.appendChild(selecthabi);

// creamos el boton para crear al empleado
btEmple = createNode("button", "Registrar empleado");

btEmple.style.marginTop = 15 + "px";
btEmple.style.width = 100 + "%";
btEmple.style.background = "#007bff";
btEmple.style.color = "white";
btEmple.style.padding = 10 + "px";
btEmple.style.border = "none";
btEmple.style.cursor = "pointer";
btEmple.style.id = "creaEmple";
btEmple.style.name = "creaEmple";

fielset2.appendChild(btEmple);

// creamos el boton para abrir otra ventana con el fichero informe.html

btInforme = createNode("button", "Generar informe");
btInforme.id = "informe";
btInforme.style.background = "#007bff";
btInforme.style.color = "white";
btInforme.style.width = 25 + "%";
btInforme.style.border = "none";
btInforme.style.padding = 5 + "px";
btInforme.style.cursor = "pointer";

document.body.appendChild(btInforme);

//------------------------------------------------------------------------------------------------
let err = document.getElementById("er");
// Cambiar de color el fondo y el color de las letras
let arrayOpc = document.getElementsByName("opc");

arrayOpc[0].addEventListener("click", function () {
  document.body.style.background = "white";
  document.body.style.color = "black";
});

arrayOpc[1].addEventListener("click", function () {
  document.body.style.background = "#222";
  document.body.style.color = "white";
});

arrayOpc[2].addEventListener("click", function () {
  document.body.style.background = "black";
  document.body.style.color = "yellow";
});

// crear las tarjetas
// esto me falla
document.getElementById("creaEmple").addEventListener("click", function () {
  let nombre = document.getElementsByName("name");
  let correo = document.getElementsByName("email");
  let edad = document.getElementsByName("fecha");

  article = createNode("article");

  document.body.appendChild(article);

  div = createNode("div");
  h3 = createNode("h3", nombre);
  smallCorre = createNode("small", correo);
  barra = createNode("hr");
  antiguo = createNode("small", edad);

  labelBarra = createNode("label", "Rendimiento anual:");
  labelBarra.style.fontWeight = "bold";

  barra = createNode("progress");

  barra.min = 0;
  barra.max = 100;
  barra.value = Math.round(Math.random() * 10+1);

  btClonar = createNode('button','Clonar');
  btBorrar = createNode('button', 'Despedir');

  div.appendChild(h3);
  div.appendChild(smallCorre);
  div.appendChild(labelBarra);
  div.appendChild(barra);
  div.appendChild(antiguo);
  article.appendChild(div);
});

// let tamano = document.getElementById('rango');

// tamano.addEventListener('change',function(){
//     document.body.style.fontSize = tamano.value+'px';
// })

// No se porque falla lo siguiente

// document.getElementsById('pass').addEventListener('keypress',function(){
//     ul = document.createNode('ul');
//     li = document.createNode('li','prueba');

//     ul.appendChild(li);

//     fielset.appendChild(ul);
// })

//Abrimos la ventana del fichero informe.html

let informe = document.getElementById("informe");
let wAux = undefined;
informe.addEventListener("click", function () {
  let wAuxAncho = 500;
  let wAuxAlto = 400;

  wAux = window.open(
    "../src/informe.html",
    "_blank",
    `width=${wAuxAncho},height=${wAuxAlto}`
  );
});

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
