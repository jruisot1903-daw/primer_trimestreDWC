//Comenzamos a hacer los nodos de registros

let body = document.body;

labelLogin = createNode("label", "Login: ");
labelLogin.for = "login";

inputLogin = createNode("input");
inputLogin.type = "text";
inputLogin.required = "yes";
inputLogin.name = "login";

body.appendChild(labelLogin);
body.appendChild(inputLogin);

salto = createNode("br");
body.appendChild(salto);

labelPass = createNode("label", "Pasword: ");
labelPass.for = "pass";

inputPass = createNode("input");
inputPass.type = "password";
inputPass.required = "yes";
inputPass.name = "pass";

body.appendChild(labelPass);
body.appendChild(inputPass);

salto = createNode("br");
body.appendChild(salto);

labelEmail = createNode("label", "Email: ");
labelEmail.for = "email";

inputEmail = createNode("input");
inputEmail.type = "email";
inputEmail.required = "yes";
inputEmail.name = "email";

body.appendChild(labelEmail);
body.appendChild(inputEmail);

salto = createNode("br");
body.appendChild(salto);

labelCuenta = createNode("label", "Cuenta bancaria: ");
labelCuenta.for = "cuenta";

inputCuenta = createNode("input");
inputCuenta.type = "text";
inputCuenta.required = "yes";
inputCuenta.name = "cuenta";
inputCuenta.class = "moreWidth";

body.appendChild(labelCuenta);
body.appendChild(inputCuenta);

//Puntero campo pass

inputPass.addEventListener("mouseenter", function () {
  inputPass.type = "text";
});

inputPass.addEventListener("mouseout", function () {
  inputPass.type = "password";
});

//Nodos para clientes

let tipoUsuario = document.querySelectorAll("input");

// Por el html sabemos que  el [0] es cliente y que el [1] es chef
// se que no seria la mejor opcion de hacerlo por si en un futuro se cambia el hmtl y tal
// pero es la unica forma en la que se me ha ocurrido y para no perder tiempo

//No se como hacer para que se borre cada vez que pulses el contrario
// se ha quedado en que si pulsas chef te lo hace si pulsas cliente te borra y te pone el cliente 
// pero lo vuelves a cambiar y no funciona

tipoUsuario[0].addEventListener("click", function () {
  //eliminar los nodos de chef
  quitarAtt(0);

  salto = createNode("br");
  body.appendChild(salto);

  labelDirecc = createNode("label", "Direccion: ");
  labelDirecc.for = "direcc";

  inputDirecc = createNode("input");
  inputDirecc.type = "text";
  inputDirecc.required = "yes";
  inputDirecc.name = "direcc";

  body.appendChild(labelDirecc);
  body.appendChild(inputDirecc);

  salto = createNode("br");
  body.appendChild(salto);

  labelFecha = createNode("label", "Fecha de nacimiento: ");
  labelFecha.for = "fecha";

  inputFecha = createNode("input");
  inputFecha.type = "date";
  inputFecha.required = "yes";
  inputFecha.name = "fecha";

  body.appendChild(labelFecha);
  body.appendChild(inputFecha);

  salto = createNode("br");
  body.appendChild(salto);

  labelTel = createNode("label", "Teléfono:");
  labelTel.for = "telefono";

  inputTel = createNode("input");
  inputTel.type = "text";
  inputTel.required = "yes";
  inputCuenta.name = "telefono";

  body.appendChild(labelTel);
  body.appendChild(inputTel);
});

// nodos para chef
tipoUsuario[1].addEventListener("click", function () {
  //quitarAtt(1);

  salto = createNode("br");
  body.appendChild(salto);
  salto = createNode("br");
  body.appendChild(salto);

  labelEsta = createNode("label", "Nombre del establecimiento: ");
  labelEsta.for = "nombre";

  inputEsta = createNode("input");
  inputEsta.type = "text";
  inputEsta.required = "yes";
  inputEsta.name = "nombre";
  inputEsta.class = "moreWidth";

  body.appendChild(labelEsta);
  body.appendChild(inputEsta);

  salto = createNode("br");
  body.appendChild(salto);

  labelTipos = createNode(
    "label",
    "Señale los tipos de comidas que puede servir: "
  );
  labelTipos.for = "tipos";

  selectTipos = createNode("select");
  selectTipos.name = "tipos";
  selectTipos.multiple = "yes";

  opc = createNode("option", "Casera");
  opc.value = "casera";

  opc2 = createNode("option", "Carnes");
  opc2.value = "carnes";

  opc3 = createNode("option", "Pescados");
  opc3.value = "pescados";

  opc4 = createNode("option", "Pastas");
  opc4.value = "pastas";

  opc5 = createNode("option", "Arroces");
  opc5.value = "arroces";

  opc6 = createNode("option", "Internacional");
  opc6.value = "internacional";

  opc7 = createNode("option", "Otras");
  opc7.value = "otras";

  selectTipos.appendChild(opc);
  selectTipos.appendChild(opc2);
  selectTipos.appendChild(opc3);
  selectTipos.appendChild(opc4);
  selectTipos.appendChild(opc5);
  selectTipos.appendChild(opc6);
  selectTipos.appendChild(opc7);

  body.appendChild(labelTipos);
  body.appendChild(selectTipos);
});

function quitarAtt(tipo) {

  switch (tipo) {
    case 0:
      body.removeChild(labelEsta);
      body.removeChild(inputEsta);
      body.removeChild(labelTipos);
      body.removeChild(selectTipos);
      break;

    case 1:
      body.removeChild(labelDirecc);
      body.removeChild(inputDirecc);
      body.removeChild(labelFecha);
      body.removeChild(inputFecha);
      body.removeChild(labelTel);
      body.removeChild(inputTel);
      break;
  }
}

// añadimos el botón enviar
salto = createNode("br");
body.appendChild(salto);

btEnvia = createNode("button", "Enviar");

body.appendChild(btEnvia);

// funcionalidad boton enviar Y validaciones
let err = document.getElementById("error");

btEnvia.addEventListener("click",function(){
    err.innerHTML = "";
    regxPass = new RegExp("/^(?=.*[A-Z])(?=.*\d).{8,}$/");
    regxCuenta = new RegExp("/[A-Z][a-z].{2}(?=.*\d).{24}$/");

    if(inputLogin.value == "") err.innerHTML += "El campo Login no puede estar vacio.<br>"
    if(inputPass.value == "")  err.innerHTML += "El campo Pass no puede estar vacio.<br>"
    if(inputEmail.value == "") err.innerHTML += "El campo Email no puede estar vacio.<br>"
    if(!regxPass.test(inputPass.value)) err.innerHTML+= "La contraseña tiene que ser de 8 carac , 2 mayus y un numero<br>"
    if(!regxCuenta.test(inputCuenta.value)) err.innerHTML+="La cuenta tiene que empezar por dos letras y el resto son numero hasta 24 caract <br>"
    if(inputEsta.value.length === 20 ){
      inputEsta.readonly = "yes";
      inputEsta.style.border="1px solid red";
    }
    if(!selectTipos.cheked) err.innerHTML += "Al menos tiene que estar una opción seleccionada"
});

//Funcion para crear los nodos de forma "automatica" y no perder tanto tiempo
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