console.log("Ventana Padre")
//cerramos la ventana 
document.getElementById("cerrar").onclick = () =>{
    
    this.close();
}

let login = document.getElementById("loginText");
let pass = document.getElementById("pass");



document.getElementById("enviar").onclick = function(){
    window.opener.document.getElementById("texto").value = "Login: "+login.value +" Password: "+ pass.value;

}

