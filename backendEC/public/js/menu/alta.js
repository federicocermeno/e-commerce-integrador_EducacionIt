class FormularioAlta { 

    ///// Declaraciones de variables y funciones globales
    inputs = null
    form = null
    button = null
    camposValidos = [false,false,false,false,false,false]
    regExpValidar = [
        /^.+$/, //expresion regular de nombre
        /^[0-9]+([.])?([0-9]+)?$/, //expresion regular de precio
        /^[0-9]+$/, //expresion regular de stock
        /^.+$/, //expresion regular de marca
        /^.+$/, //expresion regular de categoria
        /^.+$/, //expresion regular de detalles  
    ]

    /* ---Drag and Drop--- */


    imagenSubida = ''
    dropArea = null
    progressBar = null

    /* ------------------- */
    
    constructor(renderTablaAlta, guardarProducto) {
        this.inputs = document.querySelectorAll('main input.data-validation')
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

        /* ---Drag and Drop---(dentro de constructor para inicializar vars.*/
        this.dropArea = document.getElementById('drop-area')
        this.progressBar = document.getElementById('progress-bar')
    
        //Cancelar el evento automatico de DyD en todo el doc
        ;['dragenter','dragover','dragleave','drop'].forEach(eventName => {
            this.dropArea.addEventListener(eventName, e=> e.preventDefault())
            document.body.addEventListener(eventName, e=> e.preventDefault())
        })    

        //Remarcar drop area al arrastrar imagen dentro
        ;['dragenter','dragover'].forEach(eventName => {
            this.dropArea.addEventListener(eventName, () => {
                this.dropArea.classList.add('highlight')
            })
        })  

        //Remarcar drop area al abandonar zona de drop
        ;['dragleave','drop'].forEach(eventName => {
            this.dropArea.addEventListener(eventName, () => {
                this.dropArea.classList.remove('highlight')
            })
        })    

        this.dropArea.addEventListener('drop', e => { //arrow para usar el this de handleFiles
            var dt = e.dataTransfer
            var files = dt.files

            this.handleFiles(files)
        })

        /* ------------------- */
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
            this.camposValidos[5] 

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
            foto: this.imagenSubida? `/uploads/${this.imagenSubida}` : '',
            envio: this.inputs[6].checked,
        }
    }
    
    limpiarFormulario() {
        // Se borran todos los inputs
        this.inputs.forEach(input => {
            if(input.type != 'checkbox') input.value = ''
            else if(input.type == 'checkbox') input.checked = false
        })
        
        this.button.disabled = true
        this.camposValidos = [false,false,false,false,false,false]

        let img = document.querySelector('#gallery img')
        img.src = ''

        this.initializeProgress()
        this.imagenSubida = ''


    }

    /*------------ DRAG AND DROP ------------*/
    initializeProgress() {  //inicializar barra de progreso
        this.progressBar.value = 0
    }

    updateProgress(porcentaje) { // ir actualizando el progreso de la barra
        this.progressBar.value = porcentaje
    }

    previewFile(file) {  //previsualizar imagen de producto
        let reader = new FileReader() //leer cualquier archivo dentro del droparea o file manager
        reader.readAsDataURL(file) //proceso de leer archivo como URL
        reader.onloadend = function() { //separar la imagen
            let img = document.querySelector('#gallery img')
            img.src = reader.result
        }
    }

    handleFiles = files => {
        let file = files[0]
        this.initializeProgress() //inicializa barra progreso
        this.uploadFile(file) // se toma el upload
        this.previewFile(file) // se muestra la imagen
    }

    uploadFile = file => {  // se realiza así porque se utiliza el this, asi no se pierde
        var url = '/upload'   //ruta en la cual queremos subir

        var xhr = new XMLHttpRequest()
        var formdata = new FormData()    // contenedor de informacion clave-valor

        xhr.open('POST', url)

        xhr.upload.addEventListener('progress', e => { // upload porque es un progreso de subida
            let porcentaje = (((e.loaded * 100) / e.total) || 100)
            this.updateProgress(porcentaje)
        })

        xhr.addEventListener('load', () => {
            if(xhr.status == 200) {
                this.imagenSubida = JSON.parse(xhr.response).nombre //carga nombre de lo subido
            }
        })

        formdata.append('foto', file)
        xhr.send(formdata) //esto es interpretado por multer

    }
    /* -------------------------------------- */
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




