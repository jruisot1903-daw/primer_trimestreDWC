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

document.body.onresize = function (){
    info.innerHTML = window.innerWidth+" x "+ window.innerHeight;

}

document.getElementById("main1").ondblclick = changeColor;
//document.getElementById("main1")addEvenListener("dblclick", changeColor);

/*document.getElementById("b1").addEventListener("click", function(){
    document.getElementById("main1").removeEventListener("dblclick",changeColor);
});*/


document.getElementById("main1").onmouseover = changeColor;
document.getElementById("main1").onmouseout = changeColor;

document.getElementById("aside1").ondblclick = changeColor;
document.getElementById("aside1").onmouseover = changeColor;
document.getElementById("aside1").onmouseout = changeColor;


let pMain = document.getElementById("pMain");
let pAside = document.getElementById("pAside");

function changeColor(ev) {
    if (this.id == "main1") 
        switch(ev.type) {
            case "dblclick":
                this.style.backgroundColor="#F2BDB3";
                pMain.innerText = "Doble click";
            break;
            case "mouseover":
                this.style.backgroundColor="#914E41";
                pMain.innerText = "Ratón dentro";
            break;
            case "mouseout":
                this.style.backgroundColor="#C92202";
                pMain.innerText = "Sale ratón";
            break;
        }
    else // aside
        switch(ev.type) {
            case "dblclick":
                this.style.backgroundColor="#B9DCEB";
                pAside.innerText = "Doble click";
            break;
            case "mouseover":
                this.style.backgroundColor="#3E7A94";
                pAside.innerText = "Ratón dentro";
            break;
            case "mouseout":
                this.style.backgroundColor="#044561";
                pAside.innerText = "Sale ratón";
            break;
        }
}

// Prevenir la carga inicial del evento

document.getElementById("ejemplo").addEventListener("click", function(event){
    event.preventDefault();
});


document.getElementById("bSend").addEventListener("click", function(ev){
    ev.preventDefault();
});






