const cantidad = 100;

console.log("Iniciando Web Worker");

sqrt(cantidad);

/*******************************************/
function sqrt(cantidad){
    let myArray = new Array();

    for (let i = 0; i < cantidad; i++){
        myArray.push(i*i);
    }
    //return myArray; asi lo hariamos de normal
    postMessage(myArray); //asi lo hacemos en un web worker para pasarle los datos
}
