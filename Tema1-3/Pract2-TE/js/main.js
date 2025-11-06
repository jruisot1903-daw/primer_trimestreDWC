const datosUsuarios = [
  "Nombre:  Ana García, Email: ana.garcia@example.com, FechaNac: 1995-10-25",
  "Nombre: luis pérez, Email: luisperez@dominio.net, FechaNac: 2005-01-05",
  "Nombre:  MARTA FERNÁNDEZ, Email: marta.fdez-INVALID, FechaNac: 1980-03-15", // Inválido
  "Nombre: pepe lopez, Email: pepe.lopez@example.es, FechaNac: 1978/11/02", // Formato de fecha diferente
];

const regexEmail = /^\S+@\S+\.\S+$/;
let wAux = undefined;

document.getElementById("bDoc").onclick = function () {
  wAux = window.open("https://developer.mozilla.org", "_blank");
};

document.getElementById("bDatosusuarios").onclick = function () {
  for (let i = 0; i < datosUsuarios.length; i++) {
    const fila = datosUsuarios[i].split(",");

    const nombre = fila[0].split("Nombre:")[1].trim();
    const email = fila[1].split("Email:")[1].trim();
    const fechaRaw = fila[2].split("FechaNac:")[1].trim();
    const fecha = new Date(fechaRaw.replace(/\//g, "-")); 

    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }

    const valido = regexEmail.test(email) ? "Sí" : "No";

    document.getElementById(`indice${i}`).innerText = i;
    document.getElementById(`nombre${i}`).innerText = nombre;
    document.getElementById(`email${i}`).innerText = email;
    document.getElementById(`edad${i}`).innerText = edad + " años";
    document.getElementById(`valido${i}`).innerText = valido;
  }
};
