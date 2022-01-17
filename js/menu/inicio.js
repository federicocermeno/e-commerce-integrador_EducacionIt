async function renderPlantillaListado(listado) {
    mensajeCarrito()
    let plantillaHbs = await fetch('plantillas/inicio.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs);
    
    let html = template({ listado })
    document.getElementsByClassName('cards-container')[0].innerHTML = html  
}

function agregarCarrito(e,id,ref) {
    e.preventDefault()
    
    let producto = productoController.productos.find( producto => producto.id == id )
    carritoController.agregarAlCarrito(producto)
    mensajeCarrito()
}

async function initInicio() {
    console.warn('initInicio()')
    
    var productos = await productoController.obtenerProductos()
    await renderPlantillaListado(productos)

    document.querySelector('.section-cards__header p').innerHTML = `Se encontraron ${productos.length} productos`
}

function mensajeCarrito() {
    mensaje = document.querySelectorAll('.mensajeCarrito')
    click = document.querySelectorAll('.card__description-chart')
  

    click.forEach((todosLosDivs, index) => {
      todosLosDivs.addEventListener('click', () => {
            console.log('agregando...')
             mensaje[index].innerHTML = 'El producto se agrego correctamente'
            
             setTimeout(() => {
                 mensaje[index].innerHTML = ''
             }, 500);
      })
    })
    
}