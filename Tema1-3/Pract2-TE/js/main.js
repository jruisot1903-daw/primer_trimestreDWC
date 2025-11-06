const datosUsuarios = [
  "Nombre:  Ana García, Email: ana.garcia@example.com, FechaNac: 1995-10-25",
  "Nombre: luis pérez, Email: luisperez@dominio.net, FechaNac: 2005-01-05",
  "Nombre:  MARTA FERNÁNDEZ, Email: marta.fdez-INVALID, FechaNac: 1980-03-15", // Inválido
  "Nombre: pepe lopez, Email: pepe.lopez@example.es, FechaNac: 1978/11/02", // Formato de fecha diferente
];

const regexEmail = /^\S+@\S+\.\S+$/; // \S --> todo lo que no sea un espacio, una @ algo sin espacios, un punto y algo sin espacios
let wAux = undefined;

/********************************************************************************* */
// Cuando pulse el boton que esta asociado a bDoc nos diriga a la pagina web de mozilla
document.getElementById("bDoc").onclick = function () {
  wAux = window.open("https://developer.mozilla.org", "_blank");
};

document.getElementById("bDatosusuarios").onclick = function () {
// Me he liado pensado en como poder separar los datos del array me he comido el tiempo y 
//  por eso no te he realizado nada 
  let indice0 = document.getElementById("indice0");
  let nombre0 = document.getElementById("nombre0");
  let email0 = document.getElementById("email0");
    
  for (let index = 0; index < datosUsuarios.length; index++) {
        personas = datosUsuarios[index].split(",");
        for (let index = 0; index < personas.length; index++) {
             console.log(persona1[index]);  
            indice0.innerText = index;
        }
  }

  // esto seria para poder sacar la edad del usuario en años , pero al no sacar 
  // los datos del array separados no he podido realizarlo
  /* const hoy = new Date();
  const nacimiento = new Date(fecha.value);
   edda.innerText = hoy.getFullYear() - nacimiento.getFullYear() + " años";*/
};
