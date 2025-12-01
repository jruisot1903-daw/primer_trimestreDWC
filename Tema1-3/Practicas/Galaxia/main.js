let panel = document.getElementById('panel');
let boton = document.getElementById('botonPanel');

// Abrir panel y ocultar icono
boton.addEventListener('click', () => {
  panel.style.left = "0";
  boton.style.display = "none";
});

// Cerrar panel al salir el ratón 

panel.addEventListener('mouseout', (e) => {
  if (!panel.contains(e.relatedTarget)) { // en relatedTarget se almacena si el raton se mueve fuera de en este caso el panel , si es asi se esconde el panel 
    panel.style.left = "-300px";
    boton.style.display = "block";
  }
});






























































































// let universo = document.getElementById('universo');
// let lista = document.getElementById('lista-PlaneLun');
// let formulario = document.getElementById('formulario');
// let elementos = [];

// formulario.addEventListener('submit', (e) => {
//   e.preventDefault();

//   let tipo = formulario.tipo.value;
//   let nombre = formulario.nombre.value;
//   let x = parseInt(formulario.x.value);
//   let y = parseInt(formulario.y.value);
//   let diametro = parseInt(formulario.diametro.value);
//   let color = formulario.color.value;
//   let profundidad = Math.floor(Math.random() * 101);

//   let div = document.createElement('div');
//   div.className = tipo;
//   div.style.position = 'absolute';
//   div.style.left = `${x}px`;
//   div.style.top = `${y}px`;
//   div.style.width = `${diametro}px`;
//   div.style.height = `${diametro}px`;
//   div.style.backgroundColor = color;
//   div.style.borderRadius = '50%';
//   div.style.zIndex = profundidad;
//   div.title = nombre;

//   if (tipo === 'luna') {
//     div.style.border = '5px solid white';
//   }

//   let objeto = {
//     tipo,
//     nombre,
//     x,
//     y,
//     diametro,
//     color,
//     profundidad,
//     nodo: div
//   };

//   div.addEventListener('click', () => intercambiar(objeto));
//   elementos.push(objeto);
//   universo.appendChild(div);
//   actualizarLista();
// });

// function actualizarLista() {
//   lista.innerHTML = '';
//   elementos.forEach((el) => {
//     let li = document.createElement('li');
//     li.textContent = `${el.tipo.toUpperCase()} - ${el.nombre}`;
//     li.style.cursor = 'pointer';
//     li.addEventListener('click', () => intercambiar(el));
//     lista.appendChild(li);
//   });
// }

// function intercambiar(objeto) {
//   let primero = elementos[0];
//   if (objeto === primero) return;

//   // Intercambiar coordenadas y profundidad
//   [objeto.x, primero.x] = [primero.x, objeto.x];
//   [objeto.y, primero.y] = [primero.y, objeto.y];
//   [objeto.profundidad, primero.profundidad] = [primero.profundidad, objeto.profundidad];

//   // Actualizar estilos
//   objeto.nodo.style.left = `${objeto.x}px`;
//   objeto.nodo.style.top = `${objeto.y}px`;
//   objeto.nodo.style.zIndex = objeto.profundidad;

//   primero.nodo.style.left = `${primero.x}px`;
//   primero.nodo.style.top = `${primero.y}px`;
//   primero.nodo.style.zIndex = primero.profundidad;

//   // Reordenar array
//   let index = elementos.indexOf(objeto);
//   elementos.splice(index, 1);
//   elementos.unshift(objeto);

//   actualizarLista();
// }



