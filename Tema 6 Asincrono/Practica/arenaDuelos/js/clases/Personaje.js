import { Dados } from "./Dados.js";
import { log } from "../main.js";

export class Personaje {
    nombre;
    fuerza;
    #vida = 100;

    constructor(nombre, fuerza) {
        this.nombre = nombre;
        this.fuerza = fuerza;
    }

    get vida() {
        return this.#vida;
    }

    estaVivo() {
        return this.#vida > 0;
    }

    recibirDano(cantidad) {
        this.#vida -= cantidad;
        if (this.#vida < 0) this.#vida = 0;

        log(`${this.nombre} recibe ${cantidad} de daño. Vida actual: ${this.#vida}`);

        if (this.#vida === 0) {
            log(`${this.nombre} ha muerto`);
        }
    }

    atacar(objetivo) {
        if (!this.estaVivo()) {
            log(`${this.nombre} no puede atacar porque está muerto`);
            return;
        }

        const daño = Dados.generarNumeroAleatorio(1, this.fuerza);

        log(`${this.nombre} ataca a ${objetivo.nombre} causando ${daño} de daño`);

        objetivo.recibirDano(daño);
    }
}
