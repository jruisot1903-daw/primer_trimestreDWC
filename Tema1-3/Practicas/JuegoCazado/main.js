let palabraSecreta = "";
let palabraMostrada = [];
let letrasFallidas = [];
let intentosRestantes = 6;
let tiempoRestante = 0;
let temporizador = null;
let juegoIniciado = false;

const inputPalabra = document.getElementById("palabra");
const inputLetra = document.getElementById("letra");
const btnMostrar = document.getElementById("bpass");
const btnJugar = document.getElementById("bjugar");
const btnAdivinar = document.getElementById("bAdivinar");
const divImagen = document.getElementById("div-imagen");
const capaImagen = document.getElementById("imagen-capa");

// Mostrar/Ocultar palabra
btnMostrar.addEventListener("click", () => {
  const isOculto = inputPalabra.type === "password";
  inputPalabra.type = isOculto ? "text" : "password";
  document.getElementById("candadoimg").src = isOculto
    ? "./img/candadoCerrado.png"
    : "./img/candadoAbierto.png";
});

// Iniciar juego
btnJugar.addEventListener("click", () => {
  if(juegoIniciado === false){
    juegoIniciado = true;
      const palabra = inputPalabra.value.trim().toLowerCase();
  if (!/^[a-zA-ZÑñ]+$/.test(palabra)) {
    alert("La palabra solo puede contener letras.");
    return;
  }

  palabraSecreta = palabra;
  palabraMostrada = Array(palabra.length).fill("_");
  letrasFallidas = [];
  intentosRestantes = 6;
  tiempoRestante = palabra.length * 5;

  document.getElementById("info-juego").style.display = "block";
  actualizarVista();
  actualizarOpacidad();
  iniciarTemporizador();
  }else 
    alert("El juego ya ha sido iniciado");
  
});

// Adivinar letra
btnAdivinar.addEventListener("click", () => {
  const letra = inputLetra.value.trim().toLowerCase();
  inputLetra.value = "";

  if (!/^[a-zA-ZÑñ]$/.test(letra)) {
    alert("Introduce una sola letra válida.");
    return;
  }

  if (palabraMostrada.includes(letra) || letrasFallidas.includes(letra)) {
    alert("Ya has probado esa letra.");
    return;
  }

  if (palabraSecreta.includes(letra)) {
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (palabraSecreta[i] === letra) {
        palabraMostrada[i] = letra;
      }
    }
  } else {
    letrasFallidas.push(letra);
    intentosRestantes--;
    actualizarOpacidad();
  }

  actualizarVista();

  if (!palabraMostrada.includes("_")) {
    detenerTemporizador();
    alert("¡Has ganado!");
    juegoIniciado = false;
    reiniciarJuego();
  } else if (intentosRestantes === 0) {
    detenerTemporizador();
    alert(`¡Has perdido! La palabra era: ${palabraSecreta}`);
    juegoIniciado = false;
    reiniciarJuego();
  }
});

// Actualizar texto
function actualizarVista() {
  document.getElementById("palabraMostrada").textContent = `Palabra: ${palabraMostrada.join(" ")}`;
  document.getElementById("timer").textContent = `Tiempo restante: ${tiempoRestante}s`;
  document.getElementById("intentos").textContent = `Intentos restantes: ${intentosRestantes} / 6`;
  document.getElementById("fallos").textContent = `Letras fallidas: ${letrasFallidas.join(", ")}`;
}

// Actualizar opacidad de la capa
function actualizarOpacidad() {
  const fallos = 6 - intentosRestantes;
  const nuevaOpacidad = Math.max(0, 1 - fallos * 0.16);
  capaImagen.style.opacity = nuevaOpacidad.toFixed(2);
}

// Temporizador
function iniciarTemporizador() {
  clearInterval(temporizador);
  temporizador = setInterval(() => {
    tiempoRestante--;
    actualizarVista();
    if (tiempoRestante <= 0) {
      detenerTemporizador();
      alert(`¡Se acabó el tiempo! La palabra era: ${palabraSecreta}`);
      juegoIniciado = false;
      reiniciarJuego();
    }
  }, 1000);
}

function detenerTemporizador() {
  clearInterval(temporizador);
}

// Reiniciar juego
function reiniciarJuego() {
  palabraSecreta = "";
  palabraMostrada = [];
  letrasFallidas = [];
  intentosRestantes = 6;
  tiempoRestante = 0;
  detenerTemporizador();

  inputPalabra.value = "";
  inputPalabra.type = "password";
  document.getElementById("candadoimg").src = "./img/candadoAbierto.png";
  inputLetra.value = "";

  document.getElementById("info-juego").style.display = "none";
  capaImagen.style.opacity = "1";
}
