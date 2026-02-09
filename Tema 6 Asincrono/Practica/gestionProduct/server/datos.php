<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Ruta a tu archivo JSON existente - CORREGIDO EL NOMBRE
$jsonFile = __DIR__ . '/PRODUCTS.json';
$method = $_SERVER["REQUEST_METHOD"];

// Manejar preflight de CORS
if ($method === "OPTIONS") {
    http_response_code(200);
    exit;
}

// ---------------------------------------------------------
// FUNCIÓN PARA LEER EL JSON
// ---------------------------------------------------------
function leerProductos($archivo) {
    if (!file_exists($archivo)) {
        // Si el archivo no existe, devolver estructura vacía
        return ["products" => []];
    }
    
    $content = file_get_contents($archivo);
    $data = json_decode($content, true);
    
    if ($data === null) {
        // Si hay error al decodificar, devolver estructura vacía
        return ["products" => []];
    }
    
    // Asegurarse de que tiene la estructura correcta
    if (!isset($data["products"])) {
        // Si no tiene "products", crear la estructura
        return ["products" => $data];
    }
    
    return $data;
}

// ---------------------------------------------------------
// FUNCIÓN PARA GUARDAR EL JSON
// ---------------------------------------------------------
function guardarProductos($archivo, $data) {
    // Asegurar que siempre guarde con la estructura {"products": [...]}
    if (!isset($data["products"])) {
        $data = ["products" => $data];
    }
    
    return file_put_contents($archivo, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

// ---------------------------------------------------------
// GET → devolver todos los productos
// ---------------------------------------------------------
if ($method === "GET") {
    $data = leerProductos($jsonFile);
    
    // DEBUG: Para ver qué hay en el archivo
    error_log("Archivo leído: " . $jsonFile);
    error_log("Número de productos: " . count($data["products"]));
    
    // Devolver solo el array de productos
    echo json_encode($data["products"], JSON_UNESCAPED_UNICODE);
    exit;
}

// ---------------------------------------------------------
// POST → añadir un producto
// ---------------------------------------------------------
if ($method === "POST") {
    // Leer productos existentes
    $data = leerProductos($jsonFile);
    $productos = $data["products"];
    
    // Recibir datos del nuevo producto
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input === null && !empty($_POST)) {
        // Intentar con $_POST si no hay JSON
        $input = $_POST;
    }
    
    // Si aún no hay datos, error
    if ($input === null || empty($input)) {
        http_response_code(400);
        echo json_encode(["error" => "No se recibieron datos"]);
        exit;
    }
    
    // Validar datos obligatorios
    $title = $input["title"] ?? $input["titulo"] ?? "";
    $description = $input["description"] ?? $input["descripcion"] ?? "";
    
    if (empty($title) || empty($description)) {
        http_response_code(400);
        echo json_encode(["error" => "El título y la descripción son obligatorios"]);
        exit;
    }
    
    // Encontrar el próximo ID
    $nuevoId = 1;
    if (!empty($productos)) {
        $ids = array_column($productos, 'id');
        $nuevoId = max($ids) + 1;
    }
    
    // Crear nuevo producto con estructura compatible
    $nuevoProducto = [
        "id" => $nuevoId,
        "title" => $title,
        "description" => $description,
        "price" => floatval($input["price"] ?? $input["precio"] ?? 0),
        "discountPercentage" => floatval($input["discountPercentage"] ?? $input["descuento"] ?? 0),
        "rating" => floatval($input["rating"] ?? 0),
        "stock" => intval($input["stock"] ?? 0),
        "brand" => $input["brand"] ?? $input["marca"] ?? "",
        "category" => $input["category"] ?? $input["categoria"] ?? "",
        "thumbnail" => $input["thumbnail"] ?? "https://via.placeholder.com/150/374151/F5F5F5?text=" . urlencode($title),
        "images" => $input["images"] ?? ["https://via.placeholder.com/150/374151/F5F5F5?text=" . urlencode($title)]
    ];
    
    // Añadir al array de productos
    $productos[] = $nuevoProducto;
    $data["products"] = $productos;
    
    // Guardar en el archivo
    if (guardarProductos($jsonFile, $data)) {
        echo json_encode([
            "status" => "ok", 
            "id" => $nuevoId, 
            "product" => $nuevoProducto,
            "message" => "Producto añadido correctamente"
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo guardar el producto. Verifica permisos del archivo."]);
    }
    
    exit;
}

// ---------------------------------------------------------
// DELETE → borrar un producto por ID
// ---------------------------------------------------------
if ($method === "DELETE") {
    // Obtener ID de la URL
    $id = $_GET["id"] ?? null;
    
    // Si no está en GET, intentar del body
    if ($id === null) {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input["id"] ?? null;
    }
    
    if ($id === null) {
        http_response_code(400);
        echo json_encode(["error" => "Falta el parámetro ID"]);
        exit;
    }
    
    $id = intval($id);
    
    // Leer productos existentes
    $data = leerProductos($jsonFile);
    $productos = $data["products"];
    
    // Buscar producto
    $indice = -1;
    foreach ($productos as $i => $producto) {
        if ($producto["id"] == $id) {
            $indice = $i;
            break;
        }
    }
    
    if ($indice === -1) {
        http_response_code(404);
        echo json_encode(["error" => "Producto no encontrado con ID: " . $id]);
        exit;
    }
    
    // Eliminar producto
    $productoEliminado = $productos[$indice];
    array_splice($productos, $indice, 1);
    $data["products"] = $productos;
    
    // Guardar cambios
    if (guardarProductos($jsonFile, $data)) {
        echo json_encode([
            "status" => "deleted", 
            "id" => $id,
            "message" => "Producto eliminado correctamente",
            "product" => $productoEliminado
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo eliminar el producto. Verifica permisos del archivo."]);
    }
    
    exit;
}

// ---------------------------------------------------------
// Método no soportado
// ---------------------------------------------------------
http_response_code(405);
echo json_encode(["error" => "Método no permitido: " . $method]);
?>