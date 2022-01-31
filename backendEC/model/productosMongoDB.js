import mongoose from 'mongoose'
import config from '../config.js'

/* Schema del producto */
const productoSchema = mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    marca: String,
    categoria: String,
    detalles: String,
    foto: String,
    envio: Boolean
})

/* Modelo del doc. almacenado en mongoose */
const ProductoModel = mongoose.model('productos', productoSchema)



class ProductoModelMongoDB {
    static conexionOk = false

    static async conectarDB() {
        try {
            await mongoose.connect(config.STR_CNX, {
                useNewUrlParser : true,
                useUnifiedTopology: true
            })
            console.log('Base de datos conectada!')
            ProductoModelMongoDB.conexionOk = true
        }
        catch(error) {
            console.log(`MongoDB error al conectar: ${error.message}`)
        }
    }

    /* CREATE DE CRUD */
    async createProducto(producto) {
        if(!ProductoModelMongoDB.conexionOk) return {}

        try {
            const productoSave = new ProductoModel(producto)
            await productoSave.save()

            let productos = await ProductoModel.find({})
            let productoGuardado = productos[productos.length-1]
            return productoGuardado
        }
        catch(error) {
            console.log(`Error en createProducto: ${error.message}`)
            return {}
        }
    }

    /* READ ALL DE CRUD */
    async readProductos() {
        if(!ProductoModelMongoDB.conexionOk) return []

        try {
            let productos = await ProductoModel.find({})
            return productos
        }
        catch(error) {
            console.log(`Error en readProductos: ${error.message}`)
            return []
        }
    }

    /* READ ONE DE CRUD */
    async readProducto(id) {
        if(!ProductoModelMongoDB.conexionOk) return {}

        try {
            let producto = await ProductoModel.findOne({_id:id})
            return producto
        }
        catch(error) {
            console.log(`Error en readProducto: ${error.message}`)
            return {}
        }
    }

    /* UPDATE DE CRUD */
    async updateProducto(id,producto) {
        if(!ProductoModelMongoDB.conexionOk) return {}

        try {
            await ProductoModel.updateOne({_id:id},{$set: producto})

            let productoActualizado = await ProductoModel.findOne({_id:id})
            return productoActualizado
        }
        catch(error) {
            console.log(`Error en updateProducto: ${error.message}`)
            return {}
        }
    }

    /* DELETE DE CRUD */
    async deleteProducto(id) {
        if(!ProductoModelMongoDB.conexionOk) return {}
        
        try {
            await ProductoModel.deleteOne({_id:id})
            return 'ok deleteProducto'
        }
        catch(error) {
            console.log(`Error en deleteProducto: ${error.message}`)
            return {}
        }
    }
}

export default ProductoModelMongoDB