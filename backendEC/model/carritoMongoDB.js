import mongoose from 'mongoose'
import DB_Mongo from './DB_Mongo.js'


/* Esquema del documento producto */
const carritoSchema = mongoose.Schema({
    carrito: Array
})

/* Modelo del documento almacenado en una colección */
const CarritoModel = mongoose.model('carritos', carritoSchema) // carritos en plural


class CarritoModelMongoDB {

    /* CRUD CREATE HTTP POST */
    async createCarrito(carrito) {
        if(!DB_Mongo.conexionOk) return {}

        try {
            const carritoSave = new CarritoModel({carrito: carrito})
            await carritoSave.save()
            return carrito
        }
        catch(error) {
            console.log(`Error en createCarrito: ${error.message}`)
            return {}
        }
    }
}

export default CarritoModelMongoDB