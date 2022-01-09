let productos = []

async function obtenerProductos() {
    productos = await obtenerProductosService()
    renderProds()
}

async function guardarProducto() {
    let producto = leerProductoIngresado()
    limpiarFormulario()

    let productoGuardado = await guardarProductoService(producto)
    console.log(productoGuardado)

    productos.push(productoGuardado)

    renderProds()
}

async function actualizarProducto(id) {
    console.log('actualizarProducto', id)

    let producto = leerProductoIngresado()
    limpiarFormulario()

    let productoActualizado = await actualizarProductoService(id,producto)
    console.log(productoActualizado)

    //productos.push(productoGuardado)
    
    let index = productos.findIndex(producto => producto.id == productoActualizado.id)
    productos.splice(index,1,productoActualizado)

    renderProds()
}

async function borrarProducto(id) {
    console.log('borrarProducto', id)

}