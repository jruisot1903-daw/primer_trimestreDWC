let tipoCafe = document.getElementById("tipoCafe").value;
let cant = document.getElementById("cantidad").value;
let llevar = document.getElementById("paraLLevar");
let btnPedido = document.getElementById("procesarPedido");
let salida = document.getElementById("resultado");


btnPedido.onclick = function(){
    salida.innerHTML = "";
    let valor = 0;
    let result = 0 ;

    switch(tipoCafe){
        case "solo" :
            valor = 1.5;
            break;
        case "leche":
                valor = 2;
            break;

        case "capuchino":
                valor = 2.5;
            break;
    }

    if(cant>= 5){
        result = (cant * valor)*0.10;
    }else 
        result = cant * valor;


    salida.innerHTML += "Has selecionado "+ cant + "  vaso(s) de cafe(s) "+ tipoCafe;
    salida.innerHTML += "<br> Total: " + result+" €"

}