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

// document.body.addEventListener("keydown", press);
// document.body.addEventListener("keypress", press);
 // document.body.addEventListener("keyup", press);
// const ball = document.getElementById("ball");

// function press(ev) {
//     console.log(ev.key);

//     let top = parseFloat(ball.style.top.substring(0, ball.style.top.length-2));
//     let left = parseFloat(ball.style.left.substring(0, ball.style.left.length-2));

//     switch(ev.key) {
//         case "ArrowUp":
//             if (top > 0)
//                 ball.style.top = (top - 5) + "px";
//         break;
//         case "ArrowDown":
//             if (top < window.innerHeight)
//                 ball.style.top = (top + 5) + "px";
//         break;
//         case "ArrowLeft":
//             if (left > 0)
//                 ball.style.left = (left - 5) + "px";
//         break;
//         case "ArrowRight":
//             if (left < window.innerWidth)
//                 ball.style.left = (left + 5) + "px";
//         break;
//     }
// }

// //Coordenadas del raton

// document.body.addEventListener("mousemove", getCoord);


// function getCoord(event) {
//     info.innerHTML = "Coordenada X: <span style='color:lightblue'>" + event.pageX + "</span> - Coodenada Y: <span style='color:lightblue'>" + event.pageY + "</span>";
// }

 

//juego que tenga 4 div que ocupe toda la pantalla cada uno de un color y cuando el raton pase por 
// encima que colore y cuando salga que se quede en blanco

const Divs = [{elem:"div", id:"div1", style:"display:inline-block;width:50%;height:50%;"},
    {elem:"div", id:"div2", style:"display:inline-block;width:50%;height:50%;"},
    {elem:"div", id:"div3", style:"display:inline-block;width:50%;height:50%;"},
    {elem:"div", id:"div4", style:"display:inline-block;width:50%;height:50%;"}
];


for (div of Divs) {
    let d = document.createElement(div.elem);
    d.style = div.style;
    d.id = div.id;
    document.body.appendChild(d);
    d.addEventListener("mousemove", show);
}

function show(event) {

    const x = event.pageX;
    const y = event.pageY;
    const widthPage = window.innerWidth;
    const heightPage = window.innerHeight;

    // Div superior - izquierdo: amarillo
    if ((x < (widthPage /2)) && (y < (heightPage/2))) {
        document.getElementById("div1").style.backgroundColor = "yellow";

        // Apago...
        document.getElementById("div2").style.backgroundColor = "";
        document.getElementById("div3").style.backgroundColor = "";
        document.getElementById("div4").style.backgroundColor = "";
    }
    // Div superior - derecho: rojo
    else if ((x >= (widthPage /2)) && (y < (heightPage/2))) {
        document.getElementById("div2").style.backgroundColor = "red";

        // Apago...
        document.getElementById("div1").style.backgroundColor = "";
        document.getElementById("div3").style.backgroundColor = "";
        document.getElementById("div4").style.backgroundColor = "";
    }
    // Div inferior - izquierdo: azul
    else if ((x < (widthPage /2)) && (y >= (heightPage/2))) {
        document.getElementById("div3").style.backgroundColor = "blue";

        // Apago...
        document.getElementById("div1").style.backgroundColor = "";
        document.getElementById("div2").style.backgroundColor = "";
        document.getElementById("div4").style.backgroundColor = "";
    }
    // Div inferior - derecho: verde
    else if ((x > (widthPage /2)) && (y >= (heightPage/2))) {
        document.getElementById("div4").style.backgroundColor = "green";

        // Apago...
        document.getElementById("div1").style.backgroundColor = "";
        document.getElementById("div2").style.backgroundColor = "";
        document.getElementById("div3").style.backgroundColor = "";
    }
}





