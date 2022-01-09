const URL_PRODUCTOS = 'https://61ba63c748df2f0017e5aaab.mockapi.io/productos'

async function obtenerProductosService() {
   let productos = await get(URL_PRODUCTOS)
    //console.log(productos)
   return productos
}

async function guardarProductoService(producto) {
    let productoGuardado = await post(URL_PRODUCTOS, producto)
    //console.log(productoGuardado)
    return productoGuardado
}


async function actualizarProductoService(id,producto) {
    let productoActualizado = await put(URL_PRODUCTOS, id, producto)
    //console.log(productoActualizado)
    return productoActualizado
}

async function borrarProductoService() {
    let productoBorrado = await del(URL_PRODUCTOS, id)
    //console.log(productoBorrado)
    return productoBorrado
}


obtenerProductosService()

// let rta = await fetch('https://61ba63c748df2f0017e5aaab.mockapi.io/productos').then(r => r.json())
//console.log('GET', rta)

//REPASO 57.07