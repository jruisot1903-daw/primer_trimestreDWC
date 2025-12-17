
let mensaje = document.getElementById("mensaje");
let info = document.getElementById("info");

 let myPromise = new Promise(function(resolve, reject){
       
    document.getElementById("envia").addEventListener("click", function(){
        let num = mensaje.value;

        if(num <= 100 ){
            resolve(num);
        }else{
            reject(num);
        }
    })
     
}).
then(function(num){
    info.innerHTML = "El numero es correcto: "+ num;
    info.style.color = "green";
}).
catch(function(err){
    info.innerHTML = "Error. Es mayor de 100: "+ err;
    info.style.color = "red";
})
   