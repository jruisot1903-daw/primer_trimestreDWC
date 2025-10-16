let btnPedido = document.getElementById("procesarPedido");
let salida = document.getElementById("resultado");

btnPedido.onclick = function() {
    // Obtener valores actualizados
    let tipoCafe = document.getElementById("tipoCafe").value;
    let cant = parseInt(document.getElementById("cantidad").value);
    let llevar = document.getElementById("paraLlevar").checked;

    salida.innerHTML = "";
    let valor = 0;
    let total = 0;

    // Precio base según tipo de café
    switch (tipoCafe) {
        case "solo":
            valor = 1.5;
            break;
        case "leche":
            valor = 2;
            break;
        case "capuchino":
            valor = 2.5;
            break;
    }

    // Calcular precio base total
    total = cant * valor;

    // Descuento del 10% si pide 5 o más cafés
    if (cant >= 5) {
        total *= 0.9;
    }

    // Suplemento de 0.20€ por café si es para llevar
    if (llevar) {
        total += cant * 0.2;
    }

    // Mostrar resultado
    salida.innerHTML = `Has seleccionado ${cant} vaso(s) de café ${tipoCafe}.<br>`;
    salida.innerHTML += llevar
        ? " Pedido para llevar (+0.20€ por café).<br>"
        : " Pedido para consumir aquí.<br>";

    salida.innerHTML += `Total: ${total.toFixed(2)} €`;
};

