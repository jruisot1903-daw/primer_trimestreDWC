import { Guerrero } from "./clases/Guerrero.js";
import { Mago } from "./clases/Mago.js";

// mensaje que saldra por el registro de la batalla
export function log(mensaje) { // lo exportamos para que las clases puedan usarlo para mostrar los ataques y demas acciones en el log de batalla
    const logDiv = document.getElementById("logContenido");
    const p = document.createElement("p");
    const linea = document.createElement("hr");
    const salto = document.createElement("br");
    p.textContent =  mensaje;
    logDiv.appendChild(linea);
    logDiv.appendChild(p);
    logDiv.appendChild(salto);
}

const listaPersonajes = []; //Un array donde estaran todos los personajes creados
let turnoActual = 0; // controlar turno de cada persoanje 


const form = document.getElementById("crearPersonajeForm");
const contenedorPersonajes = document.getElementById("listaPersonajes");

// Funciones utiles para el juego , actualizar turnos , pasar de turno y actualizar la barra de vida 

function actualizarTurnos() {
    const tarjetas = document.querySelectorAll(".tarjeta");

    tarjetas.forEach((tarjeta, index) => {
        const btn = tarjeta.querySelector(".atacarBtn");
        btn.disabled = index !== turnoActual;
    });
}

function siguienteTurno() {
    turnoActual = (turnoActual + 1) % listaPersonajes.length;
    actualizarTurnos();
}

function actualizarBarraVida(personaje, barra) {
    barra.value = personaje.vida;
}


//crear tarjeta del personaje 

function crearTarjeta(personaje) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const nombre = document.createElement("h3");
    nombre.textContent = personaje.nombre;

    const clase = document.createElement("p");
    clase.textContent = personaje instanceof Guerrero ? "Guerrero" : "Mago";

    const vida = document.createElement("progress");
    vida.max = 100;
    vida.value = personaje.vida;

    const btnAtacar = document.createElement("button");
    btnAtacar.textContent = "Atacar";
    btnAtacar.classList.add("atacarBtn");

    btnAtacar.addEventListener("click", () => {
        const objetivo = listaPersonajes.find(p => p !== personaje && p.estaVivo());

        if (!objetivo) {
            log("No quedan enemigos vivos.");
            return;
        }

        personaje.atacar(objetivo);

        // Actualizar barra de vida del objetivo
        const indexObjetivo = listaPersonajes.indexOf(objetivo);
        const tarjetaObjetivo = document.querySelectorAll(".tarjeta")[indexObjetivo];
        const barraObjetivo = tarjetaObjetivo.querySelector("progress");
        actualizarBarraVida(objetivo, barraObjetivo);

        siguienteTurno();
    });

    tarjeta.appendChild(nombre);
    tarjeta.appendChild(clase);
    tarjeta.appendChild(vida);
    tarjeta.appendChild(btnAtacar);

    contenedorPersonajes.appendChild(tarjeta);
}

//Creaccion del personaje 

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const fuerza = parseInt(document.getElementById("fuerza").value);
    const clase = document.getElementById("clase").value;

    let personaje;

    if (clase === "Guerrero") {
        personaje = new Guerrero(nombre, fuerza);
    } else {
        personaje = new Mago(nombre, fuerza);
    }

    listaPersonajes.push(personaje);
    crearTarjeta(personaje);

    actualizarTurnos();

    form.reset();
});
