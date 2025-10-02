/*********** Ejercicio1 **************/
document.getElementById("addAlum").onclick = function() {
      let nom = document.getElementById("nom").value;
      let ape = document.getElementById("ape").value;
      let curso = document.getElementById("cur").value;
      let n1 = parseFloat(document.getElementById("nota1").value);
      let n2 = parseFloat(document.getElementById("nota2").value);
      let n3 = parseFloat(document.getElementById("nota3").value);

      let salida = document.getElementById("AlumAña");
      salida.innerHTML += `
        <tr>
          <td>${nom}</td>
          <td>${ape}</td>
          <td>${curso}</td>
          <td>${n1}</td>
          <td>${n2}</td>
          <td>${n3}</td>
          <td>${notaFinal}</td>
        </tr>
      `;
    };
