let info = document.getElementById("info");

/*const f1 = document.getElementById("f1");

document.getElementsByName("turnos")[0].checked = true;

document.getElementById("login").oninput = function () {
    console.log(this.value);
}

document.getElementById("lista").onchange = function () {
    console.log(this.value);
    info.innerText = document.getElementById("lista").options[document.getElementById("lista").selectedIndex].value;
    info.innerText += " - " + document.getElementById("lista").options[document.getElementById("lista").selectedIndex].text;
}

document.getElementById("login").onfocus = function () {
    this.style.border = "5px solid red";
}

document.getElementById("login").onblur = function () {
    this.style.border = "1px solid black";
}

document.getElementById("lista").onfocus = function () {
    this.style.border = "5px solid red";
}

document.getElementById("lista").onblur = function () {
    this.style.border = "1px solid black";
}

 for (elem of document.getElementsByName("turnos"))
    if (elem.checked) {
        info.innerText = elem.value;
    }

    // barra de progreso

let interval = setInterval(function () {
    if (progress1.value < progress1.max)
        progress1.value += 5;
    else
        clearInterval(interval);
}, 200);

meter1.value = 90;

*/



// document.body.addEventListener("keydown", press);
// document.getElementById("ta1").addEventListener("keypress", press);
 // document.getElementById("ta1").addEventListener("keyup", press);

// function press(ev) {
//     info.innerHTML = "<b>Evento:</b> "+ev.type+". <b>Código de tecla:</b> " + ev.code + ". <b>Tecla pulsada:</b> " + ev.key;
//     if (ev.altKey) info.innerHTML = "Has pulsado Alt";
//     if (ev.ctrlKey) info.innerHTML = "Has pulsado Control";
//     if (ev.shiftKey) info.innerHTML = "Has pulsado Mayúsculas";
// }

document.body.addEventListener("keydown", press);
// document.body.addEventListener("keypress", press);
// document.body.addEventListener("keyup", press);
const ball = document.getElementById("ball");

function press(ev) {
    console.log(ev.key);

    let top = parseFloat(ball.style.top.substring(0, ball.style.top.length-2));
    let left = parseFloat(ball.style.left.substring(0, ball.style.left.length-2));

    switch(ev.key) {
        case "ArrowUp":
            if (top > 0)
                ball.style.top = (top - 5) + "px";
        break;
        case "ArrowDown":
            if (top < window.innerHeight)
                ball.style.top = (top + 5) + "px";
        break;
        case "ArrowLeft":
            if (left > 0)
                ball.style.left = (left - 5) + "px";
        break;
        case "ArrowRight":
            if (left < window.innerWidth)
                ball.style.left = (left + 5) + "px";
        break;
    }
}