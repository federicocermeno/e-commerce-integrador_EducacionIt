import CarritoModelMongoDB from "./carritoMongoDB.js"

class CarritoModel {
    static get(tipo) {
        switch(tipo) {
            case 'MONGODB':
                console.log('**** PERSISTENCIA EN MONGODB (carritoMONGO) ****')
                return new CarritoModelMongoDB()
    
            default:
                console.log('**** PERSISTENCIA DEFAULT (carritoDEFAULT) ****')
                return new CarritoModelMongoDB()
        }
    }
}

export default CarritoModel