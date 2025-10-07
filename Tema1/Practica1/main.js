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
    let notas = alumno[3]; // [nota1, nota2, notaFinal]

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
    document.getElementById("resultado").innerHTML = "Por favor, introduce solo 0 o 1.";
    return;
  }

  const resultado = (a !== b) ? 1 : 0;

  document.getElementById("resultado").innerHTML = `Resultado de ${a} XOR ${b} = ${resultado}`;
}

/*********** Ejercicio3 **************/
// Obtener referencias a los elementos del DOM
let inputDolar = document.getElementById("dolar");
let inputYen = document.getElementById("yen");
let botonConvertir = document.getElementById("convertir");
let error = document.getElementById("error");
const tasaDolar = 1.17;
const tasaYen = 172.92;

// Función para convertir euros a otra moneda
function convertirEUROS(euros, tasa) {
  return (euros * tasa).toFixed(2); // redondea a 2 decimales
}

// Evento al hacer clic en el botón
botonConvertir.onclick = function () {
  // Obtener el valor en euros ingresado por el usuario
  const euros = parseFloat(document.getElementById("euro").value);


  if (isNaN(euros)) {
    error.innerHTML = "Error: No has introducido un numero";
    document.getElementById("error").style.backgroundColor = "red";
    document.getElementById("error").style.color = "white";
    setTimeout(() => { // sirve para darle un time out para que despues de un tiempo se quite 
        error.innerHTML = "";
        error.style.backgroundColor = "";
        error.style.color = "";
    }, 3000);// serian 3 seguundos
    

  } else {
    const dolares = convertirEUROS(euros, tasaDolar);
    const yenes = convertirEUROS(euros, tasaYen);

    inputDolar.value = dolares;
    inputYen.value = yenes;
  }

};

/*********** Ejercicio4 **************/

function calcular() {
            const radioInput = document.getElementById('radio');
            const areaInput = document.getElementById('area');
            const perimetroInput = document.getElementById('perimetro');
            
            const radio = parseFloat(radioInput.value);
            
            if (isNaN(radio) || radio <= 0) {
                areaInput.value = '';
                perimetroInput.value = '';
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

        if(num1.value >= -100 && num1.value <= 5000 && num2.value >= -100 && num2.value <= 5000){
            bValoresPares.onclick = function(){
                let n1 = parseInt(num1.value);
                let n2 = parseInt(num2.value);
                let pares = [];
                for(let i = n1; i <= n2; i++){
                    if(i % 2 === 0){
                        pares.push(i);
                    }
                }
                salida.innerHTML = `Números pares entre ${n1} y ${n2}: ${pares.join(", ")}`;
            }
        }
        else{
            salida.innerHTML = "Los números deben estar entre -100 y 5000.";
            num1.value = "";
            num2.value = "";
        }
/*********** Ejercicio6 **************/
const Num1 = document.getElementById("num");
const Num2 = document.getElementById("numv2");
const boton = document.getElementById("Result");

boton.onclick = function() {
    const valor1 = parseFloat(Num1.value);
    const valor2 = parseFloat(Num2.value);

    if (isNaN(valor1) || isNaN(valor2)) {
        alert("Por favor, introduce dos números válidos.");
        return;
    }

  const suma = valor1 + valor2;
  const resta = valor1 - valor2;
  const multiplicacion = valor1 * valor2;
  const division = valor2 !== 0 ? (valor1 / valor2).toFixed(2) : "No se puede dividir por cero";
  const resto = valor1 % valor2;

  suma.innerHTML = document.getElementById("suma").innerHTML = `Suma: ${suma}`;
  resta.innerHTML = document.getElementById("resta").innerHTML = `Resta: ${resta}`;
  multiplicacion.innerHTML = document.getElementById("multiplicacion").innerHTML = `Multiplicación: ${multiplicacion}`;
  division.innerHTML = document.getElementById("division").innerHTML = `División: ${division}`;
  resto.innerHTML = document.getElementById("resto").innerHTML = `Resto: ${resto}`;
};