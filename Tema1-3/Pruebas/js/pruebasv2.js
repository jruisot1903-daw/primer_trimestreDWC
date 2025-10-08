let info = document.getElementById("info");

let obj1 = {
    nombre: "Juan",
    edad: 30,
    email: "juan@gmail.com"
}

Object.defineProperty(obj1, "color", { enumerable: true, value: "red" });

let obj2 = {
    nombre: "Ana",
    edad: 25,
    email: "ana@gmail.com"
}

Object.defineProperties(obj2, {
    "color": { writable: false, enumerable: false, value: "blue" },
    "notas": { writeable: true, enumerable: true, value: [7, 8, 9] }
});

obj2.color = "pink";

obj2.tlf = "666777888";
delete obj2.tlf; // para eliminar cualquier propiedad de un objeto
info.innerHTML += "Datos de Juan: " + obj1.nombre + ", " + obj1.edad + ", " + obj1.email + ", " + obj1.color + "<br>";
info.innerHTML += "obj1.nombre es enumerable? " + obj1.propertyIsEnumerable("nombre") + "<br><hr>";

info.innerHTML += "Datos de Ana: " + obj2.nombre + ", " + obj2.edad + ", " + obj2.email + ", " + obj2.tlf + obj2.color + "<br>";
info.innerHTML += "obj2.nombre es enumerable? " + obj2.propertyIsEnumerable("nombre") + "<br>";


for (prop in obj1) {
    console.log(obj1[prop]);
}

for (prop in obj2) {
    console.log(obj2[prop]);
}
// getOwnPropertyNames nos devuelve todas las propiedades de un objeto, tanto enumerables como no enumerables
// Object.preventExtensions() impide que se puedan añadir nuevas propiedades a un objeto
for (prop of Object.keys(obj2)) {
    console.log("Propiedad " + prop + " valor " + obj2[prop]);
}

Object.freeze(obj2); // congela el objeto, no se pueden añadir, eliminar o modificar propiedades


let obj3 = new Object();

for (prop of Object.getOwnPropertyNames(obj2)) {
    obj3[prop] = obj2[prop]; // copia por valor
}
obj3.color = "brown";
obj3.nombre = "Alberto";
obj3.correo = "alberto@gmail.com";
console.log(obj3);

