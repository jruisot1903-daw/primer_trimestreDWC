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


let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("P1 resuelta");
    }, 1000);
}).
then(function(value){
    info.innerHTML += value + "<br>";
}).
catch(function(error){
    info.innerHTML += error + "<br>";
});


let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("P2 resuelta");
    }, 2000);
}).
then(function(value){
    info.innerHTML += value + "<br>";
}).
catch(function(error){
    info.innerHTML += error + "<br>";
});


myPromises.push(p1);
myPromises.push(p2);

Promise.race(myPromises).
then(function(value){
    info.innerHTML += "La primera promesa en resolverse: " + value + "<br>";
}).
catch(function(error){
    info.innerHTML += error + "<br>";
});
