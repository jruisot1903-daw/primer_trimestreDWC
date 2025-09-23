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

name2 = true;
console.log("Nombre es : "+name2+ " y su tipo es: "+ typeof(name2));

name2 = [1,2,3,4,5];    
console.log("Nombre es : "+name2+ " y su tipo es: "+ typeof(name2));

name2 = null;
console.log("Nombre es : "+name2+ " y su tipo es: "+ typeof(name2));

name2 = 10/0;
console.log("Nombre es : "+name2+ " y su tipo es: "+ typeof(name2));

name2 = -10/0;
console.log("Nombre es : "+name2+ " y su tipo es: "+ typeof(name2));

hello("Hello Universe!");
/************ FUNCTIONS ************/
/**
 * 
 * @param hello{string} s - cadea de saludos para dar la bienvenida
 * @param {number} n - edad del usuario 
 * @return Valor total
 */

function hello(s){
    bye(s);
}

function bye(s){
    document.getElementById("h11").innerHTML = s;
}