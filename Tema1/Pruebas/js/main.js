// No es necesario meterlo en una funcion para que se ejecute
/*function main (){
    document.getElementById("h11").style.backgroundColor = "red";
    document.getElementById("h11").style.color = "white";
}
main(); */

document.getElementById("h11").style.backgroundColor = "red";
document.getElementById("h11").style.color = "white";

//En JS no es necesatio definir el tipo de variable
var name2 = "Jhon"; 

console.log("Nombre es : "+name2); // console.log para sacar el mensaje por la consola del buscador

name2 = 5;
console.log("Nombre es : "+name2 + " y su tipo es: "+ typeof(name2)); // typeof para saber el tipo de variable

/*Las variables se pueden declarar de tres formas
Si no tiene let ni var es una variable super global
var es una variable global
let es una variable local
*/

var a = 2345;
let b = "Hello";
c = true;

let Objt = {
    nombre: "Pepe",
    edad: 34,
    activo: true
}

console.dir(Objt);


//Tipo de datos "los nuevos que no son iguales a java"
//No existe el tipo float 
BigInt // numeros muy grandes
//function es un tipo para js

console.log(typeof(hola))

function hola (){
    console.log("Hola");
}
// Tipos de datos especiales
undefined // variable declarada pero no inicializada
null // variable que no tiene ningun valor
Infinity // representa el infinito matematico


//Conversion de tipos de datos

let nombre = "Pepe";
let apellidos = "Garcia Gutierrez";
let edad = 34;
//edad = edad.toString(); 
// se puede utilixar la funcion to>String() como en java pero en js nos lo podemos ahorrar
let login = nombre + edad; // lo pondriamos así y funcionaria lo convierte automaticamente

console.log("Login: "+login);


let nota = "5.67";
console.log("Nota: " +parseFloat(nota));

//Literales 

//Los array en js pueden contener diferentes tipos de datos 
let myArray = [1,true,34.56,"Pepe",{nombre:"Ana",edad:23},undefined];
console.log(myArray);

//literalos logicos 
"&&" // AND
"||" // OR
"!" // NOT

//Se pueden representar binarios , octales y hexadecimales

//objetos
let miCoche = {
    marca: "Toyota",
    modelo: "Corolla",
    anyo: 2020,
    color: "Rojo",
    motor: {
        cilindrada: 2000,
        tipo: "Hibrido"
    },
    extras: ["Aire Acondicionado","Navegador","Bluetooth"]
}
console.log(miCoche);

let persona = {
    nombre: "Ana",
    apellidos: "Garcia",
    edad: 30,
    email: "ana@gmail.com"
}

console.log("Email: "+persona.email);
hello("Hello Universe!");
//Switch son iguales a los de java 
/*var a = "Pepe";

switch(typeof(a)){
    case "number":
        a = a +5;
        break;
    case "string":
        a = "Buenos dias " +a; 
        break;
    case "boolean": 
        a = !a;
        break;
    default:
        a = null;
        break;
}

console.log("El valor de a es: "+a);*/
/************ FUNCTIONS ************/
/**
 * 
 * @param hello{string} s - cadea de saludos para dar la bienvenida
 * @param {aber} n - edad del usuario 
 * @return Valor total
 */

function hello(s){
    bye(s);
}

function bye(s){
    document.getElementById("h11").innerHTML = s;
}

