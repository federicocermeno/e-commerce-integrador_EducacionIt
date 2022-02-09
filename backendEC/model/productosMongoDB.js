import mongoose from 'mongoose'
import DB_Mongo from './DB_Mongo.js'

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
  

    /* CREATE DE CRUD */
    async createProducto(producto) {
        if(!DB_Mongo.conexionOk) return {}

        try {
            const productoSave = new ProductoModel(producto)
            await productoSave.save()

            let productos = await ProductoModel.find({}).lean()
            let productoGuardado = productos[productos.length-1]
            return DB_Mongo.genIdKey(productoGuardado)
        }
        catch(error) {
            console.log(`Error en createProducto: ${error.message}`)
            return {}
        }
    }

    /* READ ALL DE CRUD */
    async readProductos() {
        if(!DB_Mongo.conexionOk) return []

        try {
            let productos = await ProductoModel.find({}).lean()
            return DB_Mongo.genIdKey(productos)
        }
        catch(error) {
            console.log(`Error en readProductos: ${error.message}`)
            return []
        }
    }

    /* READ ONE DE CRUD */
    async readProducto(id) {
        if(!DB_Mongo.conexionOk) return {}

        try {
            let producto = await ProductoModel.findOne({_id:id}).lean()
            return DB_Mongo.genIdKey(producto)
        }
        catch(error) {
            console.log(`Error en readProducto: ${error.message}`)
            return {}
        }
    }

    /* UPDATE DE CRUD */
    async updateProducto(id,producto) {
        if(!DB_Mongo.conexionOk) return {}

        try {
            await ProductoModel.updateOne({_id:id},{$set: producto})

            let productoActualizado = await ProductoModel.findOne({_id:id}).lean()
            return DB_Mongo.genIdKey(productoActualizado)
        }
        catch(error) {
            console.log(`Error en updateProducto: ${error.message}`)
            return {}
        }
    }

    /* DELETE DE CRUD */
    async deleteProducto(id) {
        if(!DB_Mongo.conexionOk) return {}
        
        try {
            let productoBorrado= await ProductoModel.findOne({_id:id}).lean()
            await ProductoModel.deleteOne({_id:id})


            return DB_Mongo.genIdKey(productoBorrado)
        }
        catch(error) {
            console.log(`Error en deleteProducto: ${error.message}`)
            return {}
        }
    }
}

export default ProductoModelMongoDB