import express from 'express'
import controller from '../controller/carrito.js'
const router = express.Router()

/* POST - req para agregar producto */
router.post('/', controller.guardarCarrito)


export default router