const panel = document.getElementById('panel');
const toggle = document.getElementById('togglePanel');

// Abrir panel y ocultar icono
toggle.addEventListener('click', () => {
  panel.classList.add('abierto');
  toggle.classList.add('oculto');
});

// Cerrar panel al salir el ratón
panel.addEventListener('mouseleave', () => {
  panel.classList.remove('abierto');
  toggle.classList.remove('oculto');
});

