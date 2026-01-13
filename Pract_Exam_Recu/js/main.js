const body = document.body;
const panelCont = document.getElementById('control-panel');

fielset = createNode('fieldset', '');
legend = createNode('legend', 'Panel de Control');
fielset.appendChild(legend);

panelCont.appendChild(fielset);

txtH4 = createNode('h4', 'Tema Visual:');
fielset.appendChild(txtH4);

inptuR1 = createNode('input', '');
inptuR1.type = 'radio';
inptuR1.name = 'theme';
inptuR1.id = 'light';
inptuR1.checked = true;
fielset.appendChild(inptuR1);

lbl1 = createNode('label', 'Claro');
lbl1.htmlFor = 'light';
fielset.appendChild(lbl1);

inptuR2 = createNode('input', '');
inptuR2.type = 'radio';
inptuR2.name = 'theme';
inptuR2.id = 'dark';
fielset.appendChild(inptuR2);

lbl2 = createNode('label', 'Oscuro');
lbl2.htmlFor = 'dark';
fielset.appendChild(lbl2);

inptuR3 = createNode('input', '');
inptuR3.type = 'radio';
inptuR3.name = 'theme';
inptuR3.id = 'auto';
fielset.appendChild(inptuR3);

lbl3 = createNode('label', 'Alto Contraste');
lbl3.htmlFor = 'Alto Contraste';
fielset.appendChild(lbl3);


body.className = 'light-theme';

inptuR1.onclick = () => {
    body.className = 'light-theme';
}
inptuR2.onclick = () => {
    body.className = 'dark-theme';
}
inptuR3.onclick = () => {
    body.className = 'high-contrast-theme';
}

inputRange = createNode('input', '');
inputRange.type = 'range';
inputRange.id = 'font-size-control';
inputRange.min = '12';
inputRange.max = '24';
inputRange.value = '16';
fielset.appendChild(inputRange);

inputRange.oninput = () => {
    body.style.fontSize = inputRange.value + 'px';
}

btReset = createNode('button', 'Restablecer Configuración');
fielset.appendChild(btReset);
btReset.onclick = () => {
    body.className = 'light-theme';
    inptuR1.checked = true;
    body.style.fontSize = '16px';
    inputRange.value = '16';
}

fielset2 = createNode('fieldset', '');
legend2 = createNode('legend', 'Alta de empleado');
fielset2.appendChild(legend2);

panelCont.appendChild(fielset2);

InpText = createNode('input', '');
InpText.type = 'text';
InpText.id = 'employee-name';
InpText.placeholder = 'Nombre del empleado';
fielset2.appendChild(InpText);

InpEmail = createNode('input', '');
InpEmail.type = 'email';
InpEmail.id = 'employee-email';
InpEmail.placeholder = 'Correo electrónico';
fielset2.appendChild(InpEmail);

InpPass = createNode('input', '');
InpPass.type = 'password';
InpPass.id = 'employee-password';
InpPass.placeholder = 'Contraseña';
fielset2.appendChild(InpPass);

InpConPass = createNode('input', '');
InpConPass.type = 'password';
InpConPass.id = 'employee-confirm-password';
InpConPass.placeholder = 'Confirmar Contraseña';
fielset2.appendChild(InpConPass);

InpFecha = createNode('input', '');
InpFecha.type = 'date';
InpFecha.id = 'employee-start-date';
fielset2.appendChild(InpFecha);

InpUrl = createNode('input', '');
InpUrl.type = 'url';
InpUrl.id = 'employee-website';
InpUrl.placeholder = 'Sitio web personal';
fielset2.appendChild(InpUrl);

lblCheck = createNode('label', 'Acepto los términos y condiciones');
lblCheck.htmlFor = 'employee-agree-terms';
fielset2.appendChild(lblCheck);

checkBox = createNode('input', '');
checkBox.type = 'checkbox';
checkBox.id = 'employee-agree-terms';
fielset2.appendChild(checkBox);



SelectHabilidades = createNode('select', '');
SelectHabilidades.id = 'employee-skills';
SelectHabilidades.multiple = true;  
fielset2.appendChild(SelectHabilidades);

let habilidades = ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Python', 'Django', 'SQL'];
habilidades.forEach(habilidad => {
    let option = createNode('option', habilidad);
    option.value = habilidad.toLowerCase();
    SelectHabilidades.appendChild(option);
});

btResgistrar = createNode('button', 'Registrar Empleado');
fielset2.appendChild(btResgistrar);

btResgistrar.style.marginTop = '15px';
btResgistrar.style.width = '100%';
btResgistrar.style.backgroundColor = '#007bff';
btResgistrar.style.color = 'white';
btResgistrar.style.padding = '10px';
btResgistrar.style.border = 'none';
btResgistrar.style.cursor = 'pointer';

btResgistrar.onclick = () => {
    alert('Empleado registrado con éxito.');
    InpText.value = '';
    InpEmail.value = '';
    InpPass.value = '';
    InpConPass.value = '';
    InpFecha.value = '';
    InpUrl.value = '';
    checkBox.checked = false;
    SelectHabilidades.selectedIndex = -1;
}










function createNode(tipoNodo, tipoTexto) {
    let nodo;
    let nodoText;

    switch(arguments.length) {
        case 0: 
            throw "Se necesita al menos el tipo de elemento a crear.";
            break;
        case 1:
            nodo = document.createElement(tipoNodo);
            break;
        case 2:
            nodo = document.createElement(tipoNodo);
            nodoText = document.createTextNode(tipoTexto);
            nodo.appendChild(nodoText);
            break;
    }

    return nodo;
}