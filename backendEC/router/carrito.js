import express from 'express'
import controller from '../controller/carrito.js'
import pago from '../controller/pago.js'

const router = express.Router()

/* POST - req para agregar producto */
router.post('/', controller.guardarCarrito)

router.get('/feedback', pago.feedBack)

export default router