// No es necesario meterlo en una funcion para que se ejecute
/*function main (){
    document.getElementById("h11").style.backgroundColor = "red";
    document.getElementById("h11").style.color = "white";
}
main(); */

document.getElementById("h11").style.backgroundColor = "red";
document.getElementById("h11").style.color = "white";
/*
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

/*var a = 2345;
let b = "Hello";
c = true;

let Objt = {
    nombre: "Pepe",
    edad: 34,
    activo: true
}

console.dir(Objt);
*/

//Tipo de datos "los nuevos que no son iguales a java"
//No existe el tipo float 
BigInt // numeros muy grandes
//function es un tipo para js
/*
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

document.getElementById("pre1").innerHTML = "Hola, \n¿Cómo estas?"
document.getElementById("ta1").innerHTML = "Hola, \n¿Cómo estas?"
document.getElementById("h11").innerHTML = "Él dijo: \"no voy a ir\""; 

// Operadores
// Comparacion el unico diferente de java
// === igual que y mismo tipo (compara valor y tipo)


let a = 5;
let b = 10;


if(a === b){
    h11.innerHTML = ("Son iguales");
}else{
    h11.innerHTML = ("No son iguales");
}

// esto nos sirve para que las variables no tengan un tipo null o undefined
let x ;
h11.innerHTML = ("El valor de x es: "+x);

x ??= b ;

h11.innerHTML += ("<br> Nuevo valor de x es: "+x);*/

//h11.innerHTML = this;

//b1.onclick = Suma10;
//h11.innerHTML =  "Resuladado: ";
//function Suma10(){
  //  h11.innerHTML =  "Resuladado: ";

    //switch(it1.value){
      //  case "":
        //    alert("Tiene que poner un valor numerico")
          //  break;
       // case "10":
         //   h11.innerHTML = "El valor es 10";
           // break;
       // case "20":
         //   h11.innerHTML = "El valor es 20";
           // break;
        //case "30":
          //  h11.innerHTML = "El valor es 30";
           // break;
        //default:
          //  h11.innerHTML += parseFloat(it1.value) +10;
       // }        
//}
/**********************************/
/*for(let i=0; i<10; i++){
    h11.innerHTML += "<br> Valor de i: "+(i+1);
} */

// 1º Tipo de for 

let myArray = [1,2,3,4,5,6,7,8,9,10];
let myObject = {nombre:"Ana",edad:23,email:"anita@gmail"};

/*for(let i=0; i<myArray.length; i++){
    h11.innerHTML +=  myArray[i]+",";
}*/

// 2º Tipo de for each

/*for(let i in myObject){ // in nos devuelve el indice del array
    h11.innerHTML +=  myObject[i]+",";
}*/

// 3º Tipo de for  of

/*for(elem of myArray){ // of nos devuelve el valor del array nos da fallo si lo hacemos con objetos
    h11.innerHTML +=  elem+",";
}*/

/**********************************/

//bucle while es igual que en java 

/**********************************/
/* Ejemplo de Break y continue 
for(let i = 0; i< myArray.length; i++){
    if((myArray[i] %2 ) == 0){
        continue; 
// si lo encuenta lo sigue ejecutando en el caso de ponerle break se saldria y terminaria
    }else{
        h11.innerHTML += myArray[i] + ", ";
    }
}*/


/**********************************/
//FUNCIONES
/**********************************/


    

//b1.onclick = multiplicaBoton;
//multiplica2(2,3,4,6,2);
/*multiplica3(2,3,4,3,5,6);

function multiplicaBoton(){

    h11.innerHTML = "Pruebas con Funciones";

    let result = 0;

    if((it1.value) == ""){
       result = multiplica(parseFloat(it2.value));

    }else if((it2.value) == ""){
        result = multiplica(parseFloat(it1.value));
    }else 
       result = multiplica(parseFloat(it1.value),parseFloat(it2.value));

    document.getElementById("resultadoMultiplica").value = result;
}

//Ejemplo de Funcion por si falta algun parametro 

function multiplica(op1,op2){
    let result = 0;
    if((!op1) && (!op2)){
        alert("Debe de introducir al menos un valor!");
    }else{
         let op1_den = op1 || 1;
         let op2_den = op2 || 1;
        result =  op1_den * op2_den;
    }
        return result;
}

// Varios parametros

function multiplica2() {
    let result = 1;

    console.log(arguments);

    for(i of arguments)
        result *= i;

    //Es muy comun hacer esto 

    switch(arguments.length){

    }

    h11.innerHTML = result;
}

/**********************************/

//Parametro rest  por si en una funcion quiere parametros obligatorios y el resto son opcionales 
/*function multiplica3(op1,op2,...restoOperadores){
    let result = op1 * op2; 

    console.log(restoOperadores);

    for(op of restoOperadores){
        result *= op;
    }
    h11.innerHTML = result;
}

//Operador Spread es lo contrario que rest


/*calculaMedia(...miArray);

function calculaMedia(){
    let result = 0 ; 
    if((typeof arguments[0] == "boolean") && (arguments[0])) {
        for(let i = 1; i< arguments.length; i++)
            if(typeof arguments[i] == "number")
                result += arguments[i];

        result /= arguments.length -1;

        h11.innerHTML = "Nota media: " + result

    }else 
        h11.innerHTML = "Suspenso";
}*/

// Generadores nos sirve para hacer contadores especiales podemos hacer que avancen de manera diferente a ++ o -- 
/*h11.innerHTML = "Resultado: ";
let data = counter.next();
let counter = contador();
let miArray = [true,5,7,9,false,45,"Pepe",true,"Maria",false,false,88];
*/

/*while(!data.done){
    h11.innerHTML += data.value + " - ";
    data = counter.next();
}


function* contador(){
    let i = 0;
    while (i < miArray.length){
        if(typeof miArray[i] == "boolean"){
            yield miArray[i]; //yield se utiliza para que literalmente devuelva eso tal cual 
        }
        i++
    }
}
*/

//funciones anonimas  se suele utilizar para los eventos para que vaya todo junto y se sepa que hace al hacer el evento
/* funciones arrow (flechas) 
    se suele utilizar para ahorrar codigo  se remplaza la palabra fuction por () =>
*/
let b2 = document.getElementById("b2");
let h11 = document.getElementById("h11");
let it1 = document.getElementById("it1");
let b1 = document.getElementById("b1");
let it2 = document.getElementById("it2");


b2.onclick = () =>{
    alert("Empezando..."+ this);
    console.log("Arguments en => es: "+ arguments);
}

b1.onclick = function(){
    document.getElementById("resultadoMultiplica").value =  parseFloat(it1.value) * parseFloat(it2.value) + this;
    console.log("Arguments en multiplicar  es: "+ arguments);
};

for (i in myArray){
    h11.innerHTML += " "+ myArray[i];
}





//function muestraValores(){
  //  for(i in arguments)
    //    console.log(arguments[i]);
//}

// muestraValores(1,2,3,4,5);

/**********************************/
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
/*
function hello(s){
    bye(s);
}

function bye(s){
    document.getElementById("h11").innerHTML = s;
}*/

/**********************************/



