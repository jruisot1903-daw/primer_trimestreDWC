import { Personaje } from "./Personaje.js";
import { Dados } from "./Dados.js";
import { log } from "../main.js";

export class Mago extends Personaje {
    mana = 3;
    maxMana = 5;

    constructor(nombre, fuerza) {
        super(nombre, fuerza);
        this.iniciarRecuperacionMana();
    }

    iniciarRecuperacionMana() {
        setInterval(() => {
            if (this.mana < this.maxMana) {
                this.mana++;
                log(`${this.nombre} recupera 1 de maná. Maná actual: ${this.mana}`);
            }
        }, 20000);
    }

    atacar(objetivo) {
        if (!this.estaVivo()) {
            log(`${this.nombre} no puede atacar porque está muerto`);
            return;
        }

        if (this.mana > 0) {
            this.mana--;

            const daño = Dados.generarNumeroAleatorio(1, this.fuerza + 2 * this.mana);

            log(`${this.nombre} lanza un hechizo a ${objetivo.nombre} causando ${daño} de daño (maná restante: ${this.mana})`);

            objetivo.recibirDano(daño);
        } else {
            log(`${this.nombre} no tiene maná. Realiza un ataque básico.`);
            super.atacar(objetivo);
        }
    }
}
