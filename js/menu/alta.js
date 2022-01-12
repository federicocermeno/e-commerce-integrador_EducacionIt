class FormularioAlta { 

    ///// Declaraciones de variables y funciones globales
    inputs = null
    form = null
    button = null
    camposValidos = [false,false,false,false,false,false,false]
    regExpValidar = [
        /^.+$/, //expresion regular de nombre
        /^[0-9]+$/, //expresion regular de precio
        /^[0-9]+$/, //expresion regular de stock
        /^.+$/, //expresion regular de marca
        /^.+$/, //expresion regular de categoria
        /^.+$/, //expresion regular de detalles
        /^.+$/, //expresion regular de foto
    ]
    
    constructor(renderTablaAlta, guardarProducto) {
        this.inputs = document.querySelectorAll('main input')
        this.form = document.querySelector('main form')
        this.button = document.querySelector('.flex-container__submit-button')

        this.button.disabled = true

        this.inputs.forEach((input,index) => {
            if(input.type != 'checkbox') {
                input.addEventListener('input', () => {
                    this.validar(input.value, this.regExpValidar[index], index )
                    if(renderTablaAlta) renderTablaAlta( !this.algunCampoNoValido(), productoController.productos )
                })
            }
        })

        this.form.addEventListener('submit', e => {
            e.preventDefault()
            
            let producto = this.leerProductoIngresado()
            this.limpiarFormulario()

            if(guardarProducto) guardarProducto(producto)
        })
    }

    setCustomValidityJS = (mensaje, index) => {
        let divs = document.querySelectorAll('.regexp')
        divs[index].innerHTML = mensaje
        divs[index].style.display = mensaje ? 'block' : 'none '
    }
    
    algunCampoNoValido() {
        let valido = 
            this.camposValidos[0] &&
            this.camposValidos[1] && 
            this.camposValidos[2] && 
            this.camposValidos[3] && 
            this.camposValidos[4] && 
            this.camposValidos[5] && 
            this.camposValidos[6]
        
        return !valido
    }
    
    validar(valor, validador, index) {
        //console.log(valor,index)
        
        if(!validador.test(valor)) {
            this.setCustomValidityJS('Este campo no es valido', index)
            this.camposValidos[index] = false
            this.button.disabled = true
            return null
        }
        
        this.camposValidos[index] = true
        this.button.disabled = this.algunCampoNoValido()
        
        this.setCustomValidityJS('',index)
        return valor
    }

    leerProductoIngresado() {
        return {
            nombre: this.inputs[0].value,
            precio: this.inputs[1].value,
            stock: this.inputs[2].value,
            marca: this.inputs[3].value,
            categoria: this.inputs[4].value,
            detalles: this.inputs[5].value,
            foto: this.inputs[6].value,
            envio: this.inputs[7].checked,
        }
    }
    
    limpiarFormulario() {
        // Se borran todos los inputs
        this.inputs.forEach(input => {
            if(input.type != 'checkbox') input.value = ''
            else if(input.type == 'checkbox') input.checked = false
        })
        
        this.button.disabled = true
        this.camposValidos = [false,false,false,false,false,false,false]
    }
}

function renderTablaAlta(validos, productos) {
        
    const xhr = new XMLHttpRequest
    xhr.open('get', 'plantillas/alta.hbs')
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            let plantillaHbs = xhr.response
        
            var template = Handlebars.compile(plantillaHbs);
            let html = (template({ productos, validos }))
            document.getElementById('listado-productos').innerHTML = html
        }
    })
    xhr.send()
}


// Inicializaciones para que el modulo funcione

async function initAlta() {
    console.warn('initAlta()')

    formularioAlta = new FormularioAlta(renderTablaAlta, productoController.guardarProducto)

    let productos = await productoController.obtenerProductos()
    renderTablaAlta(null, productos)
}




