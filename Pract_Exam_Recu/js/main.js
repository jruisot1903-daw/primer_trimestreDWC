// =============================================
// VARIABLES GLOBALES
// =============================================
const body = document.body;
const panelCont = document.getElementById('control-panel');
const notificationArea = document.getElementById('notification-area');
const productsGrid = document.getElementById('products-grid');
const cartItems = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');

let productos = [];
let carrito = [];

// =============================================
// FUNCIÓN AUXILIAR PARA CREAR ELEMENTOS
// =============================================
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

// =============================================
// FUNCIONES DE VALIDACIÓN
// =============================================

// 1. Validar URL de imagen
function validarURLImagen(url) {
    const regex = /\.(jpg|jpeg|png|gif|webp)$/i;
    return regex.test(url);
}

// 2. Validar precio y stock
function validarPrecioStock(precio, stock) {
    const errores = [];
    
    if (precio <= 0 || precio > 10000) {
        errores.push('El precio debe estar entre 0.01 y 10000');
    }
    
    if (stock < 0 || !Number.isInteger(Number(stock))) {
        errores.push('El stock debe ser un número entero positivo');
    }
    
    return errores;
}

// 3. Mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'error') {
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.className = `notificacion ${tipo}`;
    notificacion.style.cssText = `
        padding: 12px;
        margin: 8px 0;
        border-radius: 6px;
        border: 1px solid ${tipo === 'error' ? '#f5c6cb' : '#d4edda'};
        background: ${tipo === 'error' ? '#f8d7da' : '#d4edda'};
        color: ${tipo === 'error' ? '#721c24' : '#155724'};
        animation: fadeIn 0.3s ease-in;
    `;
    
    notificationArea.appendChild(notificacion);
    
    // Limitar a 3 notificaciones
    const notificaciones = notificationArea.querySelectorAll('.notificacion');
    if (notificaciones.length > 3) {
        notificaciones[0].remove();
    }
    
    // Eliminar después de 4 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.style.opacity = '0';
            notificacion.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.parentNode.removeChild(notificacion);
                }
            }, 500);
        }
    }, 4000);
}

// 4. Calcular costo de envío
function calcularEnvio(precio, envioGratis) {
    return envioGratis ? 0 : precio * 0.05;
}

// =============================================
// CREAR PANEL DE CONFIGURACIÓN
// =============================================

// Fieldset 1: Configuración Visual
const fieldsetConfig = createNode('fieldset');
const legendConfig = createNode('legend', '🎨 Personalización UI');
fieldsetConfig.appendChild(legendConfig);
panelCont.appendChild(fieldsetConfig);

// Título
const h4Tema = createNode('h4', 'Tema Visual');
fieldsetConfig.appendChild(h4Tema);

// Radio: Claro
const radioClaro = createNode('input');
radioClaro.type = 'radio';
radioClaro.name = 'theme';
radioClaro.id = 'claro';
radioClaro.checked = true;
fieldsetConfig.appendChild(radioClaro);

const labelClaro = createNode('label', 'Claro');
labelClaro.htmlFor = 'claro';
fieldsetConfig.appendChild(labelClaro);

// Radio: Oscuro
const radioOscuro = createNode('input');
radioOscuro.type = 'radio';
radioOscuro.name = 'theme';
radioOscuro.id = 'oscuro';
fieldsetConfig.appendChild(radioOscuro);

const labelOscuro = createNode('label', 'Oscuro');
labelOscuro.htmlFor = 'oscuro';
fieldsetConfig.appendChild(labelOscuro);

// Radio: Alto Contraste
const radioAltoContraste = createNode('input');
radioAltoContraste.type = 'radio';
radioAltoContraste.name = 'theme';
radioAltoContraste.id = 'alto-contraste';
fieldsetConfig.appendChild(radioAltoContraste);

const labelAltoContraste = createNode('label', 'Alto Contraste');
labelAltoContraste.htmlFor = 'alto-contraste';
fieldsetConfig.appendChild(labelAltoContraste);

// Radio: Moderno
const radioModerno = createNode('input');
radioModerno.type = 'radio';
radioModerno.name = 'theme';
radioModerno.id = 'moderno';
fieldsetConfig.appendChild(radioModerno);

const labelModerno = createNode('label', 'Moderno');
labelModerno.htmlFor = 'moderno';
fieldsetConfig.appendChild(labelModerno);

// Aplicar temas
body.className = '';
radioClaro.onclick = () => { body.className = ''; }
radioOscuro.onclick = () => { body.className = 'dark-theme'; }
radioAltoContraste.onclick = () => { body.className = 'high-contrast-theme'; }
radioModerno.onclick = () => { body.className = 'modern-theme'; }

// Range: Opacidad
const labelOpacidad = createNode('label', 'Opacidad de productos:');
labelOpacidad.htmlFor = 'opacidad-range';
fieldsetConfig.appendChild(labelOpacidad);

const rangeOpacidad = createNode('input');
rangeOpacidad.type = 'range';
rangeOpacidad.id = 'opacidad-range';
rangeOpacidad.min = '0.5';
rangeOpacidad.max = '1';
rangeOpacidad.step = '0.1';
rangeOpacidad.value = '1';
fieldsetConfig.appendChild(rangeOpacidad);

rangeOpacidad.oninput = () => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.style.opacity = rangeOpacidad.value;
    });
};

// Input: Color
const labelColor = createNode('label', 'Color principal:');
labelColor.htmlFor = 'color-principal';
fieldsetConfig.appendChild(labelColor);

const inputColor = createNode('input');
inputColor.type = 'color';
inputColor.id = 'color-principal';
inputColor.value = '#4facfe';
fieldsetConfig.appendChild(inputColor);

inputColor.oninput = () => {
    document.documentElement.style.setProperty('--color-principal', inputColor.value);
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.style.borderColor = inputColor.value;
    });
};

// Botón: Restaurar Defaults
const btnReset = createNode('button', 'Restaurar Defaults');
fieldsetConfig.appendChild(btnReset);
btnReset.onclick = () => {
    body.className = '';
    radioClaro.checked = true;
    rangeOpacidad.value = '1';
    inputColor.value = '#4facfe';
    
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.borderColor = '';
    });
    
    mostrarNotificacion('Configuración restaurada a valores por defecto', 'exito');
};

// =============================================
// CREAR FORMULARIO DE PRODUCTO
// =============================================

const fieldsetProducto = createNode('fieldset');
const legendProducto = createNode('legend', '➕ Añadir Nuevo Producto');
fieldsetProducto.appendChild(legendProducto);
panelCont.appendChild(fieldsetProducto);

// Nombre del Producto
const labelNombre = createNode('label', 'Nombre del Producto:');
labelNombre.htmlFor = 'producto-nombre';
fieldsetProducto.appendChild(labelNombre);

const inputNombre = createNode('input');
inputNombre.type = 'text';
inputNombre.id = 'producto-nombre';
inputNombre.placeholder = 'Ej: iPhone 15 Pro';
fieldsetProducto.appendChild(inputNombre);

// Categoría
const labelCategoria = createNode('label', 'Categoría:');
labelCategoria.htmlFor = 'producto-categoria';
fieldsetProducto.appendChild(labelCategoria);

const selectCategoria = createNode('select');
selectCategoria.id = 'producto-categoria';
['Electrónica', 'Ropa', 'Hogar', 'Otros'].forEach(cat => {
    const option = createNode('option', cat);
    option.value = cat.toLowerCase();
    selectCategoria.appendChild(option);
});
fieldsetProducto.appendChild(selectCategoria);

// Precio
const labelPrecio = createNode('label', 'Precio ($):');
labelPrecio.htmlFor = 'producto-precio';
fieldsetProducto.appendChild(labelPrecio);

const inputPrecio = createNode('input');
inputPrecio.type = 'number';
inputPrecio.id = 'producto-precio';
inputPrecio.min = '0';
inputPrecio.step = '0.01';
inputPrecio.placeholder = '0.00';
fieldsetProducto.appendChild(inputPrecio);

// Stock
const labelStock = createNode('label', 'Stock:');
labelStock.htmlFor = 'producto-stock';
fieldsetProducto.appendChild(labelStock);

const inputStock = createNode('input');
inputStock.type = 'number';
inputStock.id = 'producto-stock';
inputStock.min = '0';
inputStock.placeholder = '0';
fieldsetProducto.appendChild(inputStock);

// Descripción
const labelDesc = createNode('label', 'Descripción:');
labelDesc.htmlFor = 'producto-descripcion';
fieldsetProducto.appendChild(labelDesc);

const textareaDesc = createNode('textarea');
textareaDesc.id = 'producto-descripcion';
textareaDesc.placeholder = 'Mínimo 20 caracteres...';
textareaDesc.rows = '3';
fieldsetProducto.appendChild(textareaDesc);

// URL Imagen
const labelImg = createNode('label', 'URL de Imagen:');
labelImg.htmlFor = 'producto-imagen';
fieldsetProducto.appendChild(labelImg);

const inputImg = createNode('input');
inputImg.type = 'url';
inputImg.id = 'producto-imagen';
inputImg.placeholder = 'https://ejemplo.com/imagen.jpg';
fieldsetProducto.appendChild(inputImg);

// Vista previa de imagen
const imgPreview = createNode('img');
imgPreview.id = 'imagen-preview';
imgPreview.style.cssText = `
    max-width: 100%;
    max-height: 150px;
    margin-top: 10px;
    display: none;
    border-radius: 8px;
`;
fieldsetProducto.appendChild(imgPreview);

// Validar URL de imagen en tiempo real
inputImg.addEventListener('input', () => {
    if (validarURLImagen(inputImg.value)) {
        imgPreview.src = inputImg.value;
        imgPreview.style.display = 'block';
        inputImg.style.borderColor = '#28a745';
    } else {
        imgPreview.style.display = 'none';
        inputImg.style.borderColor = inputImg.value ? '#dc3545' : '';
    }
});

// Etiquetas (select múltiple)
const labelEtiquetas = createNode('label', 'Etiquetas:');
labelEtiquetas.htmlFor = 'producto-etiquetas';
fieldsetProducto.appendChild(labelEtiquetas);

const selectEtiquetas = createNode('select');
selectEtiquetas.id = 'producto-etiquetas';
selectEtiquetas.multiple = true;
['Nuevo', 'Oferta', 'Popular', 'Ecológico', 'Limitado'].forEach(etiq => {
    const option = createNode('option', etiq);
    option.value = etiq.toLowerCase();
    selectEtiquetas.appendChild(option);
});
fieldsetProducto.appendChild(selectEtiquetas);

// Checkbox Envío Gratis
const checkboxEnvio = createNode('input');
checkboxEnvio.type = 'checkbox';
checkboxEnvio.id = 'producto-envio-gratis';
fieldsetProducto.appendChild(checkboxEnvio);

const labelEnvio = createNode('label', 'Envío Gratis');
labelEnvio.htmlFor = 'producto-envio-gratis';
fieldsetProducto.appendChild(labelEnvio);

// Info de envío
const envioInfo = createNode('p');
envioInfo.id = 'envio-info';
envioInfo.style.cssText = 'font-size: 0.9em; margin-top: 5px; color: #666;';
fieldsetProducto.appendChild(envioInfo);

// Actualizar info de envío en tiempo real
inputPrecio.addEventListener('input', actualizarEnvioInfo);
checkboxEnvio.addEventListener('change', actualizarEnvioInfo);

function actualizarEnvioInfo() {
    const precio = parseFloat(inputPrecio.value) || 0;
    const envioGratis = checkboxEnvio.checked;
    const costoEnvio = calcularEnvio(precio, envioGratis);
    
    if (envioGratis) {
        envioInfo.textContent = '✅ Envío Gratuito';
        envioInfo.style.color = '#28a745';
    } else if (precio > 0) {
        envioInfo.textContent = `📦 Costo de envío: $${costoEnvio.toFixed(2)}`;
        envioInfo.style.color = '#666';
    } else {
        envioInfo.textContent = '';
    }
}

// Validaciones en tiempo real para precio y stock
inputPrecio.addEventListener('input', () => {
    const precio = parseFloat(inputPrecio.value);
    if (precio > 1000) {
        mostrarNotificacion('⚠️ Producto Premium', 'info');
    }
    
    const errores = validarPrecioStock(precio || 0, inputStock.value);
    inputPrecio.style.borderColor = errores.length ? '#dc3545' : '';
});

inputStock.addEventListener('input', () => {
    const stock = parseInt(inputStock.value);
    if (stock < 5 && stock > 0) {
        mostrarNotificacion('⚠️ Stock Bajo', 'info');
    }
    
    const errores = validarPrecioStock(inputPrecio.value || 0, stock);
    inputStock.style.borderColor = errores.length ? '#dc3545' : '';
});

// Botón Publicar Producto
const btnPublicar = createNode('button', 'Publicar Producto');
fieldsetProducto.appendChild(btnPublicar);
btnPublicar.style.cssText = `
    background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    font-weight: bold;
    width: 100%;
    padding: 15px;
    margin-top: 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

// =============================================
// EVENTO PUBLICAR PRODUCTO (CON VALIDACIONES)
// =============================================

btnPublicar.onclick = () => {
    // Obtener valores
    const producto = {
        nombre: inputNombre.value.trim(),
        categoria: selectCategoria.value,
        precio: parseFloat(inputPrecio.value) || 0,
        stock: parseInt(inputStock.value) || 0,
        descripcion: textareaDesc.value.trim(),
        imagen: inputImg.value.trim(),
        etiquetas: Array.from(selectEtiquetas.selectedOptions).map(opt => opt.text),
        envioGratis: checkboxEnvio.checked,
        fecha: new Date().toLocaleDateString()
    };
    
    // Validaciones
    if (!producto.nombre) {
        mostrarNotificacion('El nombre del producto es obligatorio', 'error');
        return;
    }
    
    if (producto.precio <= 0) {
        mostrarNotificacion('El precio debe ser mayor a 0', 'error');
        return;
    }
    
    if (producto.stock < 0) {
        mostrarNotificacion('El stock no puede ser negativo', 'error');
        return;
    }
    
    if (producto.descripcion.length < 20) {
        mostrarNotificacion('La descripción debe tener al menos 20 caracteres', 'error');
        return;
    }
    
    if (producto.imagen && !validarURLImagen(producto.imagen)) {
        mostrarNotificacion('La URL de la imagen debe terminar en .jpg, .jpeg, .png, .gif o .webp', 'error');
        return;
    }
    
    if (producto.etiquetas.length === 0) {
        mostrarNotificacion('Selecciona al menos una etiqueta', 'error');
        return;
    }
    
    // Validaciones de precio y stock
    const erroresPrecioStock = validarPrecioStock(producto.precio, producto.stock);
    if (erroresPrecioStock.length > 0) {
        erroresPrecioStock.forEach(error => mostrarNotificacion(error, 'error'));
        return;
    }
    
    // TODO válido - crear producto
    producto.id = Date.now(); // ID único
    productos.push(producto);
    
    // Crear card del producto
    crearCardProducto(producto);
    
    // Mostrar éxito
    mostrarNotificacion(`✅ Producto "${producto.nombre}" publicado correctamente`, 'exito');
    
    // Limpiar formulario
    inputNombre.value = '';
    inputPrecio.value = '';
    inputStock.value = '';
    textareaDesc.value = '';
    inputImg.value = '';
    imgPreview.style.display = 'none';
    selectEtiquetas.selectedIndex = -1;
    checkboxEnvio.checked = false;
    envioInfo.textContent = '';
    
    // Mostrar botón Exportar Datos
    document.getElementById('export-data').style.display = 'block';
};

// =============================================
// CREAR CARD DE PRODUCTO
// =============================================

function crearCardProducto(producto) {
    const card = createNode('article');
    card.className = 'product-card';
    card.dataset.id = producto.id;
    
    // Imagen o placeholder
    const imgHtml = producto.imagen && validarURLImagen(producto.imagen) 
        ? `<img src="${producto.imagen}" alt="${producto.nombre}" style="width:100%; height:150px; object-fit:cover; border-radius:8px;">`
        : '<div style="width:100%; height:150px; background:#eee; border-radius:8px; display:flex; align-items:center; justify-content:center;">📷 Sin imagen</div>';
    
    // Badge de categoría
    const categoriaBadge = `<span style="background:#4facfe; color:white; padding:3px 8px; border-radius:12px; font-size:0.8em;">${producto.categoria}</span>`;
    
    // Etiquetas
    const etiquetasHtml = producto.etiquetas.map(etiq => 
        `<span style="background:#74b9ff; color:white; padding:2px 6px; margin:2px; border-radius:10px; font-size:0.8em; display:inline-block;">${etiq}</span>`
    ).join('');
    
    // Progress bar de disponibilidad
    const disponibilidad = Math.min(producto.stock, 100);
    
    card.innerHTML = `
        ${imgHtml}
        <div style="padding:15px;">
            <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:10px;">
                <h3 style="margin:0; font-size:1.2em;">${producto.nombre}</h3>
                ${categoriaBadge}
            </div>
            
            <p style="color:#666; font-size:0.9em; margin:10px 0;">${producto.descripcion.substring(0, 60)}${producto.descripcion.length > 60 ? '...' : ''}</p>
            
            <div style="margin:10px 0;">
                ${etiquetasHtml}
            </div>
            
            <div style="margin:10px 0;">
                <p style="margin:0 0 5px 0; font-size:0.9em;"><strong>Disponibilidad:</strong></p>
                <div style="width:100%; height:10px; background:#eee; border-radius:5px; overflow:hidden;">
                    <div style="width:${disponibilidad}%; height:100%; background:#4CAF50;"></div>
                </div>
                <div style="display:flex; justify-content:space-between; margin-top:5px;">
                    <span style="font-size:0.8em;">Stock: ${producto.stock}</span>
                    <span style="font-size:0.8em;">${disponibilidad}%</span>
                </div>
            </div>
            
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                <div>
                    <p style="font-size:1.5em; font-weight:bold; margin:0; color:#333;">$${producto.precio.toFixed(2)}</p>
                    <p style="font-size:0.8em; margin:0; color:#666;">${producto.envioGratis ? '🚚 Envío gratis' : '+ $' + (producto.precio * 0.05).toFixed(2) + ' envío'}</p>
                </div>
                
                <div>
                    <button class="btn-add-cart" style="background:#4CAF50; color:white; padding:8px 15px; border:none; border-radius:4px; cursor:pointer; margin-right:5px;">🛒 Añadir</button>
                    <button class="btn-clone" style="background:#2196F3; color:white; padding:8px 15px; border:none; border-radius:4px; cursor:pointer; margin-right:5px;">📋 Clonar</button>
                    <button class="btn-delete" style="background:#f44336; color:white; padding:8px 15px; border:none; border-radius:4px; cursor:pointer;">🗑️ Eliminar</button>
                </div>
            </div>
        </div>
    `;
    
    // Añadir eventos
    const btnAdd = card.querySelector('.btn-add-cart');
    const btnClone = card.querySelector('.btn-clone');
    const btnDelete = card.querySelector('.btn-delete');
    
    btnAdd.addEventListener('click', () => {
        añadirAlCarrito(producto);
    });
    
    btnClone.addEventListener('click', () => {
        const clone = card.cloneNode(true);
        clone.style.opacity = '0.7';
        clone.classList.add('cloned-item');
        
        // Reasignar eventos al clon
        const cloneAdd = clone.querySelector('.btn-add-cart');
        const cloneClone = clone.querySelector('.btn-clone');
        const cloneDelete = clone.querySelector('.btn-delete');
        
        cloneAdd.addEventListener('click', () => {
            añadirAlCarrito(producto);
        });
        
        cloneClone.addEventListener('click', () => {
            const cloneDelClone = clone.cloneNode(true);
            cloneDelClone.style.opacity = '0.5';
            productsGrid.appendChild(cloneDelClone);
        });
        
        cloneDelete.addEventListener('click', () => {
            if (clone.parentNode) {
                clone.parentNode.removeChild(clone);
            }
        });
        
        productsGrid.appendChild(clone);
    });
    
    btnDelete.addEventListener('click', () => {
        if (card.parentNode) {
            card.parentNode.removeChild(card);
        }
        // Remover del array de productos
        const index = productos.findIndex(p => p.id === producto.id);
        if (index !== -1) {
            productos.splice(index, 1);
        }
    });
    
    // Añadir al grid de productos
    productsGrid.appendChild(card);
}

// =============================================
// FUNCIÓN AÑADIR AL CARRITO
// =============================================

function añadirAlCarrito(producto) {
    // Buscar si ya está en el carrito
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    mostrarNotificacion(`✅ "${producto.nombre}" añadido al carrito`, 'exito');
}

// =============================================
// ACTUALIZAR CARRITO
// =============================================

function actualizarCarrito() {
    // Limpiar carrito
    cartItems.innerHTML = '';
    
    let total = 0;
    let totalItems = 0;
    
    // Añadir items
    carrito.forEach(item => {
        const itemElement = createNode('div');
        itemElement.className = 'cart-item';
        
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        totalItems += item.cantidad;
        
        itemElement.innerHTML = `
            <div style="flex:1;">
                <p style="margin:0; font-weight:bold;">${item.nombre}</p>
                <p style="margin:0; font-size:0.9em; color:#666;">$${item.precio.toFixed(2)} x ${item.cantidad}</p>
            </div>
            <div style="text-align:right;">
                <p style="margin:0; font-weight:bold;">$${subtotal.toFixed(2)}</p>
                <button class="btn-remove-item" data-id="${item.id}" style="background:none; border:none; color:#f44336; cursor:pointer; font-size:0.8em;">Eliminar</button>
            </div>
        `;
        
        cartItems.appendChild(itemElement);
    });
    
    // Actualizar resumen
    cartSummary.innerHTML = `
        <div style="border-top:2px solid #eee; padding-top:15px; margin-top:15px;">
            <div style="display:flex; justify-content:space-between; margin:5px 0;">
                <span>Productos (${totalItems}):</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin:5px 0;">
                <span>Envío:</span>
                <span>${carrito.some(item => item.envioGratis) ? 'Gratis' : '+ $' + (total * 0.05).toFixed(2)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin:15px 0; font-weight:bold; font-size:1.1em;">
                <span>TOTAL:</span>
                <span>$${(total + (carrito.some(item => item.envioGratis) ? 0 : total * 0.05)).toFixed(2)}</span>
            </div>
        </div>
    `;
    
    // Añadir eventos a botones eliminar
    document.querySelectorAll('.btn-remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const index = carrito.findIndex(item => item.id === id);
            if (index !== -1) {
                carrito.splice(index, 1);
                actualizarCarrito();
                mostrarNotificacion('Producto removido del carrito', 'info');
            }
        });
    });
}

// =============================================
// BOTÓN EXPORTAR DATOS
// =============================================

const btnExport = document.getElementById('export-data');
btnExport.addEventListener('click', () => {
    if (productos.length === 0) {
        mostrarNotificacion('No hay productos para exportar', 'error');
        return;
    }
    
    // Calcular estadísticas
    const totalProductos = productos.length;
    const valorTotal = productos.reduce((sum, p) => sum + (p.precio * p.stock), 0);
    const productoMasCaro = productos.reduce((max, p) => p.precio > max.precio ? p : max, productos[0]);
    const productoMasBarato = productos.reduce((min, p) => p.precio < min.precio ? p : min, productos[0]);
    
    // Abrir ventana
    const ventana = window.open('', 'Reporte', 'width=600,height=500,scrollbars=yes');
    
    // Generar contenido HTML
    ventana.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Reporte de Inventario</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 30px; }
                .report-card { background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
                .stat-box { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; text-align: center; }
                table { width: 100%; border-collapse: collapse; margin: 25px 0; }
                th { background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 15px; text-align: left; }
                td { padding: 15px; border-bottom: 1px solid #eee; }
                tr:hover { background: #f8f9fa; }
            </style>
        </head>
        <body>
            <div class="report-card">
                <h1>📊 Reporte de Inventario TechStore</h1>
                <p>Generado el: ${new Date().toLocaleDateString()}</p>
                
                <div class="stats-grid">
                    <div class="stat-box">
                        <h3>Total Productos</h3>
                        <p style="font-size: 2em;">${totalProductos}</p>
                    </div>
                    <div class="stat-box">
                        <h3>Valor Total</h3>
                        <p style="font-size: 2em;">$${valorTotal.toFixed(2)}</p>
                    </div>
                    <div class="stat-box">
                        <h3>Producto Más Caro</h3>
                        <p>${productoMasCaro.nombre}</p>
                        <p>$${productoMasCaro.precio.toFixed(2)}</p>
                    </div>
                    <div class="stat-box">
                        <h3>Producto Más Barato</h3>
                        <p>${productoMasBarato.nombre}</p>
                        <p>$${productoMasBarato.precio.toFixed(2)}</p>
                    </div>
                </div>
                
                <h2>📋 Lista de Productos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productos.map(p => `
                            <tr>
                                <td>${p.nombre}</td>
                                <td>${p.categoria}</td>
                                <td>$${p.precio.toFixed(2)}</td>
                                <td>${p.stock}</td>
                                <td>$${(p.precio * p.stock).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div style="margin-top: 30px; text-align: center;">
                    <button onclick="window.print()" style="padding: 12px 30px; background: #4CAF50; color: white; border: none; border-radius: 8px; cursor: pointer; margin-right: 15px;">
                        🖨️ Imprimir Reporte
                    </button>
                    <button onclick="window.close()" style="padding: 12px 30px; background: #f44336; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        ❌ Cerrar Ventana
                    </button>
                </div>
            </div>
            
            <script>
                // Mostrar tabla en consola también
                console.table(${JSON.stringify(productos.map(p => ({
                    Producto: p.nombre,
                    Categoría: p.categoria,
                    Precio: p.precio,
                    Stock: p.stock,
                    Valor: p.precio * p.stock
                })))});
            </script>
        </body>
        </html>
    `);
    
    ventana.document.close();
});

// =============================================
// AÑADIR ESTILOS CSS DINÁMICOS
// =============================================

const style = document.createElement('style');
style.textContent = `
    :root {
        --color-principal: #4facfe;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .cloned-item {
        opacity: 0.7 !important;
        filter: grayscale(30%);
        border: 2px dashed #ccc !important;
    }
    
    .notificacion {
        animation: fadeIn 0.3s ease-in;
    }
    
    .product-card {
        transition: all 0.3s ease;
    }
    
    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    }
`;
document.head.appendChild(style);

// =============================================
// INICIALIZACIÓN
// =============================================

// Crear algunos productos de ejemplo
setTimeout(() => {
    const productosEjemplo = [
        {
            nombre: 'iPhone 15 Pro',
            categoria: 'electrónica',
            precio: 1299.99,
            stock: 15,
            descripcion: 'El último smartphone de Apple con cámara profesional',
            imagen: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop',
            etiquetas: ['Nuevo', 'Popular'],
            envioGratis: true,
            fecha: new Date().toLocaleDateString(),
            id: 1
        },
        {
            nombre: 'Camiseta Algodón Orgánico',
            categoria: 'ropa',
            precio: 24.99,
            stock: 3,
            descripcion: 'Camiseta 100% algodón orgánico, fabricación sostenible',
            imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
            etiquetas: ['Ecológico', 'Oferta'],
            envioGratis: false,
            fecha: new Date().toLocaleDateString(),
            id: 2
        }
    ];
    
    productosEjemplo.forEach(producto => {
        productos.push(producto);
        crearCardProducto(producto);
    });
    
    // Mostrar botón exportar si hay productos
    if (productos.length > 0) {
        document.getElementById('export-data').style.display = 'block';
    }
}, 1000);