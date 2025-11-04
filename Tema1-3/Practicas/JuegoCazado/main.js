
//Para cambiar el type del input para hacer que si le damos a la imagen del candado veamos la palabra o no

document.getElementById('bpass').addEventListener('click', function () {
    const pass = document.getElementById('palabra'); 
    const candImg = document.getElementById("candadoimg");

    if (pass.type === 'password') {
        pass.type = 'text';
        candImg.src = './img/candadoCerrado.png';
    } else {
        pass.type = 'password';
        candImg.src = './img/candadoAbierto.png';
    }
});


