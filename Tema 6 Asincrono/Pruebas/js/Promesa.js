let info = document.getElementById("info");

//creaccion y sintaxis de la promesa
console.log("Iniciando ...");

let myPromise3 = new Promise(function(resolve, reject){
    
    //ejecuto el código asíncrono...
    setTimeout(function(){
         console.log("Ejecutando promesa ...");
         resolve();
    },2000);
   

})
.then(function (){ 
    //se ejecuta cuando la promesa ha acabado sin errores...
    console.log("Promesa ejecutada correctamente");
})
.catch(function (){
    console.log("La promesa ha fallado");
});

console.log("Sigo ejecutando codigo fuera de la promesa ...")




