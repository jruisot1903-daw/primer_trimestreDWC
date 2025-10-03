/*********** Ejercicio1 **************/
const alumnos = [];

    document.getElementById("addAlum").onclick = function() {
      let nom = document.getElementById("nom").value;
      let ape = document.getElementById("ape").value;
      let curso = document.getElementById("cur").value;
      let n1 = parseFloat(document.getElementById("nota1").value);
      let n2 = parseFloat(document.getElementById("nota2").value);
      let n3 = parseFloat(document.getElementById("nota3").value);

      if (!nom || !ape || !curso || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
      }

      alumnos.push([nom, ape, curso, [n1, n2, n3]]);


        mostrarAlumnos();
      

      document.getElementById("nom").value = "";
      document.getElementById("ape").value = "";
      document.getElementById("cur").value = "";
      document.getElementById("nota1").value = "";
      document.getElementById("nota2").value = "";
      document.getElementById("nota3").value = "";
    };

    function mostrarAlumnos() {
      let salida = document.getElementById("AlumAña");
      salida.innerHTML += "<br>"; 

      for (let i = 0; i < alumnos.length; i++) {
        let alumno = alumnos[i];
        let nombre = alumno[0];
        let apellido = alumno[1];
        let curso = alumno[2];
        let notas = alumno[3]; // [nota1, nota2, notaFinal]

        salida.innerHTML += `
          <tr>
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${curso}</td>
            <td>${notas[0]}</td>
            <td>${notas[1]}</td>
            <td>${notas[2]}</td>
          </tr> 
          <br>
        `;
      }
    }

/*********** Ejercicio2 **************/

    function calcularXOR() {
      const a = parseInt(document.getElementById("a").value);
      const b = parseInt(document.getElementById("b").value);

      if (![0, 1].includes(a) || ![0, 1].includes(b)) {
        document.getElementById("resultado").innerHTML = "Por favor, introduce solo 0 o 1.";
        return;
      }

      const resultado = (a !== b) ? 1 : 0;

      document.getElementById("resultado").innerHTML = `Resultado de ${a} XOR ${b} = ${resultado}`;
    }

    /*********** Ejercicio3 **************/
