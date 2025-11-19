let info = document.getElementById("info");
const f1 = document.getElementById("f1");

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






