

//Ocultar/mostrar la contraseña
document.getElementById("bpass").onclick = function () {
    const input = document.getElementById("palabra");
    const icono = this.querySelector("#candadoimg"); 

    if (input.type === "password") {
        input.type = "text";
        icono.src = "./img/candadoAbierto.png"; 
    } else {
        input.type = "password";
        icono.src = "./img/candadoCerrado.png";
    }
}