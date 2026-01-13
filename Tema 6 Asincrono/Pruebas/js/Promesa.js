let info = document.getElementById("info");

 //creaccion y sintaxis de la promesa
// console.log("Iniciando ...");

// let myPromise = new Promise(function(resolve, reject){
    
     //ejecuto el código asíncrono...
//     setTimeout(function(){
//          console.log("Ejecutando promesa ...");
//          resolve();
//     },2000);
   

// })
// .then(function (){ 
     //se ejecuta cuando la promesa ha acabado sin errores...
//     console.log("Promesa ejecutada correctamente");
// })
// .catch(function (){
//     console.log("La promesa ha fallado");
// });

// console.log("Sigo ejecutando codigo fuera de la promesa ...")


let myPromises = new Array();

// myPromises.push(Promise.resolve(true));
// myPromises.push(Promise.resolve(5));
// myPromises.push(Promise.resolve("Pepe"));
// myPromises.push(Promise.resolve(45));
// myPromises.push(Promise.reject(-1));
// myPromises.push(Promise.reject(false));


// Promise.any(myPromises).
// then(function(okValue){
//     info.innerHTML += okValue;
// }). 
// catch(function(error){
//     info.innerHTML += error;
// });


// let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("P1 resuelta");
//     }, 1000);
// }).
// then(function(value){
//     info.innerHTML += value + "<br>";
// }).
// catch(function(error){
//     info.innerHTML += error + "<br>";
// });


// let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("P2 resuelta");
//     }, 2000);
// }).
// then(function(value){
//     info.innerHTML += value + "<br>";
// }).
// catch(function(error){
//     info.innerHTML += error + "<br>";
// });


// myPromises.push(p1);
// myPromises.push(p2);

// Promise.race(myPromises).
// then(function(value){
//     info.innerHTML += "La primera promesa en resolverse: " + value + "<br>";
// }).
// catch(function(error){
//     info.innerHTML += error + "<br>";
// });


/******************************************/
// async y await
/******************************************/

// let result = helloWorld();

// console.log(result);

// result.then(function(val){
//     info.innerHTML = "Valor obtenido: "+ val;
// }.catch(function(err){
//     info.innerHTML = "Error:" + err;
// }));


/******************************************/
// async function helloWorld() {
//     return "Hello World";
// }


// Prueba incluyendo await

// function resolverDespuesDe2Segundos() {
// return new Promise(resolve => {
// setTimeout(() => {
// resolve("resuelta!");
// }, 2000);
// });
// }
// async function asyncCall() {
// console.log("Llamando…");
// var result = await resolverDespuesDe2Segundos();
// console.log(result); // Salida esperada: “resuelta!”
// }
// asyncCall();
// console.log ("El código sigue ejecutándose...");

let textToFind = "daw";

document.getElementById("send").addEventListener("click", function () {
        info.innerHTML += "Empezando la búsqueda...<br>";
        let result = findText();

        result.then(function(value){
            info.innerHTML += "Encontrado "+ value + " en el texto <br>"; 
        }).catch(function(err){
            info.innerHTML += "No se ha Encontrado en el texto <br>";
        });

})

async function findText() {
    let found = await findInText();
    info.innerHTML += "La búsqueda ha terminado ...<br>";
    return found;
}

function findInText() {
    info.innerHTML += "Buscando " + textToFind + " en el texto....<br>";
    let texto = document.getElementById("texto").value;

    if (texto === "") return new Error("Texto vacío");

    return texto.match(textToFind);
}


/*******************************************/
//Prueba web worked.js Cogemos los datos del worker
/*******************************************/
if(typeof Worker){
    let myWorker = new Worker("js/webWorker/WebWorked.js");
    
    //recibimos los datos desde el worker.js

    myWorker.addEventListener("message", function(ev){
        info.innerHTML = ev.data;
        myWorker.terminate(); // terminamos el flujo del worked
        myWorker = undefined;
    });
}else{
    console.error("No worker!");
}

/*******************************************/
//Prueba web worked.js Desde el principal le pasamos los datos al worker
// seria lo mismo pero el postMessage lo escribimos aqui y en el worker this.onmessage y lo tenemos 
/*******************************************/

/*******************************************/
//Modulos
/*******************************************/
import { seyHello, actualYear } from "./modulos/lib.js";

console.log(seyHello());
console.log(actualYear);