let palabraSecreta = "";
let palabraMostrada = [];
let letrasFallidas = [];
let tiempoRestante = 0;
let temporizador = null;
let juegoIniciado = false;
let juegos = [];
let juegosTexto = [];

let inputPalabra = document.getElementById("palabra");
let inputLetra = document.getElementById("letra");
let btnMostrar = document.getElementById("bpass");
let btnJugar = document.getElementById("bjugar");
let btnAdivinar = document.getElementById("bAdivinar");
let divImagen = document.getElementById("div-imagen");
let capaImagen = document.getElementById("imagen-capa");
let juegosrealizados = document.getElementById("juegos-realizados");

let intentosRestantes = (inputPalabra.length/2)+1;

// Botón para mostrar u ocultar la palabra
btnMostrar.addEventListener("click", function() {
  if (inputPalabra.type === "password") {
    inputPalabra.type = "text"; 
    document.getElementById("candadoimg").src = "./img/candadoCerrado.png";
  } else {
    inputPalabra.type = "password"; 
    document.getElementById("candadoimg").src = "./img/candadoAbierto.png";
  }
});

// Botón para empezar el juego
btnJugar.addEventListener("click", function() {
  if (juegoIniciado == false) {
    juegoIniciado = true;
    let palabra = inputPalabra.value;
    palabra = palabra.trim().toLowerCase();

    // Comprobar que solo hay letras
    let soloLetras = /^[a-zA-ZÑñ]+$/;
    if (!soloLetras.test(palabra)) {
      alert("La palabra solo puede contener letras.");
      return;
    }

    palabraSecreta = palabra;
    palabraMostrada = [];
    for (let i = 0; i < palabra.length; i++) {
      palabraMostrada.push("_");   // rellenamos con _ la palabra para mostrarla en el juego 
    }

    letrasFallidas = [];
    intentosRestantes = (palabra.length/2)+1;
    tiempoRestante = (palabra.length * 10)/3;

    document.getElementById("info-juego").style.display = "block";
    actualizarVista();
    actualizarOpacidad();
    iniciarTemporizador();
  } else {
    alert("El juego ya ha sido iniciado");
  }
});

// Botón para adivinar una letra
btnAdivinar.addEventListener("click", function() {
  let letra = inputLetra.value;
  letra = letra.trim().toLowerCase();
  inputLetra.value = "";

  // Comprobar que es una sola letra
  let soloUnaLetra = /^[a-zA-ZÑñ]$/;
  if (!soloUnaLetra.test(letra)) {
    alert("Introduce una sola letra válida.");
    return;
  }

  // Comprobar si ya se usó
  if (palabraMostrada.indexOf(letra) != -1 || letrasFallidas.indexOf(letra) != -1) {
    alert("Ya has probado esa letra.");
    return;
  }

  // Buscar la letra en la palabra
  let encontrada = false;
  for (let i = 0; i < palabraSecreta.length; i++) {
    if (palabraSecreta[i] == letra) {
      palabraMostrada[i] = letra;
      encontrada = true;
    }
  }

  if (!encontrada) {
    letrasFallidas.push(letra);
    intentosRestantes = intentosRestantes - 1;
    actualizarOpacidad();
  }

  actualizarVista();

  // Comprobar si ganó o perdió
  if (palabraMostrada.indexOf("_") == -1) {
    detenerTemporizador();
    alert("¡Has ganado!");
    juegoIniciado = false;
    juegos.push(palabra.value);
    juegos.push(true);
    guardarpartidas(juegos);
    reiniciarJuego();
  } else if (intentosRestantes == 0) {
    detenerTemporizador();
    alert("¡Has perdido! La palabra era: " + palabraSecreta);
    juegoIniciado = false;
    juegos.push(palabra.value);
    juegos.push(false);
    guardarpartidas(juegos);
    reiniciarJuego();
  }
  
});

// Función para actualizar el texto en pantalla
function actualizarVista() {
  document.getElementById("palabraMostrada").textContent = "Palabra: " + palabraMostrada.join(" ");
  document.getElementById("timer").textContent = "Tiempo restante: " + tiempoRestante + "s";
  document.getElementById("intentos").textContent = "Intentos restantes: " + intentosRestantes + " /"+intentosRestantes;
  document.getElementById("fallos").textContent = "Letras fallidas: " + letrasFallidas.join(", ");
}

// la opacidad no me funciona al cambiarle el numero de intentos fallidos 
function actualizarOpacidad() {
  let fallos = ((inputPalabra.length/2)+1) - intentosRestantes;
  let nuevaOpacidad = 1 - (fallos * 0.16);
  if (nuevaOpacidad < 0) {
    nuevaOpacidad = 0;
  }
  capaImagen.style.opacity = nuevaOpacidad.toFixed(2);
}

function iniciarTemporizador() {
  clearInterval(temporizador);
  temporizador = setInterval(function() {
    tiempoRestante = tiempoRestante - 1;
    actualizarVista();
    if (tiempoRestante <= 0) {
      detenerTemporizador();
      alert("¡Se acabó el tiempo! La palabra era: " + palabraSecreta);
      juegoIniciado = false;
      juegos.push(inputPalabra.value);
      juegos.push(false);
      guardarpartidas(juegos);
      reiniciarJuego();
    }
  }, 1000);
}

function detenerTemporizador() {
  clearInterval(temporizador);
}

function reiniciarJuego() {
  palabraSecreta = "";
  palabraMostrada = [];
  letrasFallidas = [];
  intentosRestantes = 0;
  tiempoRestante = 0;
  detenerTemporizador();

  inputPalabra.value = "";
  inputPalabra.type = "password";
  document.getElementById("candadoimg").src = "./img/candadoAbierto.png";
  inputLetra.value = "";

  document.getElementById("info-juego").style.display = "none";
  capaImagen.style.opacity = "1";
}

/* lo de guaradar las partidas no me lo hace del todo bien , ya que 
la primera vez si ,pero despues cada vez que adivino la palabra porque se repite 
*/
function guardarpartidas(juegos){
  let acertado = "";
  if(juegos[1]){
    acertado = "acertado";
  }else 
    acertado = "no acertado";

for (let index = 0; index < juegos.length; index++) {
  
    juegosTexto.push("Juego "+index+": Palabra: '"+juegos[index]+"', "+acertado+", "+tiempoRestante+" /s");
    juegosrealizados.innerHTML += juegosTexto[index] +"<br>";
  
  
}
}

