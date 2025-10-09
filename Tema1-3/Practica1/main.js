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
  const n = parseInt(document.getElementById("n").value);
    salidaPiramide.innerHTML = "";
  for (let i = 1; i <= n; i++) {
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
  parYimpar.innerHTML = "";
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
  pum.innerHTML = "";
  for (let i = 1; i <= 100; i++) {
    if (i % 7 === 0 || i % 10 === 7) {
      pum.innerHTML += "PUM<br>";
    } else {
      pum.innerHTML += i + "<br>";
    }
  }
};

/*********** Ejercicio12 **************/

const contarBtn = document.getElementById("contar");
const contSalida = document.getElementById("contSalida");

contarBtn.onclick = function(){
  let resultado = "";
  let estilo = "";

  for(let i = 1; i <= 300; i++){
    if(i % 10 === 0){
      resultado += "<br>";
    }

    if(i % 4 === 0){
     estilo = 'style="color: green; font-size: 20px;"';
    }else if(i % 9 === 0){
      estilo = 'style="color: red; font-size: 17px;"';
    }
    resultado += `<span ${estilo}>${i}</span> `;

  }
  contSalida.innerHTML = resultado;

}

/*********** Ejercicio13 **************/
const tirarDadosBtn = document.getElementById("tirarDados");
const dados = document.getElementById("dados");
const miArray = [];
tirarDadosBtn.onclick = function(){
 
 for(let i = 1; i <= 36000; i++){
  let dado1 = Math.floor(Math.random() * 6) + 1;
  let dado2 = Math.floor(Math.random() * 6) + 1;
  miArray.push(dado1 + dado2);
 }

 let conteo = {};
 for(let num of miArray){
   conteo[num] = (conteo[num] || 0) + 1;
 }

 dados.innerHTML = "";
 for(let num in conteo){
   dados.innerHTML += `El número ${num} ha salido ${conteo[num]} veces.<br>`;
 }
   
}

/*********** Ejercicio14 **************/
const MontNum = document.getElementById("MontonNumeros");
const guardaBtn = document.getElementById("guarda");
const mostrarBtn = document.getElementById("mostrar");
const sl = document.getElementById("sl");

const numAlmacena = [];

guardaBtn.addEventListener('click',() => { // es un evento que esta escuchando y se reproduce cada vez que se hace click
  const valorInput = parseInt(MontNum.value);
      if(valorInput === 0){
            sl.innerHTML += "Saliendo del programa..."
      }else{
        const numero = parseInt(valorInput, 10); 
            numAlmacena.push(numero); 
            MontNum.value = ''; 
      }
});

mostrarBtn.onclick = function(){
    sl.innerHTML = numAlmacena.sort();

    sl.innerHTML += "<br> El numero más pequeño es: " + numAlmacena[0] + " y el numero mayor es: " + numAlmacena[numAlmacena.length -1];
     
    const ocurrencias = {};
    numAlmacena.forEach(num => {
        ocurrencias[num] = (ocurrencias[num] || 0) + 1;
    });

    sl.innerHTML += "<br><br><strong>Ocurrencias de cada número:</strong><br>";
    for (const num in ocurrencias) {
        sl.innerHTML += `Número ${num}: ${ocurrencias[num]} veces<br>`;
    }

}


/*********** Ejercicio15 **************/
const invertBtn = document.getElementById("invertir");
const arrayDat  = document.getElementById("array");
const arraySl = document.getElementById("arraySl");
const addArr = document.getElementById("añade");
const arrayOrig = [];

addArr.addEventListener('click',() => {
  
      arrayOrig.push(arrayDat.value); 
            arrayDat.value = '';
});

invertBtn.onclick = function(){
    arrayOrig.reverse();
    for(let i in arrayOrig){
      arraySl.innerHTML += arrayOrig[i]+"  ";
    }
}

/*********** Ejercicio16 **************/

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?/`~';
const ALL = UPPER + LOWER + DIGITS + SYMBOLS;
const CLASSES = [UPPER, LOWER, DIGITS, SYMBOLS];

function parseLength(s) {
  if (!s) throw new Error('Falta longitud');
  const m = s.trim().match(/^(\d+)(?:\s*bytes)?$/i);
  if (!m) throw new Error('Formato inválido. Ej: 128Bytes o 128');
  return parseInt(m[1], 10);
}

// rechazo usando 32-bit integers con crypto.getRandomValues
function secureRandomInt(max) {
  if (max <= 0) throw new Error('max > 0 required');
  const UINT32_MAX = 0x100000000;
  const limit = Math.floor(UINT32_MAX / max) * max;
  const buf = new Uint32Array(1);
  while (true) {
    crypto.getRandomValues(buf);
    const val = buf[0] >>> 0;
    if (val < limit) return val % max;
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function generatePassword(length) {
  if (length < 1) throw new Error('La longitud debe ser >= 1');
  const out = [];
  if (length >= CLASSES.length) {
    for (const cls of CLASSES) {
      out.push(cls[secureRandomInt(cls.length)]);
    }
  }
  while (out.length < length) {
    out.push(ALL[secureRandomInt(ALL.length)]);
  }
  shuffle(out);
  return out.join('');
}

document.getElementById('gen').addEventListener('click', () => {
  try {
    const val = document.getElementById('len').value;
    const len = parseLength(val);
    const pwd = generatePassword(len);
    document.getElementById('out').textContent = pwd;
  } catch (e) {
    document.getElementById('out').textContent = 'Error: ' + e.message;
  }
});

/*********** Ejercicio17 **************/

function calcularMenor(a, b) {
      return a < b ? a : b;
    }

    document.getElementById('btn').addEventListener('click', () => {
      const n1 = parseInt(document.getElementById('1').value);
      const n2 = parseInt(document.getElementById('2').value);
      const salida = document.getElementById('salida');

      // Validación de entrada
      if (isNaN(n1) || isNaN(n2)) {
        salida.textContent = 'Por favor, introduce dos números válidos.';
        return;
      }

      const menor = calcularMenor(n1, n2);
      const mayor = (menor === n1) ? n2 : n1;

      const numerosEntre = [];

      for (let i = menor + 1; i < mayor; i++) {
        numerosEntre.push(i);
      }

      const cantidad = numerosEntre.length;

      if (cantidad === 0) {
        salida.textContent = `No hay números entre ${n1} y ${n2}.`;
      } else {
        salida.innerHTML = `
          <strong>Menor:</strong> ${menor}<br>
          <strong>Mayor:</strong> ${mayor}<br>
          <strong>Números entre ellos:</strong> ${numerosEntre.join(', ')}<br>
          <strong>Total:</strong> ${cantidad}
        `;
      }
    });

/*********** Ejercicio18 **************/

    function esMultiplo(numero, divisor) {
      return numero % divisor === 0;
    }

    document.getElementById('btn2').addEventListener('click', () => {
      const numero = parseInt(document.getElementById('numero').value);
      const opcion = parseInt(document.getElementById('opcion').value);
      const salida = document.getElementById('rsult');

      // Validaciones básicas
      if (isNaN(numero)) {
        salida.textContent = 'Por favor, introduce un número válido.';
        return;
      }

      if (![0, 1, 2, 3].includes(opcion) || isNaN(opcion)) {
        salida.textContent = 'Opción no válida. Elige 0, 1, 2 o 3.';
        return;
      }

      if (opcion === 0) {
        salida.textContent = 'Has salido del programa...';
        return;
      }

      let divisor;
      switch (opcion) {
        case 1: divisor = 2; break;
        case 2: divisor = 3; break;
        case 3: divisor = 5; break;
      }

      const resultado = esMultiplo(numero, divisor)
        ? `${numero} es múltiplo de ${divisor}.`
        : `${numero} NO es múltiplo de ${divisor}.`;

      salida.textContent = resultado;
    });

    /*********** Ejercicio18 **************/