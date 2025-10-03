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