/*********** Ejercicio1 **************/
const alumnos = [];

document.getElementById("addAlum").onclick = function () {
  let nom = document.getElementById("nom").value;
  let ape = document.getElementById("ape").value;
  let curso = document.getElementById("cur").value;
  let n1 = parseFloat(document.getElementById("nota1").value);
  let n2 = parseFloat(document.getElementById("nota2").value);
  let n3 = parseFloat(document.getElementById("nota3").value);

  if (!nom || !ape || !curso || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  alumnos.push([nom, ape, curso, [n1, n2, n3]]);

  mostrarAlumnos();

  document.getElementById("nom").value = "";
  document.getElementById("ape").value = "";
  document.getElementById("cur").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
  document.getElementById("nota3").value = "";
};

function mostrarAlumnos() {
  let salida = document.getElementById("AlumAña");
  salida.innerHTML += "<br>";

  for (let i = 0; i < alumnos.length; i++) {
    let alumno = alumnos[i];
    let nombre = alumno[0];
    let apellido = alumno[1];
    let curso = alumno[2];
    let notas = alumno[3];

    salida.innerHTML += `
          <tr>
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${curso}</td>
            <td>${notas[0]}</td>
            <td>${notas[1]}</td>
            <td>${notas[2]}</td>
          </tr> 
          <br>
        `;
  }
}

/*********** Ejercicio2 **************/

function calcularXOR() {
  const a = parseInt(document.getElementById("a").value);
  const b = parseInt(document.getElementById("b").value);

  if (![0, 1].includes(a) || ![0, 1].includes(b)) {
    document.getElementById("resultado").innerHTML =
      "Por favor, introduce solo 0 o 1.";
    return;
  }

  const resultado = a !== b ? 1 : 0;

  document.getElementById(
    "resultado"
  ).innerHTML = `Resultado de ${a} XOR ${b} = ${resultado}`;
}

/*********** Ejercicio3 **************/
let inputDolar = document.getElementById("dolar");
let inputYen = document.getElementById("yen");
let botonConvertir = document.getElementById("convertir");
let error = document.getElementById("error");
const tasaDolar = 1.17;
const tasaYen = 172.92;

function convertirEUROS(euros, tasa) {
  return (euros * tasa).toFixed(2);
}

botonConvertir.onclick = function () {
  const euros = parseFloat(document.getElementById("euro").value);

  if (isNaN(euros)) {
    error.innerHTML = "Error: No has introducido un numero";
    document.getElementById("error").style.backgroundColor = "red";
    document.getElementById("error").style.color = "white";
    setTimeout(() => {
      // sirve para darle un time out para que despues de un tiempo se quite
      error.innerHTML = "";
      error.style.backgroundColor = "";
      error.style.color = "";
    }, 3000); // serian 3 seguundos
  } else {
    const dolares = convertirEUROS(euros, tasaDolar);
    const yenes = convertirEUROS(euros, tasaYen);

    inputDolar.value = dolares;
    inputYen.value = yenes;
  }
};

/*********** Ejercicio4 **************/

function calcular() {
  const radioInput = document.getElementById("radio");
  const areaInput = document.getElementById("area");
  const perimetroInput = document.getElementById("perimetro");

  const radio = parseFloat(radioInput.value);

  if (isNaN(radio) || radio <= 0) {
    areaInput.value = "";
    perimetroInput.value = "";
    alert("Por favor, introduce un radio válido mayor que 0.");
    return;
  }

  const pi = Math.PI;
  const area = pi * Math.pow(radio, 2);
  const perimetro = 2 * pi * radio;

  areaInput.value = area.toFixed(2);
  perimetroInput.value = perimetro.toFixed(2);
}

/*********** Ejercicio5 **************/
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const bValoresPares = document.getElementById("ValPares");
const salida = document.getElementById("sol");

if (
  num1.value >= -100 &&
  num1.value <= 5000 &&
  num2.value >= -100 &&
  num2.value <= 5000
) {
  bValoresPares.onclick = function () {
    let n1 = parseInt(num1.value);
    let n2 = parseInt(num2.value);
    let pares = [];
    for (let i = n1; i <= n2; i++) {
      if (i % 2 === 0) {
        pares.push(i);
      }
    }
    salida.innerHTML = `Números pares entre ${n1} y ${n2}: ${pares.join(", ")}`;
  };
} else {
  salida.innerHTML = "Los números deben estar entre -100 y 5000.";
  num1.value = "";
  num2.value = "";
}
/*********** Ejercicio6 **************/
const Num1 = document.getElementById("num");
const Num2 = document.getElementById("numv2");
const boton = document.getElementById("Result");
const sumaElem = document.getElementById("suma");
const restaElem = document.getElementById("resta");
const multElem = document.getElementById("multiplicacion");
const divElem = document.getElementById("division");
const restoElem = document.getElementById("resto");

boton.onclick = function () {
  const valor1 = parseFloat(Num1.value);
  const valor2 = parseFloat(Num2.value);

  if (isNaN(valor1) || isNaN(valor2)) {
    alert("Por favor, introduce dos números válidos.");
    return;
  }

  const suma = valor1 + valor2;
  const resta = valor1 - valor2;
  const multiplicacion = valor1 * valor2;
  const division =
    valor2 !== 0
      ? (valor1 / valor2).toFixed(2)
      : "No se puede dividir por cero";
  const resto = valor1 % valor2;

  sumaElem.value = suma;
  restaElem.value = resta;
  multElem.value = multiplicacion;
  divElem.value = division;
  restoElem.value = resto;
};

/*********** Ejercicio7 **************/

const nota1 = document.getElementById("not1");
const nota2 = document.getElementById("not2");
const nota3 = document.getElementById("not3");
const calcularMediaBtn = document.getElementById("CalcularMedia");
const resultadoMedia = document.getElementById("media");

calcularMediaBtn.onclick = function () {
  const n1 = parseFloat(nota1.value);
  const n2 = parseFloat(nota2.value);
  const n3 = parseFloat(nota3.value);

  const media = ((n1 + n2 + n3) / 3).toFixed(2);

  switch (true) {
    case media < 5:
      resultadoMedia.innerHTML = `Suspenso: ${media}`;
      break;
    case media >= 5 && media < 7:
      resultadoMedia.innerHTML = `Aprobado: ${media}`;
      break;
    case media >= 7 && media <= 8.5:
      resultadoMedia.innerHTML = `Notable: ${media}`;
      break;
    case media > 8.5 && media <= 10:
      resultadoMedia.innerHTML = `Sobresaliente: ${media}`;
      break;
  }
};

/*********** Ejercicio8 **************/
const generaPiramide = document.getElementById("GenerarPiramide");
const salidaPiramide = document.getElementById("piramide");

generaPiramide.onclick = function () {
  const n = document.getElementById("n").value;
  for (let i = 0; i <= n; i++) {
    let espacios = " ".repeat(n - i);
    let numeros = String(i).repeat(2 * i - 1);
    salidaPiramide.innerHTML += espacios + numeros + "<br>";
  }
};

/*********** Ejercicio9 **************/
const botonPiramide = document.getElementById("piramidegenera");
const Piramidesalida = document.getElementById("pira");

botonPiramide.onclick = function () {
  const n = parseInt(document.getElementById("n2").value);
  Piramidesalida.textContent = "";

  let resultado = "";
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      resultado += j;
    }
    resultado += "\n";
  }
  Piramidesalida.style.whiteSpace = "pre";
  Piramidesalida.textContent = resultado;
};

/*********** Ejercicio10 **************/

const parImparBtn = document.getElementById("ParImpar");
const parYimpar = document.getElementById("parYimpar");

parImparBtn.onclick = function () {
  const numero = parseInt(document.getElementById("Numero").value);

  if (isNaN(numero)) {
    parYimpar.innerHTML = "Por favor, introduce un número válido.";
    return;
  } else if (numero % 2 === 0) {
    parYimpar.innerHTML = "El número " + numero + " es Par.";
  } else parYimpar.innerHTML = "El número " + numero + " es Impar.";
};

/*********** Ejercicio11 **************/

const pum = document.getElementById("pum");
const botonPum = document.getElementById("juegoPUM");

botonPum.onclick = function () {

  for (let i = 1; i <= 100; i++) {
    if (i % 7 === 0 || i % 10 === 7) {
      pum.innerHTML += "PUM<br>";
    } else {
      pum.innerHTML += i + "<br>";
    }
  }
};
