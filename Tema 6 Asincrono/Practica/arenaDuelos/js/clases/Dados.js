export class Dados {
    static generarNumeroAleatorio(min, max) {
        const numero = Math.floor(Math.random() * (max - min + 1)) + min;

        const umbral = Math.floor((min + max) / 2) + 1;

        if (numero === umbral) {
            return numero;
        }

        return 0; 
    }
}
