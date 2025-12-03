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

let universo = document.getElementById('universo');
let lista = document.getElementById('lista-PlaneLun');
let formulario = document.getElementById('formulario');
let elementos = [];

formulario.addEventListener('submit', function(e) {
  e.preventDefault();

  // Obtener valores del formulario
  let tipo = formulario.tipo.value;
  let nombre = formulario.nombre.value;
  let x = parseInt(formulario.x.value);
  let y = parseInt(formulario.y.value);
  let diametro = parseInt(formulario.diametro.value);
  let color = formulario.color.value;
  let profundidad = Math.floor(Math.random() * 101);

  // Crear el div del planeta o luna
  let nuevoElemento = document.createElement('div');
  nuevoElemento.className = tipo;
  nuevoElemento.style.position = 'absolute';
  nuevoElemento.style.left = x + 'px';
  nuevoElemento.style.top = y + 'px';
  nuevoElemento.style.width = diametro + 'px';
  nuevoElemento.style.height = diametro + 'px';
  nuevoElemento.style.backgroundColor = color;
  nuevoElemento.style.borderRadius = '50%';
  nuevoElemento.style.zIndex = profundidad;

  if (tipo === 'luna') {
    nuevoElemento.style.border = '5px solid white';
  }

  // Crear etiqueta <p> con el nombre
  let etiqueta = document.createElement('p');
  etiqueta.textContent = nombre;
  etiqueta.style.color = 'white';
  etiqueta.style.fontSize = '12px';
  etiqueta.style.textAlign = 'center';
  etiqueta.style.margin = '0';
  etiqueta.style.position = 'absolute';
  etiqueta.style.top = '100%';      // debajo del círculo
  etiqueta.style.left = '50%';
  etiqueta.style.transform = 'translateX(-50%)';

  // Añadir la etiqueta al div
  nuevoElemento.appendChild(etiqueta);

  // Guardar los datos en un objeto
  let objeto = {
    tipo: tipo,
    nombre: nombre,
    x: x,
    y: y,
    diametro: diametro,
    color: color,
    profundidad: profundidad,
    nodo: nuevoElemento
  };

  // Añadir evento de clic
  nuevoElemento.addEventListener('click', function() {
    intercambiar(objeto);
  });

  // Guardar y mostrar
  elementos.push(objeto);
  universo.appendChild(nuevoElemento);
  actualizarLista();
});

function actualizarLista() {
  lista.innerHTML = '';

  for (let i = 0; i < elementos.length; i++) {
    let item = document.createElement('li');
    item.textContent = elementos[i].tipo.toUpperCase() + ' - ' + elementos[i].nombre;
    item.style.cursor = 'pointer';

    item.addEventListener('click', function() {
      intercambiar(elementos[i]);
    });

    lista.appendChild(item);
  }
}

function intercambiar(objeto) {
  let primero = elementos[0];

  if (objeto === primero) {
    return;
  }

  // Intercambiar coordenadas y profundidad
  let tempX = objeto.x;
  let tempY = objeto.y;
  let tempProf = objeto.profundidad;

  objeto.x = primero.x;
  objeto.y = primero.y;
  objeto.profundidad = primero.profundidad;

  primero.x = tempX;
  primero.y = tempY;
  primero.profundidad = tempProf;

  // Actualizar estilos
  objeto.nodo.style.left = objeto.x + 'px';
  objeto.nodo.style.top = objeto.y + 'px';
  objeto.nodo.style.zIndex = objeto.profundidad;

  primero.nodo.style.left = primero.x + 'px';
  primero.nodo.style.top = primero.y + 'px';
  primero.nodo.style.zIndex = primero.profundidad;

  // Reordenar array
  let index = elementos.indexOf(objeto);
  elementos.splice(index, 1);
  elementos.unshift(objeto);

  actualizarLista();
}
