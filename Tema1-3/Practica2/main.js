// Ejercicio 1

class Persona {
  constructor(nombre, edad, genero) {
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
  }

  obtDetalles() {
    const salida1 = document.getElementById("salida1");
    salida1.innerHTML = `<h4>Persona</h4><br>
    Nombre: ${this.nombre} <br>
    Edad: ${this.edad} <br>
    Género: ${this.genero}<br>`;
  }
}

const persona1 = new Persona("Lucía", 25, "Femenino");
persona1.obtDetalles();

class Estudiante extends Persona {
  constructor(nombre, edad, genero, curso, grupo) {
    super(nombre, edad, genero); // Llamada al constructor de Persona
    this.curso = curso;
    this.grupo = grupo;
  }

  registrar() {
    const salida1 = document.getElementById("salida1");
    salida1.innerHTML += `<br><h4>Estudiante</h4><br>
      Nombre: ${this.nombre} <br>
      Edad: ${this.edad} <br>
      Género: ${this.genero} <br>
      Curso: ${this.curso} <br>
      Grupo: ${this.grupo}<br>
    `;
  }
}

const estudiante1 = new Estudiante("Carlos", 20, "Masculino", "2º", "DAW");
estudiante1.registrar();

class Profesor extends Persona {
  constructor(nombre, edad, genero, asignatura, nivel) {
    super(nombre, edad, genero);
    this.asignatura = asignatura;
    this.nivel = nivel;
  }

  asignar() {
    const salida1 = document.getElementById("salida1");
    salida1.innerHTML += `<br><h4>Profesor</h4><br>
        Nombre: ${this.nombre} <br>
        Edad: ${this.edad} <br>
        Genero: ${this.genero} <br>
        Asignatura: ${this.asignatura} <br>
        Nivel: ${this.nivel}
        `;
  }
}

const profesor1 = new Profesor("José luis", 40, "Masculino", "DWEC", "Experto");
profesor1.asignar();

// Ejercicio2

function calcular() {
  const longitud = parseFloat(document.getElementById("longitud").value);
  const altura = parseFloat(document.getElementById("altura").value);

  // Calcular resultados
  const longitudPendiente = calcularLongitudPendiente(longitud, altura);
  const anguloPendiente = calcularAnguloPendiente(0, 0, longitud, altura);
  const porcentajePendiente = calcularPendientePorcentaje(altura, longitud);

  document.getElementById("longitudResultado").value =
    longitudPendiente.toFixed(2);
  document.getElementById("anguloResultado").value = anguloPendiente.toFixed(2);
  document.getElementById("porcentajeResultado").value =
    porcentajePendiente.toFixed(2);
}

// Función para calcular la longitud de la pendiente
function calcularLongitudPendiente(longitud, altura) {
  return Math.sqrt(Math.pow(longitud, 2) + Math.pow(altura, 2));
}

// Función para calcular el ángulo de inclinación en grados
function calcularAnguloPendiente(x1, y1, x2, y2) {
  const anguloRad = Math.atan((y2 - y1) / (x2 - x1)); // atan devuelve en radianes
  const anguloDeg = anguloRad * (180 / Math.PI); // convertir a grados
  return anguloDeg;
}

// Función para calcular el porcentaje de pendiente
function calcularPendientePorcentaje(altura, longitud) {
  return (altura / longitud) * 100;
}

//Ejercicio 3

const salida3 = document.getElementById("salida3");

const pi = Math.PI;
salida3.innerHTML = pi.toFixed(4);

salida3.innerHTML += "<br>" + pi.toPrecision(5);

// Ejercicio 4
let calcula = document.getElementById("calcula");

calcula.onclick = function () {
  let fecha = document.getElementById("fecha");
  let salida4 = document.getElementById("salida4");
  let dateNow = new Date();
  let cumple = new Date(fecha.value);

  let diferenciaEnMilisegundos = dateNow - cumple;

  let dias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

  salida4.innerHTML = "Han pasado " + dias + " días.";
};

//Ejercicio 5
let calcula2 = document.getElementById("calcula2");

calcula2.onclick = function () {
  let fecha2 = document.getElementById("fecha2");
  let salida5 = document.getElementById("salida5");

  const hoy = new Date();
  const nacimiento = new Date(fecha2.value);
  salida5.innerHTML = hoy.getFullYear() - nacimiento.getFullYear() + " años";
};

//Ejercicio 6

// Array para almacenar los eventos
let eventos = [];

// Función para agregar un evento
function agregarEvento() {
  const titulo = document.getElementById("tituloEvento").value;
  const fechaHoraString = document.getElementById("fechaHoraEvento").value;

  if (!titulo || !fechaHoraString) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const fechaHora = new Date(fechaHoraString);

  if (isNaN(fechaHora.getTime())) {
    alert("Por favor, ingresa una fecha y hora válida.");
    return;
  }

  const nuevoEvento = {
    titulo: titulo,
    fechaHora: fechaHora,
  };
  eventos.push(nuevoEvento);
  mostrarEventos();

  // Limpiar los campos del formulario
  document.getElementById("tituloEvento").value = "";
  document.getElementById("fechaHoraEvento").value = "";
}

// Función para ordenar los eventos cronológicamente
function ordenarEventos() {
  eventos.sort((a, b) => a.fechaHora - b.fechaHora);
}

// Función para mostrar los eventos
function mostrarEventos() {
  ordenarEventos();
  let listaHTML = "<ul>";
  for (const evento of eventos) {
    listaHTML += `<li>${
      evento.titulo
    } - ${evento.fechaHora.toLocaleString()}</li>`;
  }
  listaHTML += "</ul>";
  document.getElementById("listaEventos").innerHTML = listaHTML;
}

//Ejercicio 7
function analizarCadena() {
  const cadenaInput = document.getElementById("cadenaInput").value;
  const resultadoDiv = document.getElementById("resultado");

  const longitud = cadenaInput.length;
  let resultadoHTML = `La cadena "${cadenaInput}" tiene ${longitud} caracteres.<br><br>Posiciones de los caracteres:<br>`;

  for (let i = 0; i < longitud; i++) {
    resultadoHTML += `Carácter en la posición ${i}: ${cadenaInput[i]}<br>`;
  }

  resultadoDiv.innerHTML = resultadoHTML;
}

//Ejercicio 8

let miArray = [];

function actualizarDisplay() {
  document.getElementById("arrayDisplay").innerText =
    "Array: [" + miArray.join(", ") + "]";
}

function insertarFinal() {
  let valor = prompt("Ingrese el valor a insertar al final:");
  if (valor !== null) {
    miArray.push(valor);
    actualizarDisplay();
  }
}

function insertarPrincipio() {
  let valor = prompt("Ingrese el valor a insertar al principio:");
  if (valor !== null) {
    miArray.unshift(valor);
    actualizarDisplay();
  }
}

function borrarPrimero() {
  if (miArray.length > 0) {
    miArray.shift();
    actualizarDisplay();
  } else {
    alert("El array está vacío.");
  }
}

function borrarUltimo() {
  if (miArray.length > 0) {
    miArray.pop();
    actualizarDisplay();
  } else {
    alert("El array está vacío.");
  }
}

function insertarEnPosicion() {
  let valor = prompt("Ingrese el valor a insertar:");
  let posicion = prompt(
    "Ingrese la posición donde insertar (0-" + miArray.length + "):"
  );
  posicion = parseInt(posicion);
  if (!isNaN(posicion) && posicion >= 0 && posicion <= miArray.length) {
    miArray.splice(posicion, 0, valor);
    actualizarDisplay();
  } else {
    alert("Posición inválida.");
  }
}

function eliminarEnPosicion() {
  let posicion = prompt(
    "Ingrese la posición a eliminar (0-" + (miArray.length - 1) + "):"
  );
  posicion = parseInt(posicion);
  if (!isNaN(posicion) && posicion >= 0 && posicion < miArray.length) {
    miArray.splice(posicion, 1);
    actualizarDisplay();
  } else {
    alert("Posición inválida.");
  }
}

function ordenarAsc() {
  miArray.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  actualizarDisplay();
}

function ordenarDesc() {
  miArray.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  actualizarDisplay();
}

// Ejercicio9

const salida9 = document.getElementById("salida9");

window.addEventListener("resize", function () {
  const ancho = window.innerWidth;
  const alto = window.innerHeight;
  let tipoPantalla = "";

  if (ancho < 768) {
    tipoPantalla = "móvil";
  } else if (ancho >= 768 && ancho <= 1024) {
    tipoPantalla = "tablet";
  } else {
    tipoPantalla = "desktop";
  }

  salida9.innerHTML = `
        El ancho y alto de la pantalla es: ${ancho} x ${alto}<br>
        La pantalla es considerada un <strong>${tipoPantalla}</strong>
      `;
});

//Ejercicio10
let wAux = undefined;
document.getElementById("abrirVent").onclick = () => {
  const ancho = window.innerWidth;
  const alto = window.innerHeight;
  let wAuxAncho = ancho - 40;
  let wAuxAlto = alto - 20;

  wAux = window.open(
    "http://127.0.0.1:5500/primer_trimestreDWC/Tema1-3/Pruebas/usuarios.html",
    "_blank",
    `width=${wAuxAncho},height=${wAuxAlto}`
  );
};

//Ejercicio11
let salida11 = document.getElementById("salida11");

document.getElementById("redimension").onclick = () => {
  if (wAux && !wAux.closed) {
    wAux.resizeTo(600, 500);
    wAux.focus();
    salida11.innerHTML = "";
  } else {
    salida11.innerHTML = "la ventana no esta abierta";
    salida11.style.color = "red";
  }
};

//Ejercicio12
let iFrame = document.getElementById("iFrame");
let iFrameSCR = iFrame.src;

document.getElementById("volver").onclick = () => {
  iFrame.src = iFrameSCR;
};

document.getElementById("siguiente").onclick = () => {
  iFrame.src = "../Objetos en JavaScript.pdf";
};

//Ejercicio13
let salida13 = document.getElementById("salida13");
document.getElementById("enviarLogin").onclick = function () {
  if ((wAux)&&(!wAux.closed)) {
    wAux.document.getElementById("loginText").value = document.getElementById("login").value;
    wAux.focus();
    salida13.innerHTML = "";
  } else {
    salida13.innerHTML = "la ventana no esta abierta";
    salida13.style.color = "red";
  }
};
