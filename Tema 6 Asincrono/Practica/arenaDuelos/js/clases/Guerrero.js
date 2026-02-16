import { Personaje } from "./Personaje.js";
import { log } from "../main.js";

export class Guerrero extends Personaje {
    armadura = 3;

    constructor(nombre, fuerza) {
        super(nombre, fuerza);
    }

    recibirDano(cantidad) {
        const dañoReducido = Math.max(0, cantidad - this.armadura);

        log(`${this.nombre} bloquea ${this.armadura} de daño con su armadura`);

        super.recibirDano(dañoReducido);
    }
}
