// Guardamos si el usuario se ha registrado
let usuarioRegistrado = false;

// Esta función la llama registro.html para enviar el usuario al index
function recibirUsuario(usuario) {
  const label = document.querySelector("label");
  if (label) {
    label.textContent = "Usuario registrado: " + usuario;
    usuarioRegistrado = true;
  }
}

window.addEventListener("load", () => {
  // --- Parte de index-DWEC.html ---
  const div2 = document.getElementById("div2");
  if (div2) {
    // Abrir ventana de registro al inicio
    window.open("registro.html", "ventanaRegistro",
      "width=400,height=300,left=200,top=150,resizable=yes,scrollbars=yes");

    const form = document.querySelector("form");
    const selectCargo = document.querySelector("select");
    const btnEnviar = document.querySelector('input[type="button"][value="Enviar"]');

    // Convertimos el botón en submit desde JS (sin tocar el HTML)
    btnEnviar.type = "submit";
    btnEnviar.disabled = true;

    let camposExtra = null;

    // Cuando cambie el select de cargo
    selectCargo.addEventListener("change", () => {
      if (camposExtra) {
        form.removeChild(camposExtra);
        camposExtra = null;
      }

      camposExtra = document.createElement("div");

      if (selectCargo.value === "empleado") {
        const numInc = document.createElement("input");
        numInc.type = "text";
        numInc.id = "numIncidencia";
        camposExtra.appendChild(document.createTextNode("Nº de Incidencia: "));
        camposExtra.appendChild(numInc);
        camposExtra.appendChild(document.createElement("br"));

        const inc = document.createElement("textarea");
        inc.id = "incidencia";
        camposExtra.appendChild(document.createTextNode("Incidencia: "));
        camposExtra.appendChild(inc);

        numInc.addEventListener("blur", validarCampo);
      }

      if (selectCargo.value === "encargado") {
        const dept = document.createElement("select");
        dept.id = "departamento";
        ["Contabilidad", "Dirección"].forEach(op => {
          const option = document.createElement("option");
          option.textContent = op;
          dept.appendChild(option);
        });
        camposExtra.appendChild(document.createTextNode("Departamento: "));
        camposExtra.appendChild(dept);
        camposExtra.appendChild(document.createElement("br"));

        const asunto = document.createElement("textarea");
        asunto.id = "asunto";
        camposExtra.appendChild(document.createTextNode("Asunto: "));
        camposExtra.appendChild(asunto);
      }

      form.appendChild(camposExtra);
    });

    // Validación sencilla
    function validarCampo(e) {
      const campo = e.target;
      let regex = null;

      const inputs = document.querySelectorAll("input[type=text]");
      const dni = inputs[2];   // tercer input es DNI
      const email = inputs[3]; // cuarto input es email

      if (campo === dni) regex = /^[0-9]{8}[A-Za-z]$/;
      if (campo === email) regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
      if (campo.id === "numIncidencia") regex = /^[0-9]+$/;

      if (regex && !regex.test(campo.value)) {
        alert("Error en el campo");
        campo.style.border = "2px solid red";
      } else {
        campo.style.border = "";
      }

      comprobarActivar();
    }

    // Validar DNI y email
    const inputs = document.querySelectorAll("input[type=text]");
    inputs[2].addEventListener("blur", validarCampo);
    inputs[3].addEventListener("blur", validarCampo);

    // Activar botón enviar si todo está correcto
    function comprobarActivar() {
      const dni = inputs[2];
      const email = inputs[3];
      const numInc = document.getElementById("numIncidencia");

      const dniValido = dni.style.border === "";
      const emailValido = email.style.border === "";
      const numValido = !numInc || numInc.style.border === "";

      btnEnviar.disabled = !(usuarioRegistrado && dniValido && emailValido && numValido);
    }

    // Evento onsubmit del formulario
    form.onsubmit = (e) => {
      const aceptar = document.querySelector('input[name="condiciones"][value="si"]');
      if (aceptar && aceptar.checked) {
        alert("Enviando formulario...");
      } else {
        e.preventDefault();
        alert("Debe aceptar las condiciones");
      }
    };
  }

  // --- Parte de registro.html ---
  const btnAceptar = document.getElementsByName("aceptar")[0];
  if (btnAceptar) {
    const usuario = document.querySelector("input[type=text]");
    const password = document.querySelector("input[type=password]");

    btnAceptar.onclick = () => {
      usuario.style.border = "";
      password.style.border = "";

      if (usuario.value.trim() === "" || password.value.trim() === "") {
        alert("Todos los campos son obligatorios");
        if (usuario.value.trim() === "") usuario.style.border = "2px solid red";
        if (password.value.trim() === "") password.style.border = "2px solid red";
        return;
      }

      if (usuario.value !== "empleado" && usuario.value !== "encargado") {
        alert("Usuario " + usuario.value + " no está registrado");
        usuario.style.border = "2px solid red";
        return;
      }

      if (window.opener && !window.opener.closed) {
        window.opener.recibirUsuario(usuario.value);
      }
      window.close();
    };
  }
});
