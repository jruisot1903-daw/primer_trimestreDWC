/*let info = document.getElementById("info");

let obj1 = {
    nombre: "Juan",
    edad: 30,
    email: "juan@gmail.com"
}

Object.defineProperty(obj1, "color", { enumerable: true, value: "red" });

let obj2 = {
    nombre: "Ana",
    edad: 25,
    email: "ana@gmail.com"
}

Object.defineProperties(obj2, {
    "color": { writable: false, enumerable: false, value: "blue" },
    "notas": { writeable: true, enumerable: true, value: [7, 8, 9] }
});

obj2.color = "pink";

obj2.tlf = "666777888";
delete obj2.tlf; // para eliminar cualquier propiedad de un objeto
info.innerHTML += "Datos de Juan: " + obj1.nombre + ", " + obj1.edad + ", " + obj1.email + ", " + obj1.color + "<br>";
info.innerHTML += "obj1.nombre es enumerable? " + obj1.propertyIsEnumerable("nombre") + "<br><hr>";

info.innerHTML += "Datos de Ana: " + obj2.nombre + ", " + obj2.edad + ", " + obj2.email + ", " + obj2.tlf + obj2.color + "<br>";
info.innerHTML += "obj2.nombre es enumerable? " + obj2.propertyIsEnumerable("nombre") + "<br>";


for (prop in obj1) {
    console.log(obj1[prop]);
}

for (prop in obj2) {
    console.log(obj2[prop]);
}
// getOwnPropertyNames nos devuelve todas las propiedades de un objeto, tanto enumerables como no enumerables
// Object.preventExtensions() impide que se puedan añadir nuevas propiedades a un objeto
for (prop of Object.keys(obj2)) {
    console.log("Propiedad " + prop + " valor " + obj2[prop]);
}

Object.freeze(obj2); // congela el objeto, no se pueden añadir, eliminar o modificar propiedades


let obj3 = new Object();

for (prop of Object.getOwnPropertyNames(obj2)) {
    obj3[prop] = obj2[prop]; // copia por valor
}
obj3.color = "brown";
obj3.nombre = "Alberto";
obj3.correo = "alberto@gmail.com";
console.log(obj3);
*/


let info = document.getElementById("info");

/*info.innerHTML += Math.PI + "<br>";
info.innerHTML += Math.floor(3.9) + "<br>";
info.innerHTML += Math.ceil(3.9) + "<br>";
info.innerHTML += Math.pow(2,10) + "<br>";
info.innerHTML += numeroAleatorio(1,10)+ "<br>";

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}*/

//let myString = "loren ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

//info.innerHTML += myString + "<br>";
//info.innerHTML += myString.charAt(0) + "<br>";
//info.innerHTML += String.fromCharCode("0x0bd0");

//Metodos

/*let myArray = new Array(1,true,"Pepe",45.678,"María",false);
let existBoolean = false;
 existBoolean = myArray.some(function(elem){
    return typeof elem === "boolean";
});

if(existBoolean) alert("Existen booleanos en el array");*/
//myArray.forEach(function(elem,indice, arrayActual){
//    console.log("myArray es: " + arrayActual);

//    info.innerHTML += "<br> Elemento actual es: "+ elem + ", situado en la posicion: "+indice;
//});


// Metodos Date
// Date.parse(dateNow); para pasar la fecha a segundos



//info.innerHTML += "La hora en tu cidudad es: "+ dateNow.toUTCString() +" añadiendo un offset de "+ dateNow.getTimezoneOffset();

//si son mas de las 8 de la tarde que ponga colores oscuros en la web

let mainHTML = document.getElementById("main");
let navHTML = document.getElementById("nav");
let asideHTML = document.getElementById("aside");
let footerHTML = document.getElementById("footer");
let calcula = document.getElementById("calcula");
let dateNow = new Date();




if (dateNow.getHours() >= 12 && dateNow.getMonth() >= 2 && dateNow.getMonth() <= 10 ){
    mainHTML.style.backgroundColor = "rgb(138, 126, 126)";
    navHTML.style.backgroundColor = "rgb(39, 38, 38)";
    asideHTML.style.backgroundColor = "rgb(66, 59, 59)";
    footerHTML.style.backgroundColor = "rgb(39, 38, 38)";
    
    mainHTML.style.color = "white";
    navHTML.style.color = "white";
    asideHTML.style.color = "white";
    footerHTML.style.color = "white";
}

calcula.onclick = function(){
    let fecha = document.getElementById("fecha");
    let dateNow = new Date();
    let cumple =  new Date(fecha.value);

    let resul = dateNow - cumple;

    info.innerHTML = "Llevas vivo "+(resul/1000) + " segundos";


}

