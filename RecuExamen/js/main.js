// Array con las comidas del menú principal:
var comidas = new Array();

var entrantes = [
    {entrante: "Turrón salada de queso y frutos secos"},
    {entrante: "Piruletas crujientes de parmesano"},
    {entrante: "Hummus con remolacha"},
    {entrante: "Mejillones a la cerveza con bacon"},
    {entrante: "Croquetas de atún"},
    {entrante: "Quesadilla de chorizo criollo con aguacate"},
    {entrante: "Ensalada de endivias, surimi y salsa roquefort"},
    {entrante: "Guacamole"},
    {entrante: "Pan casero con aceite de oliva y sal negra en escamas"},
    {entrante: "Verduras rellenas de arroz"}
];

comidas.push(entrantes);

var comidaCasera = [
    {casera: "Sopa de pollo"},
    {casera: "Sopa de verdura"},
    {casera: "Crema de calabaza"},
    {casera: "Arroz con pollo"},
    {casera: "Paella de mariscos"},
    {casera: "Arroz caldoso de pescado"},
    {casera: "Pollo al horno"},
    {casera: "Conejo al ajillo"},
    {casera: "Potaje de lentejas o abichuelas"},
    {casera: "Pescado al horno"}
];

comidas.push(comidaCasera);

var comidaOriental = [
    {oriental: "Ramen"},
    {oriental: "Rollitos de primavera vegetales"},
    {oriental: "Atún con arroz"},
    {oriental: "Wok de verduras y fideos chinos"},
    {oriental: "Arroz al estilo oriental"},
    {oriental: "Nishime de verduras"},
    {oriental: "Solomillo de cerdo agridulce"},
    {oriental: "Noodles de arroz con gambas"},
    {oriental: "Rollitos de alga nori con con verduras en tempura"}
];

comidas.push(comidaOriental);

var mediterranea = [
    {medi: "Judías verdes estofadas"},
    {medi: "Gazpacho"},
    {medi: "Magro de cerdo con champiñón"},
    {medi: "Salteado de garbanzos con cebolla, guisantes y tomate"},
    {medi: "Lasaña de espinacas"},
    {medi: "Berenjena al horno"},
    {medi: "Dorada a la plancha"},
    {medi: "Pizza mediterránea"},
    {medi: "Tortilla de pimiento y cebolla"}
];

comidas.push(mediterranea);

//--------------------------------- index.js ----------------------------------------------

// Abrimos la ventana auxiliar
let btRegistro = document.getElementById("registro");
let wAux = undefined;
let anchoPant = window.innerWidth;
anchoPant = anchoPant / 2;
btRegistro.addEventListener("click", function () {
    
   wAux = window.open("registro.html", "ventanaRegistro",
      "width=400,height=400,left='${anchoPant}' ,top=100,resizable=yes,scrollbars=yes");
       wAux.moveTo(anchoPant,100);
       
        wAux.focus();
});

//enlaces del menu
// me imagino que habra mil formas de hacerlo y de la forma que pides no creo que sea esta , pero 
// no se me ha ocurrido otra forma de resolver el problema 


let enlaces = document.querySelectorAll("a");
let h4 = document.getElementById("tipoComida");
let h3 = document.getElementById("comidaSeleccionada");



enlaces[0].addEventListener("click",function(){
    rellenaComida("Entrantes",entrantes)  
})

enlaces[1].addEventListener("click",function(){
    rellenaComida("Casera", comidaCasera)
})

enlaces[2].addEventListener("click",function(){
    rellenaComida("Oriental",comidaOriental);
})

enlaces[3].addEventListener("click",function(){
    rellenaComida("Mediterránea",mediterranea);
})


function rellenaComida(nombre , array){
    h3.style.display="block";
    h3.innerHTML = "";
    h4.innerHTML = "";
    h4.innerHTML = "Comida "+nombre;
   for (let index = 0; index < array.length; index++) {
    comida = array[index]   
     if(nombre == "Entrantes") h3.innerHTML += comida.entrante +"<br>" ;
     if(nombre == "Casera") h3.innerHTML += comida.casera +"<br>" ;
     if(nombre == "Oriental") h3.innerHTML += comida.oriental +"<br>" ;
     if(nombre == "Mediterránea") h3.innerHTML += comida.medi +"<br>" ;
   }
}


// La imagen rebote , pero no lo hace de forma infinita solo una vuelta 
let pelota = document.querySelector("img"); 
let pelotaLeft = 0; 
let pelotaCSS = window.getComputedStyle(pelota);
const incremento = 25;
const speed = 20;
let left = 0;

let wHeight = window.innerHeight;
wHeight = wHeight / 12;
let pelotaHeight = pelotaCSS.getPropertyValue("height");
pelotaHeight = quitarPX(pelotaHeight);

let positionHeight = wHeight - pelotaHeight / 2;

pelota.style.top = positionHeight + "px";

rebota();

// funcion para quitar el px de las propiedades css para utilizarlas
function quitarPX(cad) {
  cad = parseFloat(cad.slice(0, cad.length - 2));
  return cad;
}

//Funcion que aumenta el left de la pelota hasta el final de la ventana
function LeftPlus() {
    left++;

  pelota.style.left = (left + incremento) + "px";
}

function LeftMenos() {
    left--;

  pelota.style.left = (left - incremento) + "px";
}

function rebota() {
  let wWidth = window.innerWidth;
    let direction = 1; // 1 va hacia la derecha , -1 hacia la izquierda
  let widthPelota = pelotaCSS.getPropertyValue("width");
  widthPelota = quitarPX(widthPelota);

   setInterval(function () {
    if (direction == 1){
        if(left < (wWidth - widthPelota)){
            LeftPlus();
        }else 
            direction = -1;
    } else{
        if(left > 0){
            LeftMenos();
        }
    }

});
}




//Funcion para crear los nodos de forma "automatica" y no perder tanto tiempo
function createNode(tipoNodo, tipoTexto) {
  let nodo;
  let nodoText;

  switch (arguments.length) {
    case 0:
      throw "Se necesita al menos el tipo de elemento a crear.";
      break;
    case 1:
      nodo = document.createElement(tipoNodo);
      break;
    case 2:
      nodo = document.createElement(tipoNodo);
      nodoText = document.createTextNode(tipoTexto);
      nodo.appendChild(nodoText);
      break;
  }

  return nodo;
}